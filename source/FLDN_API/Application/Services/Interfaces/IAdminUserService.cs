namespace Application;

public interface IAdminUserService
{
    Task<PagedResult<UserResponse>> GetUsersAsync(UserListRequest request, CancellationToken ct = default);
    Task<UserResponse> GetUserByIdAsync(Guid id, CancellationToken ct = default);
    Task LockUserAsync(Guid id, CancellationToken ct = default);
    Task UnlockUserAsync(Guid id, CancellationToken ct = default);
    Task ResetPasswordAsync(Guid id, AdminResetPasswordRequest request, CancellationToken ct = default);
}
