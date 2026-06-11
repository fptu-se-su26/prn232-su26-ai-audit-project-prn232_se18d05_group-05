namespace Domain;

public class ProductImage : EntityBase<Guid>
{
    public Guid ProductId { get; set; }
    public string ImageUrl { get; set; } = default!;
    public bool IsMain { get; set; }
    public int SortOrder { get; set; }

    // Navigation
    public Product Product { get; set; } = default!;
}
