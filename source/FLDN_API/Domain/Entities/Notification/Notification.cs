namespace Domain;

public class Notification : EntityBase<int>
{
    public int UserId { get; set; }
    public string Title { get; set; } = default!;
    public string Body { get; set; } = default!;
    public NotificationType Type { get; set; }
    public bool IsRead { get; set; }
    public int? RelatedId { get; set; }
    public string? RelatedType { get; set; }

    // Navigation
    public User User { get; set; } = default!;
}
