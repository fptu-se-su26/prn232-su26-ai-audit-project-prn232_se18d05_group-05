namespace Domain;

public class VoucherUsage
{
    public int VoucherUsageId { get; set; }
    public int VoucherId { get; set; }
    public int UserId { get; set; }
    public int OrderId { get; set; }
    public DateTimeOffset UsedAt { get; set; }

    // Navigation
    public Voucher Voucher { get; set; } = default!;
    public User User { get; set; } = default!;
    public Order Order { get; set; } = default!;
}
