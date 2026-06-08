using FluentValidation;

namespace Application;

public sealed class RegisterRequestValidator : AbstractValidator<RegisterRequest>
{
    public RegisterRequestValidator()
    {
        RuleFor(x => x.FullName)
            .NotEmpty().WithMessage(ValidationMessages.Required)
            .MaximumLength(100).WithMessage(ValidationMessages.MaxLength);

        RuleFor(x => x.Email)
            .NotEmpty().WithMessage(ValidationMessages.Required)
            .EmailAddress().WithMessage(ValidationMessages.InvalidEmail);

        RuleFor(x => x.Phone)
            .NotEmpty().WithMessage(ValidationMessages.Required)
            .Matches(@"^(0|\+84)[3-9]\d{8}$").WithMessage(ValidationMessages.InvalidPhoneNumber);

        RuleFor(x => x.Password)
            .NotEmpty().WithMessage(ValidationMessages.Required)
            .MinimumLength(7).WithMessage(ValidationMessages.MinLength)
            .Matches(@"[A-Z]").WithMessage(ValidationMessages.InvalidFormat)
            .Matches(@"[a-z]").WithMessage(ValidationMessages.InvalidFormat)
            .Matches(@"[0-9]").WithMessage(ValidationMessages.InvalidFormat)
            .Matches(@"[!@#$%^&*()_+\-=\[\]{};':""\\|,.<>\/?]").WithMessage(ValidationMessages.InvalidFormat);
    }
}
