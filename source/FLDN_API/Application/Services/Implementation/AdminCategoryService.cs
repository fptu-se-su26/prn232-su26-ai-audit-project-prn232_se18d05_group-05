namespace Application;

[RegisterService(typeof(IAdminCategoryService))]
public sealed class AdminCategoryService(
    IUnitOfWork unitOfWork
) : IAdminCategoryService
{
    public async Task<List<CategoryResponse>> GetCategoriesAsync(CancellationToken ct = default)
    {
        var allCategories = await unitOfWork.Categories.GetAllAsync(ct);

        var rootCategories = allCategories
            .Where(c => c.ParentCategoryId == null)
            .ToList();

        return rootCategories.Select(MapCategory).ToList();
    }

    public async Task<CreateCategoryResponse> CreateCategoryAsync(CreateCategoryRequest request, CancellationToken ct = default)
    {
        if (request.ParentCategoryId.HasValue)
        {
            _ = await unitOfWork.Categories.GetByIdAsync(request.ParentCategoryId.Value, ct)
                ?? throw new NotFoundException("Parent category not found.");
        }

        if (await unitOfWork.Categories.AnyAsync(c => c.Name == request.Name && !c.IsDeleted, ct))
            throw new ConflictException("Category name already exists.");

        var category = new Category
        {
            CategoryId = Guid.NewGuid(),
            Name = request.Name,
            Description = request.Description,
            ImageUrl = request.ImageUrl,
            ParentCategoryId = request.ParentCategoryId,
            IsActive = true,
            IsDeleted = false
        };

        await unitOfWork.Categories.AddAsync(category);
        await unitOfWork.EnsureSaveAsync(ct);

        return new CreateCategoryResponse
        {
            CategoryId = category.CategoryId,
            Name = category.Name
        };
    }

    public async Task UpdateCategoryAsync(Guid id, UpdateCategoryRequest request, CancellationToken ct = default)
    {
        var category = await unitOfWork.Categories.GetByIdAsync(id, ct)
            ?? throw new NotFoundException("Category not found.");

        if (await unitOfWork.Categories.AnyAsync(c => c.Name == request.Name && c.CategoryId != id && !c.IsDeleted, ct))
            throw new ConflictException("Category name already exists.");

        category.Name = request.Name;
        category.Description = request.Description;
        category.ImageUrl = request.ImageUrl;
        category.IsActive = request.IsActive;
        unitOfWork.Categories.Update(category);
        await unitOfWork.EnsureSaveAsync(ct);
    }

    public async Task DeleteCategoryAsync(Guid id, CancellationToken ct = default)
    {
        var category = await unitOfWork.Categories.GetByIdAsync(id, ct)
            ?? throw new NotFoundException("Category not found.");

        category.IsDeleted = true;
        category.DeletedAt = DateTimeOffset.UtcNow;
        category.IsActive = false;
        unitOfWork.Categories.Update(category);
        await unitOfWork.EnsureSaveAsync(ct);
    }

    private static CategoryResponse MapCategory(Category category) => new()
    {
        CategoryId = category.CategoryId,
        Name = category.Name,
        ParentCategoryId = category.ParentCategoryId,
        IsActive = category.IsActive,
        Children = category.SubCategories
            .Where(c => !c.IsDeleted)
            .Select(MapCategory)
            .ToList()
    };
}
