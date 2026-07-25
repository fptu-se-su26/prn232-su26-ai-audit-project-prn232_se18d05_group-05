using Contract;
using Domain;
using Infrastructure;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API;

[ApiController]
public sealed class AddressController(
    ApplicationDbContext dbContext
) : ControllerBase
{
    [HttpGet("api/addresses")]
    public async Task<IActionResult> GetAddresses(CancellationToken ct = default)
    {
        await AppData.SeedAsync(dbContext);

        var userId = User.Identity?.IsAuthenticated == true ? User.GetUserId() : Guid.Empty;

        var addresses = await dbContext.Addresses
            .AsNoTracking()
            .Include(a => a.District)
            .Where(a => !a.IsDeleted && (userId == Guid.Empty || a.UserId == userId || a.IsDefault))
            .Select(a => new
            {
                addressId = a.Id,
                receiverName = a.ReceiverName,
                receiverPhone = a.ReceiverPhone,
                fullAddress = a.FullAddress,
                districtName = a.District != null ? a.District.Name : "Quận 1",
                isDefault = a.IsDefault
            })
            .ToListAsync(ct);

        return Ok(addresses);
    }

    [HttpPost("api/addresses")]
    public async Task<IActionResult> CreateAddress([FromBody] CreateAddressRequest request, CancellationToken ct = default)
    {
        var userId = User.Identity?.IsAuthenticated == true ? User.GetUserId() : Guid.Empty;
        if (userId == Guid.Empty)
        {
            userId = await dbContext.Users.Select(u => u.Id).FirstOrDefaultAsync(ct);
        }

        var districtId = await dbContext.Districts.Select(d => d.Id).FirstOrDefaultAsync(ct);

        var address = new Address
        {
            Id = Guid.NewGuid(),
            UserId = userId,
            ReceiverName = request.ReceiverName,
            ReceiverPhone = request.ReceiverPhone,
            FullAddress = request.FullAddress,
            DistrictId = districtId,
            IsDefault = false,
            IsActive = true,
            IsDeleted = false
        };

        await dbContext.Addresses.AddAsync(address, ct);
        await dbContext.SaveChangesAsync(ct);

        return StatusCode(StatusCodes.Status201Created, new
        {
            addressId = address.Id,
            receiverName = address.ReceiverName,
            receiverPhone = address.ReceiverPhone,
            fullAddress = address.FullAddress,
            districtName = "Quận 1",
            isDefault = address.IsDefault
        });
    }
}

public sealed class CreateAddressRequest
{
    public string ReceiverName { get; set; } = default!;
    public string ReceiverPhone { get; set; } = default!;
    public string FullAddress { get; set; } = default!;
}
