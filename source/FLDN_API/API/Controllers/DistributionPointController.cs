namespace API;

[ApiController]
[Route("api/distribution-point")]
[Authorize(Roles = nameof(RoleType.DistributionPoint))]
public sealed class DistributionPointController(
    IDistributionPointService distributionPointService
) : ControllerBase
{
    [HttpGet("profile")]
    public async Task<IActionResult> GetMyProfile(CancellationToken ct = default)
    {
        var result = await distributionPointService.GetMyProfileAsync(User.GetUserId(), ct);
        return Ok(ApiResponse<DistributionPointProfileResponse>.Ok(result));
    }

    [HttpPut("profile")]
    public async Task<IActionResult> UpsertMyProfile([FromBody] UpsertDistributionPointProfileRequest request, CancellationToken ct = default)
    {
        var result = await distributionPointService.UpsertMyProfileAsync(User.GetUserId(), request, ct);
        return Ok(ApiResponse<DistributionPointProfileResponse>.Ok(result, "Đã lưu hồ sơ điểm phân phối."));
    }
}
