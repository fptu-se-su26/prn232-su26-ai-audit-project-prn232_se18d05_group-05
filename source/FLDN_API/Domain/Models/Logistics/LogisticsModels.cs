using Domain;

namespace Contract;

public sealed class LogisticsAcceptResponse
{
    public string Message { get; set; } = "Đã nhận đơn";
    public Guid DeliveryId { get; set; }
    public string Status { get; set; } = "Assigned";
}

public sealed class UpdateShipmentStatusRequest
{
    public string Status { get; set; } = default!;
    public string? Note { get; set; }
}

public sealed class UpdateShipmentStatusResponse
{
    public Guid DeliveryId { get; set; }
    public string Status { get; set; } = default!;
    public DateTimeOffset UpdatedAt { get; set; }
}

