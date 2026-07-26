using Microsoft.Extensions.Configuration;

namespace Contract;

public class AppConfiguration(IConfiguration configuration) : IAppConfiguration
{

    public JwtOptions GetJwtOptions()
    {
        var jwtOptions = configuration.GetSection("Jwt").Get<JwtOptions>();

        if (jwtOptions == null)
            throw new InvalidOperationException("Missing 'Jwt' section in appsettings.json");

        // 3. Validate dữ liệu quan trọng
        // Đảm bảo không có trường nào bị rỗng
        if (string.IsNullOrWhiteSpace(jwtOptions.Key) ||
            string.IsNullOrWhiteSpace(jwtOptions.Issuer) ||
            string.IsNullOrWhiteSpace(jwtOptions.Audience))
        {
            throw new InvalidOperationException("Jwt configuration is invalid. Key, Issuer, and Audience are required.");
        }

        return jwtOptions;
    }

    public CloudinaryOptions GetCloudinaryOptions()
    {
        var cloudinaryOptions = configuration.GetSection("Cloudinary").Get<CloudinaryOptions>();

        if (cloudinaryOptions == null)
            throw new InvalidOperationException("Missing 'Cloudinary' section in appsettings.json");

        return cloudinaryOptions;
    }

    public AppOptions GetAppOptions()
    {
        var appOptions = configuration.GetSection("App").Get<AppOptions>();

        if (appOptions == null)
            throw new InvalidOperationException("Missing 'App' section in appsettings.json");

        if (string.IsNullOrWhiteSpace(appOptions.BaseUrl))
            throw new InvalidOperationException("App:BaseUrl is required — link xác thực email phụ thuộc vào giá trị này.");

        // Bỏ dấu '/' cuối để nối path không sinh ra '//'
        appOptions.BaseUrl = appOptions.BaseUrl.TrimEnd('/');
        appOptions.ApiBaseUrl = appOptions.ApiBaseUrl?.TrimEnd('/') ?? string.Empty;

        return appOptions;
    }

    public OrderOptions GetOrderOptions()
    {
        var orderOptions = configuration.GetSection("Order").Get<OrderOptions>();

        if (orderOptions == null)
            throw new InvalidOperationException("Missing 'Order' section in appsettings.json");

        if (orderOptions.StandardShippingFee < 0 || orderOptions.ScheduledShippingFee < 0)
            throw new InvalidOperationException("Order shipping fees must not be negative.");

        return orderOptions;
    }
}
