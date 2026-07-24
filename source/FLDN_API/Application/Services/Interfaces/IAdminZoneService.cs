namespace Application;

public interface IAdminZoneService
{
    Task<List<DistributionZoneResponse>> GetZonesAsync(CancellationToken ct = default);
    Task<List<DistrictResponse>> GetDistrictsAsync(CancellationToken ct = default);
    Task<DistributionZoneResponse> CreateZoneAsync(CreateZoneRequest request, CancellationToken ct = default);
    Task UpdateZoneAsync(Guid id, UpdateZoneRequest request, CancellationToken ct = default);
    Task DeleteZoneAsync(Guid id, CancellationToken ct = default);
}
