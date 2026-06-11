namespace Application;

[RegisterService(typeof(IAdminVoucherService))]
public sealed class AdminVoucherService(
    IUnitOfWork unitOfWork
) : IAdminVoucherService
{
    public async Task<PagedResult<VoucherResponse>> GetVouchersAsync(VoucherListRequest request, CancellationToken ct = default)
    {
        var query = unitOfWork.Vouchers.GetQueryable().AsNoTracking();

        if (request.IsActive.HasValue)
        {
            query = query.Where(v => v.IsActive == request.IsActive.Value);
        }

        var totalCount = await query.CountAsync(ct);

        var vouchers = await query
            .OrderByDescending(v => v.CreatedAt)
            .Skip((request.Page - 1) * request.PageSize)
            .Take(request.PageSize)
            .Select(v => new VoucherResponse
            {
                VoucherId = v.Id,
                Code = v.Code,
                VoucherName = v.VoucherName,
                DiscountValue = v.DiscountValue,
                MinOrderValue = v.MinOrderValue,
                UsageLimit = v.UsageLimit,
                UsedCount = v.UsedCount,
                StartDate = v.StartDate,
                EndDate = v.EndDate,
                IsActive = v.IsActive
            })
            .ToListAsync(ct);

        return new PagedResult<VoucherResponse>
        {
            Items = vouchers,
            TotalCount = totalCount,
            Page = request.Page,
            PageSize = request.PageSize
        };
    }

    public async Task<CreateVoucherResponse> CreateVoucherAsync(CreateVoucherRequest request, Guid createdBy, CancellationToken ct = default)
    {
        if (await unitOfWork.Vouchers.ExistsAsync(v => v.Code == request.Code))
            throw new ConflictException("Voucher code already exists.");

        var voucher = new Voucher
        {
            Code = request.Code,
            VoucherName = request.VoucherName,
            DiscountType = request.DiscountType,
            DiscountValue = request.DiscountValue,
            MinOrderValue = request.MinOrderValue,
            MaxDiscount = request.MaxDiscount,
            UsageLimit = request.UsageLimit,
            UsedCount = 0,
            StartDate = request.StartDate,
            EndDate = request.EndDate,
            IsActive = true,
            IsFlashSale = false,
            CreatedBy = createdBy
        };

        await unitOfWork.Vouchers.AddAsync(voucher);
        await unitOfWork.EnsureSaveAsync(ct);

        return new CreateVoucherResponse
        {
            VoucherId = voucher.Id,
            Code = voucher.Code
        };
    }

    public async Task UpdateVoucherAsync(Guid id, UpdateVoucherRequest request, CancellationToken ct = default)
    {
        var voucher = await unitOfWork.Vouchers.GetByIdAsync(id);

        voucher.VoucherName = request.VoucherName;
        voucher.DiscountValue = request.DiscountValue;
        voucher.MinOrderValue = request.MinOrderValue;
        voucher.UsageLimit = request.UsageLimit;
        voucher.StartDate = request.StartDate;
        voucher.EndDate = request.EndDate;
        unitOfWork.Vouchers.Update(voucher);
        await unitOfWork.EnsureSaveAsync(ct);
    }

    public async Task<bool> ToggleVoucherAsync(Guid id, CancellationToken ct = default)
    {
        var voucher = await unitOfWork.Vouchers.GetByIdAsync(id);

        voucher.IsActive = !voucher.IsActive;
        unitOfWork.Vouchers.Update(voucher);
        await unitOfWork.EnsureSaveAsync(ct);

        return voucher.IsActive;
    }
}
