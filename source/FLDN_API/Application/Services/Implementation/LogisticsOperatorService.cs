using Contract;
using Contract.LogisticsOperator;
using Domain;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Http;
using System.Security.Claims;

namespace Application;

[RegisterService(typeof(ILogisticsOperatorService))]
public sealed class LogisticsOperatorService(
    IUnitOfWork unitOfWork,
    IHttpContextAccessor httpContextAccessor
) : ILogisticsOperatorService
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

    public async Task<AcceptShipmentResponse> AcceptShipmentAsync(
        Guid shipmentId,
        CancellationToken cancellationToken)
    {
        var user = httpContextAccessor.HttpContext?.User;
        var currentId = user?.FindFirst(ClaimTypes.NameIdentifier)?.Value
                     ?? user?.FindFirst("sub")?.Value
                     ?? user?.FindFirst("id")?.Value;

        if (string.IsNullOrEmpty(currentId) || !Guid.TryParse(currentId, out var userId))
        {
            throw new UnauthorizedException("User ID is missing or invalid.");
        }

        // 1. Get the logistics operator profile for the current user
        var profile = await unitOfWork.Repository<LogisticsProfile>().FindAsync(lp => lp.UserId == userId && !lp.IsDeleted, cancellationToken)
            ?? throw new NotFoundException("Logistics operator profile not found.");

        // 2. Get the shipment
        var shipment = await unitOfWork.Repository<Shipment>().GetByIdAsync(shipmentId)
            ?? throw new NotFoundException("Shipment not found.");

        // 3. Verify status is Pending (WaitingForPickup)
        if (shipment.Status != ShipmentStatus.Pending)
        {
            throw new ConflictException("Lô hàng không ở trạng thái chờ lấy hàng.");
        }

        // 4. Verify shipment has not been accepted by another shipper
        if (shipment.LogisticsOperatorId != null)
        {
            throw new ConflictException("Lô hàng đã được nhận bởi một đơn vị vận chuyển khác.");
        }

        // 5. Update shipment details
        shipment.LogisticsOperatorId = profile.Id;
        shipment.AssignedAt = DateTimeOffset.UtcNow;
        shipment.Status = ShipmentStatus.Assigned;

        unitOfWork.Repository<Shipment>().Update(shipment);

        // 6. Save changes
        await unitOfWork.EnsureSaveAsync(cancellationToken);

        return new AcceptShipmentResponse
        {
            ShipmentId = shipment.Id,
            AcceptedAt = shipment.AssignedAt.Value,
            CurrentStatus = "Delivering"
        };
    }

    public async Task<ShipmentTrackingResponse> UpdateShipmentStatusAsync(
        Contract.LogisticsOperator.UpdateShipmentStatusRequest request,
        CancellationToken cancellationToken)
    {
        var user = httpContextAccessor.HttpContext?.User;
        var currentId = user?.FindFirst(ClaimTypes.NameIdentifier)?.Value
                     ?? user?.FindFirst("sub")?.Value
                     ?? user?.FindFirst("id")?.Value;

        if (string.IsNullOrEmpty(currentId) || !Guid.TryParse(currentId, out var userId))
        {
            throw new UnauthorizedException("User ID is missing or invalid.");
        }

        // 1. Get the logistics operator profile for the current user
        var profile = await unitOfWork.Repository<LogisticsProfile>().FindAsync(lp => lp.UserId == userId && !lp.IsDeleted, cancellationToken)
            ?? throw new NotFoundException("Logistics operator profile not found.");

        // 2. Get the shipment
        var shipment = await unitOfWork.Repository<Shipment>().GetByIdAsync(request.ShipmentId)
            ?? throw new NotFoundException("Shipment not found.");

        // 3. Verify that only the assigned shipper can update it
        if (shipment.LogisticsOperatorId != profile.Id)
        {
            throw new ConflictException("Shipper không được phân công vận chuyển lô hàng này.");
        }

        // 4. Verify that delivered or returned shipments cannot be updated further
        if (shipment.Status == ShipmentStatus.Arrived || shipment.Status == ShipmentStatus.Returned || shipment.Status == ShipmentStatus.Delivered)
        {
            throw new ConflictException("Lô hàng đã hoàn thành, không thể cập nhật trạng thái.");
        }

        // 5. Verify valid status transition
        if (!IsValidTransition(shipment.Status, request.ShipmentStatus))
        {
            throw new BadRequestException($"Trạng thái chuyển đổi không hợp lệ từ {shipment.Status} sang {request.ShipmentStatus}.");
        }

        // 6. Update shipment details
        shipment.Status = request.ShipmentStatus;
        shipment.ModifiedAt = DateTimeOffset.UtcNow;

        if (request.ShipmentStatus == ShipmentStatus.Arrived)
        {
            shipment.ArrivedAt = DateTimeOffset.UtcNow;
            
            // Update corresponding SupplyRequest status to Received
            var supplyRequest = await unitOfWork.Repository<SupplyRequest>().GetByIdAsync(shipment.SupplyRequestId);
            if (supplyRequest != null)
            {
                supplyRequest.Status = SupplyRequestStatus.Received;
                unitOfWork.Repository<SupplyRequest>().Update(supplyRequest);
                
                var srHistory = new SupplyRequestStatusHistory
                {
                    Id = Guid.NewGuid(),
                    SupplyRequestId = supplyRequest.Id,
                    Status = SupplyRequestStatus.Received,
                    Note = request.Note ?? "Đơn hàng đã được giao nhận thành công.",
                    CreatedBy = userId,
                    CreatedAt = DateTimeOffset.UtcNow
                };
                await unitOfWork.Repository<SupplyRequestStatusHistory>().AddAsync(srHistory);
            }
        }
        else if (request.ShipmentStatus == ShipmentStatus.Failed)
        {
            shipment.FailedAt = DateTimeOffset.UtcNow;
            shipment.FailReason = request.Note;

            // Update corresponding SupplyRequest status to Cancelled
            var supplyRequest = await unitOfWork.Repository<SupplyRequest>().GetByIdAsync(shipment.SupplyRequestId);
            if (supplyRequest != null)
            {
                supplyRequest.Status = SupplyRequestStatus.Cancelled;
                supplyRequest.CancelReason = request.Note;
                unitOfWork.Repository<SupplyRequest>().Update(supplyRequest);

                var srHistory = new SupplyRequestStatusHistory
                {
                    Id = Guid.NewGuid(),
                    SupplyRequestId = supplyRequest.Id,
                    Status = SupplyRequestStatus.Cancelled,
                    Note = request.Note ?? "Đơn hàng vận chuyển thất bại.",
                    CreatedBy = userId,
                    CreatedAt = DateTimeOffset.UtcNow
                };
                await unitOfWork.Repository<SupplyRequestStatusHistory>().AddAsync(srHistory);
            }
        }

        unitOfWork.Repository<Shipment>().Update(shipment);

        // 7. Write ShipmentTrackingHistory (ShipmentStatusHistory)
        var trackingHistory = new ShipmentStatusHistory
        {
            Id = Guid.NewGuid(),
            ShipmentId = shipment.Id,
            Status = request.ShipmentStatus,
            Latitude = request.Latitude,
            Longitude = request.Longitude,
            Note = request.Note,
            UpdatedBy = userId,
            CreatedAt = DateTimeOffset.UtcNow
        };
        await unitOfWork.Repository<ShipmentStatusHistory>().AddAsync(trackingHistory);

        // 8. Save changes
        await unitOfWork.EnsureSaveAsync(cancellationToken);

        return new ShipmentTrackingResponse
        {
            ShipmentId = shipment.Id,
            CurrentStatus = shipment.Status,
            UpdatedAt = shipment.ModifiedAt.Value,
            UpdatedBy = userId
        };
    }

    public async Task<DeliveryCompletedResponse> ConfirmDeliveryAsync(
        ConfirmDeliveryRequest request,
        CancellationToken cancellationToken)
    {
        var user = httpContextAccessor.HttpContext?.User;
        var currentId = user?.FindFirst(ClaimTypes.NameIdentifier)?.Value
                     ?? user?.FindFirst("sub")?.Value
                     ?? user?.FindFirst("id")?.Value;

        if (string.IsNullOrEmpty(currentId) || !Guid.TryParse(currentId, out var userId))
        {
            throw new UnauthorizedException("User ID is missing or invalid.");
        }

        // 1. Get the logistics operator profile for the current user
        var profile = await unitOfWork.Repository<LogisticsProfile>().FindAsync(lp => lp.UserId == userId && !lp.IsDeleted, cancellationToken)
            ?? throw new NotFoundException("Logistics operator profile not found.");

        // 2. Get the shipment
        var shipment = await unitOfWork.Repository<Shipment>().GetByIdAsync(request.ShipmentId)
            ?? throw new NotFoundException("Shipment not found.");

        // 3. Verify assigned shipper
        if (shipment.LogisticsOperatorId != profile.Id)
        {
            throw new ConflictException("Không đúng Shipper được phân công cho lô hàng này.");
        }

        // 4. Verify shipment state (must be Arrived to confirm delivery, throw Conflict if already Delivered)
        if (shipment.Status == ShipmentStatus.Delivered)
        {
            throw new ConflictException("Lô hàng đã được xác nhận giao thành công trước đó.");
        }

        if (shipment.Status != ShipmentStatus.Arrived)
        {
            throw new ConflictException("Lô hàng chưa đến nơi, không thể xác nhận giao hàng thành công.");
        }

        // 5. Update shipment details
        shipment.Status = ShipmentStatus.Delivered;
        shipment.DeliveredAt = DateTimeOffset.UtcNow;
        shipment.DeliveredBy = userId;
        shipment.ModifiedAt = DateTimeOffset.UtcNow;
        shipment.ConfirmImageUrl = request.DeliveryImageUrl;
        shipment.Note = request.DeliveryNote;
        unitOfWork.Repository<Shipment>().Update(shipment);

        // 6. Update corresponding SupplyRequest (Order) status to Completed
        var supplyRequest = await unitOfWork.Repository<SupplyRequest>().GetByIdAsync(shipment.SupplyRequestId)
            ?? throw new NotFoundException("Supply request not found.");
        supplyRequest.Status = SupplyRequestStatus.Completed;
        unitOfWork.Repository<SupplyRequest>().Update(supplyRequest);

        // Add SupplyRequest status history
        var srHistory = new SupplyRequestStatusHistory
        {
            Id = Guid.NewGuid(),
            SupplyRequestId = supplyRequest.Id,
            Status = SupplyRequestStatus.Completed,
            Note = request.DeliveryNote ?? "Đơn hàng đã được giao nhận thành công.",
            CreatedBy = userId,
            CreatedAt = DateTimeOffset.UtcNow
        };
        await unitOfWork.Repository<SupplyRequestStatusHistory>().AddAsync(srHistory);

        // 7. Write Delivery History (ShipmentStatusHistory)
        var deliveryHistory = new ShipmentStatusHistory
        {
            Id = Guid.NewGuid(),
            ShipmentId = shipment.Id,
            Status = ShipmentStatus.Delivered,
            ReceiverName = request.ReceiverName,
            ReceiverPhone = request.ReceiverPhone,
            DeliveryNote = request.DeliveryNote,
            DeliveryImageUrl = request.DeliveryImageUrl,
            DeliveredAt = DateTimeOffset.UtcNow,
            DeliveredBy = userId,
            
            // Populate database columns
            Note = request.DeliveryNote,
            ImageUrl = request.DeliveryImageUrl,
            UpdatedBy = userId,
            CreatedAt = DateTimeOffset.UtcNow
        };
        await unitOfWork.Repository<ShipmentStatusHistory>().AddAsync(deliveryHistory);

        // 8. Save changes
        await unitOfWork.EnsureSaveAsync(cancellationToken);

        return new DeliveryCompletedResponse
        {
            ShipmentId = shipment.Id,
            ShipmentStatus = shipment.Status,
            DeliveredAt = shipment.DeliveredAt.Value,
            DeliveredBy = userId
        };
    }

    private static bool IsValidTransition(ShipmentStatus current, ShipmentStatus target)
    {
        if (current == target && current == ShipmentStatus.InTransit)
        {
            return true;
        }

        return current switch
        {
            ShipmentStatus.Pending => target == ShipmentStatus.Assigned,
            ShipmentStatus.Assigned => target == ShipmentStatus.PickedUp,
            ShipmentStatus.PickedUp => target == ShipmentStatus.InTransit,
            ShipmentStatus.InTransit => target == ShipmentStatus.Arrived || target == ShipmentStatus.Failed,
            ShipmentStatus.Failed => target == ShipmentStatus.Returned,
            _ => false
        };
    }
}
