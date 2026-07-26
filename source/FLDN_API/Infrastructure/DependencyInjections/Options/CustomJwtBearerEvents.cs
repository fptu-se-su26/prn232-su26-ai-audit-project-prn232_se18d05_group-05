namespace Infrastructure;

using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Authentication.JwtBearer;

public class CustomJwtBearerEvents : JwtBearerEvents
{
    public override Task Challenge(JwtBearerChallengeContext context)
    {
        context.HandleResponse();
        context.Response.StatusCode = StatusCodes.Status401Unauthorized;
        context.Response.ContentType = "application/json";
        return context.Response.WriteAsync("{\"statusCode\": 401, \"message\": \"Access token is missing or invalid.\"}");
    }

    public override Task Forbidden(ForbiddenContext context)
    {
        context.Response.StatusCode = StatusCodes.Status403Forbidden;
        context.Response.ContentType = "application/json";
        return context.Response.WriteAsync("{\"statusCode\": 403, \"message\": \"Forbidden access.\"}");
    }
}
