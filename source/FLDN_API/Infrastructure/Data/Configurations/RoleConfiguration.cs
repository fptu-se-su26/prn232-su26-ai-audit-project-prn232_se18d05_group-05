namespace Infrastructure;

public class RoleConfiguration : IEntityTypeConfiguration<Role>
{
    public void Configure(EntityTypeBuilder<Role> builder)
    {
        builder.ToTable("Roles");
        builder.HasKey(r => r.Id);

        builder.Property(r => r.RoleName).IsRequired().HasMaxLength(50);
        builder.Property(r => r.Description).IsRequired(false).HasMaxLength(255);

        builder.HasIndex(r => r.RoleName).IsUnique();
    }
}
