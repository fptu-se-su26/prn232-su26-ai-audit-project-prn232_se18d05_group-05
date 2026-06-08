namespace Domain;

public class OrderItem
{
    public int OrderItemId { get; set; }
    public int OrderId { get; set; }
    public int ProductId { get; set; }
    public int BatchId { get; set; }
    public int SupplierId { get; set; }
    public decimal Quantity { get; set; }
    public decimal UnitPrice { get; set; }
    public decimal SubTotal { get; set; }

    // Navigation
    public Order Order { get; set; } = default!;
    public Product Product { get; set; } = default!;
    public Batch Batch { get; set; } = default!;
    public SupplierProfile Supplier { get; set; } = default!;
}
