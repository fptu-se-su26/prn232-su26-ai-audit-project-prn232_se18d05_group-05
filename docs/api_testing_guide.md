# HƯỚNG DẪN KIỂM THỬ TỔNG HỢP TẤT CẢ API (API TESTING GUIDE)
> **Dự án:** FoodLink Đà Nẵng — Hệ thống Quản lý Nguồn cung Thực phẩm  
> **Base URL:** `https://localhost:7114/api` hoặc `http://localhost:5xxx/api`  

---

## 🔑 DANH SÁCH TÀI KHOẢN MẪU ĐÃ CÓ SẴN TRÊN CSDL CLOUD

Bạn chỉ cần gọi API `POST /api/auth/login` với thông tin tài khoản tương ứng dưới đây để lấy Token test Swagger:

| Role (Vai trò) | Email đăng nhập | Mật khẩu chuẩn | Dữ liệu mẫu đã khởi tạo sẵn |
|---|---|---|---|
| 👑 **1. Admin** | `admin@foodlink.com` | **`Password123@`** | Có quyền duyệt hồ sơ Supplier, khóa/mở tài khoản, quản lý danh mục. |
| 🏬 **2. Supplier (Actor 2)** | `supplier@foodlink.com` | **`Password123@`** | **Hồ sơ:** Hợp tác xã Nông sản Việt Xanh Đà Nẵng (Đã `Approved`).<br>**Sản phẩm mẫu:** Cà chua bi VietGAP.<br>**Lô hàng mẫu:** `BATCH-TOMATO-20260721` (kèm mã QR Code). |
| 🏪 **3. DistributionPoint (Actor 3)** | `distributor@foodlink.com` | **`Password123@`** | Tài khoản điểm phân phối (Trường học/Bếp ăn/Siêu thị). |
| 🚚 **4. Shipper / LogisticsOperator (Actor 4)** | `shipper@foodlink.com` | ⚠️ **`Password123`** *(không có `@`)* | **Hồ sơ:** Nguyễn Văn Vận Chuyển (`Available`).<br>**Phương tiện:** Xe máy thùng lạnh (43A-99999). |

---

## 1. HƯỚNG DẪN THIẾT LẬP BAN ĐẦU

### 1.1 Kiểm tra Swagger UI
1. Chạy Backend API (Visual Studio): Bấm **F5** hoặc `dotnet run --project source/FLDN_API/API`
2. Trình duyệt tự mở hoặc truy cập: `https://localhost:7114/swagger`
3. Swagger UI hiển thị các nhóm API chính: `Auth`, `Admin`, `Supplier`, `Shipper`, `Logistics`.

### 1.2 Cách gửi Token Xác thực (JWT Authorization)
1. Gọi API **`POST /api/auth/login`** với Email & Password của Role bạn muốn test.
2. Lấy chuỗi `accessToken` từ Response JSON.
3. Trong Swagger UI: Nhấn nút **Authorize** (góc trên bên phải) ➔ Nhập `Bearer <chuỗi_token>` ➔ Nhấn **Authorize**.

---

## 2. MODULE 1: XÁC THỰC & TÀI KHOẢN (AUTH CONTROLLER)

### 2.1. Đăng nhập (`POST /api/auth/login`)
* **Ví dụ đăng nhập Shipper:**
```json
{
  "email": "shipper@foodlink.com",
  "password": "Password123"
}
```
* **Expected Response (`200 OK`):** Trả về `accessToken`, `refreshToken`, và thông tin User.

### 2.2. Đăng ký tài khoản mới (`POST /api/auth/register`)
```json
{
  "fullName": "Nguyễn Văn Test Mới",
  "email": "testnewuser@gmail.com",
  "phone": "0905111222",
  "password": "Password123@",
  "confirmPassword": "Password123@"
}
```

---

## 3. MODULE 2: QUẢN TRỊ HỆ THỐNG (ADMIN CONTROLLER)
> **Yêu cầu:** Login bằng `admin@foodlink.com` / `Password123@` để lấy Admin Token.

* **Danh sách người dùng:** `GET /api/admin/users`
* **Khóa tài khoản:** `PUT /api/admin/users/{id}/lock`
* **Mở khóa tài khoản:** `PUT /api/admin/users/{id}/unlock`
* **Duyệt hồ sơ NCC:** `PUT /api/admin/suppliers/{id}/approve`
* **Từ chối hồ sơ NCC:** `PUT /api/admin/suppliers/{id}/reject`
* **Tạo danh mục thực phẩm mới:** `POST /api/admin/categories`

---

## 4. MODULE 3: NHÀ CUNG CẤP (SUPPLIER CONTROLLER) — ACTOR 2
> **Yêu cầu:** Login bằng `supplier@foodlink.com` / `Password123@` để lấy Supplier Token.

* **Lấy danh sách sản phẩm:** `GET /api/supplier/products`
* **Tạo sản phẩm mới:** `POST /api/supplier/products`
* **Tạo lô hàng mới:** `POST /api/supplier/batches`
* **Lấy mã QR truy xuất:** `GET /api/batches/{id}/qr`
* **Quét QR Công khai (Public):** `GET /api/traceability/FOODLINK-TRACE-BATCH-TOMATO-20260721` *(Không cần Token)*

---

## 5. MODULE 4: SHIPPER / LOGISTICS OPERATOR — ACTOR 4
> **Yêu cầu:** Login bằng `shipper@foodlink.com` / `Password123` để lấy Shipper Token.

* **UC26 - Xem danh sách lô hàng vận chuyển:** `GET /api/logistics/shipments`
* **UC27 - Nhận đơn vận chuyển:** `PUT /api/shipper/deliveries/{id}/accept`
* **UC29 - Cập nhật trạng thái (`PickedUp` / `InTransit` / `Failed`):** `PUT /api/shipper/deliveries/{id}/status`
```json
{
  "status": "PickedUp",
  "note": "Đã tới kho nhận lô hàng Cà chua bi"
}
```
* **UC30 - Xác nhận giao hàng hoàn tất (Upload ảnh bằng chứng):** `PUT /api/shipper/deliveries/{id}/complete`
  * *(Truyền `confirmImage` dưới dạng Form-Data tệp tin hình ảnh)*
