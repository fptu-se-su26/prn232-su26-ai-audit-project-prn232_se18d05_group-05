namespace API;

[ApiController]
[Route("api/logistics")]
[Authorize(Roles = nameof(RoleType.LogisticsOperator))]
public sealed class LogisticsOperatorController(ILogisticsOperatorService logisticsOperatorService) : ControllerBase
{
    [HttpGet("shipments")]
    public async Task<IActionResult> GetShipments([FromQuery] ShipmentListRequest request, CancellationToken ct)
    {
        request.UserId = User.GetUserId();
        var result = await logisticsOperatorService.GetShipmentsAsync(request, ct);
        return Ok(ApiResponse<PagedResult<ShipmentSummaryResponse>>.Ok(result));
    }

    [HttpPut("shipments/{id:guid}/accept")]
    public async Task<IActionResult> AcceptShipment([FromRoute] Guid id, CancellationToken ct)
    {
        var result = await logisticsOperatorService.AcceptShipmentAsync(id, ct);
        return Ok(ApiResponse<AcceptShipmentResponse>.Ok(result));
    }
}
