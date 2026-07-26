namespace Infrastructure;

public class DistributionPointProfileConfiguration : SoftDeleteEntityConfiguration<DistributionPointProfile, Guid>
{
    public override void Configure(EntityTypeBuilder<DistributionPointProfile> builder)
    {
        base.Configure(builder);

        builder.ToTable("DistributionPointProfiles");

        builder.HasIndex(dp => dp.UserId).IsUnique();

        builder.HasOne(dp => dp.User).WithOne(u => u.DistributionPointProfile).HasForeignKey<DistributionPointProfile>(dp => dp.UserId).OnDelete(DeleteBehavior.Restrict);
        builder.HasOne(dp => dp.District).WithMany(d => d.DistributionPointProfiles).HasForeignKey(dp => dp.DistrictId).IsRequired(false).OnDelete(DeleteBehavior.Restrict);

        builder.Property(dp => dp.PointName).IsRequired().HasMaxLength(255);
        builder.Property(dp => dp.PointType).HasConversion<string>().HasMaxLength(20).IsRequired();
        builder.Property(dp => dp.Capacity).HasPrecision(18, 2).HasDefaultValue(0);
        builder.Property(dp => dp.CapacityUnit).IsRequired(false).HasMaxLength(20);
        builder.Property(dp => dp.Address).IsRequired(false).HasMaxLength(500);
        builder.Property(dp => dp.ContactPerson).IsRequired(false).HasMaxLength(150);
        builder.Property(dp => dp.ContactPhone).IsRequired(false).HasMaxLength(15);
        builder.Property(dp => dp.OperatingHours).IsRequired(false).HasMaxLength(100);
    }
}
