namespace API;

[ApiController]
public sealed class SupplierController(
    ISupplierService supplierService
) : ControllerBase
{
    [Authorize(Roles = nameof(RoleType.Supplier))]
    [HttpGet("api/supplier/products")]
    public async Task<IActionResult> GetProducts([FromQuery] SupplierProductListRequest request, CancellationToken ct)
    {
        var result = await supplierService.GetProductsAsync(User.GetUserId(), request, ct);
        return Ok(ApiResponse<PagedResult<SupplierProductResponse>>.Ok(result));
    }

    [Authorize(Roles = nameof(RoleType.Supplier))]
    [HttpGet("api/supplier/products/{id:guid}")]
    public async Task<IActionResult> GetProductById(Guid id, CancellationToken ct)
    {
        var result = await supplierService.GetProductByIdAsync(User.GetUserId(), id, ct);
        return Ok(ApiResponse<SupplierProductResponse>.Ok(result));
    }

    [Authorize(Roles = nameof(RoleType.Supplier))]
    [HttpPost("api/supplier/products")]
    public async Task<IActionResult> CreateProduct([FromBody] CreateSupplierProductRequest request, CancellationToken ct)
    {
        var result = await supplierService.CreateProductAsync(User.GetUserId(), request, ct);
        return StatusCode(StatusCodes.Status201Created,
            ApiResponse<SupplierProductResponse>.Ok(result, BusinessMessages.CreatedSuccessfully("product"), StatusCodes.Status201Created));
    }

    [Authorize(Roles = nameof(RoleType.Supplier))]
    [HttpPut("api/supplier/products/{id:guid}")]
    public async Task<IActionResult> UpdateProduct(Guid id, [FromBody] UpdateSupplierProductRequest request, CancellationToken ct)
    {
        await supplierService.UpdateProductAsync(User.GetUserId(), id, request, ct);
        return Ok(ApiResponse<object>.OkMessage("Product updated successfully."));
    }

    [Authorize(Roles = nameof(RoleType.Supplier))]
    [HttpDelete("api/supplier/products/{id:guid}")]
    public async Task<IActionResult> DeleteProduct(Guid id, CancellationToken ct)
    {
        await supplierService.DeleteProductAsync(User.GetUserId(), id, ct);
        return Ok(ApiResponse<object>.OkMessage("Product hidden successfully."));
    }

    [Authorize(Roles = nameof(RoleType.Supplier))]
    [HttpGet("api/supplier/inventory")]
    public async Task<IActionResult> GetInventory(CancellationToken ct)
    {
        var result = await supplierService.GetInventoryAsync(User.GetUserId(), ct);
        return Ok(ApiResponse<List<SupplierInventoryResponse>>.Ok(result));
    }

    [Authorize(Roles = nameof(RoleType.Supplier))]
    [HttpPut("api/supplier/inventory/{productId:guid}")]
    public async Task<IActionResult> UpdateInventory(Guid productId, [FromBody] UpdateSupplierInventoryRequest request, CancellationToken ct)
    {
        await supplierService.UpdateInventoryAsync(User.GetUserId(), productId, request, ct);
        return Ok(ApiResponse<object>.OkMessage("Inventory updated successfully."));
    }

    [Authorize(Roles = nameof(RoleType.Supplier))]
    [HttpGet("api/supplier/batches")]
    public async Task<IActionResult> GetBatches([FromQuery] SupplierBatchListRequest request, CancellationToken ct)
    {
        var result = await supplierService.GetBatchesAsync(User.GetUserId(), request, ct);
        return Ok(ApiResponse<PagedResult<SupplierBatchResponse>>.Ok(result));
    }

    [Authorize(Roles = nameof(RoleType.Supplier))]
    [HttpGet("api/supplier/batches/{id:guid}")]
    public async Task<IActionResult> GetBatchById(Guid id, CancellationToken ct)
    {
        var result = await supplierService.GetBatchByIdAsync(User.GetUserId(), id, ct);
        return Ok(ApiResponse<SupplierBatchResponse>.Ok(result));
    }

    [Authorize(Roles = nameof(RoleType.Supplier))]
    [HttpPost("api/supplier/batches")]
    public async Task<IActionResult> CreateBatch([FromBody] CreateSupplierBatchRequest request, CancellationToken ct)
    {
        var result = await supplierService.CreateBatchAsync(User.GetUserId(), request, ct);
        return StatusCode(StatusCodes.Status201Created,
            ApiResponse<SupplierBatchResponse>.Ok(result, BusinessMessages.CreatedSuccessfully("batch"), StatusCodes.Status201Created));
    }

    [Authorize(Roles = nameof(RoleType.Supplier))]
    [HttpGet("api/supplier/supply-requests")]
    public async Task<IActionResult> GetSupplyRequests(CancellationToken ct)
    {
        var result = await supplierService.GetSupplyRequestsAsync(User.GetUserId(), ct);
        return Ok(ApiResponse<List<SupplierSupplyRequestResponse>>.Ok(result));
    }

    [Authorize(Roles = nameof(RoleType.Supplier))]
    [HttpPut("api/supplier/supply-requests/{id:guid}/confirm")]
    public async Task<IActionResult> ConfirmSupplyRequest(Guid id, CancellationToken ct)
    {
        await supplierService.ConfirmSupplyRequestAsync(User.GetUserId(), id, ct);
        return Ok(ApiResponse<object>.OkMessage("Supply request confirmed successfully."));
    }

    [Authorize(Roles = nameof(RoleType.Supplier))]
    [HttpPut("api/supplier/supply-requests/{id:guid}/reject")]
    public async Task<IActionResult> RejectSupplyRequest(Guid id, [FromBody] RejectSupplierSupplyRequestRequest request, CancellationToken ct)
    {
        await supplierService.RejectSupplyRequestAsync(User.GetUserId(), id, request, ct);
        return Ok(ApiResponse<object>.OkMessage("Supply request rejected successfully."));
    }

    [Authorize(Roles = $"{nameof(RoleType.Supplier)},{nameof(RoleType.Admin)}")]
    [HttpGet("api/batches/{id:guid}/qr")]
    public async Task<IActionResult> GetBatchQr(Guid id, CancellationToken ct)
    {
        var userId = User.IsInRole(nameof(RoleType.Supplier)) ? User.GetUserId() : (Guid?)null;
        var result = await supplierService.GetBatchQrAsync(userId, id, ct);
        return Ok(ApiResponse<BatchQrResponse>.Ok(result));
    }

    [AllowAnonymous]
    [HttpGet("api/traceability/{qrCode}")]
    public async Task<IActionResult> GetTraceability(string qrCode, CancellationToken ct)
    {
        var result = await supplierService.GetTraceabilityAsync(qrCode, ct);
        return Ok(ApiResponse<TraceabilityResponse>.Ok(result));
    }

    [Authorize(Roles = $"{nameof(RoleType.Supplier)},{nameof(RoleType.Admin)}")]
    [HttpGet("api/notifications/expiry-warnings")]
    public async Task<IActionResult> GetExpiryWarnings(CancellationToken ct)
    {
        var result = await supplierService.GetExpiryWarningsAsync(User.GetUserId(), ct);
        return Ok(ApiResponse<List<ExpiryWarningResponse>>.Ok(result));
    }
}
