using Domain;
using Microsoft.EntityFrameworkCore;

namespace Infrastructure;

public class AppData
{
    public static async Task SeedAsync(ApplicationDbContext context)
    {
        if (!await context.Roles.AnyAsync())
        {
            await context.Roles.AddRangeAsync(RoleData.GetRoles());
            await context.SaveChangesAsync();
        }

        if (!await context.Districts.AnyAsync())
        {
            var district = new District
            {
                Id = Guid.Parse("d1111111-1111-1111-1111-111111111111"),
                Name = "Quận 1",
                Code = "Q1"
            };
            await context.Districts.AddAsync(district);
            await context.SaveChangesAsync();
        }

        if (!await context.Categories.AnyAsync())
        {
            var categories = new List<Category>
            {
                new() { Id = Guid.Parse("c1111111-1111-1111-1111-111111111111"), Name = "Rau củ tươi", Description = "Các loại rau củ hữu cơ tươi sạch" },
                new() { Id = Guid.Parse("c2222222-2222-2222-2222-222222222222"), Name = "Trái cây Việt", Description = "Trái cây tươi ngon theo mùa" },
                new() { Id = Guid.Parse("c3333333-3333-3333-3333-333333333333"), Name = "Thịt tươi & Trứng", Description = "Thịt heo, bò, gà đạt chuẩn ATVSTP" },
                new() { Id = Guid.Parse("c4444444-4444-4444-4444-444444444444"), Name = "Hải sản tươi sống", Description = "Hải sản cá, tôm, mực đánh bắt hàng ngày" }
            };
            await context.Categories.AddRangeAsync(categories);
            await context.SaveChangesAsync();
        }

        if (!await context.Products.AnyAsync())
        {
            var districtId = await context.Districts.Select(d => d.Id).FirstOrDefaultAsync();
            var categoryVegetable = await context.Categories.FirstOrDefaultAsync(c => c.Name.Contains("Rau"));
            var categoryFruit = await context.Categories.FirstOrDefaultAsync(c => c.Name.Contains("Trái cây"));
            var categoryMeat = await context.Categories.FirstOrDefaultAsync(c => c.Name.Contains("Thịt"));
            var categorySeafood = await context.Categories.FirstOrDefaultAsync(c => c.Name.Contains("Hải sản"));

            var user = new User
            {
                Id = Guid.Parse("u1111111-1111-1111-1111-111111111111"),
                Email = "supplier@foodlink.com",
                PasswordHash = "hashed",
                FullName = "Nông trại Xanh Đà Lạt",
                Phone = "0901234567",
                IsActive = true,
            };
            await context.Users.AddAsync(user);

            var supplier = new SupplierProfile
            {
                Id = Guid.Parse("s1111111-1111-1111-1111-111111111111"),
                UserId = user.Id,
                BusinessName = "Nông trại Xanh Đà Lạt",
                DistrictId = districtId,
                Status = SupplierStatus.Approved,
                IsDeleted = false
            };
            await context.SupplierProfiles.AddAsync(supplier);
            await context.SaveChangesAsync();

            var products = new List<Product>
            {
                new()
                {
                    Id = Guid.Parse("a0000000-0000-0000-0000-000000000001"),
                    SupplierId = supplier.Id,
                    CategoryId = categoryVegetable?.Id ?? Guid.Empty,
                    Name = "Rau Cải Thìa Hữu Cơ Đà Lạt",
                    Description = "Rau cải thìa trồng theo phương pháp hữu cơ tại Đà Lạt, lá xanh giòn, không hóa chất bảo quản.",
                    WholesalePrice = 18000,
                    Unit = "Kg",
                    PackagingStandard = "Túi 500g bọc màng thực phẩm",
                    IsActive = true,
                    IsDeleted = false,
                },
                new()
                {
                    Id = Guid.Parse("a0000000-0000-0000-0000-000000000002"),
                    SupplierId = supplier.Id,
                    CategoryId = categoryVegetable?.Id ?? Guid.Empty,
                    Name = "Cà Rốt Đà Lạt Tươi Loại 1",
                    Description = "Cà rốt tươi đỏ củ chắc, vị ngọt thanh tự nhiên. Rất giàu Vitamin A và khoáng chất.",
                    WholesalePrice = 24000,
                    Unit = "Kg",
                    PackagingStandard = "Túi lưới 1Kg",
                    IsActive = true,
                    IsDeleted = false,
                },
                new()
                {
                    Id = Guid.Parse("a0000000-0000-0000-0000-000000000003"),
                    SupplierId = supplier.Id,
                    CategoryId = categoryFruit?.Id ?? Guid.Empty,
                    Name = "Xoài Cát Hòa Lộc Tiền Giang",
                    Description = "Xoài cát Hòa Lộc đặc sản Tiền Giang, thịt dày, ngọt đậm đà.",
                    WholesalePrice = 65000,
                    Unit = "Kg",
                    PackagingStandard = "Thùng giấy 5Kg",
                    IsActive = true,
                    IsDeleted = false,
                },
                new()
                {
                    Id = Guid.Parse("a0000000-0000-0000-0000-000000000004"),
                    SupplierId = supplier.Id,
                    CategoryId = categoryFruit?.Id ?? Guid.Empty,
                    Name = "Dưa Hấu Không Hạt Long An",
                    Description = "Dưa hấu vỏ mỏng, ruột đỏ mọng nước, ngọt mát thanh nhiệt ngày hè.",
                    WholesalePrice = 20000,
                    Unit = "Kg",
                    PackagingStandard = "Trái từ 3-4kg",
                    IsActive = true,
                    IsDeleted = false,
                },
                new()
                {
                    Id = Guid.Parse("a0000000-0000-0000-0000-000000000005"),
                    SupplierId = supplier.Id,
                    CategoryId = categoryMeat?.Id ?? Guid.Empty,
                    Name = "Thịt Thăn Heo Thảo Mộc",
                    Description = "Thịt thăn heo tươi ngon nuôi theo công nghệ thảo mộc.",
                    WholesalePrice = 120000,
                    Unit = "Kg",
                    PackagingStandard = "Khay hút chân không 500g",
                    IsActive = true,
                    IsDeleted = false,
                },
                new()
                {
                    Id = Guid.Parse("a0000000-0000-0000-0000-000000000006"),
                    SupplierId = supplier.Id,
                    CategoryId = categorySeafood?.Id ?? Guid.Empty,
                    Name = "Cá Thổ Kim Sa Phú Quốc",
                    Description = "Cá tươi cấp đông nhanh ngay tại tàu đánh bắt Phú Quốc.",
                    WholesalePrice = 150000,
                    Unit = "Kg",
                    PackagingStandard = "Khay 1Kg đóng đông",
                    IsActive = true,
                    IsDeleted = false,
                }
            };

            await context.Products.AddRangeAsync(products);
            await context.SaveChangesAsync();

            foreach (var p in products)
            {
                var batch = new Batch
                {
                    Id = Guid.NewGuid(),
                    ProductId = p.Id,
                    BatchCode = $"BATCH-{DateTime.UtcNow:yyyyMMdd}-{p.Id.ToString()[..4]}",
                    Quantity = 1000,
                    RemainingQty = 1000,
                    ExpiryDate = DateOnly.FromDateTime(DateTime.UtcNow.AddDays(30)),
                    Status = BatchStatus.Active
                };
                await context.Batches.AddAsync(batch);

                await context.Inventories.AddAsync(new Inventory
                {
                    Id = Guid.NewGuid(),
                    ProductId = p.Id,
                    Quantity = batch.RemainingQty,
                    ReservedQty = 0
                });
            }
            await context.SaveChangesAsync();
        }

        // Backfill: sản phẩm cũ chưa có bản ghi Inventory thì tạo theo tổng số lượng còn lại của các lô còn hạn
        var productIdsWithoutInventory = await context.Products
            .Where(p => !p.IsDeleted && !context.Inventories.Any(i => i.ProductId == p.Id))
            .Select(p => p.Id)
            .ToListAsync();

        if (productIdsWithoutInventory.Count > 0)
        {
            var remainingByProduct = await context.Batches
                .Where(b => productIdsWithoutInventory.Contains(b.ProductId) && b.Status != BatchStatus.Expired)
                .GroupBy(b => b.ProductId)
                .Select(g => new { ProductId = g.Key, Quantity = g.Sum(b => b.RemainingQty) })
                .ToListAsync();

            foreach (var productId in productIdsWithoutInventory)
            {
                await context.Inventories.AddAsync(new Inventory
                {
                    Id = Guid.NewGuid(),
                    ProductId = productId,
                    Quantity = remainingByProduct.FirstOrDefault(r => r.ProductId == productId)?.Quantity ?? 0,
                    ReservedQty = 0
                });
            }

            await context.SaveChangesAsync();
        }

        if (!await context.Addresses.AnyAsync())
        {
            var userId = await context.Users.Select(u => u.Id).FirstOrDefaultAsync();
            var districtId = await context.Districts.Select(d => d.Id).FirstOrDefaultAsync();

            var addresses = new List<Address>
            {
                new()
                {
                    Id = Guid.Parse("11111111-1111-1111-1111-111111111111"),
                    UserId = userId,
                    ReceiverName = "Điểm Phân Phối Quận 1",
                    ReceiverPhone = "0901234567",
                    FullAddress = "123 Lê Lợi, Phường Bến Nghé, Quận 1, TP. Hồ Chí Minh",
                    DistrictId = districtId,
                    IsDefault = true,
                    IsActive = true,
                    IsDeleted = false
                },
                new()
                {
                    Id = Guid.Parse("22222222-2222-2222-2222-222222222222"),
                    UserId = userId,
                    ReceiverName = "Kho Phân Phối Thủ Đức",
                    ReceiverPhone = "0909876543",
                    FullAddress = "45 Võ Văn Ngân, Phường Linh Chiểu, TP. Thủ Đức, TP. Hồ Chí Minh",
                    DistrictId = districtId,
                    IsDefault = false,
                    IsActive = true,
                    IsDeleted = false
                }
            };
            await context.Addresses.AddRangeAsync(addresses);
            await context.SaveChangesAsync();
        }
    }
}
