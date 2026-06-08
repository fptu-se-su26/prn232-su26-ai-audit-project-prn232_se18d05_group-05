namespace Domain;

public class Role : EntityBase<Guid>
{
    public string RoleName { get; set; } = default!;
    public string? Description { get; set; }

    // Navigation
    public ICollection<UserRole> UserRoles { get; set; } = [];
}
