namespace Domain;

public class OrderStatusHistory : EntityBase<Guid>
{
    public Guid OrderId { get; set; }
    public OrderStatus Status { get; set; }
    public string? Note { get; set; }
    public Guid? CreatedBy { get; set; }

    // Navigation
    public Order Order { get; set; } = default!;
    public User? CreatedByUser { get; set; }
}
