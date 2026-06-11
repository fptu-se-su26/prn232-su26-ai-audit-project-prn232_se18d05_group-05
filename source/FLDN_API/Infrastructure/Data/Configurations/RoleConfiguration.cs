namespace Infrastructure;

public class RoleConfiguration : BaseEntityConfiguration<Role, Guid>
{
    public override void Configure(EntityTypeBuilder<Role> builder)
    {
        base.Configure(builder);

        builder.ToTable("Roles");

        builder.Property(r => r.RoleName).IsRequired().HasMaxLength(50);
        builder.Property(r => r.Description).IsRequired(false).HasMaxLength(255);

        builder.HasIndex(r => r.RoleName).IsUnique();
    }
}
