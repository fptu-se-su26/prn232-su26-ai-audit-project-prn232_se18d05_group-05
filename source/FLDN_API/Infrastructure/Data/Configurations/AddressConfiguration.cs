namespace Infrastructure;

public class AddressConfiguration : SoftDeleteEntityConfiguration<Address, Guid>
{
    public override void Configure(EntityTypeBuilder<Address> builder)
    {
        base.Configure(builder);

        builder.ToTable("Addresses");

        builder.HasOne(a => a.User).WithMany(u => u.Addresses).HasForeignKey(a => a.UserId).OnDelete(DeleteBehavior.Restrict);
        builder.HasOne(a => a.District).WithMany(d => d.Addresses).HasForeignKey(a => a.DistrictId).OnDelete(DeleteBehavior.Restrict);

        builder.Property(a => a.ReceiverName).IsRequired().HasMaxLength(150);
        builder.Property(a => a.ReceiverPhone).IsRequired().HasMaxLength(15);
        builder.Property(a => a.FullAddress).IsRequired().HasMaxLength(500);
        builder.Property(a => a.Latitude).IsRequired(false).HasPrecision(10, 7);
        builder.Property(a => a.Longitude).IsRequired(false).HasPrecision(10, 7);
        builder.Property(a => a.IsDefault).HasDefaultValue(false);
        builder.Property(a => a.IsActive).HasDefaultValue(true);
    }
}
