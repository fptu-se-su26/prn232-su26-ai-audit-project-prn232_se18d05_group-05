namespace Application;

[RegisterService(typeof(ISupplierService))]
public sealed class SupplierService(
    IUnitOfWork unitOfWork
) : ISupplierService
{
    private const int ExpiryWarningDays = 7;
    private const string BatchExpiryRelatedType = "BatchExpiry";

    public async Task<PagedResult<SupplierProductResponse>> GetProductsAsync(Guid userId, SupplierProductListRequest request, CancellationToken ct = default)
    {
        var supplier = await GetApprovedSupplierAsync(userId, ct);
        await SyncBatchExpiryAsync(ct);

        var query = unitOfWork.Repository<Product>().GetQueryable()
            .Where(p => p.SupplierId == supplier.Id && !p.IsDeleted)
            .AsNoTracking();

        if (!request.IncludeInactive)
            query = query.Where(p => p.IsActive);

        if (request.CategoryId.HasValue)
            query = query.Where(p => p.CategoryId == request.CategoryId.Value);

        if (!string.IsNullOrWhiteSpace(request.Search))
        {
            var search = request.Search.Trim();
            query = query.Where(p => p.Name.Contains(search));
        }

        var totalCount = await query.CountAsync(ct);

        var productEntities = await query
            .Include(p => p.Category)
            .Include(p => p.Inventory)
            .OrderByDescending(p => p.CreatedAt)
            .Skip((request.Page - 1) * request.PageSize)
            .Take(request.PageSize)
            .ToListAsync(ct);
        var products = productEntities.Select(MapProduct).ToList();

        return new PagedResult<SupplierProductResponse>
        {
            Items = products,
            TotalCount = totalCount,
            Page = request.Page,
            PageSize = request.PageSize
        };
    }

    public async Task<SupplierProductResponse> GetProductByIdAsync(Guid userId, Guid id, CancellationToken ct = default)
    {
        var supplier = await GetApprovedSupplierAsync(userId, ct);
        await SyncBatchExpiryAsync(ct);

        var product = await unitOfWork.Repository<Product>().GetQueryable()
            .Include(p => p.Category)
            .Include(p => p.Inventory)
            .FirstOrDefaultAsync(p => p.Id == id && p.SupplierId == supplier.Id && !p.IsDeleted, ct)
            ?? throw new NotFoundException("Product not found.");

        return MapProduct(product);
    }

    public async Task<SupplierProductResponse> CreateProductAsync(Guid userId, CreateSupplierProductRequest request, CancellationToken ct = default)
    {
        var supplier = await GetApprovedSupplierAsync(userId, ct);
        ValidateProductRequest(request.Name, request.Unit, request.UnitCost);

        if (!await unitOfWork.Categories.AnyAsync(c => c.Id == request.CategoryId && !c.IsDeleted && c.IsActive, ct))
            throw new NotFoundException("Category not found.");

        if (await unitOfWork.Repository<Product>().AnyAsync(p =>
                p.SupplierId == supplier.Id &&
                p.Name == request.Name &&
                !p.IsDeleted, ct))
            throw new ConflictException("Product name already exists.");

        var product = new Product
        {
            Id = Guid.NewGuid(),
            SupplierId = supplier.Id,
            CategoryId = request.CategoryId,
            Name = request.Name.Trim(),
            Description = request.Description?.Trim(),
            WholesalePrice = request.UnitCost,
            Unit = request.Unit.Trim(),
            PackagingStandard = request.PackagingStandard?.Trim(),
            IsActive = true
        };

        await unitOfWork.Repository<Product>().AddAsync(product);
        await unitOfWork.Repository<Inventory>().AddAsync(new Inventory
        {
            Id = Guid.NewGuid(),
            ProductId = product.Id,
            Quantity = 0,
            ReservedQty = 0
        });
        await unitOfWork.Repository<PriceHistory>().AddAsync(new PriceHistory
        {
            Id = Guid.NewGuid(),
            ProductId = product.Id,
            WholesalePrice = product.WholesalePrice,
            EffectiveDate = DateOnly.FromDateTime(DateTime.UtcNow)
        });
        await unitOfWork.EnsureSaveAsync(ct);

        return await GetProductByIdAsync(userId, product.Id, ct);
    }

    public async Task UpdateProductAsync(Guid userId, Guid id, UpdateSupplierProductRequest request, CancellationToken ct = default)
    {
        var supplier = await GetApprovedSupplierAsync(userId, ct);
        ValidateProductRequest(request.Name, request.Unit, request.UnitCost);

        var product = await unitOfWork.Repository<Product>().FindAsync(
            p => p.Id == id && p.SupplierId == supplier.Id && !p.IsDeleted, ct)
            ?? throw new NotFoundException("Product not found.");

        if (!await unitOfWork.Categories.AnyAsync(c => c.Id == request.CategoryId && !c.IsDeleted && c.IsActive, ct))
            throw new NotFoundException("Category not found.");

        if (await unitOfWork.Repository<Product>().AnyAsync(p =>
                p.SupplierId == supplier.Id &&
                p.Id != id &&
                p.Name == request.Name &&
                !p.IsDeleted, ct))
            throw new ConflictException("Product name already exists.");

        var priceChanged = product.WholesalePrice != request.UnitCost;

        product.CategoryId = request.CategoryId;
        product.Name = request.Name.Trim();
        product.Description = request.Description?.Trim();
        product.WholesalePrice = request.UnitCost;
        product.Unit = request.Unit.Trim();
        product.PackagingStandard = request.PackagingStandard?.Trim();
        product.IsActive = request.IsActive;

        unitOfWork.Repository<Product>().Update(product);

        if (priceChanged)
        {
            await unitOfWork.Repository<PriceHistory>().AddAsync(new PriceHistory
            {
                Id = Guid.NewGuid(),
                ProductId = product.Id,
                WholesalePrice = product.WholesalePrice,
                EffectiveDate = DateOnly.FromDateTime(DateTime.UtcNow)
            });
        }

        await unitOfWork.EnsureSaveAsync(ct);
    }

    public async Task DeleteProductAsync(Guid userId, Guid id, CancellationToken ct = default)
    {
        var supplier = await GetApprovedSupplierAsync(userId, ct);
        var product = await unitOfWork.Repository<Product>().FindAsync(
            p => p.Id == id && p.SupplierId == supplier.Id && !p.IsDeleted, ct)
            ?? throw new NotFoundException("Product not found.");

        product.IsDeleted = true;
        product.DeletedAt = DateTimeOffset.UtcNow;
        product.IsActive = false;
        unitOfWork.Repository<Product>().Update(product);
        await unitOfWork.EnsureSaveAsync(ct);
    }

    public async Task<List<SupplierInventoryResponse>> GetInventoryAsync(Guid userId, CancellationToken ct = default)
    {
        var supplier = await GetApprovedSupplierAsync(userId, ct);
        await SyncBatchExpiryAsync(ct);

        return await unitOfWork.Repository<Inventory>().GetQueryable()
            .Include(i => i.Product)
            .Where(i => i.Product.SupplierId == supplier.Id && !i.Product.IsDeleted && i.Product.IsActive)
            .AsNoTracking()
            .OrderBy(i => i.Product.Name)
            .Select(i => new SupplierInventoryResponse
            {
                ProductId = i.ProductId,
                ProductName = i.Product.Name,
                Quantity = i.Quantity,
                ReservedQty = i.ReservedQty,
                AvailableQuantity = i.Quantity - i.ReservedQty
            })
            .ToListAsync(ct);
    }

    public async Task UpdateInventoryAsync(Guid userId, Guid productId, UpdateSupplierInventoryRequest request, CancellationToken ct = default)
    {
        var supplier = await GetApprovedSupplierAsync(userId, ct);

        if (request.Quantity < 0 || request.ReservedQty < 0 || request.ReservedQty > request.Quantity)
            throw new BadRequestException("Invalid inventory quantity.");

        var productExists = await unitOfWork.Repository<Product>().AnyAsync(
            p => p.Id == productId && p.SupplierId == supplier.Id && !p.IsDeleted, ct);

        if (!productExists)
            throw new NotFoundException("Product not found.");

        var inventory = await unitOfWork.Repository<Inventory>().FindAsync(i => i.ProductId == productId, ct);
        if (inventory is null)
        {
            inventory = new Inventory
            {
                Id = Guid.NewGuid(),
                ProductId = productId
            };
            await unitOfWork.Repository<Inventory>().AddAsync(inventory);
        }

        inventory.Quantity = request.Quantity;
        inventory.ReservedQty = request.ReservedQty;
        unitOfWork.Repository<Inventory>().Update(inventory);
        await unitOfWork.EnsureSaveAsync(ct);
    }

    public async Task<PagedResult<SupplierBatchResponse>> GetBatchesAsync(Guid userId, SupplierBatchListRequest request, CancellationToken ct = default)
    {
        var supplier = await GetApprovedSupplierAsync(userId, ct);
        await SyncBatchExpiryAsync(ct);

        var query = unitOfWork.Repository<Batch>().GetQueryable()
            .Include(b => b.Product)
            .Include(b => b.QRCode)
            .Where(b => b.Product.SupplierId == supplier.Id && !b.Product.IsDeleted)
            .AsNoTracking();

        if (!request.IncludeExpired)
            query = query.Where(b => b.Status != BatchStatus.Expired && b.ExpiryDate > DateOnly.FromDateTime(DateTime.UtcNow));

        if (request.ProductId.HasValue)
            query = query.Where(b => b.ProductId == request.ProductId.Value);

        if (request.Status.HasValue)
            query = query.Where(b => b.Status == request.Status.Value);

        var totalCount = await query.CountAsync(ct);

        var batchEntities = await query
            .OrderBy(b => b.ExpiryDate)
            .Skip((request.Page - 1) * request.PageSize)
            .Take(request.PageSize)
            .ToListAsync(ct);
        var batches = batchEntities.Select(MapBatch).ToList();

        return new PagedResult<SupplierBatchResponse>
        {
            Items = batches,
            TotalCount = totalCount,
            Page = request.Page,
            PageSize = request.PageSize
        };
    }

    public async Task<SupplierBatchResponse> GetBatchByIdAsync(Guid userId, Guid id, CancellationToken ct = default)
    {
        var supplier = await GetApprovedSupplierAsync(userId, ct);
        await SyncBatchExpiryAsync(ct);

        var batch = await unitOfWork.Repository<Batch>().GetQueryable()
            .Include(b => b.Product)
            .Include(b => b.QRCode)
            .FirstOrDefaultAsync(b => b.Id == id && b.Product.SupplierId == supplier.Id && !b.Product.IsDeleted, ct)
            ?? throw new NotFoundException("Batch not found.");

        return MapBatch(batch);
    }

    public async Task<SupplierBatchResponse> CreateBatchAsync(Guid userId, CreateSupplierBatchRequest request, CancellationToken ct = default)
    {
        var supplier = await GetApprovedSupplierAsync(userId, ct);

        if (request.Quantity <= 0)
            throw new BadRequestException("Batch quantity must be greater than 0.");

        var product = await unitOfWork.Repository<Product>().FindAsync(
            p => p.Id == request.ProductId && p.SupplierId == supplier.Id && !p.IsDeleted && p.IsActive, ct)
            ?? throw new NotFoundException("Product not found.");

        if (await unitOfWork.Repository<Batch>().AnyAsync(b => b.BatchCode == request.BatchCode, ct))
            throw new ConflictException("Batch code already exists.");

        var today = DateOnly.FromDateTime(DateTime.UtcNow);
        var status = request.ExpiryDate <= today
            ? BatchStatus.Expired
            : request.ExpiryDate <= today.AddDays(ExpiryWarningDays)
                ? BatchStatus.Warning
                : BatchStatus.Active;

        var batch = new Batch
        {
            Id = Guid.NewGuid(),
            ProductId = product.Id,
            BatchCode = request.BatchCode.Trim(),
            Quantity = request.Quantity,
            RemainingQty = status == BatchStatus.Expired ? 0 : request.Quantity,
            HarvestDate = request.HarvestDate,
            ManufacturingDate = request.ManufacturingDate,
            PackagingDate = request.PackagingDate,
            ExpiryDate = request.ExpiryDate,
            GrowingRegion = request.GrowingRegion?.Trim(),
            CertificateType = request.CertificateType,
            CertificateUrl = request.CertificateUrl?.Trim(),
            Status = status
        };

        await unitOfWork.Repository<Batch>().AddAsync(batch);
        await unitOfWork.Repository<QRCode>().AddAsync(CreateQrCode(batch));

        var inventory = await unitOfWork.Repository<Inventory>().FindAsync(i => i.ProductId == product.Id, ct);
        if (inventory is null)
        {
            inventory = new Inventory { Id = Guid.NewGuid(), ProductId = product.Id };
            await unitOfWork.Repository<Inventory>().AddAsync(inventory);
        }

        inventory.Quantity += batch.RemainingQty;
        unitOfWork.Repository<Inventory>().Update(inventory);

        await unitOfWork.EnsureSaveAsync(ct);

        if (status != BatchStatus.Active)
        {
            await SyncBatchExpiryAsync(ct);
        }

        return await GetBatchByIdAsync(userId, batch.Id, ct);
    }

    public async Task<List<SupplierSupplyRequestResponse>> GetSupplyRequestsAsync(Guid userId, CancellationToken ct = default)
    {
        var supplier = await GetApprovedSupplierAsync(userId, ct);

        var supplyRequests = await unitOfWork.Repository<SupplyRequest>().GetQueryable()
            .Include(sr => sr.DistributionPoint)
            .Include(sr => sr.SupplierConfirmations)
            .Include(sr => sr.Items).ThenInclude(i => i.Product)
            .Include(sr => sr.Items).ThenInclude(i => i.Batch)
            .Where(sr => sr.Items.Any(i => i.SupplierId == supplier.Id))
            .AsNoTracking()
            .OrderByDescending(sr => sr.CreatedAt)
            .ToListAsync(ct);

        return supplyRequests.Select(sr => MapSupplyRequest(sr, supplier.Id)).ToList();
    }

    public async Task ConfirmSupplyRequestAsync(Guid userId, Guid id, CancellationToken ct = default)
    {
        var supplier = await GetApprovedSupplierAsync(userId, ct);
        var supplyRequest = await GetSupplyRequestForSupplierAsync(id, supplier.Id, ct);

        var confirmation = supplyRequest.SupplierConfirmations.FirstOrDefault(sc => sc.SupplierId == supplier.Id);
        if (confirmation is null)
        {
            confirmation = new SupplierConfirmation
            {
                Id = Guid.NewGuid(),
                SupplyRequestId = id,
                SupplierId = supplier.Id
            };
            await unitOfWork.Repository<SupplierConfirmation>().AddAsync(confirmation);
        }

        confirmation.Status = ConfirmationStatus.Accepted;
        confirmation.Reason = null;
        confirmation.ConfirmedAt = DateTimeOffset.UtcNow;
        unitOfWork.Repository<SupplierConfirmation>().Update(confirmation);

        if (supplyRequest.Status == SupplyRequestStatus.Pending)
            supplyRequest.Status = SupplyRequestStatus.Approved;

        unitOfWork.Repository<SupplyRequest>().Update(supplyRequest);
        await unitOfWork.EnsureSaveAsync(ct);
    }

    public async Task RejectSupplyRequestAsync(Guid userId, Guid id, RejectSupplierSupplyRequestRequest request, CancellationToken ct = default)
    {
        var supplier = await GetApprovedSupplierAsync(userId, ct);
        var supplyRequest = await GetSupplyRequestForSupplierAsync(id, supplier.Id, ct);

        if (string.IsNullOrWhiteSpace(request.Reason))
            throw new BadRequestException("Reject reason is required.");

        var confirmation = supplyRequest.SupplierConfirmations.FirstOrDefault(sc => sc.SupplierId == supplier.Id);
        if (confirmation is null)
        {
            confirmation = new SupplierConfirmation
            {
                Id = Guid.NewGuid(),
                SupplyRequestId = id,
                SupplierId = supplier.Id
            };
            await unitOfWork.Repository<SupplierConfirmation>().AddAsync(confirmation);
        }

        confirmation.Status = ConfirmationStatus.Rejected;
        confirmation.Reason = request.Reason.Trim();
        confirmation.ConfirmedAt = DateTimeOffset.UtcNow;
        supplyRequest.Status = SupplyRequestStatus.Rejected;

        unitOfWork.Repository<SupplierConfirmation>().Update(confirmation);
        unitOfWork.Repository<SupplyRequest>().Update(supplyRequest);
        await unitOfWork.EnsureSaveAsync(ct);
    }

    public async Task<BatchQrResponse> GetBatchQrAsync(Guid? userId, Guid id, CancellationToken ct = default)
    {
        await SyncBatchExpiryAsync(ct);

        var query = unitOfWork.Repository<Batch>().GetQueryable()
            .Include(b => b.Product)
            .Include(b => b.QRCode)
            .AsQueryable();

        if (userId.HasValue)
        {
            var supplier = await GetApprovedSupplierAsync(userId.Value, ct);
            query = query.Where(b => b.Product.SupplierId == supplier.Id);
        }

        var batch = await query.FirstOrDefaultAsync(b => b.Id == id, ct)
            ?? throw new NotFoundException("Batch not found.");

        if (batch.QRCode is null)
        {
            batch.QRCode = CreateQrCode(batch);
            await unitOfWork.Repository<QRCode>().AddAsync(batch.QRCode);
            await unitOfWork.EnsureSaveAsync(ct);
        }

        return MapQr(batch.QRCode);
    }

    public async Task<TraceabilityResponse> GetTraceabilityAsync(string qrCode, CancellationToken ct = default)
    {
        if (string.IsNullOrWhiteSpace(qrCode))
            throw new BadRequestException("QR code is required.");

        await SyncBatchExpiryAsync(ct);

        var qr = await unitOfWork.Repository<QRCode>().GetQueryable()
            .Include(q => q.Batch).ThenInclude(b => b.Product).ThenInclude(p => p.Supplier)
            .FirstOrDefaultAsync(q => q.QRCodeData == qrCode || q.Batch.BatchCode == qrCode, ct)
            ?? throw new NotFoundException("QR code not found.");

        qr.ScanCount++;
        unitOfWork.Repository<QRCode>().Update(qr);
        await unitOfWork.EnsureSaveAsync(ct);

        return new TraceabilityResponse
        {
            BatchId = qr.Batch.Id,
            BatchCode = qr.Batch.BatchCode,
            Status = qr.Batch.Status,
            HarvestDate = qr.Batch.HarvestDate,
            ManufacturingDate = qr.Batch.ManufacturingDate,
            PackagingDate = qr.Batch.PackagingDate,
            ExpiryDate = qr.Batch.ExpiryDate,
            GrowingRegion = qr.Batch.GrowingRegion,
            CertificateType = qr.Batch.CertificateType,
            CertificateUrl = qr.Batch.CertificateUrl,
            ProductName = qr.Batch.Product.Name,
            Unit = qr.Batch.Product.Unit,
            PackagingStandard = qr.Batch.Product.PackagingStandard,
            SupplierName = qr.Batch.Product.Supplier.BusinessName,
            SupplierAddress = qr.Batch.Product.Supplier.Address
        };
    }

    public async Task<List<ExpiryWarningResponse>> GetExpiryWarningsAsync(Guid userId, CancellationToken ct = default)
    {
        await SyncBatchExpiryAsync(ct);

        return await unitOfWork.Repository<Notification>().GetQueryable()
            .Where(n => n.UserId == userId &&
                        n.Type == NotificationType.ExpiryWarning &&
                        n.RelatedType == BatchExpiryRelatedType)
            .AsNoTracking()
            .OrderByDescending(n => n.CreatedAt)
            .Select(n => new ExpiryWarningResponse
            {
                NotificationId = n.Id,
                BatchId = n.RelatedId ?? Guid.Empty,
                Title = n.Title,
                Body = n.Body,
                IsRead = n.IsRead,
                CreatedAt = n.CreatedAt
            })
            .ToListAsync(ct);
    }

    private async Task<SupplierProfile> GetApprovedSupplierAsync(Guid userId, CancellationToken ct)
    {
        var supplier = await unitOfWork.SupplierProfiles.FindAsync(s =>
            s.UserId == userId && !s.IsDeleted, ct)
            ?? throw new NotFoundException("Supplier profile not found.");

        if (supplier.Status != SupplierStatus.Approved)
            throw new ForbiddenException("Supplier profile has not been approved.");

        return supplier;
    }

    private async Task<SupplyRequest> GetSupplyRequestForSupplierAsync(Guid id, Guid supplierId, CancellationToken ct)
    {
        return await unitOfWork.Repository<SupplyRequest>().GetQueryable()
            .Include(sr => sr.SupplierConfirmations)
            .Include(sr => sr.Items)
            .FirstOrDefaultAsync(sr => sr.Id == id && sr.Items.Any(i => i.SupplierId == supplierId), ct)
            ?? throw new NotFoundException("Supply request not found.");
    }

    private async Task SyncBatchExpiryAsync(CancellationToken ct)
    {
        var today = DateOnly.FromDateTime(DateTime.UtcNow);
        var warningDate = today.AddDays(ExpiryWarningDays);

        var batches = await unitOfWork.Repository<Batch>().GetQueryable()
            .Include(b => b.Product).ThenInclude(p => p.Supplier)
            .Where(b => b.Status != BatchStatus.Expired || b.ExpiryDate <= warningDate)
            .ToListAsync(ct);

        var changed = false;
        foreach (var batch in batches)
        {
            var targetStatus = batch.ExpiryDate <= today
                ? BatchStatus.Expired
                : batch.ExpiryDate <= warningDate
                    ? BatchStatus.Warning
                    : BatchStatus.Active;

            if (targetStatus == BatchStatus.Active)
                continue;

            if (batch.Status != targetStatus)
            {
                if (targetStatus == BatchStatus.Expired && batch.RemainingQty > 0)
                {
                    var inventory = await unitOfWork.Repository<Inventory>().FindAsync(i => i.ProductId == batch.ProductId, ct);
                    if (inventory is not null)
                    {
                        inventory.Quantity = Math.Max(0, inventory.Quantity - batch.RemainingQty);
                        unitOfWork.Repository<Inventory>().Update(inventory);
                    }

                    batch.RemainingQty = 0;
                }

                batch.Status = targetStatus;
                unitOfWork.Repository<Batch>().Update(batch);
                changed = true;
            }

            changed |= await EnsureExpiryNotificationsAsync(batch, targetStatus, ct);
        }

        if (changed)
            await unitOfWork.EnsureSaveAsync(ct);
    }

    private async Task<bool> EnsureExpiryNotificationsAsync(Batch batch, BatchStatus status, CancellationToken ct)
    {
        var users = new List<Guid> { batch.Product.Supplier.UserId };
        var adminIds = await unitOfWork.Users.GetQueryable()
            .Where(u => u.UserRoles.Any(ur => ur.Role.RoleName == nameof(RoleType.Admin)))
            .Select(u => u.Id)
            .ToListAsync(ct);
        users.AddRange(adminIds);

        var changed = false;
        foreach (var userId in users.Distinct())
        {
            var exists = await unitOfWork.Repository<Notification>().AnyAsync(n =>
                n.UserId == userId &&
                n.Type == NotificationType.ExpiryWarning &&
                n.RelatedType == BatchExpiryRelatedType &&
                n.RelatedId == batch.Id &&
                n.Title.Contains(status.ToString()), ct);

            if (exists)
                continue;

            var title = status == BatchStatus.Expired
                ? $"Batch Expired: {batch.BatchCode}"
                : $"Batch Expiry Warning: {batch.BatchCode}";
            var body = status == BatchStatus.Expired
                ? $"Batch {batch.BatchCode} for product {batch.Product.Name} expired on {batch.ExpiryDate:yyyy-MM-dd} and is hidden from available lists."
                : $"Batch {batch.BatchCode} for product {batch.Product.Name} will expire on {batch.ExpiryDate:yyyy-MM-dd}.";

            await unitOfWork.Repository<Notification>().AddAsync(new Notification
            {
                Id = Guid.NewGuid(),
                UserId = userId,
                Title = title,
                Body = body,
                Type = NotificationType.ExpiryWarning,
                IsRead = false,
                RelatedId = batch.Id,
                RelatedType = BatchExpiryRelatedType
            });
            changed = true;
        }

        return changed;
    }

    private static void ValidateProductRequest(string name, string unit, decimal unitCost)
    {
        if (string.IsNullOrWhiteSpace(name))
            throw new BadRequestException("Product name is required.");

        if (string.IsNullOrWhiteSpace(unit))
            throw new BadRequestException("Product unit is required.");

        if (unitCost <= 0)
            throw new BadRequestException("Unit cost must be greater than 0.");
    }

    private static QRCode CreateQrCode(Batch batch)
    {
        var code = batch.BatchCode;
        return new QRCode
        {
            Id = Guid.NewGuid(),
            BatchId = batch.Id,
            QRCodeData = code,
            QRCodeUrl = $"{AppConstants.BaseUrl}/api/traceability/{Uri.EscapeDataString(code)}",
            ScanCount = 0
        };
    }

    private static SupplierProductResponse MapProduct(Product product) => new()
    {
        ProductId = product.Id,
        CategoryId = product.CategoryId,
        CategoryName = product.Category?.Name ?? string.Empty,
        Name = product.Name,
        Description = product.Description,
        UnitCost = product.WholesalePrice,
        Unit = product.Unit,
        PackagingStandard = product.PackagingStandard,
        IsActive = product.IsActive,
        AvailableQuantity = product.Inventory is null ? 0 : product.Inventory.Quantity - product.Inventory.ReservedQty,
        CreatedAt = product.CreatedAt
    };

    private static SupplierBatchResponse MapBatch(Batch batch) => new()
    {
        BatchId = batch.Id,
        ProductId = batch.ProductId,
        ProductName = batch.Product?.Name ?? string.Empty,
        BatchCode = batch.BatchCode,
        Quantity = batch.Quantity,
        RemainingQty = batch.RemainingQty,
        HarvestDate = batch.HarvestDate,
        ManufacturingDate = batch.ManufacturingDate,
        PackagingDate = batch.PackagingDate,
        ExpiryDate = batch.ExpiryDate,
        GrowingRegion = batch.GrowingRegion,
        CertificateType = batch.CertificateType,
        CertificateUrl = batch.CertificateUrl,
        Status = batch.Status,
        Qr = batch.QRCode is null ? null : MapQr(batch.QRCode)
    };

    private static BatchQrResponse MapQr(QRCode qrCode) => new()
    {
        BatchId = qrCode.BatchId,
        QrCodeData = qrCode.QRCodeData,
        QrCodeUrl = qrCode.QRCodeUrl,
        ScanCount = qrCode.ScanCount
    };

    private static SupplierSupplyRequestResponse MapSupplyRequest(SupplyRequest supplyRequest, Guid supplierId)
    {
        var items = supplyRequest.Items.Where(i => i.SupplierId == supplierId).ToList();
        var confirmationStatus = supplyRequest.SupplierConfirmations
            .FirstOrDefault(sc => sc.SupplierId == supplierId)?.Status ?? ConfirmationStatus.Pending;

        return new SupplierSupplyRequestResponse
        {
            SupplyRequestId = supplyRequest.Id,
            DistributionPointName = supplyRequest.DistributionPoint.FullName,
            Status = supplyRequest.Status,
            ConfirmationStatus = confirmationStatus,
            RequestedDeliveryDate = supplyRequest.RequestedDeliveryDate,
            SupplierSubTotal = items.Sum(i => i.SubTotal),
            Note = supplyRequest.Note,
            Items = items.Select(i => new SupplierSupplyRequestItemResponse
            {
                ProductId = i.ProductId,
                ProductName = i.Product.Name,
                BatchId = i.BatchId,
                BatchCode = i.Batch.BatchCode,
                Quantity = i.Quantity,
                UnitPrice = i.UnitPrice,
                SubTotal = i.SubTotal
            }).ToList()
        };
    }
}
