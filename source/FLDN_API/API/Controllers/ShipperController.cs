using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Domain;
using Infrastructure;
using System.Security.Claims;

namespace API;

[ApiController]
[Route("api/[controller]")]
public class ShipperController : ControllerBase
{
    private readonly ApplicationDbContext _context;

    public ShipperController(ApplicationDbContext context)
    {
        _context = context;
    }

    private async Task<ShipperProfile> GetOrCreateShipperProfileAsync(int userId)
    {
        var shipper = await _context.ShipperProfiles
            .Include(s => s.User)
            .FirstOrDefaultAsync(s => s.UserId == userId);

        if (shipper == null)
        {
            // Auto-create a shipper profile for the user to streamline testing
            var user = await _context.Users.FindAsync(userId);
            shipper = new ShipperProfile
            {
                UserId = userId,
                VehicleType = "Motorbike",
                LicensePlate = "29A1-888.88",
                IdentityCard = "123456789",
                Status = ShipperStatus.Available,
                AverageRating = 5.0m,
                TotalDeliveries = 0,
                IsDeleted = false,
                CreatedAt = DateTimeOffset.UtcNow
            };

            _context.ShipperProfiles.Add(shipper);
            await _context.SaveChangesAsync();
            
            // Reload with relations
            shipper = await _context.ShipperProfiles
                .Include(s => s.User)
                .FirstOrDefaultAsync(s => s.UserId == userId);
        }

        return shipper!;
    }

    private int GetCurrentUserId()
    {
        try
        {
            return User.GetUserId();
        }
        catch
        {
            // Fallback for development/testing without real JWT tokens
            if (Request.Headers.TryGetValue("X-User-Id", out var headerVal) && int.TryParse(headerVal, out var headerId))
            {
                return headerId;
            }
            if (Request.Query.TryGetValue("userId", out var queryVal) && int.TryParse(queryVal, out var queryId))
            {
                return queryId;
            }
            
            throw new UnauthorizedAccessException("Could not resolve current user ID.");
        }
    }

    [HttpGet("deliveries")]
    public async Task<IActionResult> GetDeliveries([FromQuery] string? status)
    {
        int userId;
        try
        {
            userId = GetCurrentUserId();
        }
        catch (UnauthorizedAccessException ex)
        {
            return Unauthorized(new { message = ex.Message });
        }

        var shipper = await GetOrCreateShipperProfileAsync(userId);

        var query = _context.Deliveries
            .Include(d => d.Order)
                .ThenInclude(o => o.Address)
                    .ThenInclude(a => a.District)
            .Include(d => d.Order)
                .ThenInclude(o => o.Customer)
            .AsQueryable();

        // Filter based on status
        if (status?.ToLower() == "available")
        {
            // Available shipments waiting for a shipper (WaitingForShipper status, no ShipperId assigned)
            query = query.Where(d => d.Status == DeliveryStatus.WaitingForShipper && d.ShipperId == null);
        }
        else if (status?.ToLower() == "assigned")
        {
            query = query.Where(d => d.ShipperId == shipper.Id && d.Status == DeliveryStatus.Assigned);
        }
        else if (status?.ToLower() == "delivering")
        {
            query = query.Where(d => d.ShipperId == shipper.Id && 
                                   (d.Status == DeliveryStatus.PickedUp || d.Status == DeliveryStatus.Delivering));
        }
        else if (status?.ToLower() == "completed")
        {
            query = query.Where(d => d.ShipperId == shipper.Id && 
                                   (d.Status == DeliveryStatus.Delivered || d.Status == DeliveryStatus.Failed));
        }
        else
        {
            // Default: All deliveries related to this shipper
            query = query.Where(d => d.ShipperId == shipper.Id);
        }

        var deliveriesList = await query
            .OrderByDescending(d => d.DeliveryId)
            .Select(d => new
            {
                d.DeliveryId,
                d.OrderId,
                d.ShipperId,
                d.ZoneId,
                Status = d.Status.ToString(),
                d.AssignedAt,
                d.PickedUpAt,
                d.DeliveredAt,
                d.FailedAt,
                d.FailReason,
                d.ConfirmImageUrl,
                d.ShippingFee,
                d.ShipperEarning,
                d.EstimatedDistance,
                d.Note,
                Order = new
                {
                    d.Order.TotalAmount,
                    d.Order.DiscountAmount,
                    d.Order.ShippingFee,
                    d.Order.FinalAmount,
                    Status = d.Order.Status.ToString(),
                    DeliveryType = d.Order.DeliveryType.ToString(),
                    d.Order.ScheduledTime,
                    d.Order.Note,
                    Customer = new
                    {
                        d.Order.Customer.FullName,
                        d.Order.Customer.Phone,
                        d.Order.Customer.AvatarUrl
                    },
                    Address = new
                    {
                        d.Order.Address.ReceiverName,
                        d.Order.Address.ReceiverPhone,
                        d.Order.Address.FullAddress,
                        DistrictName = d.Order.Address.District.Name
                    }
                }
            })
            .ToListAsync();

        return Ok(new
        {
            shipper = new
            {
                shipper.Id,
                shipper.UserId,
                FullName = shipper.User.FullName,
                shipper.VehicleType,
                shipper.LicensePlate,
                shipper.AverageRating,
                shipper.TotalDeliveries,
                Status = shipper.Status.ToString()
            },
            deliveries = deliveriesList
        });
    }

