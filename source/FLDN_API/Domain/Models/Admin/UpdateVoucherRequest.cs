namespace Contract;

public sealed class UpdateVoucherRequest
{
    public string VoucherName { get; set; } = default!;
    public decimal DiscountValue { get; set; }
    public decimal MinOrderValue { get; set; }
    public int? UsageLimit { get; set; }
    public DateTimeOffset StartDate { get; set; }
    public DateTimeOffset EndDate { get; set; }
}
