namespace Infrastructure;

public class DistributionZoneConfiguration : SoftDeleteEntityConfiguration<DistributionZone, Guid>
{
    public override void Configure(EntityTypeBuilder<DistributionZone> builder)
    {
        base.Configure(builder);

        builder.ToTable("DistributionZones");

        builder.HasOne(z => z.District).WithMany(d => d.DistributionZones).HasForeignKey(z => z.DistrictId).OnDelete(DeleteBehavior.Restrict);

        builder.Property(z => z.ZoneName).IsRequired().HasMaxLength(150);
        builder.Property(z => z.ShippingFee).IsRequired().HasPrecision(12, 2).HasDefaultValue(0);
        builder.Property(z => z.Description).IsRequired(false).HasMaxLength(500);
        builder.Property(z => z.IsActive).HasDefaultValue(true);
    }
}
