namespace Domain;

public class Role : EntityBase<int>
{
    public string RoleName { get; set; } = default!;
    public string? Description { get; set; }

    // Navigation
    public ICollection<UserRole> UserRoles { get; set; } = [];
}
