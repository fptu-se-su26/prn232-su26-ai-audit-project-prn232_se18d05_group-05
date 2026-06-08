namespace Infrastructure;

public class WalletTransactionConfiguration : BaseEntityConfiguration<WalletTransaction, int>
{
    public override void Configure(EntityTypeBuilder<WalletTransaction> builder)
    {
        base.Configure(builder);

        builder.ToTable("WalletTransactions");

        builder.HasOne(wt => wt.Wallet).WithMany(w => w.Transactions).HasForeignKey(wt => wt.WalletId).OnDelete(DeleteBehavior.Restrict);
        builder.HasOne(wt => wt.RelatedOrder).WithMany().HasForeignKey(wt => wt.RelatedOrderId).IsRequired(false).OnDelete(DeleteBehavior.Restrict);

        builder.Property(wt => wt.Type).HasConversion<string>().HasMaxLength(30).IsRequired();
        builder.Property(wt => wt.Amount).HasPrecision(12, 2);
        builder.Property(wt => wt.BalanceBefore).HasPrecision(12, 2);
        builder.Property(wt => wt.BalanceAfter).HasPrecision(12, 2);
        builder.Property(wt => wt.Description).IsRequired(false).HasMaxLength(500);
    }
}
