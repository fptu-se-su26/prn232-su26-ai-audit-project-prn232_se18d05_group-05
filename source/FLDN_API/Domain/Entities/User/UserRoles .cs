namespace Domain;

public class UserRole
{
    public int UserRoleId { get; set; }
    public int UserId { get; set; }
    public int RoleId { get; set; }

    // Navigation
    public User User { get; set; } = default!;
    public Role Role { get; set; } = default!;
}
