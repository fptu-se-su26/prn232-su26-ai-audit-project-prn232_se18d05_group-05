namespace Domain;

public class PriceHistory : EntityBase<int>
{
    public int ProductId { get; set; }
    public decimal WholesalePrice { get; set; }
    public decimal RetailPrice { get; set; }
    public DateOnly EffectiveDate { get; set; }

    // Navigation
    public Product Product { get; set; } = default!;
}
