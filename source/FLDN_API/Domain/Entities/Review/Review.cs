namespace Domain;

public class Review : EntityBase<Guid>, ISoftDeletable
{
    public Guid OrderItemId { get; set; }
    public Guid CustomerId { get; set; }
    public Guid ProductId { get; set; }
    public byte Rating { get; set; }
    public string? Comment { get; set; }
    public string? ImageUrl { get; set; }
    public bool IsVisible { get; set; }
    public bool IsDeleted { get; set; }
    public DateTimeOffset? DeletedAt { get; set; }

    // Navigation
    public OrderItem OrderItem { get; set; } = default!;
    public User Customer { get; set; } = default!;
    public Product Product { get; set; } = default!;
}
