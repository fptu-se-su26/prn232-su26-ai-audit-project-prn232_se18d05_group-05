using Microsoft.AspNetCore.Http;

namespace API;


[ApiController]
public sealed class ShipperController(
    ILogisticsService logisticsService,
    ICloudinaryService cloudinaryService
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

    [Authorize(Roles = nameof(RoleType.LogisticsOperator))]
    [HttpPut("api/shipper/deliveries/{id:guid}/complete")]
    public async Task<IActionResult> CompleteDelivery(Guid id, IFormFile confirmImage, CancellationToken ct)
    {
        if (confirmImage == null || confirmImage.Length == 0)
        {
            throw new BadRequestException("Ảnh xác nhận giao hàng là bắt buộc.");
        }

        var confirmImageUrl = await cloudinaryService.UploadPhotoAsync(confirmImage);
        var result = await logisticsService.CompleteShipmentAsync(User.GetUserId(), id, confirmImageUrl, ct);
        return Ok(ApiResponse<LogisticsCompleteResponse>.Ok(result));
    }
}


