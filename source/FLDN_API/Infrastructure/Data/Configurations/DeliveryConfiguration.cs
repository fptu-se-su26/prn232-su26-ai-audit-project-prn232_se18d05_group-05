namespace Infrastructure;

public class ShipmentConfiguration : BaseEntityConfiguration<Shipment, Guid>
{
    public override void Configure(EntityTypeBuilder<Shipment> builder)
    {
        base.Configure(builder);

        builder.ToTable("Shipments");

        builder.HasIndex(s => s.SupplyRequestId).IsUnique();

        builder.HasOne(s => s.SupplyRequest).WithOne().HasForeignKey<Shipment>(s => s.SupplyRequestId).OnDelete(DeleteBehavior.Restrict);
        builder.HasOne(s => s.LogisticsOperator).WithMany(lp => lp.Shipments).HasForeignKey(s => s.LogisticsOperatorId).IsRequired(false).OnDelete(DeleteBehavior.Restrict);
        builder.HasOne(s => s.Zone).WithMany().HasForeignKey(s => s.ZoneId).IsRequired(false).OnDelete(DeleteBehavior.Restrict);
        builder.HasMany(s => s.StatusHistories).WithOne(sh => sh.Shipment).HasForeignKey(sh => sh.ShipmentId).OnDelete(DeleteBehavior.Restrict);
        builder.HasMany(s => s.LogisticsActions).WithOne(a => a.Shipment).HasForeignKey(a => a.ShipmentId).OnDelete(DeleteBehavior.Restrict);

        builder.Property(s => s.Status).HasConversion<string>().HasMaxLength(20).IsRequired();
        builder.Property(s => s.FailReason).IsRequired(false).HasMaxLength(500);
        builder.Property(s => s.ConfirmImageUrl).IsRequired(false).HasMaxLength(500);
        builder.Property(s => s.Note).IsRequired(false).HasMaxLength(500);
        builder.Property(s => s.ShippingFee).HasPrecision(12, 2).HasDefaultValue(0);
        builder.Property(s => s.EstimatedDistance).IsRequired(false).HasPrecision(8, 2);
    }
}
