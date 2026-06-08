namespace Infrastructure;

public class BatchConfiguration : BaseEntityConfiguration<Batch, int>
{
    public override void Configure(EntityTypeBuilder<Batch> builder)
    {
        base.Configure(builder);

        builder.ToTable("Batches");

        builder.HasOne(b => b.Product).WithMany(p => p.Batches).HasForeignKey(b => b.ProductId).OnDelete(DeleteBehavior.Restrict);

        builder.Property(b => b.BatchCode).IsRequired().HasMaxLength(100);
        builder.HasIndex(b => b.BatchCode).IsUnique();
        builder.Property(b => b.Quantity).HasPrecision(12, 2);
        builder.Property(b => b.RemainingQty).HasPrecision(12, 2);
        builder.Property(b => b.GrowingRegion).IsRequired(false).HasMaxLength(255);
        builder.Property(b => b.CertificateUrl).IsRequired(false).HasMaxLength(500);
        builder.Property(b => b.Status).HasConversion<string>().HasMaxLength(20).IsRequired();
        builder.Property(b => b.CertificateType).HasConversion<string>().HasMaxLength(50).IsRequired(false);
    }
}
