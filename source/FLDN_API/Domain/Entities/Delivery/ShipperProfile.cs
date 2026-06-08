namespace Domain;

public class ShipperProfile : EntityBase<Guid>, ISoftDeletable
{
    public Guid UserId { get; set; }
    public string? VehicleType { get; set; }
    public string? LicensePlate { get; set; }
    public string? IdentityCard { get; set; }
    public ShipperStatus Status { get; set; }
    public decimal AverageRating { get; set; }
    public int TotalDeliveries { get; set; }
    public decimal? CurrentLat { get; set; }
    public decimal? CurrentLng { get; set; }
    public Guid? ApprovedBy { get; set; }
    public DateTimeOffset? ApprovedAt { get; set; }
    public bool IsDeleted { get; set; }
    public DateTimeOffset? DeletedAt { get; set; }

    // Navigation
    public User User { get; set; } = default!;
    public User? ApprovedByUser { get; set; }
    public ICollection<Delivery> Deliveries { get; set; } = [];
}
