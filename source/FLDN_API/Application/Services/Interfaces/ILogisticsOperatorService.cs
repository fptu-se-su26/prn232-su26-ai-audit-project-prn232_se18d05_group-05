using Contract;

namespace Application;

public interface ILogisticsOperatorService
{
    Task<PagedResult<ShipmentSummaryResponse>> GetShipmentsAsync(
        ShipmentListRequest request,
        CancellationToken cancellationToken);
}
