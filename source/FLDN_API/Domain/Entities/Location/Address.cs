namespace Domain;

public class Address : ISoftDeletable
{
    public int AddressId { get; set; }
    public int UserId { get; set; }
    public string ReceiverName { get; set; } = default!;
    public string ReceiverPhone { get; set; } = default!;
    public string FullAddress { get; set; } = default!;
    public int DistrictId { get; set; }
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
