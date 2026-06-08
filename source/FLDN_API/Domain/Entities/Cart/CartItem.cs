namespace Domain;

public class CartItem : EntityBase<Guid>
{
    public Guid CartId { get; set; }
    public Guid ProductId { get; set; }
    public Guid SupplierId { get; set; }
    public Guid? SelectedBatchId { get; set; }
    public decimal Quantity { get; set; }
    public decimal UnitPrice { get; set; }

    // Navigation
    public Cart Cart { get; set; } = default!;
    public Product Product { get; set; } = default!;
    public SupplierProfile Supplier { get; set; } = default!;
    public Batch? SelectedBatch { get; set; }
}
