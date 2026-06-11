namespace Domain;

public class Inventory : EntityBase<Guid>
{
    public Guid ProductId { get; set; }
    public decimal Quantity { get; set; }
    public decimal ReservedQty { get; set; }

    // Navigation
    public Product Product { get; set; } = default!;
}
