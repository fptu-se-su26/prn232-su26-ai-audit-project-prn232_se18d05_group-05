namespace Application;

[RegisterService(typeof(IDistributionPointService))]
public sealed class DistributionPointService(
    IUnitOfWork unitOfWork
) : IDistributionPointService
{
    public async Task<DistributionPointProfileResponse> GetMyProfileAsync(Guid userId, CancellationToken ct = default)
        => await GetProfileByUserIdAsync(userId, ct);

    public async Task<DistributionPointProfileResponse> GetProfileByUserIdAsync(Guid userId, CancellationToken ct = default)
    {
        return await unitOfWork.Repository<DistributionPointProfile>().GetQueryable()
            .AsNoTracking()
            .Where(dp => dp.UserId == userId)
            .Select(dp => new DistributionPointProfileResponse
            {
                ProfileId = dp.Id,
                UserId = dp.UserId,
                PointName = dp.PointName,
                PointType = dp.PointType,
                Capacity = dp.Capacity,
                CapacityUnit = dp.CapacityUnit,
                Address = dp.Address,
                DistrictId = dp.DistrictId,
                DistrictName = dp.District != null ? dp.District.Name : null,
                ContactPerson = dp.ContactPerson,
                ContactPhone = dp.ContactPhone,
                OperatingHours = dp.OperatingHours,
                CreatedAt = dp.CreatedAt
            })
            .FirstOrDefaultAsync(ct)
            ?? throw new NotFoundException("Điểm phân phối chưa khai báo hồ sơ.");
    }

    public async Task<DistributionPointProfileResponse> UpsertMyProfileAsync(Guid userId, UpsertDistributionPointProfileRequest request, CancellationToken ct = default)
    {
        if (request.DistrictId.HasValue &&
            !await unitOfWork.Repository<District>().AnyAsync(d => d.Id == request.DistrictId.Value, ct))
            throw new NotFoundException("Không tìm thấy quận/huyện.");

        var profile = await unitOfWork.Repository<DistributionPointProfile>()
            .FindAsync(dp => dp.UserId == userId, ct);

        if (profile is null)
        {
            profile = new DistributionPointProfile
            {
                Id = Guid.NewGuid(),
                UserId = userId,
                IsDeleted = false
            };
            ApplyRequest(profile, request);
            await unitOfWork.Repository<DistributionPointProfile>().AddAsync(profile);
        }
        else
        {
            ApplyRequest(profile, request);
            unitOfWork.Repository<DistributionPointProfile>().Update(profile);
        }

        await unitOfWork.EnsureSaveAsync(ct);

        return await GetProfileByUserIdAsync(userId, ct);
    }

    public async Task<PagedResult<DistributionPointListResponse>> GetDistributionPointsAsync(DistributionPointListRequest request, CancellationToken ct = default)
    {
        // Liệt kê theo user có role DistributionPoint để admin thấy cả điểm chưa khai báo hồ sơ
        var query = unitOfWork.Users.GetQueryable()
            .AsNoTracking()
            .Where(u => !u.IsDeleted && u.UserRoles.Any(ur => ur.Role.RoleName == nameof(RoleType.DistributionPoint)));

        if (request.PointType.HasValue)
            query = query.Where(u => u.DistributionPointProfile != null && u.DistributionPointProfile.PointType == request.PointType.Value);

        if (request.DistrictId.HasValue)
            query = query.Where(u => u.DistributionPointProfile != null && u.DistributionPointProfile.DistrictId == request.DistrictId.Value);

        if (!string.IsNullOrWhiteSpace(request.Search))
        {
            var search = request.Search.Trim();
            query = query.Where(u =>
                u.FullName.Contains(search) ||
                u.Email.Contains(search) ||
                (u.DistributionPointProfile != null && u.DistributionPointProfile.PointName.Contains(search)));
        }

        var totalCount = await query.CountAsync(ct);

        var items = await query
            .OrderByDescending(u => u.CreatedAt)
            .Skip((request.Page - 1) * request.PageSize)
            .Take(request.PageSize)
            .Select(u => new DistributionPointListResponse
            {
                UserId = u.Id,
                FullName = u.FullName,
                Email = u.Email,
                Phone = u.Phone,
                IsActive = u.IsActive,
                ProfileId = u.DistributionPointProfile != null ? u.DistributionPointProfile.Id : null,
                PointName = u.DistributionPointProfile != null ? u.DistributionPointProfile.PointName : null,
                PointType = u.DistributionPointProfile != null ? u.DistributionPointProfile.PointType : null,
                Capacity = u.DistributionPointProfile != null ? u.DistributionPointProfile.Capacity : null,
                CapacityUnit = u.DistributionPointProfile != null ? u.DistributionPointProfile.CapacityUnit : null,
                DistrictName = u.DistributionPointProfile != null && u.DistributionPointProfile.District != null
                    ? u.DistributionPointProfile.District.Name
                    : null,
                HasProfile = u.DistributionPointProfile != null
            })
            .ToListAsync(ct);

        return new PagedResult<DistributionPointListResponse>
        {
            Items = items,
            TotalCount = totalCount,
            Page = request.Page,
            PageSize = request.PageSize
        };
    }

    private static void ApplyRequest(DistributionPointProfile profile, UpsertDistributionPointProfileRequest request)
    {
        profile.PointName = request.PointName.Trim();
        profile.PointType = request.PointType;
        profile.Capacity = request.Capacity;
        profile.CapacityUnit = string.IsNullOrWhiteSpace(request.CapacityUnit) ? null : request.CapacityUnit.Trim();
        profile.Address = string.IsNullOrWhiteSpace(request.Address) ? null : request.Address.Trim();
        profile.DistrictId = request.DistrictId;
        profile.ContactPerson = string.IsNullOrWhiteSpace(request.ContactPerson) ? null : request.ContactPerson.Trim();
        profile.ContactPhone = string.IsNullOrWhiteSpace(request.ContactPhone) ? null : request.ContactPhone.Trim();
        profile.OperatingHours = string.IsNullOrWhiteSpace(request.OperatingHours) ? null : request.OperatingHours.Trim();
    }
}
