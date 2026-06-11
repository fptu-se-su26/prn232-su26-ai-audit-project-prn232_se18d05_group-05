namespace Domain;

public class SupplyRequestStatusHistory : EntityBase<Guid>
{
    public Guid SupplyRequestId { get; set; }
    public SupplyRequestStatus Status { get; set; }
    public string? Note { get; set; }
    public Guid? CreatedBy { get; set; }

    // Navigation
    public SupplyRequest SupplyRequest { get; set; } = default!;
    public User? CreatedByUser { get; set; }
}
