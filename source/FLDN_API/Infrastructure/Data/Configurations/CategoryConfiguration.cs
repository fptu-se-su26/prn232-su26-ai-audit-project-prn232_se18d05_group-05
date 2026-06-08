namespace Infrastructure;

public class CategoryConfiguration : IEntityTypeConfiguration<Category>
{
    public void Configure(EntityTypeBuilder<Category> builder)
    {
        builder.ToTable("Categories");
        builder.HasKey(c => c.CategoryId);

        builder.HasQueryFilter(c => !c.IsDeleted);
        builder.Property(c => c.IsDeleted).HasDefaultValue(false).IsRequired();
        builder.Property(c => c.DeletedAt).IsRequired(false);

        builder.Property(c => c.Name).IsRequired().HasMaxLength(150);
        builder.Property(c => c.Description).IsRequired(false).HasMaxLength(500);
        builder.Property(c => c.ImageUrl).IsRequired(false).HasMaxLength(500);
        builder.Property(c => c.IsActive).HasDefaultValue(true);

        builder.HasOne(c => c.ParentCategory)
            .WithMany(c => c.SubCategories)
            .HasForeignKey(c => c.ParentCategoryId)
            .IsRequired(false)
            .OnDelete(DeleteBehavior.Restrict);
    }
}
