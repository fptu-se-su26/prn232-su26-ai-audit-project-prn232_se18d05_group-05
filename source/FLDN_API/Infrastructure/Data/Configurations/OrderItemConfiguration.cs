namespace Infrastructure;

public class OrderItemConfiguration : IEntityTypeConfiguration<OrderItem>
{
    public void Configure(EntityTypeBuilder<OrderItem> builder)
    {
        builder.ToTable("OrderItems");
        builder.HasKey(oi => oi.OrderItemId);

        builder.HasOne(oi => oi.Order).WithMany(o => o.OrderItems).HasForeignKey(oi => oi.OrderId).OnDelete(DeleteBehavior.Restrict);
        builder.HasOne(oi => oi.Product).WithMany().HasForeignKey(oi => oi.ProductId).OnDelete(DeleteBehavior.Restrict);
        builder.HasOne(oi => oi.Batch).WithMany().HasForeignKey(oi => oi.BatchId).OnDelete(DeleteBehavior.Restrict);
        builder.HasOne(oi => oi.Supplier).WithMany().HasForeignKey(oi => oi.SupplierId).OnDelete(DeleteBehavior.Restrict);

        builder.Property(oi => oi.Quantity).HasPrecision(12, 2);
        builder.Property(oi => oi.UnitPrice).HasPrecision(12, 2);
        builder.Property(oi => oi.SubTotal).HasPrecision(12, 2);
    }
}
