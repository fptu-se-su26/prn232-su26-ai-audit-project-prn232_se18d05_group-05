using Contract;
using Contract.LogisticsOperator;

namespace Application;

public interface ILogisticsOperatorService
{
    Task<PagedResult<ShipmentSummaryResponse>> GetShipmentsAsync(
        ShipmentListRequest request,
        CancellationToken cancellationToken);

    Task<AcceptShipmentResponse> AcceptShipmentAsync(
        Guid shipmentId,
        CancellationToken cancellationToken);

    Task<ShipmentTrackingResponse> UpdateShipmentStatusAsync(
        Contract.LogisticsOperator.UpdateShipmentStatusRequest request,
        CancellationToken cancellationToken);

    Task<DeliveryCompletedResponse> ConfirmDeliveryAsync(
        ConfirmDeliveryRequest request,
        CancellationToken cancellationToken);
}
