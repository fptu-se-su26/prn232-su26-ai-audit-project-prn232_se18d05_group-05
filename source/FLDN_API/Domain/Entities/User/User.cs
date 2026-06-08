namespace Domain;

public class User : EntityBase<int>, ISoftDeletable
{
    public string FullName { get; set; } = default!;
    public string Email { get; set; } = default!;
    public string Phone { get; set; } = default!;
    public string PasswordHash { get; set; } = default!;
    public string? AvatarUrl { get; set; }
    public bool IsActive { get; set; }
    public bool IsDeleted { get; set; }
    public DateTimeOffset? DeletedAt { get; set; }

    // Navigation
    public ICollection<UserRole> UserRoles { get; set; } = [];
    public SupplierProfile? SupplierProfile { get; set; }
    public ShipperProfile? ShipperProfile { get; set; }
    public Cart? Cart { get; set; }
    public ICollection<Address> Addresses { get; set; } = [];
    public ICollection<Order> Orders { get; set; } = [];
    public Wallet? Wallet { get; set; }
    public ICollection<Notification> Notifications { get; set; } = [];
}
