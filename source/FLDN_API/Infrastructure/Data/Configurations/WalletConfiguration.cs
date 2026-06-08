namespace Infrastructure;

public class WalletConfiguration : IEntityTypeConfiguration<Wallet>
{
    public void Configure(EntityTypeBuilder<Wallet> builder)
    {
        builder.ToTable("Wallets");
        builder.HasKey(w => w.WalletId);

        builder.HasIndex(w => w.UserId).IsUnique();

        builder.HasOne(w => w.User).WithOne(u => u.Wallet).HasForeignKey<Wallet>(w => w.UserId).OnDelete(DeleteBehavior.Restrict);
        builder.HasMany(w => w.Transactions).WithOne(wt => wt.Wallet).HasForeignKey(wt => wt.WalletId).OnDelete(DeleteBehavior.Restrict);

        builder.Property(w => w.Balance).HasPrecision(12, 2).HasDefaultValue(0);
        builder.Property(w => w.Points).HasDefaultValue(0);
    }
}
