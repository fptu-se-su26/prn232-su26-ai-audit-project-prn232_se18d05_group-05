using System.IdentityModel.Tokens.Jwt;

namespace API;

public static class ClaimsPrincipalExtensions
{
    public static Guid GetUserId(this ClaimsPrincipal principal)
    {
        var value = principal.FindFirstValue(JwtRegisteredClaimNames.Sub)
                    ?? principal.FindFirstValue(ClaimTypes.NameIdentifier);

        if (string.IsNullOrEmpty(value) || !Guid.TryParse(value, out var id))
            throw new UnauthorizedException("Invalid or missing user ID in token.");

        return id;
    }

    public static string GetUserEmail(this ClaimsPrincipal principal)
        => principal.FindFirstValue(JwtRegisteredClaimNames.Email)
           ?? principal.FindFirstValue(ClaimTypes.Email)
           ?? string.Empty;

    public static string GetUserRole(this ClaimsPrincipal principal)
        => principal.FindFirstValue("role") ?? string.Empty;

    public static string GetUserName(this ClaimsPrincipal principal)
        => principal.FindFirstValue(JwtRegisteredClaimNames.Name)
           ?? principal.FindFirstValue(ClaimTypes.Name)
           ?? string.Empty;
}