namespace Contract;

public interface IAppConfiguration
{
    JwtOptions GetJwtOptions();
    CloudinaryOptions GetCloudinaryOptions();
    AppOptions GetAppOptions();
    OrderOptions GetOrderOptions();
}
