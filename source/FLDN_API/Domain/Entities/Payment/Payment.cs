namespace Domain;

public class Payment : EntityBase<int>
{
    public int OrderId { get; set; }
    public PaymentMethod Method { get; set; }
    public decimal Amount { get; set; }
    public PaymentStatus Status { get; set; }
    public string? TransactionCode { get; set; }
    public string? GatewayResponse { get; set; }
    public DateTimeOffset? PaidAt { get; set; }
    public DateTimeOffset? RefundedAt { get; set; }
    public string? RefundReason { get; set; }

    // Navigation
    public Order Order { get; set; } = default!;
}
