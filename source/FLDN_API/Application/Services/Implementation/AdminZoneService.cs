using Microsoft.EntityFrameworkCore;

namespace Application;

[RegisterService(typeof(IAdminZoneService))]
public sealed class AdminZoneService(IUnitOfWork unitOfWork) : IAdminZoneService
{
    public async Task<List<DistributionZoneResponse>> GetZonesAsync(CancellationToken ct = default)
    {
        var zones = await unitOfWork.Repository<DistributionZone>().GetQueryable()
            .Include(z => z.District)
            .Where(z => !z.IsDeleted)
            .OrderBy(z => z.ZoneName)
            .ToListAsync(ct);

        return zones.Select(MapZone).ToList();
    }

    public async Task<List<DistrictResponse>> GetDistrictsAsync(CancellationToken ct = default)
    {
        return await unitOfWork.Repository<District>().GetQueryable()
            .OrderBy(d => d.Name)
            .Select(d => new DistrictResponse { DistrictId = d.Id, Name = d.Name, Code = d.Code })
            .ToListAsync(ct);
    }

    public async Task<DistributionZoneResponse> CreateZoneAsync(CreateZoneRequest request, CancellationToken ct = default)
    {
        await unitOfWork.Repository<District>().GetByIdAsync(request.DistrictId);

        var zone = new DistributionZone
        {
            Id          = Guid.NewGuid(),
            DistrictId  = request.DistrictId,
            ZoneName    = request.ZoneName,
            Description = request.Description,
            ShippingFee = request.ShippingFee,
            IsActive    = true,
        };

        await unitOfWork.Repository<DistributionZone>().AddAsync(zone);
        await unitOfWork.EnsureSaveAsync(ct);

        var district = await unitOfWork.Repository<District>().GetByIdAsync(request.DistrictId);
        zone.District = district!;
        return MapZone(zone);
    }

    public async Task UpdateZoneAsync(Guid id, UpdateZoneRequest request, CancellationToken ct = default)
    {
        var zone = await unitOfWork.Repository<DistributionZone>().GetByIdAsync(id);

        zone.ZoneName    = request.ZoneName;
        zone.Description = request.Description;
        zone.ShippingFee = request.ShippingFee;
        zone.IsActive    = request.IsActive;
        unitOfWork.Repository<DistributionZone>().Update(zone);
        await unitOfWork.EnsureSaveAsync(ct);
    }

    public async Task DeleteZoneAsync(Guid id, CancellationToken ct = default)
    {
        var zone = await unitOfWork.Repository<DistributionZone>().GetByIdAsync(id);

        zone.IsDeleted  = true;
        zone.DeletedAt  = DateTimeOffset.UtcNow;
        zone.IsActive   = false;
        unitOfWork.Repository<DistributionZone>().Update(zone);
        await unitOfWork.EnsureSaveAsync(ct);
    }

    private static DistributionZoneResponse MapZone(DistributionZone z) => new()
    {
        ZoneId       = z.Id,
        ZoneName     = z.ZoneName,
        Description  = z.Description,
        ShippingFee  = z.ShippingFee,
        IsActive     = z.IsActive,
        DistrictId   = z.DistrictId,
        DistrictName = z.District?.Name ?? string.Empty,
    };
}
