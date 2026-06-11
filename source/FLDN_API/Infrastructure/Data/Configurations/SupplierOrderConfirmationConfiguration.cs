namespace Infrastructure;

public class SupplierConfirmationConfiguration : BaseEntityConfiguration<SupplierConfirmation, Guid>
{
    public override void Configure(EntityTypeBuilder<SupplierConfirmation> builder)
    {
        base.Configure(builder);

        builder.ToTable("SupplierConfirmations");

        builder.HasOne(sc => sc.SupplyRequest).WithMany(sr => sr.SupplierConfirmations).HasForeignKey(sc => sc.SupplyRequestId).OnDelete(DeleteBehavior.Restrict);
        builder.HasOne(sc => sc.Supplier).WithMany().HasForeignKey(sc => sc.SupplierId).OnDelete(DeleteBehavior.Restrict);

        builder.HasIndex(sc => new { sc.SupplyRequestId, sc.SupplierId }).IsUnique();

        builder.Property(sc => sc.Status).HasConversion<string>().HasMaxLength(20).IsRequired();
        builder.Property(sc => sc.Reason).IsRequired(false).HasMaxLength(500);
        builder.Property(sc => sc.ConfirmedAt).IsRequired(false);
    }
}
