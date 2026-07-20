namespace Infrastructure;

public class SupplyRequestConfiguration : BaseEntityConfiguration<SupplyRequest, Guid>
{
    public override void Configure(EntityTypeBuilder<SupplyRequest> builder)
    {
        base.Configure(builder);

        builder.ToTable("SupplyRequests");

        builder.HasOne(sr => sr.DistributionPoint).WithMany(u => u.SupplyRequests).HasForeignKey(sr => sr.DistributionPointId).OnDelete(DeleteBehavior.Restrict);
        builder.HasOne(sr => sr.Address).WithMany().HasForeignKey(sr => sr.AddressId).OnDelete(DeleteBehavior.Restrict);
        builder.HasMany(sr => sr.Items).WithOne(i => i.SupplyRequest).HasForeignKey(i => i.SupplyRequestId).OnDelete(DeleteBehavior.Restrict);
        builder.HasMany(sr => sr.StatusHistories).WithOne(sh => sh.SupplyRequest).HasForeignKey(sh => sh.SupplyRequestId).OnDelete(DeleteBehavior.Restrict);
        builder.HasMany(sr => sr.SupplierConfirmations).WithOne(sc => sc.SupplyRequest).HasForeignKey(sc => sc.SupplyRequestId).OnDelete(DeleteBehavior.Restrict);

        builder.Property(sr => sr.TotalAmount).HasPrecision(12, 2);
        builder.Property(sr => sr.ShippingFee).HasPrecision(12, 2);
        builder.Property(sr => sr.FinalAmount).HasPrecision(12, 2);
        builder.Property(sr => sr.Status).HasConversion<string>().HasMaxLength(30).IsRequired();
        builder.Property(sr => sr.FulfillmentType).HasConversion<string>().HasMaxLength(20).IsRequired();
        builder.Property(sr => sr.Note).IsRequired(false).HasMaxLength(500);
        builder.Property(sr => sr.CancelReason).IsRequired(false).HasMaxLength(500);
        builder.Property(sr => sr.ScheduledTime).IsRequired(false);
        builder.Property(sr => sr.RequestedDeliveryDate).IsRequired(false);
    }
}
