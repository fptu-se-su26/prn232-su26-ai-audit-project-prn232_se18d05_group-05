using Domain;

namespace Contract;

public sealed class SupplierDetailResponse
{
    public Guid SupplierId { get; set; }
    public string BusinessName { get; set; } = default!;
    public string? TaxCode { get; set; }
    public string? LicenseNumber { get; set; }
    public string? AttpCertificateUrl { get; set; }
    public string? Address { get; set; }
    public SupplierStatus Status { get; set; }
    public string? RejectedReason { get; set; }
    public string? ApprovedByName { get; set; }
    public DateTimeOffset? ApprovedAt { get; set; }
    public decimal ServiceFeeRate { get; set; }
    public decimal DiscountRate { get; set; }
}
