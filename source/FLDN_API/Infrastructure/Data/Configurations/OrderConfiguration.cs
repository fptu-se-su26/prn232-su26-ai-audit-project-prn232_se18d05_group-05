namespace Infrastructure;

public class OrderConfiguration : BaseEntityConfiguration<Order, int>
{
    public override void Configure(EntityTypeBuilder<Order> builder)
    {
        base.Configure(builder);

        builder.ToTable("Orders");

        builder.HasOne(o => o.Customer).WithMany(u => u.Orders).HasForeignKey(o => o.CustomerId).OnDelete(DeleteBehavior.Restrict);
        builder.HasOne(o => o.Address).WithMany().HasForeignKey(o => o.AddressId).OnDelete(DeleteBehavior.Restrict);
        builder.HasOne(o => o.Voucher).WithMany().HasForeignKey(o => o.VoucherId).IsRequired(false).OnDelete(DeleteBehavior.Restrict);
        builder.HasMany(o => o.OrderItems).WithOne(oi => oi.Order).HasForeignKey(oi => oi.OrderId).OnDelete(DeleteBehavior.Restrict);
        builder.HasMany(o => o.StatusHistories).WithOne(sh => sh.Order).HasForeignKey(sh => sh.OrderId).OnDelete(DeleteBehavior.Restrict);
        builder.HasMany(o => o.SupplierConfirmations).WithOne(sc => sc.Order).HasForeignKey(sc => sc.OrderId).OnDelete(DeleteBehavior.Restrict);
        builder.HasOne(o => o.Payment).WithOne(p => p.Order).HasForeignKey<Payment>(p => p.OrderId).OnDelete(DeleteBehavior.Restrict);

        builder.Property(o => o.TotalAmount).HasPrecision(12, 2);
        builder.Property(o => o.DiscountAmount).HasPrecision(12, 2);
        builder.Property(o => o.ShippingFee).HasPrecision(12, 2);
        builder.Property(o => o.FinalAmount).HasPrecision(12, 2);
        builder.Property(o => o.Status).HasConversion<string>().HasMaxLength(30).IsRequired();
        builder.Property(o => o.DeliveryType).HasConversion<string>().HasMaxLength(20).IsRequired();
        builder.Property(o => o.Note).IsRequired(false).HasMaxLength(500);
        builder.Property(o => o.CancelReason).IsRequired(false).HasMaxLength(500);
        builder.Property(o => o.ScheduledTime).IsRequired(false);
    }
}
