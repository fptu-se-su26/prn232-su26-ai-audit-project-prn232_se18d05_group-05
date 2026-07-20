namespace Domain;

public class SupplyRequestItem : EntityBase<Guid>
{
    public Guid SupplyRequestId { get; set; }
    public Guid ProductId { get; set; }
    public Guid BatchId { get; set; }
    public Guid SupplierId { get; set; }
    public decimal Quantity { get; set; }
    public decimal UnitPrice { get; set; }
    public decimal SubTotal { get; set; }

    // Navigation
    public SupplyRequest SupplyRequest { get; set; } = default!;
    public Product Product { get; set; } = default!;
    public Batch Batch { get; set; } = default!;
    public SupplierProfile Supplier { get; set; } = default!;
}
