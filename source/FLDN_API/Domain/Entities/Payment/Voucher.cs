namespace Domain;

public class Voucher : EntityBase<int>
{
    public string Code { get; set; } = default!;
    public string VoucherName { get; set; } = default!;
    public DiscountType DiscountType { get; set; }
    public decimal DiscountValue { get; set; }
    public decimal MinOrderValue { get; set; }
    public decimal? MaxDiscount { get; set; }
    public int? UsageLimit { get; set; }
    public int UsedCount { get; set; }
    public DateTimeOffset StartDate { get; set; }
    public DateTimeOffset EndDate { get; set; }
    public bool IsFlashSale { get; set; }
    public bool IsActive { get; set; }
    public int CreatedBy { get; set; }

    // Navigation
    public User CreatedByUser { get; set; } = default!;
    public ICollection<VoucherUsage> VoucherUsages { get; set; } = [];
}
