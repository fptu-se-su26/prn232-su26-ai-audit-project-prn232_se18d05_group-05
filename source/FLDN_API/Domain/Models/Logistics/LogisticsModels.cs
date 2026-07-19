using Domain;

namespace Contract;

public sealed class LogisticsAcceptResponse
{
    public string Message { get; set; } = "Đã nhận đơn";
    public Guid DeliveryId { get; set; }
    public string Status { get; set; } = "Assigned";
}
