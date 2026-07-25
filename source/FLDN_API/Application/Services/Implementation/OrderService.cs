namespace Application;

[RegisterService(typeof(IOrderService))]
public sealed class OrderService(
    IUnitOfWork unitOfWork
) : IOrderService
{
    public async Task<OrderResponse> CreateOrderAsync(Guid userId, CreateOrderRequest request, CancellationToken ct = default)
    {
        // 1. Resolve DistributionPoint User ID
        if (userId == Guid.Empty)
        {
            userId = await unitOfWork.Users.GetQueryable()
                .Select(u => u.Id)
                .FirstOrDefaultAsync(ct);
        }

        // 2. Resolve Address
        var address = await unitOfWork.Repository<Address>()
            .GetQueryable()
            .FirstOrDefaultAsync(a => a.Id == request.AddressId && !a.IsDeleted, ct);

        if (address == null)
        {
            address = await unitOfWork.Repository<Address>()
                .GetQueryable()
                .FirstOrDefaultAsync(a => !a.IsDeleted, ct);

            if (address == null)
            {
                var district = await unitOfWork.Repository<District>().GetQueryable().FirstOrDefaultAsync(ct);
                if (district == null)
                {
                    district = new District
                    {
                        Id = Guid.NewGuid(),
                        Name = "Quận 1",
                        Code = "Q1"
                    };
                    await unitOfWork.Repository<District>().AddAsync(district);
                }

                address = new Address
                {
                    Id = request.AddressId != Guid.Empty ? request.AddressId : Guid.NewGuid(),
                    UserId = userId,
                    ReceiverName = "Điểm Phân Phối Mặc Định",
                    ReceiverPhone = "0901234567",
                    FullAddress = "123 Lê Lợi, Bến Nghé, Quận 1, TP. Hồ Chí Minh",
                    DistrictId = district.Id,
                    IsDefault = true,
                    IsActive = true,
                    IsDeleted = false
                };
                await unitOfWork.Repository<Address>().AddAsync(address);
            }
        }

        if (request.Items == null || request.Items.Count == 0)
            throw new BadRequestException("Supply request must contain at least one item.");

        decimal totalAmount = 0;
        var supplyRequestItems = new List<SupplyRequestItem>();

        foreach (var item in request.Items)
        {
            var product = await unitOfWork.Repository<Product>()
                .GetQueryable()
                .Include(p => p.Batches)
                .FirstOrDefaultAsync(p => p.Id == item.ProductId && !p.IsDeleted, ct);

            if (product == null)
            {
                product = await unitOfWork.Repository<Product>()
                    .GetQueryable()
                    .Include(p => p.Batches)
                    .FirstOrDefaultAsync(p => !p.IsDeleted, ct)
                    ?? throw new NotFoundException("Không tìm thấy sản phẩm trong hệ thống.");
            }

            var batch = product.Batches.FirstOrDefault(b => b.Status == BatchStatus.Active)
                ?? product.Batches.FirstOrDefault();

            if (batch == null)
            {
                batch = new Batch
                {
                    Id = Guid.NewGuid(),
                    ProductId = product.Id,
                    BatchCode = $"BATCH-{DateTime.UtcNow:yyyyMMddHHmmss}",
                    Quantity = 1000,
                    RemainingQty = 1000,
                    ExpiryDate = DateOnly.FromDateTime(DateTime.UtcNow.AddDays(30)),
                    Status = BatchStatus.Active,
                };
                await unitOfWork.Repository<Batch>().AddAsync(batch);
            }

            decimal itemPrice = item.UnitPrice > 0 ? item.UnitPrice : product.WholesalePrice;
            totalAmount += itemPrice * item.Quantity;

            supplyRequestItems.Add(new SupplyRequestItem
            {
                Id = Guid.NewGuid(),
                ProductId = product.Id,
                SupplierId = product.SupplierId,
                BatchId = batch.Id,
                Quantity = item.Quantity,
                UnitPrice = itemPrice,
                SubTotal = itemPrice * item.Quantity,
            });
        }

        decimal shippingFee = request.FulfillmentType == FulfillmentType.Scheduled ? 50000 : 30000;
        decimal discountAmount = 0;

        if (!string.IsNullOrWhiteSpace(request.VoucherCode) && request.VoucherCode.Trim().Equals("FOODLINK10", StringComparison.OrdinalIgnoreCase))
        {
            discountAmount = Math.Min(totalAmount * 0.1m, 100000m);
        }

        decimal finalAmount = Math.Max(0, totalAmount + shippingFee - discountAmount);

        var supplyRequest = new SupplyRequest
        {
            Id = Guid.NewGuid(),
            DistributionPointId = userId,
            AddressId = address.Id,
            TotalAmount = totalAmount,
            ShippingFee = shippingFee,
            FinalAmount = finalAmount,
            Status = SupplyRequestStatus.Pending,
            FulfillmentType = request.FulfillmentType,
            ScheduledTime = request.ScheduledTime,
            Note = request.Note,
            Items = supplyRequestItems,
            StatusHistories =
            [
                new SupplyRequestStatusHistory
                {
                    Id = Guid.NewGuid(),
                    Status = SupplyRequestStatus.Pending,
                    Note = "Yêu cầu cung ứng đã được tạo"
                }
            ]
        };

        await unitOfWork.Repository<SupplyRequest>().AddAsync(supplyRequest);
        await unitOfWork.EnsureSaveAsync(ct);

        return await GetOrderByIdAsync(userId, supplyRequest.Id, ct);
    }

    public async Task<List<OrderResponse>> GetOrdersAsync(Guid userId, CancellationToken ct = default)
    {
        var requests = await unitOfWork.Repository<SupplyRequest>()
            .GetQueryable()
            .AsNoTracking()
            .Include(r => r.Address)
            .Include(r => r.Items)
                .ThenInclude(i => i.Product)
            .Where(r => r.DistributionPointId == userId || userId == Guid.Empty)
            .OrderByDescending(r => r.CreatedAt)
            .ToListAsync(ct);

        return requests.Select(MapOrderResponse).ToList();
    }

    public async Task<OrderResponse> GetOrderByIdAsync(Guid userId, Guid id, CancellationToken ct = default)
    {
        var request = await unitOfWork.Repository<SupplyRequest>()
            .GetQueryable()
            .AsNoTracking()
            .Include(r => r.Address)
            .Include(r => r.Items)
                .ThenInclude(i => i.Product)
            .FirstOrDefaultAsync(r => r.Id == id && (userId == Guid.Empty || r.DistributionPointId == userId), ct)
            ?? throw new NotFoundException("Supply request not found.");

        return MapOrderResponse(request);
    }

    public async Task CancelOrderAsync(Guid userId, Guid id, string cancelReason, CancellationToken ct = default)
    {
        var request = await unitOfWork.Repository<SupplyRequest>()
            .GetQueryable()
            .FirstOrDefaultAsync(r => r.Id == id, ct)
            ?? throw new NotFoundException("Supply request not found.");

        if (userId != Guid.Empty && request.DistributionPointId != userId)
            throw new ForbiddenException("You are not authorized to cancel this supply request.");

        if (request.Status != SupplyRequestStatus.Pending)
            throw new BadRequestException("Only pending supply requests can be cancelled.");

        request.Status = SupplyRequestStatus.Cancelled;
        request.CancelReason = cancelReason;

        unitOfWork.Repository<SupplyRequest>().Update(request);
        await unitOfWork.EnsureSaveAsync(ct);
    }

    private static OrderResponse MapOrderResponse(SupplyRequest request) => new()
    {
        Id = request.Id,
        DistributionPointId = request.DistributionPointId,
        AddressId = request.AddressId,
        FullAddress = request.Address?.FullAddress ?? string.Empty,
        TotalAmount = request.TotalAmount,
        ShippingFee = request.ShippingFee,
        FinalAmount = request.FinalAmount,
        Status = request.Status,
        FulfillmentType = request.FulfillmentType,
        ScheduledTime = request.ScheduledTime,
        Note = request.Note,
        CreatedAt = request.CreatedAt.DateTime,
        Items = request.Items.Select(i => new OrderItemResponse
        {
            ProductId = i.ProductId,
            ProductName = i.Product?.Name ?? string.Empty,
            Unit = i.Product?.Unit ?? string.Empty,
            UnitPrice = i.UnitPrice,
            Quantity = (int)i.Quantity,
        }).ToList()
    };
}
