namespace Domain;

public class ShipmentStatusHistory : EntityBase<Guid>
{
    public Guid ShipmentId { get; set; }
    public ShipmentStatus Status { get; set; }
    public string? Note { get; set; }
    public string? ImageUrl { get; set; }
    public Guid? UpdatedBy { get; set; }

    // Navigation
    public Shipment Shipment { get; set; } = default!;
    public User? UpdatedByUser { get; set; }
}
