namespace Domain;

public class Product : EntityBase<Guid>, ISoftDeletable
{
    public Guid SupplierId { get; set; }
    public Guid CategoryId { get; set; }
    public string Name { get; set; } = default!;
    public string? Description { get; set; }
    public decimal WholesalePrice { get; set; }
    public decimal RetailPrice { get; set; }
    public string Unit { get; set; } = default!;
    public string? PackagingStandard { get; set; }
    public bool IsActive { get; set; }
    public bool IsDeleted { get; set; }
    public DateTimeOffset? DeletedAt { get; set; }

    // Navigation
    public SupplierProfile Supplier { get; set; } = default!;
    public Category Category { get; set; } = default!;
    public ICollection<ProductImage> ProductImages { get; set; } = [];
    public ICollection<PriceHistory> PriceHistories { get; set; } = [];
    public Inventory? Inventory { get; set; }
    public ICollection<Batch> Batches { get; set; } = [];
}
