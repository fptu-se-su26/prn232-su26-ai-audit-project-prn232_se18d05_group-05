namespace Contract;

public sealed class VoucherListRequest : PagedRequest
{
    public bool? IsActive { get; set; }
}
