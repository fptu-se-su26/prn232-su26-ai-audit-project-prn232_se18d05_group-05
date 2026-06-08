namespace Infrastructure;

public class PaymentConfiguration : BaseEntityConfiguration<Payment, int>
{
    public override void Configure(EntityTypeBuilder<Payment> builder)
    {
        base.Configure(builder);

        builder.ToTable("Payments");

        builder.HasIndex(p => p.OrderId).IsUnique();

        builder.HasOne(p => p.Order).WithOne(o => o.Payment).HasForeignKey<Payment>(p => p.OrderId).OnDelete(DeleteBehavior.Restrict);

        builder.Property(p => p.Method).HasConversion<string>().HasMaxLength(20).IsRequired();
        builder.Property(p => p.Amount).HasPrecision(12, 2);
        builder.Property(p => p.Status).HasConversion<string>().HasMaxLength(20).IsRequired();
        builder.Property(p => p.TransactionCode).IsRequired(false).HasMaxLength(255);
        builder.Property(p => p.GatewayResponse).IsRequired(false).HasMaxLength(1000);
        builder.Property(p => p.RefundReason).IsRequired(false).HasMaxLength(500);
    }
}
