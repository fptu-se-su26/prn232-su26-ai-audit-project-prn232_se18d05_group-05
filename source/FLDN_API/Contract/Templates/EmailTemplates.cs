namespace Contract;

public static class EmailTemplates
{
    public static string VerifyEmailBody(string fullName, string verifyLink) => $"""
        <div style="font-family:Arial,sans-serif;max-width:600px;margin:auto;padding:24px;border:1px solid #e0e0e0;border-radius:8px">
          <h2 style="color:#2e7d32">Xác nhận tài khoản FoodLink</h2>
          <p>Xin chào <strong>{fullName}</strong>,</p>
          <p>Cảm ơn bạn đã đăng ký. Nhấn vào nút bên dưới để xác nhận email trong vòng <strong>{AppConstants.Email.VerifyTokenTtlMinutes} phút</strong>:</p>
          <a href="{verifyLink}" style="display:inline-block;padding:12px 24px;background:#2e7d32;color:#fff;text-decoration:none;border-radius:4px;margin:16px 0">Xác nhận tài khoản</a>
          <p style="color:#757575;font-size:12px">Nếu bạn không đăng ký, bỏ qua email này.</p>
        </div>
        """;

    public static string ResetPasswordBody(string fullName, string resetLink) => $"""
        <div style="font-family:Arial,sans-serif;max-width:600px;margin:auto;padding:24px;border:1px solid #e0e0e0;border-radius:8px">
          <h2 style="color:#c62828">Đặt lại mật khẩu FoodLink</h2>
          <p>Xin chào <strong>{fullName}</strong>,</p>
          <p>Chúng tôi nhận được yêu cầu đặt lại mật khẩu. Link có hiệu lực trong <strong>{AppConstants.Email.PasswordResetTokenTtlMinutes} phút</strong>:</p>
          <a href="{resetLink}" style="display:inline-block;padding:12px 24px;background:#c62828;color:#fff;text-decoration:none;border-radius:4px;margin:16px 0">Đặt lại mật khẩu</a>
          <p style="color:#757575;font-size:12px">Nếu bạn không yêu cầu, bỏ qua email này. Mật khẩu sẽ không thay đổi.</p>
        </div>
        """;
}
