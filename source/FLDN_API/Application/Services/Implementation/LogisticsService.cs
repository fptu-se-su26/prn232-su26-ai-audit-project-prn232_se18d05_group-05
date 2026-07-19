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
}
