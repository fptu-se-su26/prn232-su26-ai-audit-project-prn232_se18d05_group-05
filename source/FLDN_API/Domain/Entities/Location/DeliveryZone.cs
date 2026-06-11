namespace Domain;

public class DistributionZone : EntityBase<Guid>, ISoftDeletable
{
    public Guid DistrictId { get; set; }
    public string ZoneName { get; set; } = default!;
    public decimal ShippingFee { get; set; }
    public string? Description { get; set; }
    public bool IsActive { get; set; }
    public bool IsDeleted { get; set; }
    public DateTimeOffset? DeletedAt { get; set; }

    // Navigation
    public District District { get; set; } = default!;
}
