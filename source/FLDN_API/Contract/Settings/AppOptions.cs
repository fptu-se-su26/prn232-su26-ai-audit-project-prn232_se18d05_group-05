namespace Contract;

public class AppOptions
{
    /// <summary>
    /// Địa chỉ gốc của frontend, dùng để dựng link xác thực email và đặt lại mật khẩu.
    /// </summary>
    public string BaseUrl { get; set; } = string.Empty;

    /// <summary>
    /// Địa chỉ gốc của chính API, dùng để dựng link truy xuất nguồn gốc trong mã QR.
    /// </summary>
    public string ApiBaseUrl { get; set; } = string.Empty;
}
