using Microsoft.Extensions.Configuration;

namespace Application;

public static class ServiceCollectionExtensions
{
    public static IServiceCollection AddApplicationServices(this IServiceCollection services, IConfiguration config)
    {
        var appAssembly = AssemblyReference.Assembly;

        services.AddMapsterServices();

        return services;
    }
}
