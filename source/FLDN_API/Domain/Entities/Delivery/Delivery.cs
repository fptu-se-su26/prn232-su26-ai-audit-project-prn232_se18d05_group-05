namespace Domain;

public class Shipment : EntityBase<Guid>
{
    public Guid SupplyRequestId { get; set; }
    public Guid? LogisticsOperatorId { get; set; }
    public Guid? ZoneId { get; set; }
    public ShipmentStatus Status { get; set; }
    public DateTimeOffset? AssignedAt { get; set; }
    public DateTimeOffset? PickedUpAt { get; set; }
    public DateTimeOffset? ArrivedAt { get; set; }
    public DateTimeOffset? FailedAt { get; set; }
    public string? FailReason { get; set; }
    public string? ConfirmImageUrl { get; set; }
    public decimal ShippingFee { get; set; }
    public decimal? EstimatedDistance { get; set; }
    public string? Note { get; set; }

    // Navigation
    public SupplyRequest SupplyRequest { get; set; } = default!;
    public LogisticsProfile? LogisticsOperator { get; set; }
    public DistributionZone? Zone { get; set; }
    public ICollection<LogisticsAction> LogisticsActions { get; set; } = [];
    public ICollection<ShipmentStatusHistory> StatusHistories { get; set; } = [];
}
