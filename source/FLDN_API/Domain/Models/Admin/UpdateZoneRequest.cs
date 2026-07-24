namespace Contract;

public class UpdateZoneRequest
{
    public string ZoneName { get; set; } = default!;
    public string? Description { get; set; }
    public decimal ShippingFee { get; set; }
    public bool IsActive { get; set; }
}
