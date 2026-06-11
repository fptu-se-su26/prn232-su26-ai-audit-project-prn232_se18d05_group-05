namespace Contract;

public sealed class UpdateSupplierFeeRequest
{
    public decimal ServiceFeeRate { get; set; }
    public decimal DiscountRate { get; set; }
}
