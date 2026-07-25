using Microsoft.EntityFrameworkCore;

namespace Application;

[RegisterService(typeof(IAdminDashboardService))]
public sealed class AdminDashboardService(IUnitOfWork unitOfWork) : IAdminDashboardService
{
    public async Task<AdminDashboardResponse> GetDashboardAsync(CancellationToken ct = default)
    {
        var users = unitOfWork.Users.GetQueryable().AsNoTracking();
        var suppliers = unitOfWork.SupplierProfiles.GetQueryable().Where(s => !s.IsDeleted).AsNoTracking();
        var logistics = unitOfWork.Repository<LogisticsProfile>().GetQueryable().Where(l => !l.IsDeleted).AsNoTracking();
        var orders = unitOfWork.Repository<SupplyRequest>().GetQueryable().AsNoTracking();
        var zones = unitOfWork.Repository<DistributionZone>().GetQueryable().Where(z => !z.IsDeleted).AsNoTracking();

        return new AdminDashboardResponse
        {
            TotalUsers       = await users.CountAsync(ct),
            LockedUsers      = await users.CountAsync(u => !u.IsActive, ct),

            TotalSuppliers    = await suppliers.CountAsync(ct),
            PendingSuppliers  = await suppliers.CountAsync(s => s.Status == SupplierStatus.Pending, ct),
            ApprovedSuppliers = await suppliers.CountAsync(s => s.Status == SupplierStatus.Approved, ct),
            RejectedSuppliers = await suppliers.CountAsync(s => s.Status == SupplierStatus.Rejected, ct),

            TotalLogisticsOperators = await logistics.CountAsync(ct),
            AvailableOperators      = await logistics.CountAsync(l => l.Status == LogisticsOperatorStatus.Available, ct),

            TotalOrders      = await orders.CountAsync(ct),
            PendingOrders    = await orders.CountAsync(o => o.Status == SupplyRequestStatus.Pending, ct),
            CompletedOrders  = await orders.CountAsync(o => o.Status == SupplyRequestStatus.Completed, ct),
            CancelledOrders  = await orders.CountAsync(o => o.Status == SupplyRequestStatus.Cancelled, ct),
            TotalRevenue     = await orders.Where(o => o.Status == SupplyRequestStatus.Completed).SumAsync(o => o.FinalAmount, ct),

            TotalZones  = await zones.CountAsync(ct),
            ActiveZones = await zones.CountAsync(z => z.IsActive, ct),
        };
    }
}
