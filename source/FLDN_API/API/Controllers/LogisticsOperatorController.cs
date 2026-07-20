using Contract.LogisticsOperator;

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

    [HttpPut("shipments/{id:guid}/status")]
    public async Task<IActionResult> UpdateShipmentStatus(
        [FromRoute] Guid id,
        [FromBody] Contract.LogisticsOperator.UpdateShipmentStatusRequest request,
        CancellationToken ct)
    {
        request.ShipmentId = id;
        var result = await logisticsOperatorService.UpdateShipmentStatusAsync(request, ct);
        return Ok(ApiResponse<ShipmentTrackingResponse>.Ok(result));
    }

    [HttpPut("shipments/{id:guid}/complete")]
    public async Task<IActionResult> ConfirmDelivery(
        [FromRoute] Guid id,
        [FromBody] Contract.LogisticsOperator.ConfirmDeliveryRequest request,
        CancellationToken ct)
    {
        request.ShipmentId = id;
        var result = await logisticsOperatorService.ConfirmDeliveryAsync(request, ct);
        return Ok(ApiResponse<DeliveryCompletedResponse>.Ok(result));
    }
}
