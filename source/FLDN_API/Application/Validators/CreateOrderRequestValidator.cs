using FluentValidation;

namespace Application;

public sealed class CreateOrderRequestValidator : AbstractValidator<CreateOrderRequest>
{
    public CreateOrderRequestValidator()
    {
        RuleFor(x => x.AddressId)
            .NotEmpty().WithMessage(ValidationMessages.Required);

        RuleFor(x => x.Items)
            .NotEmpty().WithMessage("Danh sách sản phẩm không được để trống.");

        RuleForEach(x => x.Items).ChildRules(items =>
        {
            items.RuleFor(i => i.ProductId)
                .NotEmpty().WithMessage(ValidationMessages.Required);

            items.RuleFor(i => i.Quantity)
                .GreaterThan(0).WithMessage("Số lượng phải lớn hơn 0.");
        });
    }
}
