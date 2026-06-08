namespace Domain;

public class Cart : EntityBase<Guid>
{
    public Guid CustomerId { get; set; }

    // Navigation
    public User Customer { get; set; } = default!;
    public ICollection<CartItem> CartItems { get; set; } = [];
}
