namespace Domain;

public class District
{
    public Guid DistrictId { get; set; }
    public string Name { get; set; } = default!;
    public string Code { get; set; } = default!;

    // Navigation
    public ICollection<DeliveryZone> DeliveryZones { get; set; } = [];
    public ICollection<SupplierProfile> SupplierProfiles { get; set; } = [];
    public ICollection<Address> Addresses { get; set; } = [];
}
