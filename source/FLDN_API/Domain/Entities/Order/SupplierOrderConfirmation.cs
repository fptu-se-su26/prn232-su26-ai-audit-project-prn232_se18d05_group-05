namespace Domain;

public class SupplierOrderConfirmation : EntityBase<Guid>
{
    public Guid OrderId { get; set; }
    public Guid SupplierId { get; set; }
    public ConfirmationStatus Status { get; set; }
    public string? Reason { get; set; }
    public DateTimeOffset? ConfirmedAt { get; set; }

    // Navigation
    public Order Order { get; set; } = default!;
    public SupplierProfile Supplier { get; set; } = default!;
}
