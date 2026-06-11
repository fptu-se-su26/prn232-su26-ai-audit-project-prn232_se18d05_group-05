namespace Domain;

public class District : EntityBase<Guid>
{
    public string Name { get; set; } = default!;
    public string Code { get; set; } = default!;

    // Navigation
    public ICollection<DistributionZone> DistributionZones { get; set; } = [];
    public ICollection<SupplierProfile> SupplierProfiles { get; set; } = [];
    public ICollection<Address> Addresses { get; set; } = [];
}
