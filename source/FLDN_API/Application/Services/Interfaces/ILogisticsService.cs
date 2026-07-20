namespace Application;

public interface ILogisticsService
{
    Task<LogisticsAcceptResponse> AcceptShipmentAsync(Guid userId, Guid shipmentId, CancellationToken ct = default);
    Task<UpdateShipmentStatusResponse> UpdateShipmentStatusAsync(Guid userId, Guid shipmentId, UpdateShipmentStatusRequest request, CancellationToken ct = default);
    Task<LogisticsCompleteResponse> CompleteShipmentAsync(Guid userId, Guid shipmentId, string confirmImageUrl, CancellationToken ct = default);
}


