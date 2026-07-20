namespace Domain;

public class ShipmentStatusHistory : EntityBase<Guid>
{
    public Guid ShipmentId { get; set; }
    public ShipmentStatus Status { get; set; }
    public string? Note { get; set; }
    public string? ImageUrl { get; set; }
    public Guid? UpdatedBy { get; set; }

    [System.ComponentModel.DataAnnotations.Schema.NotMapped]
    public decimal? Latitude { get; set; }

    [System.ComponentModel.DataAnnotations.Schema.NotMapped]
    public decimal? Longitude { get; set; }

    [System.ComponentModel.DataAnnotations.Schema.NotMapped]
    public string? ReceiverName { get; set; }

    [System.ComponentModel.DataAnnotations.Schema.NotMapped]
    public string? ReceiverPhone { get; set; }

    [System.ComponentModel.DataAnnotations.Schema.NotMapped]
    public string? DeliveryNote { get; set; }

    [System.ComponentModel.DataAnnotations.Schema.NotMapped]
    public string? DeliveryImageUrl { get; set; }

    [System.ComponentModel.DataAnnotations.Schema.NotMapped]
    public DateTimeOffset? DeliveredAt { get; set; }

    [System.ComponentModel.DataAnnotations.Schema.NotMapped]
    public Guid? DeliveredBy { get; set; }

    // Navigation
    public Shipment Shipment { get; set; } = default!;
    public User? UpdatedByUser { get; set; }
}
