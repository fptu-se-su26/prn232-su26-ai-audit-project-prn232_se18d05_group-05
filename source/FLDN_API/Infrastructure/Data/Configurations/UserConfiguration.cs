namespace Infrastructure;

public class UserConfiguration : SoftDeleteEntityConfiguration<User, Guid>
{
    public override void Configure(EntityTypeBuilder<User> builder)
    {
        base.Configure(builder);

        builder.ToTable("Users");

        builder.Property(u => u.Email).IsRequired().HasMaxLength(150);
        builder.Property(u => u.Phone).IsRequired().HasMaxLength(15);
        builder.Property(u => u.FullName).IsRequired().HasMaxLength(150);
        builder.Property(u => u.PasswordHash).IsRequired().HasMaxLength(255);
        builder.Property(u => u.AvatarUrl).IsRequired(false).HasMaxLength(500);
        builder.Property(u => u.IsActive).HasDefaultValue(true);

        builder.HasIndex(u => u.Email).IsUnique();
        builder.HasIndex(u => u.Phone).IsUnique();

        builder.HasMany(u => u.UserRoles).WithOne(ur => ur.User).HasForeignKey(ur => ur.UserId).OnDelete(DeleteBehavior.Cascade);
        builder.HasMany(u => u.SupplyRequests).WithOne(sr => sr.DistributionPoint).HasForeignKey(sr => sr.DistributionPointId).OnDelete(DeleteBehavior.Restrict);
        builder.HasMany(u => u.Addresses).WithOne(a => a.User).HasForeignKey(a => a.UserId).OnDelete(DeleteBehavior.Restrict);
        builder.HasOne(u => u.SupplierProfile).WithOne(sp => sp.User).HasForeignKey<SupplierProfile>(sp => sp.UserId).OnDelete(DeleteBehavior.Restrict);
        builder.HasOne(u => u.LogisticsProfile).WithOne(lp => lp.User).HasForeignKey<LogisticsProfile>(lp => lp.UserId).OnDelete(DeleteBehavior.Restrict);
        builder.HasMany(u => u.Notifications).WithOne(n => n.User).HasForeignKey(n => n.UserId).OnDelete(DeleteBehavior.Restrict);
    }
}
