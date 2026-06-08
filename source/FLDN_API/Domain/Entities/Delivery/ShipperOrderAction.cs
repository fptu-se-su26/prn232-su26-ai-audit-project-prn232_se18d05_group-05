namespace Domain;

public class ShipperOrderAction : EntityBase<Guid>
{
    public Guid DeliveryId { get; set; }
    public Guid ShipperId { get; set; }
    public ShipperActionType Action { get; set; }
    public string? Reason { get; set; }

    // Navigation
    public Delivery Delivery { get; set; } = default!;
    public ShipperProfile Shipper { get; set; } = default!;
}
