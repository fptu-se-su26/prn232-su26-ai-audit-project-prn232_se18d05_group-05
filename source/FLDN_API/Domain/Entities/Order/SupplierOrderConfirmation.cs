namespace Domain;

public class SupplierOrderConfirmation : EntityBase<int>
{
    public int OrderId { get; set; }
    public int SupplierId { get; set; }
    public ConfirmationStatus Status { get; set; }
    public string? Reason { get; set; }
    public DateTimeOffset? ConfirmedAt { get; set; }

    // Navigation
    public Order Order { get; set; } = default!;
    public SupplierProfile Supplier { get; set; } = default!;
}
