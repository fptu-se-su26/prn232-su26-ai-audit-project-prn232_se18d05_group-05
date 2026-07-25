namespace Contract;

public class AdminDashboardResponse
{
    public int TotalUsers { get; set; }
    public int LockedUsers { get; set; }

    public int TotalSuppliers { get; set; }
    public int PendingSuppliers { get; set; }
    public int ApprovedSuppliers { get; set; }
    public int RejectedSuppliers { get; set; }

    public int TotalLogisticsOperators { get; set; }
    public int AvailableOperators { get; set; }

    public int TotalOrders { get; set; }
    public int PendingOrders { get; set; }
    public int CompletedOrders { get; set; }
    public int CancelledOrders { get; set; }

    public decimal TotalRevenue { get; set; }

    public int TotalZones { get; set; }
    public int ActiveZones { get; set; }
}
