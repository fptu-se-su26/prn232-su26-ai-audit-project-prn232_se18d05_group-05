namespace Domain;

public class Cart : EntityBase<int>
{
    public int CustomerId { get; set; }

    // Navigation
    public User Customer { get; set; } = default!;
    public ICollection<CartItem> CartItems { get; set; } = [];
}
