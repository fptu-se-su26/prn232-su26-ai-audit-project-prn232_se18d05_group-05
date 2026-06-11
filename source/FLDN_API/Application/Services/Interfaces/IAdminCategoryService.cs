namespace Application;

public interface IAdminCategoryService
{
    Task<List<CategoryResponse>> GetCategoriesAsync(CancellationToken ct = default);
    Task<CreateCategoryResponse> CreateCategoryAsync(CreateCategoryRequest request, CancellationToken ct = default);
    Task UpdateCategoryAsync(Guid id, UpdateCategoryRequest request, CancellationToken ct = default);
    Task DeleteCategoryAsync(Guid id, CancellationToken ct = default);
}
