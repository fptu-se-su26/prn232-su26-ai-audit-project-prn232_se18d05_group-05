namespace Contract;

public class CreateZoneRequest
{
    public Guid DistrictId { get; set; }
    public string ZoneName { get; set; } = default!;
    public string? Description { get; set; }
    public decimal ShippingFee { get; set; }
}
