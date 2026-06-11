namespace Infrastructure;

public class LogisticsActionConfiguration : BaseEntityConfiguration<LogisticsAction, Guid>
{
    public override void Configure(EntityTypeBuilder<LogisticsAction> builder)
    {
        base.Configure(builder);

        builder.ToTable("LogisticsActions");

        builder.HasOne(a => a.Shipment).WithMany(s => s.LogisticsActions).HasForeignKey(a => a.ShipmentId).OnDelete(DeleteBehavior.Restrict);
        builder.HasOne(a => a.LogisticsOperator).WithMany().HasForeignKey(a => a.LogisticsOperatorId).OnDelete(DeleteBehavior.Restrict);

        builder.Property(a => a.Action).HasConversion<string>().HasMaxLength(30).IsRequired();
        builder.Property(a => a.Reason).IsRequired(false).HasMaxLength(500);
    }
}
