namespace Infrastructure;

public class DeliveryConfiguration : IEntityTypeConfiguration<Delivery>
{
    public void Configure(EntityTypeBuilder<Delivery> builder)
    {
        builder.ToTable("Deliveries");
        builder.HasKey(d => d.DeliveryId);

        builder.HasIndex(d => d.OrderId).IsUnique();

        builder.HasOne(d => d.Order).WithOne().HasForeignKey<Delivery>(d => d.OrderId).OnDelete(DeleteBehavior.Restrict);
        builder.HasOne(d => d.Shipper).WithMany(sp => sp.Deliveries).HasForeignKey(d => d.ShipperId).IsRequired(false).OnDelete(DeleteBehavior.Restrict);
        builder.HasOne(d => d.Zone).WithMany().HasForeignKey(d => d.ZoneId).IsRequired(false).OnDelete(DeleteBehavior.Restrict);
        builder.HasMany(d => d.StatusHistories).WithOne(dsh => dsh.Delivery).HasForeignKey(dsh => dsh.DeliveryId).OnDelete(DeleteBehavior.Restrict);
        builder.HasMany(d => d.ShipperOrderActions).WithOne(a => a.Delivery).HasForeignKey(a => a.DeliveryId).OnDelete(DeleteBehavior.Restrict);

        builder.Property(d => d.Status).HasConversion<string>().HasMaxLength(20).IsRequired();
        builder.Property(d => d.FailReason).IsRequired(false).HasMaxLength(500);
        builder.Property(d => d.ConfirmImageUrl).IsRequired(false).HasMaxLength(500);
        builder.Property(d => d.Note).IsRequired(false).HasMaxLength(500);
        builder.Property(d => d.ShippingFee).HasPrecision(12, 2).HasDefaultValue(0);
        builder.Property(d => d.ShipperEarning).HasPrecision(12, 2).HasDefaultValue(0);
        builder.Property(d => d.EstimatedDistance).IsRequired(false).HasPrecision(8, 2);
    }
}
