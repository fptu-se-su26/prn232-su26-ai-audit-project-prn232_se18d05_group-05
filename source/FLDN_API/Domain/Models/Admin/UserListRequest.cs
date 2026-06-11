namespace Contract;

public sealed class UserListRequest : PagedRequest
{
    public string? Role { get; set; }
    public bool? IsActive { get; set; }
}
