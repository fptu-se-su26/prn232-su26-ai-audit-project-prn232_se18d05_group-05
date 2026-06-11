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
    public DbSet<DistributionZone> DistributionZones => Set<DistributionZone>();
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

    // SupplyRequest
    public DbSet<SupplyRequest> SupplyRequests => Set<SupplyRequest>();
    public DbSet<SupplyRequestItem> SupplyRequestItems => Set<SupplyRequestItem>();
    public DbSet<SupplyRequestStatusHistory> SupplyRequestStatusHistories => Set<SupplyRequestStatusHistory>();
    public DbSet<SupplierConfirmation> SupplierConfirmations => Set<SupplierConfirmation>();

    // Shipment
    public DbSet<LogisticsProfile> LogisticsProfiles => Set<LogisticsProfile>();
    public DbSet<Shipment> Shipments => Set<Shipment>();
    public DbSet<LogisticsAction> LogisticsActions => Set<LogisticsAction>();
    public DbSet<ShipmentStatusHistory> ShipmentStatusHistories => Set<ShipmentStatusHistory>();

    // Notification
    public DbSet<Notification> Notifications => Set<Notification>();

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);
        modelBuilder.ApplyConfigurationsFromAssembly(typeof(ApplicationDbContext).Assembly);
    }
}
