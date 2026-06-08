namespace Domain;

public class CartItem : EntityBase<int>
{
    public int CartId { get; set; }
    public int ProductId { get; set; }
    public int SupplierId { get; set; }
    public int? SelectedBatchId { get; set; }
    public decimal Quantity { get; set; }
    public decimal UnitPrice { get; set; }

    // Navigation
    public Cart Cart { get; set; } = default!;
    public Product Product { get; set; } = default!;
    public SupplierProfile Supplier { get; set; } = default!;
    public Batch? SelectedBatch { get; set; }
}
