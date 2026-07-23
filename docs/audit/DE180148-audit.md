# AI Audit Log – DE180148 Võ Thành Nhiệm

| Thông tin | Nội dung |
|---|---|
| Môn học | PRN232 |
| Mã môn học | PRN232 |
| Lớp | SE18D05 |
| Học kỳ | SU26 |
| Tên bài tập / Project | Food Link Đà Nẵng |
| Tên sinh viên / Nhóm | Võ Thành Nhiệm - Nhóm 5 |
| MSSV | DE180148 |
| Giảng viên hướng dẫn | Thầy Quang |
| Ngày bắt đầu | 15/06/2026 |
| Ngày cập nhật gần nhất | 23/07/2026 |
| Công cụ AI | ChatGPT, Gemini (Antigravity CLI) |

---

## Lần 1 – Thiết kế Data Models và Interface cho Supplier Actor

| Nội dung | Thông tin |
|---|---|
| Ngày | 2026-06-15 |
| Công cụ AI | ChatGPT |
| Mục đích | Tạo các Request/Response DTOs và định nghĩa Interface ISupplierService |
| Phần việc | Backend – Domain & Application Interfaces |
| Mức độ sử dụng | Hỗ trợ ý tưởng & Tạo khung code |

**Việc AI hỗ trợ:**
- Khảo sát các yêu cầu nghiệp vụ của Supplier (CRUD sản phẩm, quản lý lô hàng Batch, tồn kho Inventory, phê duyệt yêu cầu cung ứng SupplyRequest).
- Gợi ý cấu trúc các DTO trong file `SupplierModels.cs` (như `SupplierProductResponse`, `SupplierBatchResponse`, `TraceabilityResponse` phục vụ QR Code).
- Thiết lập interface `ISupplierService` với đầy đủ các phương thức async và CancellationToken.

**Phần tự kiểm tra / chỉnh sửa:**
- Chỉnh sửa các trường trong DTO để loại bỏ hoàn toàn `RetailPrice` (giá bán lẻ) và chỉ giữ lại `WholesalePrice` (quy đổi thành `UnitCost`) theo đúng scope quản lý chuỗi cung ứng FoodLink Đà Nẵng.
- Xác nhận các kiểu dữ liệu thời gian phù hợp (`DateOnly` cho ngày thu hoạch/sản xuất, `DateTimeOffset` cho thời gian tạo hệ thống).

**Kết quả áp dụng:** Có – lưu trữ cục bộ để chuẩn bị implement logic.

---

## Lần 2 – Xây dựng Logic Nghiệp vụ SupplierService

| Nội dung | Thông tin |
|---|---|
| Ngày | 2026-06-20 |
| Công cụ AI | ChatGPT |
| Mục đích | Xây dựng logic xử lý nghiệp vụ cho Supplier trong SupplierService |
| Phần việc | Backend – Application Services |
| Mức độ sử dụng | Hỗ trợ một phần |

**Việc AI hỗ trợ:**
- Viết khung xử lý CRUD sản phẩm thực phẩm, liên kết với PriceHistory để lưu lịch sử giá và Inventory để đồng bộ tồn kho.
- Viết logic quản lý lô hàng (`Batch`): tính toán hạn sử dụng, sinh dữ liệu QRCode, đếm lượt quét và cập nhật số lượng còn lại (`RemainingQty`).
- Viết logic xử lý phê duyệt (`Confirm`) / từ chối (`Reject`) yêu cầu cung ứng (`SupplyRequest`), tự động trừ/cộng lại số lượng tồn kho và lượng đặt trước (`ReservedQty`).
- Viết tính năng kiểm tra lô hàng sắp hết hạn (ExpiryWarning) và gửi thông báo cảnh báo.

**Phần tự kiểm tra / chỉnh sửa:**
- Tối ưu hóa các truy vấn Linq bằng cách sử dụng `.AsNoTracking()` cho các API chỉ đọc (GetProducts, GetInventory) để tăng hiệu năng.
- Bổ sung kiểm tra phân quyền thủ công trong Service (đảm bảo Supplier chỉ thao tác được trên các dữ liệu thuộc sở hữu của mình).
- Xử lý các ngoại lệ nghiệp vụ cụ thể (`NotFoundException`, `ConflictException`, `BadRequestException`).

**Kết quả áp dụng:** Có – tạo file `SupplierService.cs` hoạt động trơn tru.

---

## Lần 3 – Thiết lập Supplier API Controller

