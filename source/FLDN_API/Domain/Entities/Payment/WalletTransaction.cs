namespace Domain;

public class WalletTransaction : EntityBase<Guid>
{
    public Guid WalletId { get; set; }
    public WalletTransactionType Type { get; set; }
    public decimal Amount { get; set; }
    public decimal BalanceBefore { get; set; }
    public decimal BalanceAfter { get; set; }
    public string? Description { get; set; }
    public Guid? RelatedOrderId { get; set; }

    // Navigation
    public Wallet Wallet { get; set; } = default!;
    public Order? RelatedOrder { get; set; }
}
