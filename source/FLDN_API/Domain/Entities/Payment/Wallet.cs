namespace Domain;

public class Wallet
{
    public int WalletId { get; set; }
    public int UserId { get; set; }
    public decimal Balance { get; set; }
    public int Points { get; set; }
    public DateTimeOffset UpdatedAt { get; set; }

    // Navigation
    public User User { get; set; } = default!;
    public ICollection<WalletTransaction> Transactions { get; set; } = [];
}
