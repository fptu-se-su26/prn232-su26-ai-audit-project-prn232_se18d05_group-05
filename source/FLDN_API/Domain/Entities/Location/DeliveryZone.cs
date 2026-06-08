namespace Domain;

public class DeliveryZone
{
    public int ZoneId { get; set; }
    public int DistrictId { get; set; }
    public string ZoneName { get; set; } = default!;
    public decimal ShippingFee { get; set; }
    public string? Description { get; set; }
    public bool IsActive { get; set; }

    // Navigation
    public District District { get; set; } = default!;
}