    [HttpPut("deliveries/{id}/accept")]
    public async Task<IActionResult> AcceptDelivery(int id)
    {
        int userId;
        try
        {
            userId = GetCurrentUserId();
        }
        catch (UnauthorizedAccessException ex)
        {
            return Unauthorized(new { message = ex.Message });
        }

        var shipper = await GetOrCreateShipperProfileAsync(userId);

        var delivery = await _context.Deliveries
            .Include(d => d.Order)
            .FirstOrDefaultAsync(d => d.DeliveryId == id);

        if (delivery == null)
            return NotFound(new { message = "Lô hàng vận chuyển không tồn tại." });

        if (delivery.Status != DeliveryStatus.WaitingForShipper || delivery.ShipperId != null)
            return BadRequest(new { message = "Lô hàng này đã có người nhận hoặc không ở trạng thái chờ nhận." });

        // Update delivery
        delivery.ShipperId = shipper.Id;
        delivery.Status = DeliveryStatus.Assigned;
        delivery.AssignedAt = DateTimeOffset.UtcNow;

        // Log history
        var history = new DeliveryStatusHistory
        {
            DeliveryId = delivery.DeliveryId,
            Status = DeliveryStatus.Assigned,
            CreatedAt = DateTimeOffset.UtcNow,
            Note = $"Shipper {shipper.User.FullName} (ID: {shipper.Id}) đã chấp nhận vận chuyển."
        };
        _context.DeliveryStatusHistories.Add(history);

        // Log action
        var action = new ShipperOrderAction
        {
            DeliveryId = delivery.DeliveryId,
            ShipperId = shipper.Id,
            Action = ShipperActionType.Accepted,
            CreatedAt = DateTimeOffset.UtcNow
        };
        _context.ShipperOrderActions.Add(action);

        // Update Order status to Confirmed / ReadyToShip if it wasn't
        if (delivery.Order.Status == OrderStatus.Preparing || delivery.Order.Status == OrderStatus.ReadyToShip)
        {
            delivery.Order.Status = OrderStatus.ReadyToShip;
        }

        await _context.SaveChangesAsync();

        return Ok(new { message = "Nhận đơn hàng thành công.", deliveryId = delivery.DeliveryId, status = delivery.Status.ToString() });
    }

    [HttpPut("deliveries/{id}/status")]
    public async Task<IActionResult> UpdateDeliveryStatus(int id, [FromBody] UpdateStatusRequest request)
    {
        int userId;
        try
        {
            userId = GetCurrentUserId();
        }
        catch (UnauthorizedAccessException ex)
        {
            return Unauthorized(new { message = ex.Message });
        }

        var shipper = await GetOrCreateShipperProfileAsync(userId);

        var delivery = await _context.Deliveries
            .Include(d => d.Order)
            .FirstOrDefaultAsync(d => d.DeliveryId == id);

        if (delivery == null)
            return NotFound(new { message = "Lô hàng vận chuyển không tồn tại." });

        if (delivery.ShipperId != shipper.Id)
            return Forbid();

        if (!Enum.TryParse<DeliveryStatus>(request.Status, true, out var newStatus))
        {
            return BadRequest(new { message = "Trạng thái không hợp lệ." });
        }

        // Validate status transition
        if (newStatus == DeliveryStatus.WaitingForShipper)
            return BadRequest(new { message = "Không thể chuyển ngược về trạng thái chờ nhận." });

        delivery.Status = newStatus;

        if (newStatus == DeliveryStatus.PickedUp)
        {
            delivery.PickedUpAt = DateTimeOffset.UtcNow;
            delivery.Order.Status = OrderStatus.Shipping;
        }
        else if (newStatus == DeliveryStatus.Delivering)
        {
            delivery.Order.Status = OrderStatus.Shipping;
        }
        else if (newStatus == DeliveryStatus.Delivered)
        {
            delivery.DeliveredAt = DateTimeOffset.UtcNow;
            delivery.ConfirmImageUrl = request.ConfirmImageUrl;
            delivery.Note = request.Note;
            delivery.Order.Status = OrderStatus.Delivered;

            // Increment deliveries count
            shipper.TotalDeliveries += 1;
            _context.ShipperProfiles.Update(shipper);
        }
        else if (newStatus == DeliveryStatus.Failed)
        {
            delivery.FailedAt = DateTimeOffset.UtcNow;
            delivery.FailReason = request.FailReason;
            delivery.Order.Status = OrderStatus.ReadyToShip; // Return order to ready state for re-assignment
        }

        // Log history
        var history = new DeliveryStatusHistory
        {
            DeliveryId = delivery.DeliveryId,
            Status = newStatus,
            CreatedAt = DateTimeOffset.UtcNow,
            Note = request.Note ?? $"Trạng thái giao hàng được cập nhật thành: {newStatus}"
        };
        _context.DeliveryStatusHistories.Add(history);

        await _context.SaveChangesAsync();

        return Ok(new { message = "Cập nhật trạng thái thành công.", status = delivery.Status.ToString() });
    }
}

public class UpdateStatusRequest
{
    public required string Status { get; set; }
    public string? FailReason { get; set; }
    public string? ConfirmImageUrl { get; set; }
    public string? Note { get; set; }
}
