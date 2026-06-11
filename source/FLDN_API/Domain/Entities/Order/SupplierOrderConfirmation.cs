namespace Domain;

public class SupplierConfirmation : EntityBase<Guid>
{
    public Guid SupplyRequestId { get; set; }
    public Guid SupplierId { get; set; }
    public ConfirmationStatus Status { get; set; }
    public string? Reason { get; set; }
    public DateTimeOffset? ConfirmedAt { get; set; }

    // Navigation
    public SupplyRequest SupplyRequest { get; set; } = default!;
    public SupplierProfile Supplier { get; set; } = default!;
}
