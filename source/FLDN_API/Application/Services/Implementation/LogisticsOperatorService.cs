using Contract;
using Domain;
using Microsoft.EntityFrameworkCore;

namespace Application;

[RegisterService(typeof(ILogisticsOperatorService))]
public sealed class LogisticsOperatorService(IUnitOfWork unitOfWork) : ILogisticsOperatorService
{
    public async Task<PagedResult<ShipmentSummaryResponse>> GetShipmentsAsync(
        ShipmentListRequest request,
        CancellationToken cancellationToken)
    {
        if (request.UserId == null || request.UserId == Guid.Empty)
        {
            throw new UnauthorizedException("User ID is missing or invalid.");
        }

        // 1. Get the logistics operator profile for the current user
        var profile = await unitOfWork.Repository<LogisticsProfile>().FindAsync(lp => lp.UserId == request.UserId && !lp.IsDeleted, cancellationToken)
            ?? throw new NotFoundException("Logistics operator profile not found.");

        // 2. Query shipments
        var query = unitOfWork.Repository<Shipment>().GetQueryable()
            .Where(s => s.LogisticsOperatorId == profile.Id)
            .AsNoTracking();

        // 3. Filter by Status
        if (request.Status.HasValue)
        {
            query = query.Where(s => s.Status == request.Status.Value);
        }

        // 4. Filter by Search
        if (!string.IsNullOrWhiteSpace(request.Search))
        {
            var search = request.Search.Trim();
            query = query.Where(s => 
                (s.SupplyRequest.Address.ReceiverName != null && s.SupplyRequest.Address.ReceiverName.Contains(search)) ||
                (s.SupplyRequest.Address.ReceiverPhone != null && s.SupplyRequest.Address.ReceiverPhone.Contains(search)) ||
                (s.SupplyRequest.Address.FullAddress != null && s.SupplyRequest.Address.FullAddress.Contains(search)) ||
                (s.SupplyRequest.DistributionPoint.FullName != null && s.SupplyRequest.DistributionPoint.FullName.Contains(search)));
        }

        // 5. Filter by Dates
        if (request.FromDate.HasValue)
        {
            query = query.Where(s => s.CreatedAt >= request.FromDate.Value);
        }

        if (request.ToDate.HasValue)
        {
            query = query.Where(s => s.CreatedAt <= request.ToDate.Value);
        }

        // 6. Pagination & Projection
        var totalCount = await query.CountAsync(cancellationToken);

        var items = await query
            .OrderByDescending(s => s.CreatedAt)
            .Skip((request.Page - 1) * request.PageSize)
            .Take(request.PageSize)
            .Select(s => new ShipmentSummaryResponse
            {
                ShipmentId = s.Id,
                OrderId = s.SupplyRequestId,
                RetailerName = s.SupplyRequest.DistributionPoint.FullName,
                ReceiverName = s.SupplyRequest.Address.ReceiverName,
                ReceiverPhone = s.SupplyRequest.Address.ReceiverPhone,
                DeliveryAddress = s.SupplyRequest.Address.FullAddress,
                EstimatedDeliveryDate = s.SupplyRequest.RequestedDeliveryDate,
                ShipmentStatus = s.Status,
                TotalItems = s.SupplyRequest.Items.Sum(item => item.Quantity),
                AssignedAt = s.AssignedAt
            })
            .ToListAsync(cancellationToken);

        return new PagedResult<ShipmentSummaryResponse>
        {
            Items = items,
            TotalCount = totalCount,
            Page = request.Page,
            PageSize = request.PageSize
        };
    }
}
