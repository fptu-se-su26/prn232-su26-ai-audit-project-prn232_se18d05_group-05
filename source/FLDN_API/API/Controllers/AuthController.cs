namespace API;

[ApiController]
[Route("api/auth")]
public sealed class AuthController(
    IAuthService authService,
    IOptions<JwtOptions> jwtOptions
) : ControllerBase
{
    [HttpPost("register")]
    public async Task<IActionResult> Register([FromBody] RegisterRequest request, CancellationToken ct)
    {
        var result = await authService.RegisterAsync(request, ct);
        return StatusCode(StatusCodes.Status201Created, ApiResponse<RegisterResponse>.Ok(result, BusinessMessages.CreatedSuccessfully("account"), StatusCodes.Status201Created));
    }

    [HttpPost("login")]
    public async Task<IActionResult> Login([FromBody] LoginRequest request, CancellationToken ct)
    {
        var result = await authService.LoginAsync(request, ct);

        Response.Cookies.Append("refresh_token", result.RefreshToken!, new CookieOptions
        {
            HttpOnly = true,
            Secure = true,
            SameSite = SameSiteMode.Strict,
            MaxAge = TimeSpan.FromSeconds(jwtOptions.Value.RefreshTokenLifetime)
        });

        return Ok(ApiResponse<SignInResponse>.Ok(result, "Login successful"));
    }

    [HttpPost("forgot-password")]
    public async Task<IActionResult> ForgotPassword([FromBody] ForgotPasswordRequest request, CancellationToken ct)
    {
        await authService.ForgotPasswordAsync(request, ct);
        return Ok(ApiResponse<object>.OkMessage("If this email is registered, a reset link has been sent."));
    }

    [HttpPost("reset-password")]
    public async Task<IActionResult> ResetPassword([FromBody] ResetPasswordRequest request, CancellationToken ct)
    {
        await authService.ResetPasswordAsync(request, ct);
        return Ok(ApiResponse<object>.OkMessage("Password reset successfully."));
    }

    [HttpGet("verify-email")]
    public async Task<IActionResult> VerifyEmail([FromQuery] string token, CancellationToken ct)
    {
        await authService.VerifyEmailAsync(token, ct);
        return Ok(ApiResponse<object>.OkMessage("Email verified successfully. You can now login."));
    }

    [Authorize]
    [HttpPost("logout")]
    public async Task<IActionResult> Logout(CancellationToken ct)
    {
        var userId = User.GetUserId();
        await authService.LogoutAsync(userId, ct);

        Response.Cookies.Delete("refresh_token");
        Response.Cookies.Delete("access_token");

        return Ok(ApiResponse<object>.OkMessage("Logout successful"));
    }
}
