using Mapster;

namespace Application;

[RegisterService(typeof(IAdminSupplierService))]
public sealed class AdminSupplierService(
    IUnitOfWork unitOfWork
) : IAdminSupplierService
{
    public async Task<PagedResult<SupplierListResponse>> GetSuppliersAsync(SupplierListRequest request, CancellationToken ct = default)
    {
        var query = unitOfWork.SupplierProfiles.GetQueryable()
            .Where(s => !s.IsDeleted)
            .AsNoTracking();

        if (request.Status.HasValue)
        {
            query = query.Where(s => s.Status == request.Status.Value);
        }

        var totalCount = await query.CountAsync(ct);

        var suppliers = await query
            .OrderByDescending(s => s.CreatedAt)
            .Skip((request.Page - 1) * request.PageSize)
            .Take(request.PageSize)
            .Select(s => new SupplierListResponse
            {
                SupplierId = s.Id,
                BusinessName = s.BusinessName,
                Status = s.Status,
                CreatedAt = s.CreatedAt
            })
            .ToListAsync(ct);

        return new PagedResult<SupplierListResponse>
        {
            Items = suppliers,
            TotalCount = totalCount,
            Page = request.Page,
            PageSize = request.PageSize
        };
    }

    public async Task<SupplierDetailResponse> GetSupplierByIdAsync(Guid id, CancellationToken ct = default)
    {
        var supplier = await unitOfWork.SupplierProfiles.GetByIdAsync(id);
        return supplier.Adapt<SupplierDetailResponse>();
    }

    public async Task ApproveSupplierAsync(Guid id, Guid approvedBy, CancellationToken ct = default)
    {
        var supplier = await unitOfWork.SupplierProfiles.GetByIdAsync(id);

        if (supplier.Status != SupplierStatus.Pending)
            throw new ConflictException("Supplier is not in pending status.");

        supplier.Status = SupplierStatus.Approved;
        supplier.ApprovedBy = approvedBy;
        supplier.ApprovedAt = DateTimeOffset.UtcNow;
        unitOfWork.SupplierProfiles.Update(supplier);
        await unitOfWork.EnsureSaveAsync(ct);
    }

    public async Task RejectSupplierAsync(Guid id, RejectSupplierRequest request, CancellationToken ct = default)
    {
        var supplier = await unitOfWork.SupplierProfiles.GetByIdAsync(id);

        if (supplier.Status != SupplierStatus.Pending)
            throw new ConflictException("Supplier is not in pending status.");

        supplier.Status = SupplierStatus.Rejected;
        supplier.RejectedReason = request.Reason;
        unitOfWork.SupplierProfiles.Update(supplier);
        await unitOfWork.EnsureSaveAsync(ct);
    }

    public async Task UpdateSupplierFeeAsync(Guid id, UpdateSupplierFeeRequest request, CancellationToken ct = default)
    {
        var supplier = await unitOfWork.SupplierProfiles.GetByIdAsync(id);

        supplier.ServiceFeeRate = request.ServiceFeeRate;
        supplier.DiscountRate = request.DiscountRate;
        unitOfWork.SupplierProfiles.Update(supplier);
        await unitOfWork.EnsureSaveAsync(ct);
    }
}
