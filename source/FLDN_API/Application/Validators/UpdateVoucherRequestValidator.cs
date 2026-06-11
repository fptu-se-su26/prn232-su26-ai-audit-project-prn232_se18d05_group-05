using FluentValidation;

namespace Application;

public sealed class UpdateVoucherRequestValidator : AbstractValidator<UpdateVoucherRequest>
{
    public UpdateVoucherRequestValidator()
    {
        RuleFor(x => x.VoucherName)
            .NotEmpty().WithMessage(ValidationMessages.Required)
            .MaximumLength(200).WithMessage(ValidationMessages.MaxLength);

        RuleFor(x => x.DiscountValue)
            .GreaterThan(0).WithMessage(ValidationMessages.GreaterThan);

        RuleFor(x => x.MinOrderValue)
            .GreaterThanOrEqualTo(0).WithMessage(ValidationMessages.GreaterThanOrEqual);

        RuleFor(x => x.StartDate)
            .NotEmpty().WithMessage(ValidationMessages.Required);

        RuleFor(x => x.EndDate)
            .NotEmpty().WithMessage(ValidationMessages.Required)
            .GreaterThan(x => x.StartDate).WithMessage("EndDate must be after StartDate.");
    }
}
