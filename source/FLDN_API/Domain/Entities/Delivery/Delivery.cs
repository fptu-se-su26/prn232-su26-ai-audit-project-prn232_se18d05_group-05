namespace Domain;

public class Delivery
{
    public int DeliveryId { get; set; }
    public int OrderId { get; set; }
    public int? ShipperId { get; set; }
    public int? ZoneId { get; set; }
    public DeliveryStatus Status { get; set; }
    public DateTimeOffset? AssignedAt { get; set; }
    public DateTimeOffset? PickedUpAt { get; set; }
    public DateTimeOffset? DeliveredAt { get; set; }
    public DateTimeOffset? FailedAt { get; set; }
    public string? FailReason { get; set; }
    public string? ConfirmImageUrl { get; set; }
    public decimal ShippingFee { get; set; }
    public decimal ShipperEarning { get; set; }
    public decimal? EstimatedDistance { get; set; }
    public string? Note { get; set; }

    // Navigation
    public Order Order { get; set; } = default!;
    public ShipperProfile? Shipper { get; set; }
    public DeliveryZone? Zone { get; set; }
    public ICollection<ShipperOrderAction> ShipperOrderActions { get; set; } = [];
    public ICollection<DeliveryStatusHistory> StatusHistories { get; set; } = [];
}
