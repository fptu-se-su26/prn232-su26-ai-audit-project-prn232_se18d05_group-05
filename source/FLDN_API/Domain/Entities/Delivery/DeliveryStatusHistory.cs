namespace Domain;

public class DeliveryStatusHistory : EntityBase<Guid>
{
    public Guid DeliveryId { get; set; }
    public DeliveryStatus Status { get; set; }
    public string? Note { get; set; }
    public string? ImageUrl { get; set; }
    public Guid? UpdatedBy { get; set; }

    // Navigation
    public Delivery Delivery { get; set; } = default!;
    public User? UpdatedByUser { get; set; }
}
