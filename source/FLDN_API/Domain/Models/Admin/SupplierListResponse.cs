using Domain;

namespace Contract;

public sealed class SupplierListResponse
{
    public Guid SupplierId { get; set; }
    public string BusinessName { get; set; } = default!;
    public SupplierStatus Status { get; set; }
    public DateTimeOffset CreatedAt { get; set; }
}
