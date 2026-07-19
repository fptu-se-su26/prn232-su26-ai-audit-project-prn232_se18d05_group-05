namespace Application;

public interface ILogisticsService
{
    Task<LogisticsAcceptResponse> AcceptShipmentAsync(Guid userId, Guid shipmentId, CancellationToken ct = default);
}
