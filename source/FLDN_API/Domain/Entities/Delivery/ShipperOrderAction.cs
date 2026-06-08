namespace Domain;

public class ShipperOrderAction : EntityBase<int>
{
    public int DeliveryId { get; set; }
    public int ShipperId { get; set; }
    public ShipperActionType Action { get; set; }
    public string? Reason { get; set; }

    // Navigation
    public Delivery Delivery { get; set; } = default!;
    public ShipperProfile Shipper { get; set; } = default!;
}
