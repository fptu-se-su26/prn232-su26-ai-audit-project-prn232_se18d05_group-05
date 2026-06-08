namespace Domain;

public class WalletTransaction : EntityBase<int>
{
    public int WalletId { get; set; }
    public WalletTransactionType Type { get; set; }
    public decimal Amount { get; set; }
    public decimal BalanceBefore { get; set; }
    public decimal BalanceAfter { get; set; }
    public string? Description { get; set; }
    public int? RelatedOrderId { get; set; }

    // Navigation
    public Wallet Wallet { get; set; } = default!;
    public Order? RelatedOrder { get; set; }
}
