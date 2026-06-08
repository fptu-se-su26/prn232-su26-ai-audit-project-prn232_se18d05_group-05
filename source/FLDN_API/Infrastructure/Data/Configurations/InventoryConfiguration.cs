namespace Infrastructure;

public class InventoryConfiguration : IEntityTypeConfiguration<Inventory>
{
    public void Configure(EntityTypeBuilder<Inventory> builder)
    {
        builder.ToTable("Inventory");
        builder.HasKey(i => i.InventoryId);

        builder.HasIndex(i => i.ProductId).IsUnique();

        builder.HasOne(i => i.Product).WithOne(p => p.Inventory).HasForeignKey<Inventory>(i => i.ProductId).OnDelete(DeleteBehavior.Restrict);

        builder.Property(i => i.Quantity).HasPrecision(12, 2).HasDefaultValue(0);
        builder.Property(i => i.ReservedQty).HasPrecision(12, 2).HasDefaultValue(0);
    }
}
