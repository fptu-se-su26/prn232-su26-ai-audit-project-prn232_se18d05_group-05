namespace Infrastructure;

internal static class DatabaseExtensions
{
    public static IServiceCollection AddInfrastructureDbContext(this IServiceCollection services, IConfiguration configuration)
    {
        services.AddSingleton<TimestampInterceptor>();

        services.AddDbContextPool<ApplicationDbContext>((sp, options) =>
        {
            options.UseSqlServer(configuration.GetConnectionString("SqlServerConnection"), sqlOptions =>
            {
                sqlOptions.EnableRetryOnFailure(
                    maxRetryCount: 5,
                    maxRetryDelay: TimeSpan.FromSeconds(10),
                    errorNumbersToAdd: null);
            });
            options.AddInterceptors(sp.GetRequiredService<TimestampInterceptor>());
            options.ConfigureWarnings(w =>
                w.Ignore(CoreEventId.PossibleIncorrectRequiredNavigationWithQueryFilterInteractionWarning));
        });
        return services;
    }
}
