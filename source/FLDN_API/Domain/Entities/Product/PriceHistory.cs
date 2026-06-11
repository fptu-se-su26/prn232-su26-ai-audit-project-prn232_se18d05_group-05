namespace Domain;

public class PriceHistory : EntityBase<Guid>
{
    public Guid ProductId { get; set; }
    public decimal WholesalePrice { get; set; }
    public DateOnly EffectiveDate { get; set; }

    // Navigation
    public Product Product { get; set; } = default!;
}
