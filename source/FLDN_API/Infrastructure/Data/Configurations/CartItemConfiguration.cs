namespace Infrastructure;

public class CartItemConfiguration : BaseEntityConfiguration<CartItem, Guid>
{
    public override void Configure(EntityTypeBuilder<CartItem> builder)
    {
        base.Configure(builder);

        builder.ToTable("CartItems");

        builder.HasOne(ci => ci.Cart).WithMany(c => c.CartItems).HasForeignKey(ci => ci.CartId).OnDelete(DeleteBehavior.Restrict);
        builder.HasOne(ci => ci.Product).WithMany().HasForeignKey(ci => ci.ProductId).OnDelete(DeleteBehavior.Restrict);
        builder.HasOne(ci => ci.Supplier).WithMany().HasForeignKey(ci => ci.SupplierId).OnDelete(DeleteBehavior.Restrict);
        builder.HasOne(ci => ci.SelectedBatch).WithMany().HasForeignKey(ci => ci.SelectedBatchId).IsRequired(false).OnDelete(DeleteBehavior.Restrict);

        builder.HasIndex(ci => new { ci.CartId, ci.ProductId, ci.SelectedBatchId }).IsUnique();

        builder.Property(ci => ci.Quantity).HasPrecision(12, 2);
        builder.Property(ci => ci.UnitPrice).HasPrecision(12, 2);
    }
}
