namespace Application;

[RegisterService(typeof(IAddressService))]
public sealed class AddressService(
    IUnitOfWork unitOfWork
) : IAddressService
{
    public async Task<List<AddressResponse>> GetAddressesAsync(Guid userId, CancellationToken ct = default)
    {
        return await unitOfWork.Repository<Address>().GetQueryable()
            .AsNoTracking()
            .Where(a => a.UserId == userId && !a.IsDeleted)
            .OrderByDescending(a => a.IsDefault)
            .ThenByDescending(a => a.CreatedAt)
            .Select(a => new AddressResponse
            {
                AddressId = a.Id,
                ReceiverName = a.ReceiverName,
                ReceiverPhone = a.ReceiverPhone,
                FullAddress = a.FullAddress,
                DistrictId = a.DistrictId,
                DistrictName = a.District.Name,
                IsDefault = a.IsDefault
            })
            .ToListAsync(ct);
    }

    public async Task<List<DistrictResponse>> GetDistrictsAsync(CancellationToken ct = default)
    {
        return await unitOfWork.Repository<District>().GetQueryable()
            .AsNoTracking()
            .OrderBy(d => d.Name)
            .Select(d => new DistrictResponse { DistrictId = d.Id, Name = d.Name, Code = d.Code })
            .ToListAsync(ct);
    }

    public async Task<AddressResponse> CreateAddressAsync(Guid userId, CreateAddressRequest request, CancellationToken ct = default)
    {
        await EnsureDistrictExistsAsync(request.DistrictId, ct);

        var hasAnyAddress = await unitOfWork.Repository<Address>()
            .AnyAsync(a => a.UserId == userId && !a.IsDeleted, ct);

        // Địa chỉ đầu tiên luôn là mặc định, người dùng không phải bấm thêm bước nào
        var isDefault = request.IsDefault || !hasAnyAddress;

        if (isDefault)
            await ClearDefaultAddressesAsync(userId, ct);

        var address = new Address
        {
            Id = Guid.NewGuid(),
            UserId = userId,
            ReceiverName = request.ReceiverName.Trim(),
            ReceiverPhone = request.ReceiverPhone.Trim(),
            FullAddress = request.FullAddress.Trim(),
            DistrictId = request.DistrictId,
            IsDefault = isDefault,
            IsActive = true,
            IsDeleted = false
        };

        await unitOfWork.Repository<Address>().AddAsync(address);
        await unitOfWork.EnsureSaveAsync(ct);

        return await GetAddressByIdAsync(userId, address.Id, ct);
    }

    public async Task<AddressResponse> UpdateAddressAsync(Guid userId, Guid id, UpdateAddressRequest request, CancellationToken ct = default)
    {
        var address = await GetOwnedAddressAsync(userId, id, ct);
        await EnsureDistrictExistsAsync(request.DistrictId, ct);

        if (request.IsDefault && !address.IsDefault)
            await ClearDefaultAddressesAsync(userId, ct);

        address.ReceiverName = request.ReceiverName.Trim();
        address.ReceiverPhone = request.ReceiverPhone.Trim();
        address.FullAddress = request.FullAddress.Trim();
        address.DistrictId = request.DistrictId;

        // Không cho bỏ mặc định trực tiếp — phải chỉ định địa chỉ mặc định khác
        if (request.IsDefault)
            address.IsDefault = true;

        unitOfWork.Repository<Address>().Update(address);
        await unitOfWork.EnsureSaveAsync(ct);

        return await GetAddressByIdAsync(userId, address.Id, ct);
    }

    public async Task<AddressResponse> SetDefaultAddressAsync(Guid userId, Guid id, CancellationToken ct = default)
    {
        var address = await GetOwnedAddressAsync(userId, id, ct);

        if (!address.IsDefault)
        {
            await ClearDefaultAddressesAsync(userId, ct);

            address.IsDefault = true;
            unitOfWork.Repository<Address>().Update(address);
            await unitOfWork.EnsureSaveAsync(ct);
        }

        return await GetAddressByIdAsync(userId, address.Id, ct);
    }

    public async Task DeleteAddressAsync(Guid userId, Guid id, CancellationToken ct = default)
    {
        var address = await GetOwnedAddressAsync(userId, id, ct);

        // Xoá mềm: các yêu cầu cung ứng cũ vẫn trỏ tới địa chỉ này
        address.IsDeleted = true;
        address.DeletedAt = DateTimeOffset.UtcNow;
        address.IsActive = false;
        address.IsDefault = false;
        unitOfWork.Repository<Address>().Update(address);

        // Xoá địa chỉ mặc định thì đẩy địa chỉ mới nhất còn lại lên làm mặc định
        var replacement = await unitOfWork.Repository<Address>().GetQueryable()
            .Where(a => a.UserId == userId && !a.IsDeleted && a.Id != id)
            .OrderByDescending(a => a.CreatedAt)
            .FirstOrDefaultAsync(ct);

        if (replacement is not null && !await HasDefaultAddressAsync(userId, id, ct))
        {
            replacement.IsDefault = true;
            unitOfWork.Repository<Address>().Update(replacement);
        }

        await unitOfWork.EnsureSaveAsync(ct);
    }

    private async Task<AddressResponse> GetAddressByIdAsync(Guid userId, Guid id, CancellationToken ct)
    {
        return await unitOfWork.Repository<Address>().GetQueryable()
            .AsNoTracking()
            .Where(a => a.Id == id && a.UserId == userId && !a.IsDeleted)
            .Select(a => new AddressResponse
            {
                AddressId = a.Id,
                ReceiverName = a.ReceiverName,
                ReceiverPhone = a.ReceiverPhone,
                FullAddress = a.FullAddress,
                DistrictId = a.DistrictId,
                DistrictName = a.District.Name,
                IsDefault = a.IsDefault
            })
            .FirstOrDefaultAsync(ct)
            ?? throw new NotFoundException("Không tìm thấy địa chỉ giao hàng.");
    }

    private async Task<Address> GetOwnedAddressAsync(Guid userId, Guid id, CancellationToken ct)
    {
        var address = await unitOfWork.Repository<Address>()
            .FindAsync(a => a.Id == id && !a.IsDeleted, ct)
            ?? throw new NotFoundException("Không tìm thấy địa chỉ giao hàng.");

        if (address.UserId != userId)
            throw new ForbiddenException("Bạn không có quyền thao tác trên địa chỉ này.");

        return address;
    }

    private async Task EnsureDistrictExistsAsync(Guid districtId, CancellationToken ct)
    {
        if (!await unitOfWork.Repository<District>().AnyAsync(d => d.Id == districtId, ct))
            throw new NotFoundException("Không tìm thấy quận/huyện.");
    }

    private async Task ClearDefaultAddressesAsync(Guid userId, CancellationToken ct)
    {
        var currentDefaults = await unitOfWork.Repository<Address>().GetQueryable()
            .Where(a => a.UserId == userId && !a.IsDeleted && a.IsDefault)
            .ToListAsync(ct);

        foreach (var current in currentDefaults)
        {
            current.IsDefault = false;
            unitOfWork.Repository<Address>().Update(current);
        }
    }

    private async Task<bool> HasDefaultAddressAsync(Guid userId, Guid excludedId, CancellationToken ct)
        => await unitOfWork.Repository<Address>()
            .AnyAsync(a => a.UserId == userId && !a.IsDeleted && a.IsDefault && a.Id != excludedId, ct);
}
