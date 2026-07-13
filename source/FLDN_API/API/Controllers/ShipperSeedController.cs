using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Domain;
using Infrastructure;

namespace API;

[ApiController]
[Route("api/[controller]")]
public class ShipperSeedController : ControllerBase
{
    private readonly ApplicationDbContext _context;
    private readonly IPasswordHasher _passwordHasher;

    public ShipperSeedController(ApplicationDbContext context, IPasswordHasher passwordHasher)
    {
        _context = context;
        _passwordHasher = passwordHasher;
    }

    [HttpGet("tables")]
    public async Task<IActionResult> GetTableSchema()
    {
        try
        {
            var conn = _context.Database.GetDbConnection();
            await conn.OpenAsync();
            using var cmd = conn.CreateCommand();
            cmd.CommandText = @"
                SELECT TABLE_NAME, COLUMN_NAME, DATA_TYPE 
                FROM INFORMATION_SCHEMA.COLUMNS 
                WHERE DATA_TYPE IN ('uniqueidentifier', 'int')
                ORDER BY TABLE_NAME, COLUMN_NAME";
            
            var list = new List<object>();
            using var reader = await cmd.ExecuteReaderAsync();
            while (await reader.ReadAsync())
            {
                list.Add(new
                {
                    Table = reader.GetString(0),
                    Column = reader.GetString(1),
                    Type = reader.GetString(2)
                });
            }
            return Ok(list);
        }
        catch (Exception ex)
        {
            return StatusCode(500, new { error = ex.Message });
        }
    }

    [HttpGet("reset-db")]
    public async Task<IActionResult> ResetDatabase()
    {
        try
        {
            var conn = _context.Database.GetDbConnection();
            await conn.OpenAsync();
            using (var cmd = conn.CreateCommand())
            {
                // Disable all constraints
                cmd.CommandText = @"
                    DECLARE @sql NVARCHAR(MAX) = N'';
                    SELECT @sql += 'ALTER TABLE ' + QUOTENAME(RC.CONSTRAINT_SCHEMA) 
                        + '.' + QUOTENAME(KCU1.TABLE_NAME) 
                        + ' DROP CONSTRAINT ' + QUOTENAME(RC.CONSTRAINT_NAME) + ';'
                    FROM INFORMATION_SCHEMA.REFERENTIAL_CONSTRAINTS RC
                    JOIN INFORMATION_SCHEMA.KEY_COLUMN_USAGE KCU1 
                        ON KCU1.CONSTRAINT_CATALOG = RC.CONSTRAINT_CATALOG 
                        AND KCU1.CONSTRAINT_SCHEMA = RC.CONSTRAINT_SCHEMA 
                        AND KCU1.CONSTRAINT_NAME = RC.CONSTRAINT_NAME;
                    EXEC sp_executesql @sql;";
                await cmd.ExecuteNonQueryAsync();

                // Drop all tables
                cmd.CommandText = @"
                    DECLARE @sql NVARCHAR(MAX) = N'';
                    SELECT @sql += 'DROP TABLE ' + QUOTENAME(TABLE_SCHEMA) + '.' + QUOTENAME(TABLE_NAME) + ';'
                    FROM INFORMATION_SCHEMA.TABLES
                    WHERE TABLE_TYPE = 'BASE TABLE' AND TABLE_NAME NOT LIKE 'sys%';
                    EXEC sp_executesql @sql;";
                await cmd.ExecuteNonQueryAsync();
            }

            // Run EF Core Migrate to recreate the tables with int keys
            await _context.Database.MigrateAsync();

            return Ok(new { message = "Database reset and migrated successfully with int primary keys!" });
        }
        catch (Exception ex)
        {
            return StatusCode(500, new { error = ex.Message, details = ex.InnerException?.Message });
        }
    }

