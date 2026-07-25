namespace Domain;

public sealed class CreateOrderItemRequest
{
    public Guid ProductId { get; set; }
    public int Quantity { get; set; }
    public decimal UnitPrice { get; set; }
}

public sealed class CreateOrderRequest
{
    public Guid AddressId { get; set; }
    public FulfillmentType FulfillmentType { get; set; } = FulfillmentType.Standard;
    public DateTimeOffset? ScheduledTime { get; set; }
    public string? VoucherCode { get; set; }
    public string? Note { get; set; }
    public List<CreateOrderItemRequest> Items { get; set; } = [];
}

public sealed class ConfirmReceiptRequest
{
    public bool IsFullReceived { get; set; } = true;
    public string? Note { get; set; }
}

public sealed class OrderItemResponse
{
    public Guid ProductId { get; set; }
    public string ProductName { get; set; } = default!;
    public string Unit { get; set; } = default!;
    public decimal UnitPrice { get; set; }
    public int Quantity { get; set; }
    public decimal SubTotal => UnitPrice * Quantity;
}

public sealed class OrderResponse
{
    public Guid Id { get; set; }
    public Guid DistributionPointId { get; set; }
    public Guid AddressId { get; set; }
    public string FullAddress { get; set; } = default!;
    public decimal TotalAmount { get; set; }
    public decimal ShippingFee { get; set; }
    public decimal FinalAmount { get; set; }
    public SupplyRequestStatus Status { get; set; }
    public FulfillmentType FulfillmentType { get; set; }
    public DateTimeOffset? ScheduledTime { get; set; }
    public string? Note { get; set; }
    public DateTimeOffset CreatedAt { get; set; }
    public List<OrderItemResponse> Items { get; set; } = [];
}
