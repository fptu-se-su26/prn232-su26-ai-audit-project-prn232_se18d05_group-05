namespace Infrastructure;

public class CartConfiguration : BaseEntityConfiguration<Cart, int>
{
    public override void Configure(EntityTypeBuilder<Cart> builder)
    {
        base.Configure(builder);

        builder.ToTable("Carts");

        builder.HasIndex(c => c.CustomerId).IsUnique();

        builder.HasOne(c => c.Customer).WithOne(u => u.Cart).HasForeignKey<Cart>(c => c.CustomerId).OnDelete(DeleteBehavior.Restrict);
        builder.HasMany(c => c.CartItems).WithOne(ci => ci.Cart).HasForeignKey(ci => ci.CartId).OnDelete(DeleteBehavior.Restrict);
    }
}
