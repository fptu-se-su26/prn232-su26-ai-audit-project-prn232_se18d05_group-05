namespace Infrastructure;

public class DistrictConfiguration : BaseEntityConfiguration<District, Guid>
{
    public override void Configure(EntityTypeBuilder<District> builder)
    {
        base.Configure(builder);

        builder.ToTable("Districts");

        builder.Property(d => d.Name).IsRequired().HasMaxLength(150);
        builder.Property(d => d.Code).IsRequired().HasMaxLength(20);

        builder.HasIndex(d => d.Code).IsUnique();
    }
}
