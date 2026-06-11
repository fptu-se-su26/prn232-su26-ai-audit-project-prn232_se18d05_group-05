using Mapster;

namespace Application;

[RegisterService(typeof(IAuthService))]
public sealed class AuthService(
    IUnitOfWork unitOfWork,
    IPasswordHasher passwordHasher,
    IJwtTokensService jwtTokensService,
    IRedisCacheService redisCache,
    IAppConfiguration appConfiguration,
    IBackgroundJobService backgroundJobService
) : IAuthService
{
    public async Task<RegisterResponse> RegisterAsync(RegisterRequest request, CancellationToken ct = default)
    {
        if (await unitOfWork.Users.AnyAsync(u => u.Email == request.Email, ct))
            throw new ConflictException("Email already registered.");

        if (await unitOfWork.Users.AnyAsync(u => u.Phone == request.Phone, ct))
            throw new ConflictException("Phone number already registered.");

        var customerRole = await unitOfWork.Repository<Role>().FindAsync(r => r.RoleName == nameof(RoleType.Customer), ct)
            ?? throw new NotFoundException("Customer role not found.");

        var user = new User
        {
            FullName = request.FullName,
            Email = request.Email,
            Phone = request.Phone,
            PasswordHash = passwordHasher.Hash(request.Password),
            IsActive = false,
            IsDeleted = false
        };

        await unitOfWork.Users.AddAsync(user);
        await unitOfWork.EnsureSaveAsync(ct);

        await unitOfWork.Repository<UserRole>().AddAsync(new UserRole
        {
            UserId = user.Id,
            RoleId = customerRole.Id
        });
        await unitOfWork.EnsureSaveAsync(ct);

        var verifyToken = jwtTokensService.GenerateEmailVerifyToken();
        await redisCache.SetRecordAsync(
            AppConstants.RedisKeys.EmailVerify(verifyToken),
            user.Id.ToString(),
            TimeSpan.FromMinutes(AppConstants.Email.VerifyTokenTtlMinutes)
        );

        var verifyLink = $"{AppConstants.BaseUrl}{AppConstants.Email.VerifyEmailPath}?token={verifyToken}";
        await backgroundJobService.EnqueueEmailAsync(new EmailContent
        {
            Receiver = user.Email,
            Subject = "Xác nhận tài khoản FoodLink",
            Body = EmailTemplates.VerifyEmailBody(user.FullName, verifyLink)
        });

        return user.Adapt<RegisterResponse>();
    }

    public async Task<SignInResponse> LoginAsync(LoginRequest request, CancellationToken ct = default)
    {
        var user = await unitOfWork.Users.FindAsync(
            u => u.Email == request.Email,
            ct,
            nameof(User.UserRoles)
        ) ?? throw new UnauthorizedException("Invalid email or password.");

        if (!passwordHasher.Verify(request.Password, user.PasswordHash))
            throw new UnauthorizedException("Invalid email or password.");

        if (!user.IsActive)
            throw new ForbiddenException("Account is not verified or inactive.");

        var roleId = user.UserRoles.FirstOrDefault()?.RoleId;
        string? roleName = null;
        if (roleId.HasValue)
        {
            var role = await unitOfWork.Repository<Role>().GetByIdAsync(roleId.Value);
            roleName = role?.RoleName;
        }

        var credentials = new UserCredentials
        {
            Id = user.Id,
            Email = user.Email,
            FullName = user.FullName,
            AvatarURL = user.AvatarUrl ?? string.Empty,
            IsVerified = true,
            Role = roleName
        };

        var signInResponse = jwtTokensService.GenerateAccessToken(credentials);
        var refreshToken = jwtTokensService.GenerateRefreshToken();

        var jwtOptions = appConfiguration.GetJwtOptions();
        await redisCache.SetRecordAsync(
            AppConstants.RedisKeys.RefreshToken(user.Id),
            refreshToken,
            TimeSpan.FromSeconds(jwtOptions.RefreshTokenLifetime)
        );

        signInResponse.RefreshToken = refreshToken;
        return signInResponse;
    }

    public async Task ForgotPasswordAsync(ForgotPasswordRequest request, CancellationToken ct = default)
    {
        var user = await unitOfWork.Users.FindAsync(u => u.Email == request.Email, ct);
        if (user is null) return;

        var resetToken = jwtTokensService.GenerateEmailVerifyToken();
        await redisCache.SetRecordAsync(
            AppConstants.RedisKeys.PasswordReset(resetToken),
            user.Id.ToString(),
            TimeSpan.FromMinutes(AppConstants.Email.PasswordResetTokenTtlMinutes)
        );

        var resetLink = $"{AppConstants.BaseUrl}{AppConstants.Email.ResetPasswordPath}?token={resetToken}";
        await backgroundJobService.EnqueueEmailAsync(new EmailContent
        {
            Receiver = user.Email,
            Subject = "Đặt lại mật khẩu FoodLink",
            Body = EmailTemplates.ResetPasswordBody(user.FullName, resetLink)
        });
    }

    public async Task ResetPasswordAsync(ResetPasswordRequest request, CancellationToken ct = default)
    {
        var key = AppConstants.RedisKeys.PasswordReset(request.Token);
        var userIdString = await redisCache.GetRecordAsync<string>(key)
            ?? throw new BadRequestException("Reset token is invalid or has expired.");

        if (!Guid.TryParse(userIdString, out var userId))
            throw new BadRequestException("Reset token is invalid or has expired.");

        var user = await unitOfWork.Users.GetByIdAsync(userId)
            ?? throw new NotFoundException("User not found.");

        user.PasswordHash = passwordHasher.Hash(request.NewPassword);
        unitOfWork.Users.Update(user);
        await unitOfWork.EnsureSaveAsync(ct);

        await redisCache.RemoveRecordAsync(key);
    }

    public async Task LogoutAsync(Guid userId, CancellationToken ct = default)
        => await redisCache.RemoveRecordAsync(AppConstants.RedisKeys.RefreshToken(userId));

    public async Task VerifyEmailAsync(string token, CancellationToken ct = default)
    {
        var key = AppConstants.RedisKeys.EmailVerify(token);
        var userIdString = await redisCache.GetRecordAsync<string>(key)
            ?? throw new BadRequestException("Verification link is invalid or has expired.");

        if (!Guid.TryParse(userIdString, out var userId))
            throw new BadRequestException("Verification link is invalid or has expired.");

        var user = await unitOfWork.Users.GetByIdAsync(userId)
            ?? throw new NotFoundException("User not found.");

        if (user.IsActive)
            throw new ConflictException("Account is already verified.");

        user.IsActive = true;
        unitOfWork.Users.Update(user);
        await unitOfWork.EnsureSaveAsync(ct);

        await redisCache.RemoveRecordAsync(key);
    }
}
