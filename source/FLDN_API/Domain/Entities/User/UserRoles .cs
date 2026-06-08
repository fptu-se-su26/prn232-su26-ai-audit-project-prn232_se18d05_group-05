namespace Domain;

public class UserRole : EntityBase<Guid>
{
    public Guid UserId { get; set; }
    public Guid RoleId { get; set; }

    // Navigation
    public User User { get; set; } = default!;
    public Role Role { get; set; } = default!;
}
