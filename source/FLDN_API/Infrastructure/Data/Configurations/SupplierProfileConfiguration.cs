namespace Infrastructure;

public class SupplierProfileConfiguration : SoftDeleteEntityConfiguration<SupplierProfile, Guid>
{
    public override void Configure(EntityTypeBuilder<SupplierProfile> builder)
    {
        base.Configure(builder);

        builder.ToTable("SupplierProfiles");

        builder.HasIndex(sp => sp.UserId).IsUnique();

        builder.HasOne(sp => sp.User).WithOne(u => u.SupplierProfile).HasForeignKey<SupplierProfile>(sp => sp.UserId).OnDelete(DeleteBehavior.Restrict);
        builder.HasOne(sp => sp.District).WithMany(d => d.SupplierProfiles).HasForeignKey(sp => sp.DistrictId).IsRequired(false).OnDelete(DeleteBehavior.Restrict);
        builder.HasOne(sp => sp.ApprovedByUser).WithMany().HasForeignKey(sp => sp.ApprovedBy).IsRequired(false).OnDelete(DeleteBehavior.Restrict);

        builder.Property(sp => sp.BusinessName).IsRequired().HasMaxLength(255);
        builder.Property(sp => sp.TaxCode).IsRequired(false).HasMaxLength(20);
        builder.Property(sp => sp.LicenseNumber).IsRequired(false).HasMaxLength(100);
        builder.Property(sp => sp.AttpCertificateUrl).IsRequired(false).HasMaxLength(500);
        builder.Property(sp => sp.Address).IsRequired(false).HasMaxLength(500);
        builder.Property(sp => sp.ServiceFeeRate).HasPrecision(5, 2).HasDefaultValue(0);
        builder.Property(sp => sp.DiscountRate).HasPrecision(5, 2).HasDefaultValue(0);
        builder.Property(sp => sp.Status).HasConversion<string>().HasMaxLength(20).IsRequired();
        builder.Property(sp => sp.RejectedReason).IsRequired(false).HasMaxLength(500);
        builder.Property(sp => sp.ApprovedAt).IsRequired(false);
    }
}
