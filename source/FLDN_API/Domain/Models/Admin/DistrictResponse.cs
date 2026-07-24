namespace Contract;

public class DistrictResponse
{
    public Guid DistrictId { get; set; }
    public string Name { get; set; } = default!;
    public string Code { get; set; } = default!;
}
