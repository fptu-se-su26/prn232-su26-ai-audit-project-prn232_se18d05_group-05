# AI Audit Log – DE180079 Nguyễn Thị Khánh Dương

| Thông tin | Nội dung |
|---|---|
| Môn học | PRN232 |
| Mã môn học | PRN232 |
| Lớp | SE18D05 |
| Học kỳ | SU26 |
| Tên bài tập / Project | Food Link Đà Nẵng |
| Tên sinh viên / Nhóm | Nguyễn Thị Khánh Dương - Nhóm 5 (Leader) |
| MSSV | DE180079 |
| Giảng viên hướng dẫn | Thầy Quang |
| Ngày bắt đầu | 20/07/2026 |
| Ngày cập nhật gần nhất | 20/07/2026 |
| Công cụ AI | Gemini (Antigravity) |

---

## Lần 1 – Triển khai UC26: Xem lô hàng cần vận chuyển

| Nội dung | Thông tin |
|---|---|
| Ngày | 2026-07-20 |
| Công cụ AI | Gemini (Antigravity) |
| Mục đích | Tạo các Request/Response DTOs, Interface ILogisticsOperatorService, Service và Controller cho UC26 |
| Phần việc | Backend – Domain, Application & API |
| Mức độ sử dụng | Hỗ trợ tạo khung code và triển khai logic truy vấn phân trang, tìm kiếm |

**Việc AI hỗ trợ:**
- Gợi ý cấu trúc các DTO trong file `LogisticsOperatorModels.cs` (như `ShipmentListRequest`, `ShipmentSummaryResponse`).
- Xây dựng phương thức `GetShipmentsAsync` trong `LogisticsOperatorService` với logic lọc trạng thái, tìm kiếm và phân trang sử dụng `.AsNoTracking()`.
- Thiết lập endpoint `GET /api/logistics/shipments` trong `LogisticsOperatorController`.

**Phần tự kiểm tra / chỉnh sửa:**
- Bổ sung trường `UserId` trong `ShipmentListRequest` để nhận diện Shipper hiện tại đang đăng nhập.
- Tối ưu hóa câu lệnh LINQ và kiểm tra cấu trúc dữ liệu liên kết giữa Shipment, SupplyRequest, Address và User.

**Kết quả áp dụng:** Có – Lưu trữ và tích hợp thành công.

---

## Lần 2 – Triển khai UC27: Nhận lô hàng vận chuyển

| Nội dung | Thông tin |
|---|---|
| Ngày | 2026-07-20 |
| Công cụ AI | Gemini (Antigravity) |
| Mục đích | Lập trình logic nhận đơn hàng vận chuyển cho Shipper |
| Phần việc | Backend – Domain, Application & API |
| Mức độ sử dụng | Hỗ trợ một phần |

**Việc AI hỗ trợ:**
- Hướng dẫn tích hợp `IHttpContextAccessor` vào `LogisticsOperatorService` để lấy thông tin người dùng hiện tại an toàn mà không cần thay đổi signature phương thức nghiệp vụ.
- Viết logic kiểm tra trạng thái lô hàng phải ở trạng thái `Pending` và chưa được nhận bởi Shipper nào khác.
- Ghi nhận thời gian nhận đơn `AssignedAt` và chuyển trạng thái sang `Assigned`.

**Phần tự kiểm tra / chỉnh sửa:**
- Đăng ký `services.AddHttpContextAccessor()` trong tầng API Dependency Injection.
- Xử lý các trường hợp lỗi nghiệp vụ với `ConflictException` và `NotFoundException`.

**Kết quả áp dụng:** Có – Tích hợp thành công.

---

## Lần 3 – Triển khai UC29: Cập nhật trạng thái vận chuyển

| Nội dung | Thông tin |
|---|---|
| Ngày | 2026-07-20 |
| Công cụ AI | Gemini (Antigravity) |
| Mục đích | Lập trình logic cập nhật trạng thái di chuyển của Shipper |
| Phần việc | Backend – Domain, Application & API |
| Mức độ sử dụng | Hỗ trợ tạo và xử lý thuật toán kiểm soát trạng thái |

**Việc AI hỗ trợ:**
- Xây dựng cấu trúc kiểm soát thứ tự chuyển trạng thái hợp lệ (chỉ đi lên, không đi lùi).
- Tích hợp ghi nhận lịch sử trạng thái `ShipmentStatusHistory` (với các trường `Latitude` và `Longitude` sử dụng `[NotMapped]` để không làm thay đổi DB Schema).
- Tự động đồng bộ trạng thái đơn hàng `SupplyRequest` sang `Received` hoặc `Cancelled` tương ứng với kết quả giao hàng của Shipper.

**Phần tự kiểm tra / chỉnh sửa:**
- Bổ sung giá trị `Returned` vào enum `ShipmentStatus` để xử lý trả hàng.
- Xử lý xung đột đặt tên DTO (Ambiguous reference) bằng cách đặt toàn bộ DTO Logistics Operator vào namespace riêng biệt `Contract.LogisticsOperator`.

**Kết quả áp dụng:** Có – Tích hợp thành công.

---

## Lần 4 – Triển khai UC30: Xác nhận giao hàng thành công

| Nội dung | Thông tin |
|---|---|
| Ngày | 2026-07-20 |
| Công cụ AI | Gemini (Antigravity) |
| Mục đích | Lập trình logic xác nhận giao hàng thành công |
| Phần việc | Backend – Domain, Application & API |
| Mức độ sử dụng | Hỗ trợ lập trình và kiểm soát nghiệp vụ |

**Việc AI hỗ trợ:**
- Thiết lập DTO `ConfirmDeliveryRequest` và `DeliveryCompletedResponse`.
- Triển khai logic xác thực trạng thái trước đó phải là `Arrived` (đã đến nơi).
- Cập nhật trạng thái Shipment sang `Delivered`, cập nhật trạng thái đơn hàng sang `Completed` và lưu vết vào `ShipmentStatusHistory`.

**Phần tự kiểm tra / chỉnh sửa:**
- Bổ sung `Delivered` vào enum `ShipmentStatus` và `Completed` vào enum `SupplyRequestStatus`.
- Sử dụng `[NotMapped]` cho các trường bổ sung như `DeliveredAt`, `DeliveredBy`, `ReceiverName`, `ReceiverPhone` để tránh phải tạo Migration CSDL.

**Kết quả áp dụng:** Có – Đã hoàn tất và biên dịch thành công.
