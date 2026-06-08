namespace Domain;

public class VoucherUsage
{
    public Guid VoucherUsageId { get; set; }
    public Guid VoucherId { get; set; }
    public Guid UserId { get; set; }
    public Guid OrderId { get; set; }
    public DateTimeOffset UsedAt { get; set; }

    // Navigation
    public Voucher Voucher { get; set; } = default!;
    public User User { get; set; } = default!;
    public Order Order { get; set; } = default!;
}
