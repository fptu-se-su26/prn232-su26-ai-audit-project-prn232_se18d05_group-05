namespace Application;

public interface IAdminDashboardService
{
    Task<AdminDashboardResponse> GetDashboardAsync(CancellationToken ct = default);
}
