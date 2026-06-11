namespace Infrastructure;

public class SupplyRequestStatusHistoryConfiguration : BaseEntityConfiguration<SupplyRequestStatusHistory, Guid>
{
    public override void Configure(EntityTypeBuilder<SupplyRequestStatusHistory> builder)
    {
        base.Configure(builder);

        builder.ToTable("SupplyRequestStatusHistories");

        builder.HasOne(sh => sh.SupplyRequest).WithMany(sr => sr.StatusHistories).HasForeignKey(sh => sh.SupplyRequestId).OnDelete(DeleteBehavior.Restrict);
        builder.HasOne(sh => sh.CreatedByUser).WithMany().HasForeignKey(sh => sh.CreatedBy).IsRequired(false).OnDelete(DeleteBehavior.Restrict);

        builder.Property(sh => sh.Status).HasConversion<string>().HasMaxLength(30).IsRequired();
        builder.Property(sh => sh.Note).IsRequired(false).HasMaxLength(500);
    }
}
