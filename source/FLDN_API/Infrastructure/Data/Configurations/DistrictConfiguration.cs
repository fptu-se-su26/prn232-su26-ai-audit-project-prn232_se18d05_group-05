namespace Infrastructure;

public class DistrictConfiguration : IEntityTypeConfiguration<District>
{
    public void Configure(EntityTypeBuilder<District> builder)
    {
        builder.ToTable("Districts");
        builder.HasKey(d => d.DistrictId);

        builder.Property(d => d.Name).IsRequired().HasMaxLength(150);
        builder.Property(d => d.Code).IsRequired().HasMaxLength(20);

        builder.HasIndex(d => d.Code).IsUnique();
    }
}
