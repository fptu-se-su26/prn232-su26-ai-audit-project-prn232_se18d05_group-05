using Domain;

namespace Contract;

public sealed class SupplierListRequest : PagedRequest
{
    public SupplierStatus? Status { get; set; }
}