| Nội dung | Thông tin |
|---|---|
| Ngày | 2026-06-25 |
| Công cụ AI | ChatGPT |
| Mục đích | Xây dựng API Controller và cấu hình định tuyến, phân quyền authorization |
| Phần việc | Backend – API Controllers |
| Mức độ sử dụng | Hỗ trợ một phần |

**Việc AI hỗ trợ:**
- Tạo class `SupplierController` kế thừa `ControllerBase` với dependency injection qua primary constructor.
- Áp dụng các filter `[Authorize(Roles = nameof(RoleType.Supplier))]` cho các endpoint của nhà cung cấp.
- Map các request query/body vào service tương ứng và trả về định dạng chuẩn của hệ thống: `ApiResponse<T>.Ok()`.

**Phần tự kiểm tra / chỉnh sửa:**
- Kiểm tra các route API khớp hoàn toàn với danh sách endpoint đã thống nhất trong tài liệu `BUSINESS_REQUIREMENTS.md`.
- Sửa lại route quét QR code traceability thành `[AllowAnonymous]` để người dân có thể quét tự do mà không cần đăng nhập.

**Kết quả áp dụng:** Có – tạo file `SupplierController.cs`.

---

## Lần 4 – Rà soát và Tích hợp Git Repository

| Nội dung | Thông tin |
|---|---|
| Ngày | 2026-06-29 |
| Công cụ AI | Gemini (Antigravity CLI) |
| Mục đích | Rà soát quy tắc quản lý Git của dự án và đồng bộ hóa các tài liệu AI Audit trước khi đẩy code |
| Phần việc | Documentation & Git Integration |
| Mức độ sử dụng | AI hỗ trợ nhiều |

**Việc AI hỗ trợ:**
- Quét và phân tích toàn bộ quy tắc đặt tên nhánh (Branch Naming Convention), cấu trúc commit message trong file `README.md`.
- Phân tích cấu trúc phân chia tài liệu AI Audit theo MSSV cá nhân mà các thành viên khác trong nhóm đã áp dụng (thư mục `docs/audit/` và `docs/prompts/`).
- Tạo tự động các file nhật ký AI Audit và Prompt cá nhân, cập nhật Changelog chung của nhóm.
- Chuyển nhánh và chuẩn bị các lệnh Git an toàn.

**Phần tự kiểm tra / chỉnh sửa:**
- Trực tiếp phê duyệt kế hoạch triển khai để đảm bảo tính an toàn của dự án.
- Kiểm tra lại các file mã nguồn backend Supplier không chứa thông tin nhạy cảm.

**Kết quả áp dụng:** Có – Đã đẩy code lên nhánh main.

---

## Lần 5 – Refactor Dọn Dẹp Legacy Controller & Tối Ưu Swagger API

| Nội dung | Thông tin |
|---|---|
| Ngày | 2026-07-22 |
| Công cụ AI | Gemini (Antigravity CLI) |
| Mục đích | Loại bỏ hoàn toàn các Controller/Service cũ của Shipper và chuẩn hóa Swagger Schema |
| Phần việc | Refactoring & API Maintenance |
| Mức độ sử dụng | Hỗ trợ nhiều |

**Việc AI hỗ trợ:**
- Phát hiện các API trùng lặp giữa `ShipperController` cũ và `LogisticsOperatorController` mới trên Swagger UI.
- Tiến hành gỡ bỏ hoàn toàn file controller cũ `ShipperController.cs`, `LogisticsService.cs`, `ILogisticsService.cs` và DTOs cũ để hệ thống chỉ sử dụng thống nhất `LogisticsOperatorController`.
- Cấu hình `CustomSchemaIds` trong `SwaggerExtensions.cs` để khắc phục triệt để lỗi Swagger 500 khi trùng tên DTOs ở các namespace khác nhau.
- Hỗ trợ khởi tạo dữ liệu mẫu cho 4 Role trên Database Cloud để phục vụ kiểm thử API trực quan.

**Phần tự kiểm tra / chỉnh sửa:**
- Kiểm tra lại kết quả build solution `FLDN_API.slnx` đạt **Build Succeeded (0 Errors, 0 Warnings)**.
- Đảm bảo mã nguồn `AppData.cs` đã được dọn dẹp sạch sẽ không chứa dữ liệu hardcode trước khi đẩy git lên `main`.

**Kết quả áp dụng:** Có – Áp dụng vào hệ thống và chuẩn bị commit.
