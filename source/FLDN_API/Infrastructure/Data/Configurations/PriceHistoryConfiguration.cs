namespace Infrastructure;

public class PriceHistoryConfiguration : BaseEntityConfiguration<PriceHistory, Guid>
{
    public override void Configure(EntityTypeBuilder<PriceHistory> builder)
    {
        base.Configure(builder);

        builder.ToTable("PriceHistory");

        builder.HasOne(ph => ph.Product).WithMany(p => p.PriceHistories).HasForeignKey(ph => ph.ProductId).OnDelete(DeleteBehavior.Restrict);

        builder.Property(ph => ph.WholesalePrice).HasPrecision(12, 2);
    }
}
