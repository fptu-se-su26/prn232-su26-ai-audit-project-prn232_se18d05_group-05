using Domain;
using Microsoft.EntityFrameworkCore;

namespace Infrastructure;

public class AppData
{
    public static async Task SeedAsync(ApplicationDbContext context)
    {
        if (!await context.Roles.AnyAsync())
            await context.Roles.AddRangeAsync(RoleData.GetRoles());

        await context.SaveChangesAsync();

        // Seed a test LogisticsOperator (Shipper) if not exists
        if (!await context.Users.AnyAsync(u => u.Email == "shipper@foodlink.com"))
        {
            var role = await context.Roles.FirstOrDefaultAsync(r => r.RoleName == nameof(RoleType.LogisticsOperator));
            if (role != null)
            {
                var user = new User
                {
                    Id = Guid.NewGuid(),
                    FullName = "Nguyễn Văn Vận Chuyển",
                    Email = "shipper@foodlink.com",
                    Phone = "0987654321",
                    PasswordHash = BCrypt.Net.BCrypt.HashPassword("Password123"),
                    IsActive = true,
                    IsDeleted = false
                };

                await context.Users.AddAsync(user);

                await context.UserRoles.AddAsync(new UserRole
                {
                    UserId = user.Id,
                    RoleId = role.Id
                });

                await context.LogisticsProfiles.AddAsync(new LogisticsProfile
                {
                    Id = Guid.NewGuid(),
                    UserId = user.Id,
                    VehicleType = "Xe máy",
                    LicensePlate = "43A-12345",
                    IdentityCard = "123456789",
                    Status = LogisticsOperatorStatus.Available,
                    TotalShipments = 0,
                    IsDeleted = false
                });

                await context.SaveChangesAsync();
            }
        }
    }
}
