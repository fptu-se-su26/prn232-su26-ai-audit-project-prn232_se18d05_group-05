namespace Domain;

public class ProductImage
{
    public int ImageId { get; set; }
    public int ProductId { get; set; }
    public string ImageUrl { get; set; } = default!;
    public bool IsMain { get; set; }
    public int SortOrder { get; set; }

    // Navigation
    public Product Product { get; set; } = default!;
}
