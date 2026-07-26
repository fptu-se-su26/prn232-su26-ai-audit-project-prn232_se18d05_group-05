namespace Application;

[RegisterService(typeof(IOrderService))]
public sealed class OrderService(
    IUnitOfWork unitOfWork,
    IAppConfiguration appConfiguration
) : IOrderService
{
    public async Task<OrderResponse> CreateOrderAsync(Guid userId, CreateOrderRequest request, CancellationToken ct = default)
    {
        if (userId == Guid.Empty)
            throw new UnauthorizedException("Invalid or missing user ID in token.");

        if (request.Items == null || request.Items.Count == 0)
            throw new BadRequestException("Supply request must contain at least one item.");

        // 1. Địa chỉ giao hàng phải có thật và thuộc về người đặt
        var address = await unitOfWork.Repository<Address>()
            .GetQueryable()
            .FirstOrDefaultAsync(a => a.Id == request.AddressId && !a.IsDeleted, ct)
            ?? throw new NotFoundException("Không tìm thấy địa chỉ giao hàng.");

        if (address.UserId != userId)
            throw new ForbiddenException("Bạn không có quyền sử dụng địa chỉ giao hàng này.");

        // 2. Gộp các dòng trùng sản phẩm để kiểm tra tồn kho một lần cho mỗi sản phẩm
        var requestedItems = request.Items
            .GroupBy(i => i.ProductId)
            .Select(g => new { ProductId = g.Key, Quantity = g.Sum(i => i.Quantity) })
            .ToList();

        if (requestedItems.Any(i => i.Quantity <= 0))
            throw new BadRequestException("Số lượng phải lớn hơn 0.");

        var today = DateOnly.FromDateTime(DateTime.UtcNow);
        decimal totalAmount = 0;
        var supplyRequestItems = new List<SupplyRequestItem>();
        var reservedInventories = new List<Inventory>();

        foreach (var item in requestedItems)
        {
            var product = await unitOfWork.Repository<Product>()
                .GetQueryable()
                .Include(p => p.Inventory)
                .Include(p => p.Batches)
                .FirstOrDefaultAsync(p => p.Id == item.ProductId && !p.IsDeleted && p.IsActive, ct)
                ?? throw new NotFoundException($"Không tìm thấy sản phẩm {item.ProductId} hoặc sản phẩm đã ngừng kinh doanh.");

            var inventory = product.Inventory
                ?? throw new BadRequestException($"Sản phẩm \"{product.Name}\" chưa có tồn kho.");

            var availableQty = inventory.Quantity - inventory.ReservedQty;
            if (availableQty < item.Quantity)
                throw new BadRequestException($"Sản phẩm \"{product.Name}\" chỉ còn {availableQty} {product.Unit}.");

            // FEFO: chọn lô còn hạn, hết hạn sớm nhất và còn đủ số lượng
            var batch = product.Batches
                .Where(b => b.Status != BatchStatus.Expired
                            && b.ExpiryDate > today
                            && b.RemainingQty >= item.Quantity)
                .OrderBy(b => b.ExpiryDate)
                .FirstOrDefault()
                ?? throw new BadRequestException($"Không có lô hàng nào của \"{product.Name}\" còn đủ {item.Quantity} {product.Unit}.");

            // Giá luôn lấy từ DB, không tin giá client gửi lên
            var unitPrice = product.WholesalePrice;
            totalAmount += unitPrice * item.Quantity;

            // Giữ chỗ tồn kho, trả lại khi đơn bị huỷ
            inventory.ReservedQty += item.Quantity;
            reservedInventories.Add(inventory);

            supplyRequestItems.Add(new SupplyRequestItem
            {
                Id = Guid.NewGuid(),
                ProductId = product.Id,
                SupplierId = product.SupplierId,
                BatchId = batch.Id,
                Quantity = item.Quantity,
                UnitPrice = unitPrice,
                SubTotal = unitPrice * item.Quantity,
            });
        }

        foreach (var inventory in reservedInventories)
            unitOfWork.Repository<Inventory>().Update(inventory);

        var orderOptions = appConfiguration.GetOrderOptions();

        decimal shippingFee = request.FulfillmentType == FulfillmentType.Scheduled
            ? orderOptions.ScheduledShippingFee
            : orderOptions.StandardShippingFee;

        decimal discountAmount = ResolveDiscount(orderOptions, request.VoucherCode, totalAmount);

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
            .Include(r => r.StatusHistories)
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
            .Include(r => r.StatusHistories)
            .FirstOrDefaultAsync(r => r.Id == id && (userId == Guid.Empty || r.DistributionPointId == userId), ct)
            ?? throw new NotFoundException("Supply request not found.");

        return MapOrderResponse(request);
    }

    public async Task CancelOrderAsync(Guid userId, Guid id, string cancelReason, CancellationToken ct = default)
    {
        var request = await unitOfWork.Repository<SupplyRequest>()
            .GetQueryable()
            .Include(r => r.Items)
            .FirstOrDefaultAsync(r => r.Id == id, ct)
            ?? throw new NotFoundException("Supply request not found.");

        if (userId != Guid.Empty && request.DistributionPointId != userId)
            throw new ForbiddenException("You are not authorized to cancel this supply request.");

        if (request.Status != SupplyRequestStatus.Pending)
            throw new BadRequestException("Only pending supply requests can be cancelled.");

        request.Status = SupplyRequestStatus.Cancelled;
        request.CancelReason = cancelReason;

        // Trả lại phần tồn kho đã giữ chỗ lúc tạo đơn
        await ReleaseReservedStockAsync(request.Items, ct);

        unitOfWork.Repository<SupplyRequest>().Update(request);
        await unitOfWork.EnsureSaveAsync(ct);
    }

    public async Task ConfirmReceiptAsync(Guid userId, Guid id, ConfirmReceiptRequest request, CancellationToken ct = default)
    {
        var supplyRequest = await unitOfWork.Repository<SupplyRequest>()
            .GetQueryable()
            .FirstOrDefaultAsync(r => r.Id == id, ct)
            ?? throw new NotFoundException("Supply request not found.");

        if (userId != Guid.Empty && supplyRequest.DistributionPointId != userId)
            throw new ForbiddenException("You are not authorized to confirm receipt for this supply request.");

        supplyRequest.Status = request.IsFullReceived ? SupplyRequestStatus.Completed : SupplyRequestStatus.Received;

        string noteText = request.IsFullReceived
            ? $"Xác nhận đã nhận đủ 100% hàng hóa. Ghi chú: {request.Note}".Trim()
            : $"Xác nhận đã nhận hàng (Báo thiếu/hàng hư hỏng). Ghi chú: {request.Note}".Trim();

        var statusHistory = new SupplyRequestStatusHistory
        {
            Id = Guid.NewGuid(),
            SupplyRequestId = supplyRequest.Id,
            Status = supplyRequest.Status,
            Note = noteText,
            CreatedBy = userId != Guid.Empty ? userId : null,
        };

        unitOfWork.Repository<SupplyRequest>().Update(supplyRequest);
        await unitOfWork.Repository<SupplyRequestStatusHistory>().AddAsync(statusHistory);
        await unitOfWork.EnsureSaveAsync(ct);
    }

    private static decimal ResolveDiscount(OrderOptions options, string? voucherCode, decimal totalAmount)
    {
        if (string.IsNullOrWhiteSpace(voucherCode))
            return 0;

        var voucher = options.Vouchers.FirstOrDefault(v =>
            v.IsActive && string.Equals(v.Code, voucherCode.Trim(), StringComparison.OrdinalIgnoreCase))
            ?? throw new BadRequestException("Mã ưu đãi không hợp lệ hoặc đã hết hạn.");

        var discount = totalAmount * voucher.DiscountPercent / 100m;

        return voucher.MaxDiscountAmount > 0
            ? Math.Min(discount, voucher.MaxDiscountAmount)
            : discount;
    }

    private async Task ReleaseReservedStockAsync(IEnumerable<SupplyRequestItem> items, CancellationToken ct)
    {
        foreach (var item in items)
        {
            var inventory = await unitOfWork.Repository<Inventory>()
                .FindAsync(i => i.ProductId == item.ProductId, ct);

            if (inventory is null)
                continue;

            inventory.ReservedQty = Math.Max(0, inventory.ReservedQty - item.Quantity);
            unitOfWork.Repository<Inventory>().Update(inventory);
        }
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
        }).ToList(),
        StatusHistories = request.StatusHistories.Select(h => new OrderStatusHistoryResponse
        {
            Id = h.Id,
            Status = h.Status,
            Note = h.Note,
            CreatedAt = h.CreatedAt
        }).OrderBy(h => h.CreatedAt).ToList()
    };
}
