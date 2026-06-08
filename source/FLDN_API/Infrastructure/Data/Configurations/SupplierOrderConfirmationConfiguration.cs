namespace Infrastructure;

public class SupplierOrderConfirmationConfiguration : BaseEntityConfiguration<SupplierOrderConfirmation, Guid>
{
    public override void Configure(EntityTypeBuilder<SupplierOrderConfirmation> builder)
    {
        base.Configure(builder);

        builder.ToTable("SupplierOrderConfirmations");

        builder.HasOne(sc => sc.Order).WithMany(o => o.SupplierConfirmations).HasForeignKey(sc => sc.OrderId).OnDelete(DeleteBehavior.Restrict);
        builder.HasOne(sc => sc.Supplier).WithMany().HasForeignKey(sc => sc.SupplierId).OnDelete(DeleteBehavior.Restrict);

        builder.HasIndex(sc => new { sc.OrderId, sc.SupplierId }).IsUnique();

        builder.Property(sc => sc.Status).HasConversion<string>().HasMaxLength(20).IsRequired();
        builder.Property(sc => sc.Reason).IsRequired(false).HasMaxLength(500);
        builder.Property(sc => sc.ConfirmedAt).IsRequired(false);
    }
}
