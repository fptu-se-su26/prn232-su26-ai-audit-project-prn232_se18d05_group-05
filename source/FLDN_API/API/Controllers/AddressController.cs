namespace API;

[ApiController]
[Authorize]
public sealed class AddressController(
    IAddressService addressService
) : ControllerBase
{
    [HttpGet("api/addresses")]
    public async Task<IActionResult> GetAddresses(CancellationToken ct = default)
    {
        var result = await addressService.GetAddressesAsync(User.GetUserId(), ct);
        return Ok(result);
    }

    [HttpGet("api/districts")]
    public async Task<IActionResult> GetDistricts(CancellationToken ct = default)
    {
        var result = await addressService.GetDistrictsAsync(ct);
        return Ok(result);
    }

    [HttpPost("api/addresses")]
    public async Task<IActionResult> CreateAddress([FromBody] CreateAddressRequest request, CancellationToken ct = default)
    {
        var result = await addressService.CreateAddressAsync(User.GetUserId(), request, ct);
        return StatusCode(StatusCodes.Status201Created, result);
    }

    [HttpPut("api/addresses/{id:guid}")]
    public async Task<IActionResult> UpdateAddress(Guid id, [FromBody] UpdateAddressRequest request, CancellationToken ct = default)
    {
        var result = await addressService.UpdateAddressAsync(User.GetUserId(), id, request, ct);
        return Ok(result);
    }

    [HttpPut("api/addresses/{id:guid}/default")]
    public async Task<IActionResult> SetDefaultAddress(Guid id, CancellationToken ct = default)
    {
        var result = await addressService.SetDefaultAddressAsync(User.GetUserId(), id, ct);
        return Ok(result);
    }

    [HttpDelete("api/addresses/{id:guid}")]
    public async Task<IActionResult> DeleteAddress(Guid id, CancellationToken ct = default)
    {
        await addressService.DeleteAddressAsync(User.GetUserId(), id, ct);
        return Ok(ApiResponse<object>.OkMessage("Đã xoá địa chỉ giao hàng."));
    }
}
