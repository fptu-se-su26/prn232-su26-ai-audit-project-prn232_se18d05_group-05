namespace Contract;

public class OrderOptions
{
    public decimal StandardShippingFee { get; set; }
    public decimal ScheduledShippingFee { get; set; }
    public List<VoucherOption> Vouchers { get; set; } = [];
}

public class VoucherOption
{
    public string Code { get; set; } = string.Empty;
    public decimal DiscountPercent { get; set; }
    public decimal MaxDiscountAmount { get; set; }
    public bool IsActive { get; set; } = true;
}
