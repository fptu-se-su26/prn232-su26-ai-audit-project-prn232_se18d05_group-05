namespace Contract;

public class DistributionZoneResponse
{
    public Guid ZoneId { get; set; }
    public string ZoneName { get; set; } = default!;
    public string? Description { get; set; }
    public decimal ShippingFee { get; set; }
    public bool IsActive { get; set; }
    public Guid DistrictId { get; set; }
    public string DistrictName { get; set; } = default!;
}
