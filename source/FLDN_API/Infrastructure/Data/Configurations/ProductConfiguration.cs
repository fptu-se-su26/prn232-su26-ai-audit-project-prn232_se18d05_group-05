namespace Infrastructure;

public class ProductConfiguration : SoftDeleteEntityConfiguration<Product, Guid>
{
    public override void Configure(EntityTypeBuilder<Product> builder)
    {
        base.Configure(builder);

        builder.ToTable("Products");

        builder.HasOne(p => p.Supplier).WithMany(sp => sp.Products).HasForeignKey(p => p.SupplierId).OnDelete(DeleteBehavior.Restrict);
        builder.HasOne(p => p.Category).WithMany(c => c.Products).HasForeignKey(p => p.CategoryId).OnDelete(DeleteBehavior.Restrict);
        builder.HasMany(p => p.ProductImages).WithOne(pi => pi.Product).HasForeignKey(pi => pi.ProductId).OnDelete(DeleteBehavior.Restrict);
        builder.HasMany(p => p.PriceHistories).WithOne(ph => ph.Product).HasForeignKey(ph => ph.ProductId).OnDelete(DeleteBehavior.Restrict);
        builder.HasOne(p => p.Inventory).WithOne(i => i.Product).HasForeignKey<Inventory>(i => i.ProductId).OnDelete(DeleteBehavior.Restrict);
        builder.HasMany(p => p.Batches).WithOne(b => b.Product).HasForeignKey(b => b.ProductId).OnDelete(DeleteBehavior.Restrict);

        builder.Property(p => p.Name).IsRequired().HasMaxLength(255);
        builder.Property(p => p.Description).IsRequired(false).HasMaxLength(2000);
        builder.Property(p => p.WholesalePrice).HasPrecision(12, 2);
        builder.Property(p => p.RetailPrice).HasPrecision(12, 2);
        builder.Property(p => p.Unit).IsRequired().HasMaxLength(50);
        builder.Property(p => p.PackagingStandard).IsRequired(false).HasMaxLength(255);
        builder.Property(p => p.IsActive).HasDefaultValue(true);
    }
}
