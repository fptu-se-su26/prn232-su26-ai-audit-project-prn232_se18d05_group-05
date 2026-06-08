namespace Domain;

public class OrderStatusHistory : EntityBase<int>
{
    public int OrderId { get; set; }
    public OrderStatus Status { get; set; }
    public string? Note { get; set; }
    public int? CreatedBy { get; set; }

    // Navigation
    public Order Order { get; set; } = default!;
    public User? CreatedByUser { get; set; }
}
