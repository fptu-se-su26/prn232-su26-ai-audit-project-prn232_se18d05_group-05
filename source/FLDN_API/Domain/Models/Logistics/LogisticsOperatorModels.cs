using Domain;

namespace Contract.LogisticsOperator;

public class PagedRequest
{
    public int Page { get; set; } = 1;
    public int PageSize { get; set; } = 10;
}

public sealed class ShipmentListRequest : PagedRequest
{
    public string? Search { get; set; }
    public ShipmentStatus? Status { get; set; }
    public DateTimeOffset? FromDate { get; set; }
    public DateTimeOffset? ToDate { get; set; }
    public Guid? UserId { get; set; }
}

public sealed class ShipmentSummaryResponse
{
    public Guid ShipmentId { get; set; }
    public Guid OrderId { get; set; }
    public string RetailerName { get; set; } = default!;
    public string ReceiverName { get; set; } = default!;
    public string ReceiverPhone { get; set; } = default!;
    public string DeliveryAddress { get; set; } = default!;
    public DateTimeOffset? EstimatedDeliveryDate { get; set; }
    public ShipmentStatus ShipmentStatus { get; set; }
    public decimal TotalItems { get; set; }
    public DateTimeOffset? AssignedAt { get; set; }
}

public sealed class AcceptShipmentRequest
{
    public Guid ShipmentId { get; set; }
}

public sealed class AcceptShipmentResponse
{
    public Guid ShipmentId { get; set; }
    public DateTimeOffset AcceptedAt { get; set; }
    public string CurrentStatus { get; set; } = default!;
}

public sealed class UpdateShipmentStatusRequest
{
    public Guid ShipmentId { get; set; }
    public ShipmentStatus ShipmentStatus { get; set; }
    public decimal? Latitude { get; set; }
    public decimal? Longitude { get; set; }
    public string? Note { get; set; }
}

public sealed class ShipmentTrackingResponse
{
    public Guid ShipmentId { get; set; }
    public ShipmentStatus CurrentStatus { get; set; }
    public DateTimeOffset UpdatedAt { get; set; }
    public Guid UpdatedBy { get; set; }
}

public sealed class ConfirmDeliveryRequest
{
    public Guid ShipmentId { get; set; }
    public string ReceiverName { get; set; } = default!;
    public string ReceiverPhone { get; set; } = default!;
    public string? DeliveryNote { get; set; }
    public string? DeliveryImageUrl { get; set; }
}

public sealed class DeliveryCompletedResponse
{
    public Guid ShipmentId { get; set; }
    public ShipmentStatus ShipmentStatus { get; set; }
    public DateTimeOffset DeliveredAt { get; set; }
    public Guid DeliveredBy { get; set; }
}
