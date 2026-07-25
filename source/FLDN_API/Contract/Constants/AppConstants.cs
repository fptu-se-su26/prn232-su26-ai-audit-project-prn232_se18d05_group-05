namespace Contract;

public static class AppConstants
{
    //public const string BaseUrl = "http://foodlink.runasp.net";
    public const string BaseUrl = "http://localhost:3000";

    public static class Email
    {
        public const string VerifyEmailPath = "/auth/verify-email";
        public const string ResetPasswordPath = "/auth/reset-password";
        public const int VerifyTokenTtlMinutes = 10;
        public const int PasswordResetTokenTtlMinutes = 10;
    }

    public static class RedisKeys
    {
        public static string EmailVerify(string token) => $"email_verify:{token}";
        public static string RefreshToken(Guid userId) => $"refresh_token:{userId}";
        public static string PasswordReset(string token) => $"password_reset:{token}";
    }
}
