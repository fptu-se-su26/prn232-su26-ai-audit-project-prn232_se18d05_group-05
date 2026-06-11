namespace Infrastructure;

public class RoleData
{
    public static IEnumerable<Role> GetRoles()
    {
        var createdAt = new DateTimeOffset(2025, 11, 9, 11, 0, 0, TimeSpan.FromHours(7));

        return
        [
            new Role { Id = GuidHelper.From($"Role.{nameof(RoleType.Admin)}"),             RoleName = nameof(RoleType.Admin),             Description = "Quản trị hệ thống",      CreatedAt = createdAt },
            new Role { Id = GuidHelper.From($"Role.{nameof(RoleType.Supplier)}"),           RoleName = nameof(RoleType.Supplier),           Description = "Nhà cung cấp thực phẩm", CreatedAt = createdAt },
            new Role { Id = GuidHelper.From($"Role.{nameof(RoleType.DistributionPoint)}"),  RoleName = nameof(RoleType.DistributionPoint),  Description = "Điểm phân phối",          CreatedAt = createdAt },
            new Role { Id = GuidHelper.From($"Role.{nameof(RoleType.LogisticsOperator)}"),  RoleName = nameof(RoleType.LogisticsOperator),  Description = "Đơn vị vận chuyển",       CreatedAt = createdAt },
        ];
    }
}
