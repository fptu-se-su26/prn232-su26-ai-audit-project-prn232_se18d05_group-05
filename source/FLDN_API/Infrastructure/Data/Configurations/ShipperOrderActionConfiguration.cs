namespace Infrastructure;

public class ShipperOrderActionConfiguration : BaseEntityConfiguration<ShipperOrderAction, int>
{
    public override void Configure(EntityTypeBuilder<ShipperOrderAction> builder)
    {
        base.Configure(builder);

        builder.ToTable("ShipperOrderActions");

        builder.HasOne(a => a.Delivery).WithMany(d => d.ShipperOrderActions).HasForeignKey(a => a.DeliveryId).OnDelete(DeleteBehavior.Restrict);
        builder.HasOne(a => a.Shipper).WithMany().HasForeignKey(a => a.ShipperId).OnDelete(DeleteBehavior.Restrict);

        builder.Property(a => a.Action).HasConversion<string>().HasMaxLength(30).IsRequired();
        builder.Property(a => a.Reason).IsRequired(false).HasMaxLength(500);
    }
}
