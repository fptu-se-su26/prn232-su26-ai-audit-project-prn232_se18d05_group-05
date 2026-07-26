namespace Domain;

public class DistributionPointProfile : EntityBase<Guid>, ISoftDeletable
{
    public Guid UserId { get; set; }
    public string PointName { get; set; } = default!;
    public DistributionPointType PointType { get; set; }

    /// <summary>Sức chứa / nhu cầu tiếp nhận mỗi ngày, tính theo <see cref="CapacityUnit"/>.</summary>
    public decimal Capacity { get; set; }
    public string? CapacityUnit { get; set; }

    public string? Address { get; set; }
    public Guid? DistrictId { get; set; }
    public string? ContactPerson { get; set; }
    public string? ContactPhone { get; set; }
    public string? OperatingHours { get; set; }

    public bool IsDeleted { get; set; }
    public DateTimeOffset? DeletedAt { get; set; }

    // Navigation
    public User User { get; set; } = default!;
    public District? District { get; set; }
}
