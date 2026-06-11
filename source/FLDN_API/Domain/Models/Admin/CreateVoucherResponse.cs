namespace Contract;

public sealed class CreateVoucherResponse
{
    public Guid VoucherId { get; set; }
    public string Code { get; set; } = default!;
}
