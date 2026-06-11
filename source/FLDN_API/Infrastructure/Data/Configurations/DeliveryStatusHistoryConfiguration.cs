namespace Infrastructure;

public class ShipmentStatusHistoryConfiguration : BaseEntityConfiguration<ShipmentStatusHistory, Guid>
{
    public override void Configure(EntityTypeBuilder<ShipmentStatusHistory> builder)
    {
        base.Configure(builder);

        builder.ToTable("ShipmentStatusHistories");

        builder.HasOne(sh => sh.Shipment).WithMany(s => s.StatusHistories).HasForeignKey(sh => sh.ShipmentId).OnDelete(DeleteBehavior.Restrict);
        builder.HasOne(sh => sh.UpdatedByUser).WithMany().HasForeignKey(sh => sh.UpdatedBy).IsRequired(false).OnDelete(DeleteBehavior.Restrict);

        builder.Property(sh => sh.Status).HasConversion<string>().HasMaxLength(20).IsRequired();
        builder.Property(sh => sh.Note).IsRequired(false).HasMaxLength(500);
        builder.Property(sh => sh.ImageUrl).IsRequired(false).HasMaxLength(500);
    }
}
