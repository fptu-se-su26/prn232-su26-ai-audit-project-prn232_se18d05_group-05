namespace Infrastructure;

public class ApplicationDbContext : DbContext
{
    public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options) { }

    // User domain
    public DbSet<User> Users => Set<User>();
    public DbSet<Role> Roles => Set<Role>();
    public DbSet<UserRole> UserRoles => Set<UserRole>();

    // Location
    public DbSet<District> Districts => Set<District>();
    public DbSet<DeliveryZone> DeliveryZones => Set<DeliveryZone>();
    public DbSet<Address> Addresses => Set<Address>();

    // Supplier
    public DbSet<SupplierProfile> SupplierProfiles => Set<SupplierProfile>();

    // Product
    public DbSet<Category> Categories => Set<Category>();
    public DbSet<Product> Products => Set<Product>();
    public DbSet<ProductImage> ProductImages => Set<ProductImage>();
    public DbSet<PriceHistory> PriceHistories => Set<PriceHistory>();
    public DbSet<Inventory> Inventories => Set<Inventory>();
    public DbSet<Batch> Batches => Set<Batch>();
    public DbSet<QRCode> QRCodes => Set<QRCode>();

    // Cart
    public DbSet<Cart> Carts => Set<Cart>();
    public DbSet<CartItem> CartItems => Set<CartItem>();

    // Payment / Voucher
    public DbSet<Voucher> Vouchers => Set<Voucher>();
    public DbSet<VoucherUsage> VoucherUsages => Set<VoucherUsage>();
    public DbSet<Wallet> Wallets => Set<Wallet>();
    public DbSet<WalletTransaction> WalletTransactions => Set<WalletTransaction>();

    // Order
    public DbSet<Order> Orders => Set<Order>();
    public DbSet<OrderItem> OrderItems => Set<OrderItem>();
    public DbSet<OrderStatusHistory> OrderStatusHistories => Set<OrderStatusHistory>();
    public DbSet<SupplierOrderConfirmation> SupplierOrderConfirmations => Set<SupplierOrderConfirmation>();

    // Payment
    public DbSet<Payment> Payments => Set<Payment>();

    // Review
    public DbSet<Review> Reviews => Set<Review>();

    // Delivery
    public DbSet<ShipperProfile> ShipperProfiles => Set<ShipperProfile>();
    public DbSet<Delivery> Deliveries => Set<Delivery>();
    public DbSet<ShipperOrderAction> ShipperOrderActions => Set<ShipperOrderAction>();
    public DbSet<DeliveryStatusHistory> DeliveryStatusHistories => Set<DeliveryStatusHistory>();

    // Notification
    public DbSet<Notification> Notifications => Set<Notification>();

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);
        modelBuilder.ApplyConfigurationsFromAssembly(typeof(ApplicationDbContext).Assembly);
    }
}
