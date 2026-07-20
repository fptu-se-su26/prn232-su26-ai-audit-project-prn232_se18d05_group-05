using FluentValidation;

namespace Application;

public sealed class ResetPasswordRequestValidator : AbstractValidator<ResetPasswordRequest>
{
    public ResetPasswordRequestValidator()
    {
        RuleFor(x => x.Token)
            .NotEmpty().WithMessage(ValidationMessages.Required);

        RuleFor(x => x.NewPassword)
            .NotEmpty().WithMessage(ValidationMessages.Required)
            .MinimumLength(7).WithMessage(ValidationMessages.MinLength)
            .Matches(@"[A-Z]").WithMessage(ValidationMessages.InvalidFormat)
            .Matches(@"[a-z]").WithMessage(ValidationMessages.InvalidFormat)
            .Matches(@"[0-9]").WithMessage(ValidationMessages.InvalidFormat)
            .Matches(@"[!@#$%^&*()_+\-=\[\]{};':""\\|,.<>\/?]").WithMessage(ValidationMessages.InvalidFormat);
    }
}
