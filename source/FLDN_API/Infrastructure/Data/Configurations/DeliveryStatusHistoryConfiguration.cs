namespace Infrastructure;

public class DeliveryStatusHistoryConfiguration : BaseEntityConfiguration<DeliveryStatusHistory, int>
{
    public override void Configure(EntityTypeBuilder<DeliveryStatusHistory> builder)
    {
        base.Configure(builder);

        builder.ToTable("DeliveryStatusHistories");

        builder.HasOne(dsh => dsh.Delivery).WithMany(d => d.StatusHistories).HasForeignKey(dsh => dsh.DeliveryId).OnDelete(DeleteBehavior.Restrict);
        builder.HasOne(dsh => dsh.UpdatedByUser).WithMany().HasForeignKey(dsh => dsh.UpdatedBy).IsRequired(false).OnDelete(DeleteBehavior.Restrict);

        builder.Property(dsh => dsh.Status).HasConversion<string>().HasMaxLength(20).IsRequired();
        builder.Property(dsh => dsh.Note).IsRequired(false).HasMaxLength(500);
        builder.Property(dsh => dsh.ImageUrl).IsRequired(false).HasMaxLength(500);
    }
}
