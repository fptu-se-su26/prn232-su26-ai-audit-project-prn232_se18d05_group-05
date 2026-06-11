namespace Application;

[RegisterService(typeof(IAdminUserService))]
public sealed class AdminUserService(
    IUnitOfWork unitOfWork,
    IPasswordHasher passwordHasher
) : IAdminUserService
{
    public async Task<PagedResult<UserResponse>> GetUsersAsync(UserListRequest request, CancellationToken ct = default)
    {
        var query = unitOfWork.Users.GetQueryable()
            .AsNoTracking();

        if (!string.IsNullOrWhiteSpace(request.Role))
        {
            query = query.Where(u => u.UserRoles.Any(ur => ur.Role.RoleName == request.Role));
        }

        if (request.IsActive.HasValue)
        {
            query = query.Where(u => u.IsActive == request.IsActive.Value);
        }

        var totalCount = await query.CountAsync(ct);

        var users = await query
            .Include(u => u.UserRoles).ThenInclude(ur => ur.Role)
            .OrderByDescending(u => u.CreatedAt)
            .Skip((request.Page - 1) * request.PageSize)
            .Take(request.PageSize)
            .ToListAsync(ct);

        var items = users.Select(user => new UserResponse
        {
            UserId = user.Id,
            FullName = user.FullName,
            Email = user.Email,
            Phone = user.Phone,
            Role = user.UserRoles.FirstOrDefault()?.Role?.RoleName,
            IsActive = user.IsActive,
            CreatedAt = user.CreatedAt
        }).ToList();

        return new PagedResult<UserResponse>
        {
            Items = items,
            TotalCount = totalCount,
            Page = request.Page,
            PageSize = request.PageSize
        };
    }

    public async Task<UserResponse> GetUserByIdAsync(Guid id, CancellationToken ct = default)
    {
        var user = await unitOfWork.Users.FindAsync(
            u => u.Id == id, ct, nameof(User.UserRoles))
            ?? throw new NotFoundException("User not found.");

        var roleId = user.UserRoles.FirstOrDefault()?.RoleId;
        string? roleName = null;
        if (roleId.HasValue)
        {
            var role = await unitOfWork.Repository<Role>().GetByIdAsync(roleId.Value);
            roleName = role?.RoleName;
        }

        return new UserResponse
        {
            UserId = user.Id,
            FullName = user.FullName,
            Email = user.Email,
            Phone = user.Phone,
            Role = roleName,
            IsActive = user.IsActive,
            CreatedAt = user.CreatedAt
        };
    }

    public async Task LockUserAsync(Guid id, CancellationToken ct = default)
    {
        var user = await unitOfWork.Users.GetByIdAsync(id);
        if (!user.IsActive)
            throw new ConflictException("Account is already locked.");

        user.IsActive = false;
        unitOfWork.Users.Update(user);
        await unitOfWork.EnsureSaveAsync(ct);
    }

    public async Task UnlockUserAsync(Guid id, CancellationToken ct = default)
    {
        var user = await unitOfWork.Users.GetByIdAsync(id);
        if (user.IsActive)
            throw new ConflictException("Account is already active.");

        user.IsActive = true;
        unitOfWork.Users.Update(user);
        await unitOfWork.EnsureSaveAsync(ct);
    }

    public async Task ResetPasswordAsync(Guid id, AdminResetPasswordRequest request, CancellationToken ct = default)
    {
        var user = await unitOfWork.Users.GetByIdAsync(id);

        user.PasswordHash = passwordHasher.Hash(request.NewPassword);
        unitOfWork.Users.Update(user);
        await unitOfWork.EnsureSaveAsync(ct);
    }
}
