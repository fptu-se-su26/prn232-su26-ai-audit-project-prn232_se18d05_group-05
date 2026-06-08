namespace Infrastructure;

public static class ApplicationBuilderExtensions
{
    public static async Task ApplyMigrationsAndSeedAsync(this WebApplication app)
    {
        await using var scope = app.Services.CreateAsyncScope();
        var db = scope.ServiceProvider.GetRequiredService<ApplicationDbContext>();

        await db.Database.MigrateAsync();

        if (app.Environment.IsDevelopment())
            await AppData.SeedAsync(db);
    }
}
