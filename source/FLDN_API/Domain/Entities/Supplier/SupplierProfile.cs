namespace Domain;

public class SupplierProfile : EntityBase<int>, ISoftDeletable
{
    public int UserId { get; set; }
    public string BusinessName { get; set; } = default!;
    public string? TaxCode { get; set; }
    public string? LicenseNumber { get; set; }
    public string? AttpCertificateUrl { get; set; }
    public string? Address { get; set; }
    public int? DistrictId { get; set; }
    public decimal ServiceFeeRate { get; set; }
    public decimal DiscountRate { get; set; }
    public SupplierStatus Status { get; set; }
    public string? RejectedReason { get; set; }
    public int? ApprovedBy { get; set; }
    public DateTimeOffset? ApprovedAt { get; set; }
    public bool IsDeleted { get; set; }
    public DateTimeOffset? DeletedAt { get; set; }

    // Navigation
    public User User { get; set; } = default!;
    public District? District { get; set; }
    public User? ApprovedByUser { get; set; }
    public ICollection<Product> Products { get; set; } = [];
}
