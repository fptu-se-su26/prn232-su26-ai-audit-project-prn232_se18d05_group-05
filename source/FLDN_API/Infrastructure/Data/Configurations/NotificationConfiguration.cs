namespace Infrastructure;

public class NotificationConfiguration : BaseEntityConfiguration<Notification, Guid>
{
    public override void Configure(EntityTypeBuilder<Notification> builder)
    {
        base.Configure(builder);

        builder.ToTable("Notifications");

        builder.HasOne(n => n.User).WithMany(u => u.Notifications).HasForeignKey(n => n.UserId).OnDelete(DeleteBehavior.Restrict);

        builder.Property(n => n.Title).IsRequired().HasMaxLength(255);
        builder.Property(n => n.Body).IsRequired().HasMaxLength(1000);
        builder.Property(n => n.Type).HasConversion<string>().HasMaxLength(50).IsRequired();
        builder.Property(n => n.IsRead).HasDefaultValue(false);
        builder.Property(n => n.RelatedType).IsRequired(false).HasMaxLength(50);
    }
}
