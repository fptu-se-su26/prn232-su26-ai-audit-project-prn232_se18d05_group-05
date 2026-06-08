namespace Domain;

public class DeliveryStatusHistory : EntityBase<int>
{
    public int DeliveryId { get; set; }
    public DeliveryStatus Status { get; set; }
    public string? Note { get; set; }
    public string? ImageUrl { get; set; }
    public int? UpdatedBy { get; set; }

    // Navigation
    public Delivery Delivery { get; set; } = default!;
    public User? UpdatedByUser { get; set; }
}
