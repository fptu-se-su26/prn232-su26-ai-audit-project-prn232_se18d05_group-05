# Prompt Log – DE180079 Nguyễn Thị Khánh Dương

| Thông tin | Nội dung |
|---|---|
| Môn học | PRN232 |
| Mã môn học | PRN232 |
| Lớp | SE18D05 |
| Học kỳ | SU26 |
| Tên bài tập / Project | Food Link Đà Nẵng |
| Tên sinh viên / Nhóm | Nguyễn Thị Khánh Dương - Nhóm 5 (Leader) |
| MSSV / Danh sách MSSV | DE180079 |
| Giảng viên hướng dẫn | Thầy Quang |
| Ngày bắt đầu | 20/07/2026 |
| Ngày cập nhật gần nhất | 20/07/2026 |
| Công cụ AI | Gemini (Antigravity) |

---

## Bảng tổng hợp

| STT | Ngày | Công cụ | Mục đích | Có áp dụng? |
|---:|---|---|---|---|
| 1 | 2026-07-20 | Gemini | Triển khai Backend cho UC26: Xem lô hàng cần vận chuyển | Có |
| 2 | 2026-07-20 | Gemini | Triển khai Backend cho UC27: Nhận lô hàng vận chuyển | Có |
| 3 | 2026-07-20 | Gemini | Triển khai Backend cho UC29: Cập nhật trạng thái vận chuyển | Có |
| 4 | 2026-07-20 | Gemini | Triển khai Backend cho UC30: Xác nhận giao hàng thành công | Có |

---

## Prompt 1 – Triển khai Backend cho UC26

**Mục đích:** Thiết lập các DTOs, Interface, Service và API Controller cho nghiệp vụ xem danh sách lô hàng của Shipper.

**Prompt (tóm tắt):**
Tạo DTO trong `LogisticsOperatorModels.cs` cho `ShipmentListRequest` (Search, Status, FromDate, ToDate, Page, PageSize) và `ShipmentSummaryResponse` (ShipmentId, OrderId, RetailerName, ReceiverName, ReceiverPhone, DeliveryAddress, EstimatedDeliveryDate, ShipmentStatus, TotalItems, AssignedAt). Định nghĩa phương thức `GetShipmentsAsync` trong `ILogisticsOperatorService` và triển khai trong `LogisticsOperatorService`. Chỉ lấy Shipment được phân công cho Shipper hiện tại, hỗ trợ lọc theo Status, Search, FromDate, ToDate, phân trang sử dụng `.AsNoTracking()`. Sau đó tạo endpoint `GET /api/logistics/shipments` trong `LogisticsOperatorController` phân quyền cho `LogisticsOperator`.

**Kết quả áp dụng:** Có. Sinh các file model, interface, service và controller phục vụ cho UC26.

---

## Prompt 2 – Triển khai Backend cho UC27

**Mục đích:** Xây dựng logic nhận đơn hàng vận chuyển cho Shipper.

**Prompt (tóm tắt):**
Thiết lập DTO `AcceptShipmentRequest` và `AcceptShipmentResponse` cho UC27. Cập nhật `ILogisticsOperatorService` với phương thức `AcceptShipmentAsync(Guid shipmentId, CancellationToken cancellationToken)`. Triển khai trong `LogisticsOperatorService` đảm bảo: kiểm tra Shipment tồn tại, đang ở trạng thái `Pending`, chưa có Shipper khác nhận, sau đó gán `LogisticsOperatorId = profile.Id`, lưu `AssignedAt = DateTimeOffset.UtcNow`, cập nhật trạng thái và lưu xuống CSDL. Cấu hình endpoint `PUT /api/logistics/shipments/{id}/accept` trong Controller trả về `ApiResponse<AcceptShipmentResponse>`.

**Kết quả áp dụng:** Có. Tích hợp giải pháp sử dụng `IHttpContextAccessor` để xác định tài khoản Shipper đang đăng nhập.

---

## Prompt 3 – Triển khai Backend cho UC29

**Mục đích:** Triển khai nghiệp vụ cập nhật trạng thái vận chuyển và lưu lịch sử hành trình.

**Prompt (tóm tắt):**
Tạo DTO `UpdateShipmentStatusRequest` và `ShipmentTrackingResponse` cho UC29. Thêm phương thức `UpdateShipmentStatusAsync` vào `ILogisticsOperatorService` và triển khai. Quy tắc nghiệp vụ: kiểm tra Shipment tồn tại và thuộc về Shipper hiện tại, Shipment chưa hoàn thành, chỉ cho phép chuyển trạng thái theo thứ tự hợp lệ (`Pending -> Assigned -> PickedUp -> InTransit -> Arrived/Failed -> Returned`), ghi nhận lịch sử vào `ShipmentStatusHistory` (lưu cả `Latitude` và `Longitude` dưới dạng `[NotMapped]` để không đổi DB Schema). Cập nhật `ModifiedAt = DateTimeOffset.UtcNow` và lưu CSDL. Khai báo endpoint `PUT /api/logistics/shipments/{id}/status`.

**Kết quả áp dụng:** Có. Khai báo thêm namespace `Contract.LogisticsOperator` để giải quyết xung đột đặt tên lớp `UpdateShipmentStatusRequest`.

---

## Prompt 4 – Triển khai Backend cho UC30

**Mục đích:** Triển khai nghiệp vụ xác nhận giao hàng thành công và kết thúc đơn hàng.

**Prompt (tóm tắt):**
Tạo DTO `ConfirmDeliveryRequest` và `DeliveryCompletedResponse`. Cập nhật Service Interface, triển khai Service và Controller cho endpoint `PUT /api/logistics/shipments/{id}/complete`. Quy tắc: kiểm tra Shipment tồn tại, thuộc về Shipper hiện hành, trạng thái hiện tại phải là `Arrived`. Sau đó cập nhật `Shipment.Status = Delivered`, cập nhật `Order.Status = Completed`, lưu lịch sử giao hàng và `EnsureSaveAsync()`. Hãy sử dụng `[NotMapped]` cho các trường dữ liệu bổ sung để tránh thay đổi DB Schema.

**Kết quả áp dụng:** Có. Bổ sung các trạng thái `Delivered` và `Completed` vào enums tương ứng, viết logic tích hợp đồng bộ trạng thái đơn hàng và lịch sử giao hàng.
