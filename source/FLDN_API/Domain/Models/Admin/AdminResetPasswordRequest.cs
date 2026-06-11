namespace Contract;

public sealed class AdminResetPasswordRequest
{
    public string NewPassword { get; set; } = default!;
}
