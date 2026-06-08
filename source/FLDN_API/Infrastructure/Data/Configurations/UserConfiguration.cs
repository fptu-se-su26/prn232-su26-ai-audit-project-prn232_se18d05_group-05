namespace Infrastructure;

public class UserConfiguration : SoftDeleteEntityConfiguration<User, int>
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

        builder.HasMany(u => u.UserRoles).WithOne(ur => ur.User).HasForeignKey(ur => ur.UserId).OnDelete(DeleteBehavior.Restrict);
        builder.HasMany(u => u.Orders).WithOne(o => o.Customer).HasForeignKey(o => o.CustomerId).OnDelete(DeleteBehavior.Restrict);
        builder.HasMany(u => u.Addresses).WithOne(a => a.User).HasForeignKey(a => a.UserId).OnDelete(DeleteBehavior.Restrict);
        builder.HasOne(u => u.SupplierProfile).WithOne(sp => sp.User).HasForeignKey<SupplierProfile>(sp => sp.UserId).OnDelete(DeleteBehavior.Restrict);
        builder.HasOne(u => u.ShipperProfile).WithOne(sp => sp.User).HasForeignKey<ShipperProfile>(sp => sp.UserId).OnDelete(DeleteBehavior.Restrict);
        builder.HasOne(u => u.Wallet).WithOne(w => w.User).HasForeignKey<Wallet>(w => w.UserId).OnDelete(DeleteBehavior.Restrict);
        builder.HasOne(u => u.Cart).WithOne(c => c.Customer).HasForeignKey<Cart>(c => c.CustomerId).OnDelete(DeleteBehavior.Restrict);
        builder.HasMany(u => u.Notifications).WithOne(n => n.User).HasForeignKey(n => n.UserId).OnDelete(DeleteBehavior.Restrict);
    }
}
