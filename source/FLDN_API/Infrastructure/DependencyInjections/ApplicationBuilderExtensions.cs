using Microsoft.Extensions.Logging;

namespace Infrastructure;

public static class ApplicationBuilderExtensions
{
    public static async Task ApplyMigrationsAndSeedAsync(this WebApplication app)
    {
        await using var scope = app.Services.CreateAsyncScope();
        var db = scope.ServiceProvider.GetRequiredService<ApplicationDbContext>();
        var logger = scope.ServiceProvider.GetRequiredService<ILoggerFactory>().CreateLogger("Startup");

        try
        {
            await db.Database.MigrateAsync();

            // Role và District là dữ liệu bắt buộc ở mọi môi trường —
            // thiếu Role thì RegisterAsync ném NotFoundException và không ai đăng ký được
            await AppData.SeedEssentialAsync(db);

            if (app.Environment.IsDevelopment())
                await AppData.SeedAsync(db);
        }
        catch (Exception ex)
        {
            logger.LogError(ex, "Applying migrations or seeding data failed on startup.");
            throw;
        }
    }
}
