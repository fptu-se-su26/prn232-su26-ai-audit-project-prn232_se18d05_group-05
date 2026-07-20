namespace API;

[ApiController]
public sealed class ShipperController(
    ILogisticsService logisticsService
) : ControllerBase
{
    [Authorize(Roles = nameof(RoleType.LogisticsOperator))]
    [HttpPut("api/shipper/deliveries/{id:guid}/accept")]
    public async Task<IActionResult> AcceptDelivery(Guid id, CancellationToken ct)
    {
        var result = await logisticsService.AcceptShipmentAsync(User.GetUserId(), id, ct);
        return Ok(ApiResponse<LogisticsAcceptResponse>.Ok(result));
    }

    [Authorize(Roles = nameof(RoleType.LogisticsOperator))]
    [HttpPut("api/shipper/deliveries/{id:guid}/status")]
    public async Task<IActionResult> UpdateDeliveryStatus(Guid id, [FromBody] UpdateShipmentStatusRequest request, CancellationToken ct)
    {
        var result = await logisticsService.UpdateShipmentStatusAsync(User.GetUserId(), id, request, ct);
        return Ok(ApiResponse<UpdateShipmentStatusResponse>.Ok(result));
    }
}

