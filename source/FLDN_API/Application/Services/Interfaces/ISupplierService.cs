namespace Application;

public interface ISupplierService
{
    Task<PagedResult<SupplierProductResponse>> GetProductsAsync(Guid userId, SupplierProductListRequest request, CancellationToken ct = default);
    Task<SupplierProductResponse> GetProductByIdAsync(Guid userId, Guid id, CancellationToken ct = default);
    Task<SupplierProductResponse> CreateProductAsync(Guid userId, CreateSupplierProductRequest request, CancellationToken ct = default);
    Task UpdateProductAsync(Guid userId, Guid id, UpdateSupplierProductRequest request, CancellationToken ct = default);
    Task DeleteProductAsync(Guid userId, Guid id, CancellationToken ct = default);

    Task<List<SupplierInventoryResponse>> GetInventoryAsync(Guid userId, CancellationToken ct = default);
    Task UpdateInventoryAsync(Guid userId, Guid productId, UpdateSupplierInventoryRequest request, CancellationToken ct = default);

    Task<PagedResult<SupplierBatchResponse>> GetBatchesAsync(Guid userId, SupplierBatchListRequest request, CancellationToken ct = default);
    Task<SupplierBatchResponse> GetBatchByIdAsync(Guid userId, Guid id, CancellationToken ct = default);
    Task<SupplierBatchResponse> CreateBatchAsync(Guid userId, CreateSupplierBatchRequest request, CancellationToken ct = default);

    Task<List<SupplierSupplyRequestResponse>> GetSupplyRequestsAsync(Guid userId, CancellationToken ct = default);
    Task ConfirmSupplyRequestAsync(Guid userId, Guid id, CancellationToken ct = default);
    Task RejectSupplyRequestAsync(Guid userId, Guid id, RejectSupplierSupplyRequestRequest request, CancellationToken ct = default);

    Task<BatchQrResponse> GetBatchQrAsync(Guid? userId, Guid id, CancellationToken ct = default);
    Task<TraceabilityResponse> GetTraceabilityAsync(string qrCode, CancellationToken ct = default);
    Task<List<ExpiryWarningResponse>> GetExpiryWarningsAsync(Guid userId, CancellationToken ct = default);
}
