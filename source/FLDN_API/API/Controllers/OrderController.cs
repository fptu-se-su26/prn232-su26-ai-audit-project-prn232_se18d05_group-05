namespace API;

[ApiController]
public sealed class OrderController(
    IOrderService orderService
) : ControllerBase
{
    [Authorize]
    [HttpPost("api/orders")]
    public async Task<IActionResult> CreateOrder([FromBody] CreateOrderRequest request, CancellationToken ct)
    {
        var result = await orderService.CreateOrderAsync(User.GetUserId(), request, ct);
        return StatusCode(StatusCodes.Status201Created,
            ApiResponse<OrderResponse>.Ok(result, "Supply request created successfully.", StatusCodes.Status201Created));
    }

    [Authorize]
    [HttpGet("api/orders")]
    public async Task<IActionResult> GetOrders(CancellationToken ct)
    {
        var result = await orderService.GetOrdersAsync(User.GetUserId(), ct);
        return Ok(ApiResponse<List<OrderResponse>>.Ok(result));
    }

    [Authorize]
    [HttpGet("api/orders/{id:guid}")]
    public async Task<IActionResult> GetOrderById(Guid id, CancellationToken ct)
    {
        var result = await orderService.GetOrderByIdAsync(User.GetUserId(), id, ct);
        return Ok(ApiResponse<OrderResponse>.Ok(result));
    }

    [Authorize]
    [HttpDelete("api/orders/{id:guid}/cancel")]
    public async Task<IActionResult> CancelOrder(Guid id, [FromBody] string cancelReason, CancellationToken ct)
    {
        await orderService.CancelOrderAsync(User.GetUserId(), id, cancelReason, ct);
        return Ok(ApiResponse<object>.OkMessage("Supply request cancelled successfully."));
    }

    [Authorize]
    [HttpPost("api/orders/{id:guid}/confirm-receipt")]
    public async Task<IActionResult> ConfirmReceipt(Guid id, [FromBody] ConfirmReceiptRequest request, CancellationToken ct)
    {
        await orderService.ConfirmReceiptAsync(User.GetUserId(), id, request, ct);
        return Ok(ApiResponse<object>.OkMessage("Xác nhận nhận hàng thành công."));
    }
}
