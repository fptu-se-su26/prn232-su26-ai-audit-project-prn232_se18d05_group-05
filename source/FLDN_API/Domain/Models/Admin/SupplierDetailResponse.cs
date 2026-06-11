using Domain;

namespace Contract;

public sealed class SupplierDetailResponse
{
    public Guid SupplierId { get; set; }
    public string BusinessName { get; set; } = default!;
    public string? TaxCode { get; set; }
    public string? LicenseNumber { get; set; }
    public string? AttpCertificateUrl { get; set; }
    public SupplierStatus Status { get; set; }
    public decimal ServiceFeeRate { get; set; }
    public decimal DiscountRate { get; set; }
}
