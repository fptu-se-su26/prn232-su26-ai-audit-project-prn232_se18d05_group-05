namespace Infrastructure;

public class VoucherUsageConfiguration : IEntityTypeConfiguration<VoucherUsage>
{
    public void Configure(EntityTypeBuilder<VoucherUsage> builder)
    {
        builder.ToTable("VoucherUsages");
        builder.HasKey(vu => vu.VoucherUsageId);

        builder.HasOne(vu => vu.Voucher).WithMany(v => v.VoucherUsages).HasForeignKey(vu => vu.VoucherId).OnDelete(DeleteBehavior.Restrict);
        builder.HasOne(vu => vu.User).WithMany().HasForeignKey(vu => vu.UserId).OnDelete(DeleteBehavior.Restrict);
        builder.HasOne(vu => vu.Order).WithMany().HasForeignKey(vu => vu.OrderId).OnDelete(DeleteBehavior.Restrict);

        builder.HasIndex(vu => new { vu.VoucherId, vu.UserId, vu.OrderId }).IsUnique();
    }
}
