namespace Infrastructure;

public class QRCodeConfiguration : BaseEntityConfiguration<QRCode, int>
{
    public override void Configure(EntityTypeBuilder<QRCode> builder)
    {
        base.Configure(builder);

        builder.ToTable("QRCodes");

        builder.HasIndex(q => q.BatchId).IsUnique();

        builder.HasOne(q => q.Batch).WithOne(b => b.QRCode).HasForeignKey<QRCode>(q => q.BatchId).OnDelete(DeleteBehavior.Restrict);

        builder.Property(q => q.QRCodeData).IsRequired().HasMaxLength(1000);
        builder.Property(q => q.QRCodeUrl).IsRequired().HasMaxLength(500);
        builder.Property(q => q.ScanCount).HasDefaultValue(0);
    }
}
