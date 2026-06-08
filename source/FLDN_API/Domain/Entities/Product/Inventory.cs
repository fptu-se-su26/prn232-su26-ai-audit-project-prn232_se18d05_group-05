namespace Domain;

public class Inventory
{
    public Guid InventoryId { get; set; }
    public Guid ProductId { get; set; }
    public decimal Quantity { get; set; }
    public decimal ReservedQty { get; set; }
    public DateTimeOffset UpdatedAt { get; set; }

    // Navigation
    public Product Product { get; set; } = default!;
}
