namespace Contract;

public sealed class CreateCategoryResponse
{
    public Guid CategoryId { get; set; }
    public string Name { get; set; } = default!;
}
