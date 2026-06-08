namespace Infrastructure;

public class VoucherConfiguration : BaseEntityConfiguration<Voucher, Guid>
{
    public override void Configure(EntityTypeBuilder<Voucher> builder)
    {
        base.Configure(builder);

        builder.ToTable("Vouchers");

        builder.HasOne(v => v.CreatedByUser).WithMany().HasForeignKey(v => v.CreatedBy).OnDelete(DeleteBehavior.Restrict);

        builder.Property(v => v.Code).IsRequired().HasMaxLength(50);
        builder.HasIndex(v => v.Code).IsUnique();
        builder.Property(v => v.VoucherName).IsRequired().HasMaxLength(255);
        builder.Property(v => v.DiscountType).HasConversion<string>().HasMaxLength(20).IsRequired();
        builder.Property(v => v.DiscountValue).HasPrecision(12, 2);
        builder.Property(v => v.MinOrderValue).HasPrecision(12, 2);
        builder.Property(v => v.MaxDiscount).HasPrecision(12, 2).IsRequired(false);
        builder.Property(v => v.UsageLimit).IsRequired(false);
        builder.Property(v => v.IsFlashSale).HasDefaultValue(false);
        builder.Property(v => v.IsActive).HasDefaultValue(true);
    }
}
