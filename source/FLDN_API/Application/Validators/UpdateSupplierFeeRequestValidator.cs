using FluentValidation;

namespace Application;

public sealed class UpdateSupplierFeeRequestValidator : AbstractValidator<UpdateSupplierFeeRequest>
{
    public UpdateSupplierFeeRequestValidator()
    {
        RuleFor(x => x.ServiceFeeRate)
            .GreaterThanOrEqualTo(0).WithMessage(ValidationMessages.GreaterThanOrEqual)
            .LessThanOrEqualTo(100).WithMessage(ValidationMessages.LessThanOrEqual);

        RuleFor(x => x.DiscountRate)
            .GreaterThanOrEqualTo(0).WithMessage(ValidationMessages.GreaterThanOrEqual)
            .LessThanOrEqualTo(100).WithMessage(ValidationMessages.LessThanOrEqual);
    }
}
