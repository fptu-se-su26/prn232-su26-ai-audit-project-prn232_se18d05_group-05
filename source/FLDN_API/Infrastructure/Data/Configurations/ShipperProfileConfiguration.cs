namespace Infrastructure;

public class LogisticsProfileConfiguration : SoftDeleteEntityConfiguration<LogisticsProfile, Guid>
{
    public override void Configure(EntityTypeBuilder<LogisticsProfile> builder)
    {
        base.Configure(builder);

        builder.ToTable("LogisticsProfiles");

        builder.HasIndex(lp => lp.UserId).IsUnique();

        builder.HasOne(lp => lp.User).WithOne(u => u.LogisticsProfile).HasForeignKey<LogisticsProfile>(lp => lp.UserId).OnDelete(DeleteBehavior.Restrict);
        builder.HasOne(lp => lp.ApprovedByUser).WithMany().HasForeignKey(lp => lp.ApprovedBy).IsRequired(false).OnDelete(DeleteBehavior.Restrict);
        builder.HasMany(lp => lp.Shipments).WithOne(s => s.LogisticsOperator).HasForeignKey(s => s.LogisticsOperatorId).OnDelete(DeleteBehavior.Restrict);

        builder.Property(lp => lp.VehicleType).IsRequired(false).HasMaxLength(100);
        builder.Property(lp => lp.LicensePlate).IsRequired(false).HasMaxLength(20);
        builder.Property(lp => lp.IdentityCard).IsRequired(false).HasMaxLength(20);
        builder.Property(lp => lp.Status).HasConversion<string>().HasMaxLength(20).IsRequired();
        builder.Property(lp => lp.CurrentLat).IsRequired(false).HasPrecision(10, 7);
        builder.Property(lp => lp.CurrentLng).IsRequired(false).HasPrecision(10, 7);
    }
}