    [HttpPost("seed")]
    public async Task<IActionResult> SeedShipperData()
    {
        using var transaction = await _context.Database.BeginTransactionAsync();
        try
        {
            // 1. Ensure Roles Exist
            var shipperRole = await _context.Roles.FirstOrDefaultAsync(r => r.RoleName == "Shipper");
            if (shipperRole == null)
            {
                shipperRole = new Role { RoleName = "Shipper", Description = "Logistics Operator" };
                _context.Roles.Add(shipperRole);
                await _context.SaveChangesAsync();
            }

            var userRole = await _context.Roles.FirstOrDefaultAsync(r => r.RoleName == "User");
            if (userRole == null)
            {
                userRole = new Role { RoleName = "User", Description = "Regular Customer" };
                _context.Roles.Add(userRole);
                await _context.SaveChangesAsync();
            }

            var supplierRole = await _context.Roles.FirstOrDefaultAsync(r => r.RoleName == "Supplier");
            if (supplierRole == null)
            {
                supplierRole = new Role { RoleName = "Supplier", Description = "Food Supplier" };
                _context.Roles.Add(supplierRole);
                await _context.SaveChangesAsync();
            }

            // 2. Ensure default Location District and Zone exist
            var district = await _context.Districts.FirstOrDefaultAsync();
            if (district == null)
            {
                district = new District { Name = "Quận Liên Chiểu", Code = "LC" };
                _context.Districts.Add(district);
                await _context.SaveChangesAsync();
            }

            var zone = await _context.DeliveryZones.FirstOrDefaultAsync();
            if (zone == null)
            {
                zone = new DeliveryZone
                {
                    DistrictId = district.DistrictId,
                    ZoneName = "Khu vực Hòa Khánh",
                    IsActive = true
                };
                _context.DeliveryZones.Add(zone);
                await _context.SaveChangesAsync();
            }

            // 3. Create Shipper User and Profile
            var shipperUser = await _context.Users.FirstOrDefaultAsync(u => u.Email == "shipper@foodlink.com");
            if (shipperUser == null)
            {
                shipperUser = new User
                {
                    FullName = "Nguyễn Văn Shipper",
                    Email = "shipper@foodlink.com",
                    Phone = "0987654321",
                    PasswordHash = _passwordHasher.Hash("123456"),
                    IsActive = true,
                    IsDeleted = false
                };
                _context.Users.Add(shipperUser);
                await _context.SaveChangesAsync();

                var userRoleMapping = new UserRole { UserId = shipperUser.Id, RoleId = shipperRole.Id };
                _context.UserRoles.Add(userRoleMapping);
                await _context.SaveChangesAsync();
            }

            var shipperProfile = await _context.ShipperProfiles.FirstOrDefaultAsync(sp => sp.UserId == shipperUser.Id);
            if (shipperProfile == null)
            {
                shipperProfile = new ShipperProfile
                {
                    UserId = shipperUser.Id,
                    VehicleType = "Motorbike",
                    LicensePlate = "29A1-999.99",
                    IdentityCard = "0123456789",
                    Status = ShipperStatus.Available,
                    AverageRating = 4.8m,
                    TotalDeliveries = 15,
                    IsDeleted = false,
                    CreatedAt = DateTimeOffset.UtcNow
                };
                _context.ShipperProfiles.Add(shipperProfile);
                await _context.SaveChangesAsync();
            }

            // 4. Create Customer User and Address
            var customerUser = await _context.Users.FirstOrDefaultAsync(u => u.Email == "customer@gmail.com");
            if (customerUser == null)
            {
                customerUser = new User
                {
                    FullName = "Trần Thị Khách Hàng",
                    Email = "customer@gmail.com",
                    Phone = "0912345678",
                    PasswordHash = _passwordHasher.Hash("123456"),
                    IsActive = true,
                    IsDeleted = false
                };
                _context.Users.Add(customerUser);
                await _context.SaveChangesAsync();

                var customerRoleMapping = new UserRole { UserId = customerUser.Id, RoleId = userRole.Id };
                _context.UserRoles.Add(customerRoleMapping);
                await _context.SaveChangesAsync();
            }

            var address = await _context.Addresses.FirstOrDefaultAsync(a => a.UserId == customerUser.Id);
            if (address == null)
            {
                address = new Address
                {
                    UserId = customerUser.Id,
                    ReceiverName = customerUser.FullName,
                    ReceiverPhone = customerUser.Phone,
                    FullAddress = "123 Đường Nguyễn Lương Bằng, Phường Hòa Khánh Nam",
                    DistrictId = district.DistrictId,
                    IsDefault = true,
                    IsActive = true,
                    IsDeleted = false
                };
                _context.Addresses.Add(address);
                await _context.SaveChangesAsync();
            }

            // 5. Create Supplier User and Profile
            var supplierUser = await _context.Users.FirstOrDefaultAsync(u => u.Email == "supplier@foodlink.com");
            if (supplierUser == null)
            {
                supplierUser = new User
                {
                    FullName = "Công ty Nông nghiệp Xanh",
                    Email = "supplier@foodlink.com",
                    Phone = "0944332211",
                    PasswordHash = _passwordHasher.Hash("123456"),
                    IsActive = true,
                    IsDeleted = false
                };
                _context.Users.Add(supplierUser);
                await _context.SaveChangesAsync();

                var supplierRoleMapping = new UserRole { UserId = supplierUser.Id, RoleId = supplierRole.Id };
                _context.UserRoles.Add(supplierRoleMapping);
                await _context.SaveChangesAsync();
            }

            var supplierProfile = await _context.SupplierProfiles.FirstOrDefaultAsync(sp => sp.UserId == supplierUser.Id);
            if (supplierProfile == null)
            {
                supplierProfile = new SupplierProfile
                {
                    UserId = supplierUser.Id,
                    BusinessName = "Nông sản Việt Xanh",
                    DistrictId = district.DistrictId,
                    Address = "Đường số 4 KCN Hòa Khánh",
                    Status = SupplierStatus.Approved,
                    IsDeleted = false,
                    CreatedAt = DateTimeOffset.UtcNow
                };
                _context.SupplierProfiles.Add(supplierProfile);
                await _context.SaveChangesAsync();
            }

            // 6. Create Category, Product and Batch
            var category = await _context.Categories.FirstOrDefaultAsync();
            if (category == null)
            {
                category = new Category
                {
                    Name = "Rau củ quả tươi",
                    Description = "Các loại rau củ sạch đạt tiêu chuẩn VietGAP",
                    IsActive = true
                };
                _context.Categories.Add(category);
                await _context.SaveChangesAsync();
            }

            var product = await _context.Products.FirstOrDefaultAsync();
            if (product == null)
            {
                product = new Product
                {
                    SupplierId = supplierProfile.Id,
                    CategoryId = category.CategoryId,
                    Name = "Cà chua VietGAP",
                    Description = "Cà chua chín mọng xuất xứ Đà Lạt",
                    WholesalePrice = 15000,
                    RetailPrice = 20000,
                    Unit = "Kg",
                    PackagingStandard = "Túi lưới 1kg",
                    IsActive = true,
                    IsDeleted = false
                };
                _context.Products.Add(product);
                await _context.SaveChangesAsync();
            }

            var batch = await _context.Batches.FirstOrDefaultAsync();
            if (batch == null)
            {
                batch = new Batch
                {
                    ProductId = product.Id,
                    BatchCode = "BATCH-tomato-001",
                    Quantity = 500,
                    RemainingQty = 450,
                    HarvestDate = DateOnly.FromDateTime(DateTime.Today.AddDays(-1)),
                    ManufacturingDate = DateOnly.FromDateTime(DateTime.Today),
                    ExpiryDate = DateOnly.FromDateTime(DateTime.Today.AddDays(7)),
                    GrowingRegion = "Đà Lạt Lâm Đồng",
                    Status = BatchStatus.Active
                };
                _context.Batches.Add(batch);
                await _context.SaveChangesAsync();
            }

            // 7. Remove previous test deliveries/orders to avoid clutter
            var oldDeliveries = await _context.Deliveries.Where(d => d.ShipperId == shipperProfile.Id || d.ShipperId == null).ToListAsync();
            _context.Deliveries.RemoveRange(oldDeliveries);

            // 8. Create Order 1: WaitingForShipper (Available for pickup)
            var order1 = new Order
            {
                CustomerId = customerUser.Id,
                AddressId = address.AddressId,
                TotalAmount = 40000,
                DiscountAmount = 0,
                ShippingFee = 15000,
                FinalAmount = 55000,
                Status = OrderStatus.ReadyToShip,
                DeliveryType = DeliveryType.Scheduled,
                ScheduledTime = DateTimeOffset.UtcNow.AddHours(2),
                Note = "Giao giờ hành chính, gọi trước khi đến"
            };
            _context.Orders.Add(order1);
            await _context.SaveChangesAsync();

            var item1 = new OrderItem
            {
                OrderId = order1.Id,
                ProductId = product.Id,
                BatchId = batch.Id,
                SupplierId = supplierProfile.Id,
                Quantity = 2,
                UnitPrice = 20000,
                SubTotal = 40000
            };
            _context.OrderItems.Add(item1);

            var delivery1 = new Delivery
            {
                OrderId = order1.Id,
                ShipperId = null, // No shipper yet
                ZoneId = zone.ZoneId,
                Status = DeliveryStatus.WaitingForShipper,
                ShippingFee = 15000,
                ShipperEarning = 12000,
                EstimatedDistance = 3.5m,
                Note = "Đơn hàng đang chờ Shipper nhận vận chuyển."
            };
            _context.Deliveries.Add(delivery1);
            await _context.SaveChangesAsync();

            // Order 2: Assigned (Assigned to current shipper)
            var order2 = new Order
            {
                CustomerId = customerUser.Id,
                AddressId = address.AddressId,
                TotalAmount = 60000,
                DiscountAmount = 0,
                ShippingFee = 20000,
                FinalAmount = 80000,
                Status = OrderStatus.ReadyToShip,
                DeliveryType = DeliveryType.Scheduled,
                ScheduledTime = DateTimeOffset.UtcNow.AddHours(1),
                Note = "Giao tầng 3 tòa nhà"
            };
            _context.Orders.Add(order2);
            await _context.SaveChangesAsync();

            var item2 = new OrderItem
            {
                OrderId = order2.Id,
                ProductId = product.Id,
                BatchId = batch.Id,
                SupplierId = supplierProfile.Id,
                Quantity = 3,
                UnitPrice = 20000,
                SubTotal = 60000
            };
            _context.OrderItems.Add(item2);

            var delivery2 = new Delivery
            {
                OrderId = order2.Id,
                ShipperId = shipperProfile.Id,
                ZoneId = zone.ZoneId,
                Status = DeliveryStatus.Assigned,
                AssignedAt = DateTimeOffset.UtcNow,
                ShippingFee = 20000,
                ShipperEarning = 16000,
                EstimatedDistance = 5.2m,
                Note = "Giao hàng cẩn thận tránh dập nát."
            };
            _context.Deliveries.Add(delivery2);
            await _context.SaveChangesAsync();

            // Order 3: Delivering (Picked up and in transit by current shipper)
            var order3 = new Order
            {
                CustomerId = customerUser.Id,
                AddressId = address.AddressId,
                TotalAmount = 20000,
                DiscountAmount = 0,
                ShippingFee = 15000,
                FinalAmount = 35000,
                Status = OrderStatus.Shipping,
                DeliveryType = DeliveryType.Immediate,
                ScheduledTime = DateTimeOffset.UtcNow.AddMinutes(30),
                Note = "Giao hàng gấp!"
            };
            _context.Orders.Add(order3);
            await _context.SaveChangesAsync();

            var item3 = new OrderItem
            {
                OrderId = order3.Id,
                ProductId = product.Id,
                BatchId = batch.Id,
                SupplierId = supplierProfile.Id,
                Quantity = 1,
                UnitPrice = 20000,
                SubTotal = 20000
            };
            _context.OrderItems.Add(item3);

            var delivery3 = new Delivery
            {
                OrderId = order3.Id,
                ShipperId = shipperProfile.Id,
                ZoneId = zone.ZoneId,
                Status = DeliveryStatus.Delivering,
                AssignedAt = DateTimeOffset.UtcNow.AddMinutes(-30),
                PickedUpAt = DateTimeOffset.UtcNow.AddMinutes(-10),
                ShippingFee = 15000,
                ShipperEarning = 12000,
                EstimatedDistance = 2.1m,
                Note = "Đơn hỏa tốc."
            };
            _context.Deliveries.Add(delivery3);
            await _context.SaveChangesAsync();

            // Order 4: Delivered (Completed by current shipper)
            var order4 = new Order
            {
                CustomerId = customerUser.Id,
                AddressId = address.AddressId,
                TotalAmount = 80000,
                DiscountAmount = 10000,
                ShippingFee = 18000,
                FinalAmount = 88000,
                Status = OrderStatus.Delivered,
                DeliveryType = DeliveryType.Scheduled,
                ScheduledTime = DateTimeOffset.UtcNow.AddDays(-1),
                Note = "Đã giao hôm qua"
            };
            _context.Orders.Add(order4);
            await _context.SaveChangesAsync();

            var item4 = new OrderItem
            {
                OrderId = order4.Id,
                ProductId = product.Id,
                BatchId = batch.Id,
                SupplierId = supplierProfile.Id,
                Quantity = 4,
                UnitPrice = 20000,
                SubTotal = 80000
            };
            _context.OrderItems.Add(item4);

            var delivery4 = new Delivery
            {
                OrderId = order4.Id,
                ShipperId = shipperProfile.Id,
                ZoneId = zone.ZoneId,
                Status = DeliveryStatus.Delivered,
                AssignedAt = DateTimeOffset.UtcNow.AddDays(-1).AddHours(-2),
                PickedUpAt = DateTimeOffset.UtcNow.AddDays(-1).AddHours(-1),
                DeliveredAt = DateTimeOffset.UtcNow.AddDays(-1),
                ShippingFee = 18000,
                ShipperEarning = 14400,
                EstimatedDistance = 4.8m,
                Note = "Giao hàng thành công cho khách hàng."
            };
            _context.Deliveries.Add(delivery4);
            await _context.SaveChangesAsync();

            await _context.SaveChangesAsync();
            await transaction.CommitAsync();

            return Ok(new
            {
                message = "Đã seed thành công dữ liệu Shipper, Đơn hàng và Vận chuyển.",
                shipperUserId = shipperUser.Id,
                shipperProfileId = shipperProfile.Id,
                customerId = customerUser.Id,
                ordersCreated = 4
            });
        }
        catch (Exception ex)
        {
            await transaction.RollbackAsync();
            return StatusCode(500, new { message = "Lỗi trong quá trình seed dữ liệu.", error = ex.Message, inner = ex.InnerException?.Message });
        }
    }
}
