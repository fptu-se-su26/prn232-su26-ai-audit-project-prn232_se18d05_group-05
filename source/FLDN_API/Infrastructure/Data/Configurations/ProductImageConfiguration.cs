namespace Infrastructure;

public class ProductImageConfiguration : IEntityTypeConfiguration<ProductImage>
{
    public void Configure(EntityTypeBuilder<ProductImage> builder)
    {
        builder.ToTable("ProductImages");
        builder.HasKey(pi => pi.ImageId);

        builder.HasOne(pi => pi.Product).WithMany(p => p.ProductImages).HasForeignKey(pi => pi.ProductId).OnDelete(DeleteBehavior.Restrict);

        builder.Property(pi => pi.ImageUrl).IsRequired().HasMaxLength(500);
        builder.Property(pi => pi.IsMain).HasDefaultValue(false);
        builder.Property(pi => pi.SortOrder).HasDefaultValue(0);
    }
}
