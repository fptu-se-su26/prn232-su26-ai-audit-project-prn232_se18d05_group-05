using Contract;
using Domain;

namespace Application;

[RegisterService(typeof(ILogisticsService))]
public sealed class LogisticsService(IUnitOfWork unitOfWork) : ILogisticsService
{
    public async Task<LogisticsAcceptResponse> AcceptShipmentAsync(Guid userId, Guid shipmentId, CancellationToken ct = default)
    {
        // 1. Get the logistics operator profile for the current user
        var profile = await unitOfWork.Repository<LogisticsProfile>().FindAsync(lp => lp.UserId == userId && !lp.IsDeleted, ct)
            ?? throw new NotFoundException("Logistics operator profile not found.");

        // 2. Get the shipment by ID
        var shipment = await unitOfWork.Repository<Shipment>().GetByIdAsync(shipmentId);

        // 3. Verify status is Pending
        if (shipment.Status != ShipmentStatus.Pending)
        {
            throw new ConflictException("Lô hàng này đã được nhận hoặc không ở trạng thái chờ.");
        }

        // 4. Update shipment status and assign logistics operator
        shipment.LogisticsOperatorId = profile.Id;
        shipment.Status = ShipmentStatus.Assigned;
        shipment.AssignedAt = DateTimeOffset.UtcNow;
        unitOfWork.Repository<Shipment>().Update(shipment);

        // 5. Add status history entry
        var history = new ShipmentStatusHistory
        {
            Id = Guid.NewGuid(),
            ShipmentId = shipment.Id,
            Status = ShipmentStatus.Assigned,
            Note = "Đơn hàng đã được nhận bởi đơn vị vận chuyển.",
            UpdatedBy = userId,
            CreatedAt = DateTimeOffset.UtcNow
        };
        await unitOfWork.Repository<ShipmentStatusHistory>().AddAsync(history);

        // 6. Save changes
        await unitOfWork.EnsureSaveAsync(ct);

        return new LogisticsAcceptResponse
        {
            DeliveryId = shipment.Id,
            Status = "Assigned"
        };
    }

    public async Task<UpdateShipmentStatusResponse> UpdateShipmentStatusAsync(Guid userId, Guid shipmentId, UpdateShipmentStatusRequest request, CancellationToken ct = default)
    {
        // 1. Get the logistics operator profile for the current user
        var profile = await unitOfWork.Repository<LogisticsProfile>().FindAsync(lp => lp.UserId == userId && !lp.IsDeleted, ct)
            ?? throw new NotFoundException("Logistics operator profile not found.");

        // 2. Get the shipment and include its related supply request
        var shipment = await unitOfWork.Repository<Shipment>().GetQueryable()
            .Include(s => s.SupplyRequest)
            .FirstOrDefaultAsync(s => s.Id == shipmentId, ct)
            ?? throw new NotFoundException("Logistics shipment not found.");

        // 3. Verify that the shipment is assigned to the current logistics operator
        if (shipment.LogisticsOperatorId != profile.Id)
        {
            throw new ForbiddenException("Bạn không có quyền cập nhật trạng thái cho lô hàng này.");
        }

        // 4. Verify state transition and update status
        var targetStatus = request.Status.Trim();
        if (targetStatus.Equals("PickedUp", StringComparison.OrdinalIgnoreCase))
        {
            if (shipment.Status != ShipmentStatus.Assigned)
            {
                throw new ConflictException("Lô hàng phải ở trạng thái đã gán (Assigned) mới có thể chuyển sang đã lấy hàng (PickedUp).");
            }
            shipment.Status = ShipmentStatus.PickedUp;
            shipment.PickedUpAt = DateTimeOffset.UtcNow;
            
            shipment.SupplyRequest.Status = SupplyRequestStatus.Dispatched;
        }
        else if (targetStatus.Equals("Delivering", StringComparison.OrdinalIgnoreCase))
        {
            if (shipment.Status != ShipmentStatus.PickedUp)
            {
                throw new ConflictException("Lô hàng phải ở trạng thái đã lấy hàng (PickedUp) mới có thể chuyển sang đang giao (InTransit).");
            }
            shipment.Status = ShipmentStatus.InTransit;
            
            shipment.SupplyRequest.Status = SupplyRequestStatus.InTransit;
        }
        else if (targetStatus.Equals("Failed", StringComparison.OrdinalIgnoreCase))
        {
            if (shipment.Status == ShipmentStatus.Arrived || shipment.Status == ShipmentStatus.Failed)
            {
                throw new ConflictException("Không thể cập nhật thất bại cho lô hàng đã giao thành công hoặc đã thất bại.");
            }
            shipment.Status = ShipmentStatus.Failed;
            shipment.FailedAt = DateTimeOffset.UtcNow;
            shipment.FailReason = request.Note;
            
            shipment.SupplyRequest.Status = SupplyRequestStatus.Cancelled;
            shipment.SupplyRequest.CancelReason = request.Note;
        }
        else
        {
            throw new BadRequestException("Trạng thái cập nhật không hợp lệ. Chỉ chấp nhận: PickedUp, Delivering, Failed.");
        }

        unitOfWork.Repository<Shipment>().Update(shipment);
        unitOfWork.Repository<SupplyRequest>().Update(shipment.SupplyRequest);

        // 5. Add status history entries
        var shipmentHistory = new ShipmentStatusHistory
        {
            Id = Guid.NewGuid(),
            ShipmentId = shipment.Id,
            Status = shipment.Status,
            Note = request.Note ?? $"Cập nhật trạng thái thành {shipment.Status}.",
            UpdatedBy = userId,
            CreatedAt = DateTimeOffset.UtcNow
        };
        await unitOfWork.Repository<ShipmentStatusHistory>().AddAsync(shipmentHistory);

        var supplyRequestHistory = new SupplyRequestStatusHistory
        {
            Id = Guid.NewGuid(),
            SupplyRequestId = shipment.SupplyRequestId,
            Status = shipment.SupplyRequest.Status,
            Note = request.Note ?? $"Trạng thái đơn hàng cập nhật theo trạng thái vận chuyển: {shipment.SupplyRequest.Status}.",
            CreatedBy = userId,
            CreatedAt = DateTimeOffset.UtcNow
        };
        await unitOfWork.Repository<SupplyRequestStatusHistory>().AddAsync(supplyRequestHistory);

        // 6. Save changes
        await unitOfWork.EnsureSaveAsync(ct);

        return new UpdateShipmentStatusResponse
        {
            DeliveryId = shipment.Id,
            Status = request.Status,
            UpdatedAt = DateTimeOffset.UtcNow
        };
    }
}

