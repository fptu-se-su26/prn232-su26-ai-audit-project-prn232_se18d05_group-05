namespace Domain;

public enum OrderStatus
{
    Pending,
    Confirmed,
    Preparing,
    ReadyToShip,
    Shipping,
    Delivered,
    Cancelled,
    Refunded
}
