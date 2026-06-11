namespace Contract;

public sealed class VoucherResponse
{
    public Guid VoucherId { get; set; }
    public string Code { get; set; } = default!;
    public string VoucherName { get; set; } = default!;
    public decimal DiscountValue { get; set; }
    public decimal MinOrderValue { get; set; }
    public int? UsageLimit { get; set; }
    public int UsedCount { get; set; }
    public DateTimeOffset StartDate { get; set; }
    public DateTimeOffset EndDate { get; set; }
    public bool IsActive { get; set; }
}
