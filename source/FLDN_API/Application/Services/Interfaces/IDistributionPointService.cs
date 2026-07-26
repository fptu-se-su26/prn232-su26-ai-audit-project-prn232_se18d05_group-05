namespace Application;

public interface IDistributionPointService
{
    Task<DistributionPointProfileResponse> GetMyProfileAsync(Guid userId, CancellationToken ct = default);
    Task<DistributionPointProfileResponse> UpsertMyProfileAsync(Guid userId, UpsertDistributionPointProfileRequest request, CancellationToken ct = default);
    Task<PagedResult<DistributionPointListResponse>> GetDistributionPointsAsync(DistributionPointListRequest request, CancellationToken ct = default);
    Task<DistributionPointProfileResponse> GetProfileByUserIdAsync(Guid userId, CancellationToken ct = default);
}
