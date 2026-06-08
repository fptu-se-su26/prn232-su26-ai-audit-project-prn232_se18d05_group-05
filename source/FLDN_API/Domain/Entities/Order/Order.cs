namespace Domain;

public class Order : EntityBase<Guid>
{
    public Guid CustomerId { get; set; }
    public Guid AddressId { get; set; }
    public Guid? VoucherId { get; set; }
    public decimal TotalAmount { get; set; }
    public decimal DiscountAmount { get; set; }
    public decimal ShippingFee { get; set; }
    public decimal FinalAmount { get; set; }
    public OrderStatus Status { get; set; }
    public DeliveryType DeliveryType { get; set; }
    public DateTimeOffset? ScheduledTime { get; set; }
    public string? Note { get; set; }
    public string? CancelReason { get; set; }

    // Navigation
    public User Customer { get; set; } = default!;
    public Address Address { get; set; } = default!;
    public Voucher? Voucher { get; set; }
    public ICollection<OrderItem> OrderItems { get; set; } = [];
    public ICollection<OrderStatusHistory> StatusHistories { get; set; } = [];
    public ICollection<SupplierOrderConfirmation> SupplierConfirmations { get; set; } = [];
    public Payment? Payment { get; set; }
}
