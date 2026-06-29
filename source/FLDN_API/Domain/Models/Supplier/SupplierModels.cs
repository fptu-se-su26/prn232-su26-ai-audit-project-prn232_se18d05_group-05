using Domain;

namespace Contract;

public sealed class SupplierProductListRequest : PagedRequest
{
    public string? Search { get; set; }
    public Guid? CategoryId { get; set; }
    public bool IncludeInactive { get; set; }
}

public sealed class CreateSupplierProductRequest
{
    public Guid CategoryId { get; set; }
    public string Name { get; set; } = default!;
    public string? Description { get; set; }
    public decimal UnitCost { get; set; }
    public string Unit { get; set; } = default!;
    public string? PackagingStandard { get; set; }
}

public sealed class UpdateSupplierProductRequest
{
    public Guid CategoryId { get; set; }
    public string Name { get; set; } = default!;
    public string? Description { get; set; }
    public decimal UnitCost { get; set; }
    public string Unit { get; set; } = default!;
    public string? PackagingStandard { get; set; }
    public bool IsActive { get; set; } = true;
}

public sealed class SupplierProductResponse
{
    public Guid ProductId { get; set; }
    public Guid CategoryId { get; set; }
    public string CategoryName { get; set; } = default!;
    public string Name { get; set; } = default!;
    public string? Description { get; set; }
    public decimal UnitCost { get; set; }
    public string Unit { get; set; } = default!;
    public string? PackagingStandard { get; set; }
    public bool IsActive { get; set; }
    public decimal AvailableQuantity { get; set; }
    public DateTimeOffset CreatedAt { get; set; }
}

public sealed class UpdateSupplierInventoryRequest
{
    public decimal Quantity { get; set; }
    public decimal ReservedQty { get; set; }
}

public sealed class SupplierInventoryResponse
{
    public Guid ProductId { get; set; }
    public string ProductName { get; set; } = default!;
    public decimal Quantity { get; set; }
    public decimal ReservedQty { get; set; }
    public decimal AvailableQuantity { get; set; }
}

public sealed class SupplierBatchListRequest : PagedRequest
{
    public Guid? ProductId { get; set; }
    public BatchStatus? Status { get; set; }
    public bool IncludeExpired { get; set; }
}

public sealed class CreateSupplierBatchRequest
{
    public Guid ProductId { get; set; }
    public string BatchCode { get; set; } = default!;
    public decimal Quantity { get; set; }
    public DateOnly? HarvestDate { get; set; }
    public DateOnly? ManufacturingDate { get; set; }
    public DateOnly? PackagingDate { get; set; }
    public DateOnly ExpiryDate { get; set; }
    public string? GrowingRegion { get; set; }
    public CertificateType? CertificateType { get; set; }
    public string? CertificateUrl { get; set; }
}

public sealed class SupplierBatchResponse
{
    public Guid BatchId { get; set; }
    public Guid ProductId { get; set; }
    public string ProductName { get; set; } = default!;
    public string BatchCode { get; set; } = default!;
    public decimal Quantity { get; set; }
    public decimal RemainingQty { get; set; }
    public DateOnly? HarvestDate { get; set; }
    public DateOnly? ManufacturingDate { get; set; }
    public DateOnly? PackagingDate { get; set; }
    public DateOnly ExpiryDate { get; set; }
    public string? GrowingRegion { get; set; }
    public CertificateType? CertificateType { get; set; }
    public string? CertificateUrl { get; set; }
    public BatchStatus Status { get; set; }
    public BatchQrResponse? Qr { get; set; }
}

public sealed class SupplierSupplyRequestResponse
{
    public Guid SupplyRequestId { get; set; }
    public string DistributionPointName { get; set; } = default!;
    public SupplyRequestStatus Status { get; set; }
    public ConfirmationStatus ConfirmationStatus { get; set; }
    public DateTimeOffset? RequestedDeliveryDate { get; set; }
    public decimal SupplierSubTotal { get; set; }
    public string? Note { get; set; }
    public List<SupplierSupplyRequestItemResponse> Items { get; set; } = [];
}

public sealed class SupplierSupplyRequestItemResponse
{
    public Guid ProductId { get; set; }
    public string ProductName { get; set; } = default!;
    public Guid BatchId { get; set; }
    public string BatchCode { get; set; } = default!;
    public decimal Quantity { get; set; }
    public decimal UnitPrice { get; set; }
    public decimal SubTotal { get; set; }
}

public sealed class RejectSupplierSupplyRequestRequest
{
    public string Reason { get; set; } = default!;
}

public sealed class BatchQrResponse
{
    public Guid BatchId { get; set; }
    public string QrCodeData { get; set; } = default!;
    public string QrCodeUrl { get; set; } = default!;
    public int ScanCount { get; set; }
}

public sealed class TraceabilityResponse
{
    public Guid BatchId { get; set; }
    public string BatchCode { get; set; } = default!;
    public BatchStatus Status { get; set; }
    public DateOnly? HarvestDate { get; set; }
    public DateOnly? ManufacturingDate { get; set; }
    public DateOnly? PackagingDate { get; set; }
    public DateOnly ExpiryDate { get; set; }
    public string? GrowingRegion { get; set; }
    public CertificateType? CertificateType { get; set; }
    public string? CertificateUrl { get; set; }
    public string ProductName { get; set; } = default!;
    public string Unit { get; set; } = default!;
    public string? PackagingStandard { get; set; }
    public string SupplierName { get; set; } = default!;
    public string? SupplierAddress { get; set; }
}

public sealed class ExpiryWarningResponse
{
    public Guid NotificationId { get; set; }
    public Guid BatchId { get; set; }
    public string Title { get; set; } = default!;
    public string Body { get; set; } = default!;
    public bool IsRead { get; set; }
    public DateTimeOffset CreatedAt { get; set; }
}
