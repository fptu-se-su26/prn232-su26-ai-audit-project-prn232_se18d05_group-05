namespace Domain;

public class OrderItem
{
    public Guid OrderItemId { get; set; }
    public Guid OrderId { get; set; }
    public Guid ProductId { get; set; }
    public Guid BatchId { get; set; }
    public Guid SupplierId { get; set; }
    public decimal Quantity { get; set; }
    public decimal UnitPrice { get; set; }
    public decimal SubTotal { get; set; }

    // Navigation
    public Order Order { get; set; } = default!;
    public Product Product { get; set; } = default!;
    public Batch Batch { get; set; } = default!;
    public SupplierProfile Supplier { get; set; } = default!;
}
