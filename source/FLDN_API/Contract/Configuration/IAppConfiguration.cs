namespace Contract;

public interface IAppConfiguration
{
    JwtOptions GetJwtOptions();
    CloudinaryOptions GetCloudinaryOptions();
    OrderOptions GetOrderOptions();
}
