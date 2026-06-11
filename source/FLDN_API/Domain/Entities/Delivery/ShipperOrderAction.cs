namespace Domain;

public class LogisticsAction : EntityBase<Guid>
{
    public Guid ShipmentId { get; set; }
    public Guid LogisticsOperatorId { get; set; }
    public LogisticsActionType Action { get; set; }
    public string? Reason { get; set; }

    // Navigation
    public Shipment Shipment { get; set; } = default!;
    public LogisticsProfile LogisticsOperator { get; set; } = default!;
}
