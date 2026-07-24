using Microsoft.EntityFrameworkCore;

namespace Application;

[RegisterService(typeof(IAdminLogisticsService))]
public sealed class AdminLogisticsService(IUnitOfWork unitOfWork) : IAdminLogisticsService
{
    public async Task<PagedResult<LogisticsListResponse>> GetOperatorsAsync(LogisticsListRequest request, CancellationToken ct = default)
    {
        var query = unitOfWork.Repository<LogisticsProfile>().GetQueryable()
            .Include(l => l.User)
            .Where(l => !l.IsDeleted)
            .AsNoTracking();

        if (request.Status.HasValue)
            query = query.Where(l => l.Status == request.Status.Value);

        var totalCount = await query.CountAsync(ct);

        var items = await query
            .OrderByDescending(l => l.CreatedAt)
            .Skip((request.Page - 1) * request.PageSize)
            .Take(request.PageSize)
            .Select(l => new LogisticsListResponse
            {
                LogisticsId    = l.Id,
                FullName       = l.User.FullName,
                Email          = l.User.Email,
                Phone          = l.User.Phone,
                VehicleType    = l.VehicleType,
                LicensePlate   = l.LicensePlate,
                Status         = l.Status,
                TotalShipments = l.TotalShipments,
                CreatedAt      = l.CreatedAt,
            })
            .ToListAsync(ct);

        return new PagedResult<LogisticsListResponse>
        {
            Items = items, TotalCount = totalCount, Page = request.Page, PageSize = request.PageSize
        };
    }

    public async Task<LogisticsDetailResponse> GetOperatorByIdAsync(Guid id, CancellationToken ct = default)
    {
        var op = await unitOfWork.Repository<LogisticsProfile>().GetQueryable()
            .Include(l => l.User)
            .Include(l => l.ApprovedByUser)
            .FirstOrDefaultAsync(l => l.Id == id, ct)
            ?? throw new NotFoundException("Logistics operator not found.");

        return new LogisticsDetailResponse
        {
            LogisticsId    = op.Id,
            FullName       = op.User.FullName,
            Email          = op.User.Email,
            Phone          = op.User.Phone,
            IdentityCard   = op.IdentityCard,
            VehicleType    = op.VehicleType,
            LicensePlate   = op.LicensePlate,
            Status         = op.Status,
            TotalShipments = op.TotalShipments,
            ApprovedByName = op.ApprovedByUser?.FullName,
            ApprovedAt     = op.ApprovedAt,
            CreatedAt      = op.CreatedAt,
        };
    }

    public async Task ActivateOperatorAsync(Guid id, Guid approvedBy, CancellationToken ct = default)
    {
        var op = await unitOfWork.Repository<LogisticsProfile>().GetByIdAsync(id);

        op.Status     = LogisticsOperatorStatus.Available;
        op.ApprovedBy = approvedBy;
        op.ApprovedAt = DateTimeOffset.UtcNow;
        unitOfWork.Repository<LogisticsProfile>().Update(op);
        await unitOfWork.EnsureSaveAsync(ct);
    }

    public async Task DeactivateOperatorAsync(Guid id, CancellationToken ct = default)
    {
        var op = await unitOfWork.Repository<LogisticsProfile>().GetByIdAsync(id);

        op.Status = LogisticsOperatorStatus.Off;
        unitOfWork.Repository<LogisticsProfile>().Update(op);
        await unitOfWork.EnsureSaveAsync(ct);
    }
}
