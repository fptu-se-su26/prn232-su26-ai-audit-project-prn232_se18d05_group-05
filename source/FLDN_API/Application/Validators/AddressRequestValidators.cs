using FluentValidation;

namespace Application;

public sealed class CreateAddressRequestValidator : AbstractValidator<CreateAddressRequest>
{
    public CreateAddressRequestValidator()
    {
        RuleFor(x => x.ReceiverName)
            .NotEmpty().WithMessage(ValidationMessages.Required)
            .MaximumLength(150).WithMessage(ValidationMessages.MaxLength);

        RuleFor(x => x.ReceiverPhone)
            .NotEmpty().WithMessage(ValidationMessages.Required)
            .Matches(@"^(0|\+84)[3-9]\d{8}$").WithMessage(ValidationMessages.InvalidPhoneNumber);

        RuleFor(x => x.FullAddress)
            .NotEmpty().WithMessage(ValidationMessages.Required)
            .MaximumLength(500).WithMessage(ValidationMessages.MaxLength);

        RuleFor(x => x.DistrictId)
            .NotEmpty().WithMessage(ValidationMessages.Required);
    }
}

public sealed class UpdateAddressRequestValidator : AbstractValidator<UpdateAddressRequest>
{
    public UpdateAddressRequestValidator()
    {
        RuleFor(x => x.ReceiverName)
            .NotEmpty().WithMessage(ValidationMessages.Required)
            .MaximumLength(150).WithMessage(ValidationMessages.MaxLength);

        RuleFor(x => x.ReceiverPhone)
            .NotEmpty().WithMessage(ValidationMessages.Required)
            .Matches(@"^(0|\+84)[3-9]\d{8}$").WithMessage(ValidationMessages.InvalidPhoneNumber);

        RuleFor(x => x.FullAddress)
            .NotEmpty().WithMessage(ValidationMessages.Required)
            .MaximumLength(500).WithMessage(ValidationMessages.MaxLength);

        RuleFor(x => x.DistrictId)
            .NotEmpty().WithMessage(ValidationMessages.Required);
    }
}
