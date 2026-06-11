namespace Infrastructure;

public class SupplyRequestItemConfiguration : BaseEntityConfiguration<SupplyRequestItem, Guid>
{
    public override void Configure(EntityTypeBuilder<SupplyRequestItem> builder)
    {
        base.Configure(builder);

        builder.ToTable("SupplyRequestItems");

        builder.HasOne(i => i.SupplyRequest).WithMany(sr => sr.Items).HasForeignKey(i => i.SupplyRequestId).OnDelete(DeleteBehavior.Restrict);
        builder.HasOne(i => i.Product).WithMany().HasForeignKey(i => i.ProductId).OnDelete(DeleteBehavior.Restrict);
        builder.HasOne(i => i.Batch).WithMany().HasForeignKey(i => i.BatchId).OnDelete(DeleteBehavior.Restrict);
        builder.HasOne(i => i.Supplier).WithMany().HasForeignKey(i => i.SupplierId).OnDelete(DeleteBehavior.Restrict);

        builder.Property(i => i.Quantity).HasPrecision(12, 2);
        builder.Property(i => i.UnitPrice).HasPrecision(12, 2);
        builder.Property(i => i.SubTotal).HasPrecision(12, 2);
    }
}
