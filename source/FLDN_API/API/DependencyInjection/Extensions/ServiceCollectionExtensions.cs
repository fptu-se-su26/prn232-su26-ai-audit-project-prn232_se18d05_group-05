using System.Text.Json;

namespace API;

public static class ServiceCollectionExtensions
{
    public static IServiceCollection AddApiServices(this IServiceCollection services, IConfiguration configuration)
    {
        services.AddHttpContextAccessor();
        services.AddControllers(options =>
        {
            options.Filters.Add<FluentValidationFilter>();
        })
        .AddJsonOptions(options =>
        {
            options.JsonSerializerOptions.PropertyNamingPolicy = JsonNamingPolicy.CamelCase;
            options.JsonSerializerOptions.PropertyNameCaseInsensitive = true;
        });

        services.AddCORSPolicy(configuration)
                .AddRateLimiting(configuration)
                .AddFluentValidation()
                .AddProblemDetails()                            // Middlewares
                .AddExceptionHandler<GlobalExceptionHandler>();
        return services;
    }
}
