namespace Infrastructure;

public class ShipperProfileConfiguration : SoftDeleteEntityConfiguration<ShipperProfile, int>
{
    public override void Configure(EntityTypeBuilder<ShipperProfile> builder)
    {
        base.Configure(builder);

        builder.ToTable("ShipperProfiles");

        builder.HasIndex(sp => sp.UserId).IsUnique();

        builder.HasOne(sp => sp.User).WithOne(u => u.ShipperProfile).HasForeignKey<ShipperProfile>(sp => sp.UserId).OnDelete(DeleteBehavior.Restrict);
        builder.HasOne(sp => sp.ApprovedByUser).WithMany().HasForeignKey(sp => sp.ApprovedBy).IsRequired(false).OnDelete(DeleteBehavior.Restrict);
        builder.HasMany(sp => sp.Deliveries).WithOne(d => d.Shipper).HasForeignKey(d => d.ShipperId).OnDelete(DeleteBehavior.Restrict);

        builder.Property(sp => sp.VehicleType).IsRequired(false).HasMaxLength(100);
        builder.Property(sp => sp.LicensePlate).IsRequired(false).HasMaxLength(20);
        builder.Property(sp => sp.IdentityCard).IsRequired(false).HasMaxLength(20);
        builder.Property(sp => sp.Status).HasConversion<string>().HasMaxLength(20).IsRequired();
        builder.Property(sp => sp.AverageRating).HasPrecision(3, 2).HasDefaultValue(0);
        builder.Property(sp => sp.CurrentLat).IsRequired(false).HasPrecision(10, 7);
        builder.Property(sp => sp.CurrentLng).IsRequired(false).HasPrecision(10, 7);
    }
}
