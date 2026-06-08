namespace Infrastructure;

public class OrderStatusHistoryConfiguration : BaseEntityConfiguration<OrderStatusHistory, int>
{
    public override void Configure(EntityTypeBuilder<OrderStatusHistory> builder)
    {
        base.Configure(builder);

        builder.ToTable("OrderStatusHistories");

        builder.HasOne(sh => sh.Order).WithMany(o => o.StatusHistories).HasForeignKey(sh => sh.OrderId).OnDelete(DeleteBehavior.Restrict);
        builder.HasOne(sh => sh.CreatedByUser).WithMany().HasForeignKey(sh => sh.CreatedBy).IsRequired(false).OnDelete(DeleteBehavior.Restrict);

        builder.Property(sh => sh.Status).HasConversion<string>().HasMaxLength(30).IsRequired();
        builder.Property(sh => sh.Note).IsRequired(false).HasMaxLength(500);
    }
}
