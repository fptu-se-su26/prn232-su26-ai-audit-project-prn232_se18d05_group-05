using FluentValidation;

namespace Application;

public sealed class UpsertDistributionPointProfileRequestValidator : AbstractValidator<UpsertDistributionPointProfileRequest>
{
    public UpsertDistributionPointProfileRequestValidator()
    {
        RuleFor(x => x.PointName)
            .NotEmpty().WithMessage(ValidationMessages.Required)
            .MaximumLength(255).WithMessage(ValidationMessages.MaxLength);

        RuleFor(x => x.PointType)
            .IsInEnum().WithMessage(ValidationMessages.InvalidEnumValue);

        RuleFor(x => x.Capacity)
            .GreaterThanOrEqualTo(0).WithMessage(ValidationMessages.GreaterThanOrEqual);

        RuleFor(x => x.CapacityUnit)
            .MaximumLength(20).WithMessage(ValidationMessages.MaxLength);

        RuleFor(x => x.Address)
            .MaximumLength(500).WithMessage(ValidationMessages.MaxLength);

        RuleFor(x => x.ContactPerson)
            .MaximumLength(150).WithMessage(ValidationMessages.MaxLength);

        RuleFor(x => x.ContactPhone)
            .Matches(@"^(0|\+84)[3-9]\d{8}$").WithMessage(ValidationMessages.InvalidPhoneNumber)
            .When(x => !string.IsNullOrWhiteSpace(x.ContactPhone));

        RuleFor(x => x.OperatingHours)
            .MaximumLength(100).WithMessage(ValidationMessages.MaxLength);
    }
}
