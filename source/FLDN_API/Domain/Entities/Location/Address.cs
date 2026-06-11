namespace Domain;

public class Address : EntityBase<Guid>, ISoftDeletable
{
    public Guid UserId { get; set; }
    public string ReceiverName { get; set; } = default!;
    public string ReceiverPhone { get; set; } = default!;
    public string FullAddress { get; set; } = default!;
    public Guid DistrictId { get; set; }
    public decimal? Latitude { get; set; }
    public decimal? Longitude { get; set; }
    public bool IsDefault { get; set; }
    public bool IsActive { get; set; }
    public bool IsDeleted { get; set; }
    public DateTimeOffset? DeletedAt { get; set; }

    // Navigation
    public User User { get; set; } = default!;
    public District District { get; set; } = default!;
}
