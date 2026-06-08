namespace Infrastructure;

public class ReviewConfiguration : SoftDeleteEntityConfiguration<Review, Guid>
{
    public override void Configure(EntityTypeBuilder<Review> builder)
    {
        base.Configure(builder);

        builder.ToTable("Reviews");

        builder.HasIndex(r => r.OrderItemId).IsUnique();

        builder.HasOne(r => r.OrderItem).WithOne().HasForeignKey<Review>(r => r.OrderItemId).OnDelete(DeleteBehavior.Restrict);
        builder.HasOne(r => r.Customer).WithMany().HasForeignKey(r => r.CustomerId).OnDelete(DeleteBehavior.Restrict);
        builder.HasOne(r => r.Product).WithMany().HasForeignKey(r => r.ProductId).OnDelete(DeleteBehavior.Restrict);

        builder.Property(r => r.Comment).IsRequired(false).HasMaxLength(2000);
        builder.Property(r => r.ImageUrl).IsRequired(false).HasMaxLength(500);
        builder.Property(r => r.IsVisible).HasDefaultValue(true);
    }
}
