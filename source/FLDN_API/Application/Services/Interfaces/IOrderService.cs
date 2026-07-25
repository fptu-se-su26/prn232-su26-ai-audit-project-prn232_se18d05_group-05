namespace Application;

public interface IOrderService
{
    Task<OrderResponse> CreateOrderAsync(Guid userId, CreateOrderRequest request, CancellationToken ct = default);
    Task<List<OrderResponse>> GetOrdersAsync(Guid userId, CancellationToken ct = default);
    Task<OrderResponse> GetOrderByIdAsync(Guid userId, Guid id, CancellationToken ct = default);
    Task CancelOrderAsync(Guid userId, Guid id, string cancelReason, CancellationToken ct = default);
    Task ConfirmReceiptAsync(Guid userId, Guid id, ConfirmReceiptRequest request, CancellationToken ct = default);
}
