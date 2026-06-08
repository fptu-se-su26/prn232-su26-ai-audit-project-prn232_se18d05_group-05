using System.Net.Http.Headers;

namespace Infrastructure;

internal static class RedisExtensions
{
    public static IServiceCollection AddRedisCache(this IServiceCollection services, IConfiguration configuration)
    {
        var baseUrl = configuration["Upstash:BaseUrl"] ?? throw new InvalidOperationException("Upstash:BaseUrl is required");
        var token = configuration["Upstash:Token"] ?? throw new InvalidOperationException("Upstash:Token is required");

        services.AddHttpClient(nameof(RedisCacheService), client =>
        {
            client.BaseAddress = new Uri(baseUrl.EndsWith("/") ? baseUrl : baseUrl + "/");
            client.DefaultRequestHeaders.Authorization =
                new AuthenticationHeaderValue("Bearer", token);
        })
            .ConfigurePrimaryHttpMessageHandler(() =>
                new SocketsHttpHandler
                {
                    PooledConnectionLifetime = TimeSpan.FromMinutes(5),
                    PooledConnectionIdleTimeout = TimeSpan.FromMinutes(2),
                    MaxConnectionsPerServer = 100,
                    UseProxy = false,
                    Proxy = null
                });
        return services;
    }
}
