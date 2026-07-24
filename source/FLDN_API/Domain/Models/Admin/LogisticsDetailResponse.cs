using Domain;

namespace Contract;

public class LogisticsDetailResponse
{
    public Guid LogisticsId { get; set; }
    public string FullName { get; set; } = default!;
    public string Email { get; set; } = default!;
    public string? Phone { get; set; }
    public string? IdentityCard { get; set; }
    public string? VehicleType { get; set; }
    public string? LicensePlate { get; set; }
    public LogisticsOperatorStatus Status { get; set; }
    public int TotalShipments { get; set; }
    public string? ApprovedByName { get; set; }
    public DateTimeOffset? ApprovedAt { get; set; }
    public DateTimeOffset CreatedAt { get; set; }
}
