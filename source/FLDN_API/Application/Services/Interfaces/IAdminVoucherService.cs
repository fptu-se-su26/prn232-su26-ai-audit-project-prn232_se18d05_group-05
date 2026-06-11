namespace Application;

public interface IAdminVoucherService
{
    Task<PagedResult<VoucherResponse>> GetVouchersAsync(VoucherListRequest request, CancellationToken ct = default);
    Task<CreateVoucherResponse> CreateVoucherAsync(CreateVoucherRequest request, Guid createdBy, CancellationToken ct = default);
    Task UpdateVoucherAsync(Guid id, UpdateVoucherRequest request, CancellationToken ct = default);
    Task<bool> ToggleVoucherAsync(Guid id, CancellationToken ct = default);
}
