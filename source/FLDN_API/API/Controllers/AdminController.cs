namespace API;

[ApiController]
[Route("api/admin")]
[Authorize(Roles = nameof(RoleType.Admin))]
public sealed class AdminController(
    IAdminUserService adminUserService,
    IAdminSupplierService adminSupplierService,
    IAdminCategoryService adminCategoryService
) : ControllerBase
{
    // ──────────────────────────────────────────────
    // UC08 – User Management
    // ──────────────────────────────────────────────

    [HttpGet("users")]
    public async Task<IActionResult> GetUsers([FromQuery] UserListRequest request, CancellationToken ct)
    {
        var result = await adminUserService.GetUsersAsync(request, ct);
        return Ok(ApiResponse<PagedResult<UserResponse>>.Ok(result));
    }

    [HttpGet("users/{id:guid}")]
    public async Task<IActionResult> GetUserById(Guid id, CancellationToken ct)
    {
        var result = await adminUserService.GetUserByIdAsync(id, ct);
        return Ok(ApiResponse<UserResponse>.Ok(result));
    }

    [HttpPut("users/{id:guid}/lock")]
    public async Task<IActionResult> LockUser(Guid id, CancellationToken ct)
    {
        await adminUserService.LockUserAsync(id, ct);
        return Ok(ApiResponse<object>.OkMessage("Đã khóa tài khoản"));
    }

    [HttpPut("users/{id:guid}/unlock")]
    public async Task<IActionResult> UnlockUser(Guid id, CancellationToken ct)
    {
        await adminUserService.UnlockUserAsync(id, ct);
        return Ok(ApiResponse<object>.OkMessage("Đã mở khóa tài khoản"));
    }

    [HttpPost("users/{id:guid}/reset-password")]
    public async Task<IActionResult> ResetUserPassword(Guid id, [FromBody] AdminResetPasswordRequest request, CancellationToken ct)
    {
        await adminUserService.ResetPasswordAsync(id, request, ct);
        return Ok(ApiResponse<object>.OkMessage("Đã reset mật khẩu"));
    }

    // ──────────────────────────────────────────────
    // UC09 – Supplier Approval
    // ──────────────────────────────────────────────

    [HttpGet("suppliers")]
    public async Task<IActionResult> GetSuppliers([FromQuery] SupplierListRequest request, CancellationToken ct)
    {
        var result = await adminSupplierService.GetSuppliersAsync(request, ct);
        return Ok(ApiResponse<PagedResult<SupplierListResponse>>.Ok(result));
    }

    [HttpGet("suppliers/{id:guid}")]
    public async Task<IActionResult> GetSupplierById(Guid id, CancellationToken ct)
    {
        var result = await adminSupplierService.GetSupplierByIdAsync(id, ct);
        return Ok(ApiResponse<SupplierDetailResponse>.Ok(result));
    }

    [HttpPut("suppliers/{id:guid}/approve")]
    public async Task<IActionResult> ApproveSupplier(Guid id, CancellationToken ct)
    {
        var adminId = User.GetUserId();
        await adminSupplierService.ApproveSupplierAsync(id, adminId, ct);
        return Ok(ApiResponse<object>.OkMessage("Đã phê duyệt nhà cung cấp"));
    }

    [HttpPut("suppliers/{id:guid}/reject")]
    public async Task<IActionResult> RejectSupplier(Guid id, [FromBody] RejectSupplierRequest request, CancellationToken ct)
    {
        await adminSupplierService.RejectSupplierAsync(id, request, ct);
        return Ok(ApiResponse<object>.OkMessage("Đã từ chối hồ sơ"));
    }

    [HttpPut("suppliers/{id:guid}/fee")]
    public async Task<IActionResult> UpdateSupplierFee(Guid id, [FromBody] UpdateSupplierFeeRequest request, CancellationToken ct)
    {
        await adminSupplierService.UpdateSupplierFeeAsync(id, request, ct);
        return Ok(ApiResponse<object>.OkMessage("Đã cập nhật biểu phí"));
    }

    // ──────────────────────────────────────────────
    // UC10 – Category Management
    // ──────────────────────────────────────────────

    [HttpGet("categories")]
    public async Task<IActionResult> GetCategories(CancellationToken ct)
    {
        var result = await adminCategoryService.GetCategoriesAsync(ct);
        return Ok(ApiResponse<List<CategoryResponse>>.Ok(result));
    }

    [HttpPost("categories")]
    public async Task<IActionResult> CreateCategory([FromBody] CreateCategoryRequest request, CancellationToken ct)
    {
        var result = await adminCategoryService.CreateCategoryAsync(request, ct);
        return StatusCode(StatusCodes.Status201Created,
            ApiResponse<CreateCategoryResponse>.Ok(result, BusinessMessages.CreatedSuccessfully("category"), StatusCodes.Status201Created));
    }

    [HttpPut("categories/{id:guid}")]
    public async Task<IActionResult> UpdateCategory(Guid id, [FromBody] UpdateCategoryRequest request, CancellationToken ct)
    {
        await adminCategoryService.UpdateCategoryAsync(id, request, ct);
        return Ok(ApiResponse<object>.OkMessage("Đã cập nhật danh mục"));
    }

    [HttpDelete("categories/{id:guid}")]
    public async Task<IActionResult> DeleteCategory(Guid id, CancellationToken ct)
    {
        await adminCategoryService.DeleteCategoryAsync(id, ct);
        return Ok(ApiResponse<object>.OkMessage("Đã ẩn danh mục"));
    }
}
