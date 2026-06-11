namespace Contract;

public sealed class CategoryResponse
{
    public Guid CategoryId { get; set; }
    public string Name { get; set; } = default!;
    public Guid? ParentCategoryId { get; set; }
    public bool IsActive { get; set; }
    public List<CategoryResponse> Children { get; set; } = [];
}
