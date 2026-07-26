namespace Domain;

public sealed class UpsertDistributionPointProfileRequest
{
    public string PointName { get; set; } = default!;
    public DistributionPointType PointType { get; set; }
    public decimal Capacity { get; set; }
    public string? CapacityUnit { get; set; }
    public string? Address { get; set; }
    public Guid? DistrictId { get; set; }
    public string? ContactPerson { get; set; }
    public string? ContactPhone { get; set; }
    public string? OperatingHours { get; set; }
}

public sealed class DistributionPointProfileResponse
{
    public Guid ProfileId { get; set; }
    public Guid UserId { get; set; }
    public string PointName { get; set; } = default!;
    public DistributionPointType PointType { get; set; }
    public decimal Capacity { get; set; }
    public string? CapacityUnit { get; set; }
    public string? Address { get; set; }
    public Guid? DistrictId { get; set; }
    public string? DistrictName { get; set; }
    public string? ContactPerson { get; set; }
    public string? ContactPhone { get; set; }
    public string? OperatingHours { get; set; }
    public DateTimeOffset CreatedAt { get; set; }
}

public sealed class DistributionPointListRequest
{
    // Domain không tham chiếu Contract nên không kế thừa được Contract.PagedRequest
    public int Page { get; set; } = 1;
    public int PageSize { get; set; } = 10;
    public string? Search { get; set; }
    public DistributionPointType? PointType { get; set; }
    public Guid? DistrictId { get; set; }
}

public sealed class DistributionPointListResponse
{
    public Guid UserId { get; set; }
    public string FullName { get; set; } = default!;
    public string Email { get; set; } = default!;
    public string Phone { get; set; } = default!;
    public bool IsActive { get; set; }

    /// <summary>Null khi điểm phân phối chưa khai báo hồ sơ.</summary>
    public Guid? ProfileId { get; set; }
    public string? PointName { get; set; }
    public DistributionPointType? PointType { get; set; }
    public decimal? Capacity { get; set; }
    public string? CapacityUnit { get; set; }
    public string? DistrictName { get; set; }
    public bool HasProfile { get; set; }
}
