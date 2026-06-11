namespace Domain;

public class SupplyRequest : EntityBase<Guid>
{
    public Guid DistributionPointId { get; set; }
    public Guid AddressId { get; set; }
    public decimal TotalAmount { get; set; }
    public decimal ShippingFee { get; set; }
    public decimal FinalAmount { get; set; }
    public SupplyRequestStatus Status { get; set; }
    public FulfillmentType FulfillmentType { get; set; }
    public DateTimeOffset? ScheduledTime { get; set; }
    public DateTimeOffset? RequestedDeliveryDate { get; set; }
    public string? Note { get; set; }
    public string? CancelReason { get; set; }

    // Navigation
    public User DistributionPoint { get; set; } = default!;
    public Address Address { get; set; } = default!;
    public ICollection<SupplyRequestItem> Items { get; set; } = [];
    public ICollection<SupplyRequestStatusHistory> StatusHistories { get; set; } = [];
    public ICollection<SupplierConfirmation> SupplierConfirmations { get; set; } = [];
}
