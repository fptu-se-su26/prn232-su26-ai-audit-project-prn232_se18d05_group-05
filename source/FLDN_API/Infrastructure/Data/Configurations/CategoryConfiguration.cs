namespace Infrastructure;

public class CategoryConfiguration : SoftDeleteEntityConfiguration<Category, Guid>
{
    public override void Configure(EntityTypeBuilder<Category> builder)
    {
        base.Configure(builder);

        builder.ToTable("Categories");

        builder.Property(c => c.Name).IsRequired().HasMaxLength(150);
        builder.Property(c => c.Description).IsRequired(false).HasMaxLength(500);
        builder.Property(c => c.ImageUrl).IsRequired(false).HasMaxLength(500);
        builder.Property(c => c.IsActive).HasDefaultValue(true);

        builder.HasOne(c => c.ParentCategory).WithMany(c => c.SubCategories).HasForeignKey(c => c.ParentCategoryId).IsRequired(false).OnDelete(DeleteBehavior.Restrict);
    }
}
