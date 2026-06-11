namespace Application;

public interface IAdminSupplierService
{
    Task<PagedResult<SupplierListResponse>> GetSuppliersAsync(SupplierListRequest request, CancellationToken ct = default);
    Task<SupplierDetailResponse> GetSupplierByIdAsync(Guid id, CancellationToken ct = default);
    Task ApproveSupplierAsync(Guid id, Guid approvedBy, CancellationToken ct = default);
    Task RejectSupplierAsync(Guid id, RejectSupplierRequest request, CancellationToken ct = default);
    Task UpdateSupplierFeeAsync(Guid id, UpdateSupplierFeeRequest request, CancellationToken ct = default);
}
