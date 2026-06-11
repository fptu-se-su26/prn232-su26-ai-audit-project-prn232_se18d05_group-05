using FluentValidation;

namespace Application;

public sealed class RejectSupplierRequestValidator : AbstractValidator<RejectSupplierRequest>
{
    public RejectSupplierRequestValidator()
    {
        RuleFor(x => x.Reason)
            .NotEmpty().WithMessage(ValidationMessages.Required)
            .MaximumLength(500).WithMessage(ValidationMessages.MaxLength);
    }
}
