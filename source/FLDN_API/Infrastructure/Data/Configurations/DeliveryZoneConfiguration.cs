namespace Infrastructure;

public class DeliveryZoneConfiguration : IEntityTypeConfiguration<DeliveryZone>
{
    public void Configure(EntityTypeBuilder<DeliveryZone> builder)
    {
        builder.ToTable("DeliveryZones");
        builder.HasKey(z => z.ZoneId);

        builder.HasOne(z => z.District).WithMany(d => d.DeliveryZones).HasForeignKey(z => z.DistrictId).OnDelete(DeleteBehavior.Restrict);

        builder.Property(z => z.ZoneName).IsRequired().HasMaxLength(150);
        builder.Property(z => z.ShippingFee).IsRequired().HasPrecision(12, 2).HasDefaultValue(0);
        builder.Property(z => z.Description).IsRequired(false).HasMaxLength(500);
        builder.Property(z => z.IsActive).HasDefaultValue(true);
    }
}
