namespace Application;

public interface IAdminLogisticsService
{
    Task<PagedResult<LogisticsListResponse>> GetOperatorsAsync(LogisticsListRequest request, CancellationToken ct = default);
    Task<LogisticsDetailResponse> GetOperatorByIdAsync(Guid id, CancellationToken ct = default);
    Task ActivateOperatorAsync(Guid id, Guid approvedBy, CancellationToken ct = default);
    Task DeactivateOperatorAsync(Guid id, CancellationToken ct = default);
}
