# Prompt Log – DE180148 Võ Thành Nhiệm

| Thông tin | Nội dung |
|---|---|
| Môn học | PRN232 |
| Mã môn học | PRN232 |
| Lớp | SE18D05 |
| Học kỳ | SU26 |
| Tên bài tập / Project | Food Link Đà Nẵng |
| Tên sinh viên / Nhóm | Võ Thành Nhiệm - Nhóm 5 |
| MSSV / Danh sách MSSV | DE180148 |
| Giảng viên hướng dẫn | Thầy Quang |
| Ngày bắt đầu | 15/06/2026 |
| Ngày cập nhật gần nhất | 22/07/2026 |
| Công cụ AI | ChatGPT, Gemini (Antigravity CLI) |

---

## Bảng tổng hợp

| STT | Ngày | Công cụ | Mục đích | Có áp dụng? |
|---:|---|---|---|---|
| 1 | 2026-06-15 | ChatGPT | Tạo DTOs và định nghĩa Interface ISupplierService | Có |
| 2 | 2026-06-20 | ChatGPT | Lập trình logic nghiệp vụ SupplierService | Có |
| 3 | 2026-06-25 | ChatGPT | Tạo Supplier API Controller và cấu hình phân quyền | Có |
| 4 | 2026-06-29 | Gemini | Rà soát Git và tạo tài liệu AI Audit cá nhân theo MSSV | Có |
| 5 | 2026-07-22 | Gemini | Xóa ShipperController cũ và tối ưu hóa Swagger Schema Generator | Có |

---

## Prompt 1 – Thiết kế Data Models và Interface cho Supplier Actor

**Mục đích:** Tạo các Request/Response DTOs và định nghĩa Interface ISupplierService

**Prompt (tóm tắt):**
Tôi cần thiết kế API cho vai trò Supplier (nhà cung cấp) trong dự án FoodLink Đà Nẵng. Hãy định nghĩa các lớp Request và Response DTOs cần thiết cho các chức năng: Xem danh sách sản phẩm, tạo/cập nhật sản phẩm, xem tồn kho và cập nhật số lượng tồn kho, xem danh sách lô hàng (Batch) và tạo lô hàng mới, xác nhận/từ chối yêu cầu cung ứng (SupplyRequest), QR Code cho lô hàng, truy xuất nguồn gốc lô hàng và xem cảnh báo hết hạn. Sau đó hãy định nghĩa một Interface ISupplierService cho các tính năng này. Hãy chú ý sử dụng đúng kiểu dữ liệu (Guid, DateOnly, DateTimeOffset, enums).

**Kết quả áp dụng:** Có. Dùng làm khung xương để sinh file `SupplierModels.cs` và `ISupplierService.cs`.

---

## Prompt 2 – Xây dựng Logic Nghiệp vụ SupplierService

**Mục đích:** Lập trình logic nghiệp vụ cụ thể cho Supplier trong SupplierService

**Prompt (tóm tắt):**
Hãy viết lớp `SupplierService` triển khai interface `ISupplierService`. Sử dụng pattern Primary Constructor và inject `IUnitOfWork` để truy xuất DB. Các nghiệp vụ chính cần xử lý:
1. `GetProductsAsync`: Lọc sản phẩm theo Category, Search text, và trạng thái `IsActive`.
2. `CreateProductAsync` & `UpdateProductAsync`: Validate tên sản phẩm không trùng lặp đối với cùng một nhà cung cấp, tự động ghi nhận lịch sử thay đổi giá (`PriceHistory`) và khởi tạo tồn kho (`Inventory`).
3. `GetInventoryAsync` & `UpdateInventoryAsync`: Xem và cập nhật số lượng tồn kho hiện tại, kiểm tra điều kiện `ReservedQty <= Quantity`.
4. `CreateBatchAsync`: Tạo lô hàng mới gồm các thông tin VietGAP/GlobalGAP certificate URL, ngày sản xuất, hạn sử dụng, tự động sinh QR code data.
5. `ConfirmSupplyRequestAsync` & `RejectSupplyRequestAsync`: Duyệt hoặc từ chối yêu cầu cung ứng. Khi từ chối cần nhập lý do. Khi duyệt cần tự động kiểm tra tồn kho và trừ số lượng sản phẩm tương ứng, chuyển đổi trạng thái của SupplyRequest.
6. `GetExpiryWarningsAsync`: Tự động tìm các lô hàng sắp hết hạn trong vòng 7 ngày để tạo thông báo cảnh báo.

**Kết quả áp dụng:** Có. Code được tích hợp vào `SupplierService.cs`.

---

## Prompt 3 – Thiết lập API Controller cho Supplier

**Mục đích:** Xây dựng API Controller và cấu hình phân quyền (Authorization)

**Prompt (tóm tắt):**
Hãy viết một `SupplierController` trong dự án ASP.NET Core API. Lớp này kế thừa `ControllerBase` và inject `ISupplierService`. Hãy áp dụng phân quyền `[Authorize(Roles = nameof(RoleType.Supplier))]` ở cấp class cho hầu hết các endpoint. Các endpoint cần có bao gồm: CRUD sản phẩm (`api/supplier/products`), xem/sửa tồn kho (`api/supplier/inventory`), xem/tạo lô hàng (`api/supplier/batches`), xem/phê duyệt/từ chối yêu cầu cung ứng (`api/supplier/supply-requests`), lấy mã QR lô hàng, quét QR công khai (`api/traceability/{qrCode}` - endpoint này được truy cập tự do `[AllowAnonymous]`) và lấy cảnh báo hết hạn. Định dạng trả về luôn sử dụng `ApiResponse<T>.Ok()`.

**Kết quả áp dụng:** Có. Code được tích hợp vào `SupplierController.cs`.

---

## Prompt 4 – Rà soát và Tích hợp Git Repository

**Mục đích:** Đồng bộ hóa tài liệu AI Audit cá nhân theo quy chuẩn của nhóm và chuẩn bị commit/push code lên Git

**Prompt (tóm tắt):**
Hãy đọc file README.md để tìm hiểu về convention đặt tên branch và commit message. Đồng thời kiểm tra trong thư mục docs/audit/ và docs/prompts/ xem các thành viên khác đang làm tài liệu AI log thế nào để viết file tương tự cho tôi (mã số sinh viên DE180148). Sau đó hướng dẫn tôi chuyển sang nhánh git tương ứng để đẩy code backend Supplier lên github.

**Kết quả áp dụng:** Có. Đã đẩy code lên nhánh main.

---

## Prompt 5 – Xóa ShipperController cũ và tối ưu hóa Swagger Schema Generator

**Mục đích:** Loại bỏ các API legacy bị trùng lặp trên Swagger UI và xử lý triệt để lỗi Swagger 500 khi quét DTOs.

**Prompt (tóm tắt):**
Hãy kiểm tra giao diện Swagger UI hiện tại, tôi thấy có 2 nhóm API Shipper và LogisticsOperator bị trùng lặp chức năng. Hãy xóa bỏ controller cũ `ShipperController.cs`, `LogisticsService.cs` để chỉ giữ lại duy nhất `LogisticsOperatorController.cs`. Sau đó bổ sung cấu hình `CustomSchemaIds` trong `SwaggerExtensions.cs` để tránh xung đột tên DTOs gây ra lỗi 500 khi tải `swagger.json`. Cuối cùng kiểm tra build thành công, cập nhật tài liệu AI Audit và thực hiện commit/push code lên `main`.

**Kết quả áp dụng:** Có. Đã dọn dẹp sạch sẽ legacy code và cập nhật tài liệu kiểm thử.
