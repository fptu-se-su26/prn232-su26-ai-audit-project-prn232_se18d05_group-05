# FOODLINK DA NANG — MÔ TẢ NGHIỆP VỤ HỆ THỐNG

## Hệ thống Quản lý Nguồn cung Thực phẩm TP. Đà Nẵng

> **Phiên bản:** 1.0  
> **Ngày:** 2026-06-11  
> **Trạng thái:** Draft — chờ review scope alignment

---

## 1. TỔNG QUAN HỆ THỐNG

### 1.1 Mục tiêu

FoodLink Đà Nẵng là hệ thống **quản lý nguồn cung thực phẩm** phục vụ chuỗi cung ứng thực phẩm trên địa bàn TP. Đà Nẵng. Hệ thống giúp:

- Quản lý nhà cung cấp thực phẩm và đánh giá chất lượng nguồn cung
- Quản lý sản phẩm thực phẩm với truy xuất nguồn gốc (lô hàng, chứng nhận ATTP)
- Theo dõi tồn kho và điều phối phân phối thực phẩm đến các điểm phân phối
- Đảm bảo an toàn thực phẩm thông qua quản lý hạn sử dụng và chứng nhận
- Hỗ trợ cơ quan quản lý giám sát chuỗi cung ứng thực phẩm trên địa bàn

### 1.2 Phạm vi nghiệp vụ

| Thuộc phạm vi (Phase 1 — Core) | Thuộc phạm vi (Phase 2 — Mở rộng) | KHÔNG thuộc phạm vi |
|--------------------------------|-----------------------------------|---------------------|
| Quản lý nhà cung cấp & phê duyệt | Công nợ / Hóa đơn B2B (Invoice) | Bán hàng trực tiếp cho người tiêu dùng (B2C) |
| Quản lý sản phẩm & danh mục thực phẩm | Đánh giá KPI nhà cung cấp (SupplierEvaluation) | Giỏ hàng, đặt hàng online kiểu TMĐT |
| Quản lý lô hàng & truy xuất nguồn gốc | Điều chuyển kho (StockTransfer) | Thanh toán qua ví điện tử (VNPay, Momo) |
| Quản lý tồn kho & cảnh báo hết hạn | Báo cáo thống kê nâng cao | Voucher, mã giảm giá, flash sale |
| Yêu cầu cung ứng & điều phối phân phối | | Đánh giá sao kiểu marketplace |
| Vận chuyển kho-đến-điểm phân phối | | Giao hàng tận nhà (last-mile delivery) |
| Báo cáo & giám sát chuỗi cung ứng | | Ví người dùng, nạp tiền, hoàn tiền |

### 1.3 Đối tượng sử dụng (Actors)

| Vai trò | Mô tả | Ghi chú |
|---------|-------|---------|
| **Admin** | Quản trị viên hệ thống, cơ quan quản lý ATTP TP. Đà Nẵng | Giữ nguyên |
| **Nhà cung cấp (Supplier)** | Doanh nghiệp/hộ kinh doanh cung cấp thực phẩm | Giữ nguyên |
| **Điểm phân phối (DistributionPoint)** | Chợ, siêu thị, cửa hàng bán lẻ, bếp ăn tập thể nhận hàng từ chuỗi cung ứng | **Thay thế "Customer"** |
| **Đơn vị vận chuyển (LogisticsOperator)** | Đơn vị/nhân viên vận chuyển hàng từ kho NCC đến điểm phân phối | **Thay thế "Shipper"** |

---

## 2. DANH SÁCH USE CASE

### 2.1 Nhóm: Xác thực & Tài khoản (Auth)

| UC | Tên | Actor | Mô tả | Trạng thái |
|----|-----|-------|-------|------------|
| UC01 | Đăng ký tài khoản | Tất cả | Đăng ký tài khoản mới vào hệ thống | Giữ nguyên |
| UC03 | Đăng nhập | Tất cả | Xác thực bằng email/password, nhận JWT token | Giữ nguyên |
| UC04 | Đăng xuất | Tất cả | Hủy phiên đăng nhập | Giữ nguyên |
| UC07 | Đổi mật khẩu | Tất cả | Thay đổi mật khẩu tài khoản | Giữ nguyên |

### 2.2 Nhóm: Quản trị hệ thống (Admin)

| UC | Tên | Actor | Mô tả | Trạng thái |
|----|-----|-------|-------|------------|
| UC08 | Quản lý tài khoản | Admin | Xem, khóa/mở khóa, reset mật khẩu tài khoản người dùng | Giữ nguyên |
| UC09 | Phê duyệt nhà cung cấp | Admin | Duyệt/từ chối hồ sơ NCC, cập nhật biểu phí | Giữ nguyên |
| UC10 | Quản lý danh mục thực phẩm | Admin | CRUD danh mục sản phẩm (cây phân cấp) | Giữ nguyên |
| UC11 | ~~Quản lý Voucher~~ | ~~Admin~~ | ~~Tạo/sửa/bật-tắt mã giảm giá~~ | **XÓA — ngoài scope** |
| UC11* | Quản lý chính sách cung ứng | Admin | Thiết lập quy tắc phân bổ, hạn mức cung ứng theo khu vực, mùa vụ | **MỚI — thay UC11 cũ** |

### 2.3 Nhóm: Nhà cung cấp (Supplier)

| UC | Tên | Actor | Mô tả | Trạng thái |
|----|-----|-------|-------|------------|
| UC12 | Quản lý sản phẩm | Supplier | CRUD sản phẩm thực phẩm (giá, đơn vị, quy cách đóng gói) | Giữ — **bỏ RetailPrice, giữ WholesalePrice → UnitCost** |
| UC13 | Quản lý tồn kho | Supplier | Cập nhật số lượng tồn kho theo sản phẩm | Giữ nguyên |
| UC14* | Quản lý lô hàng (Batch) | Supplier | Tạo lô hàng với thông tin nguồn gốc, hạn sử dụng, chứng nhận | **Đã có entity Batch — cần bổ sung UC** |
| UC17 | ~~Xác nhận đơn hàng~~ → Xác nhận yêu cầu cung ứng | Supplier | Xem và duyệt/từ chối yêu cầu cung ứng từ điểm phân phối | **Đổi tên — logic tương tự** |

### 2.4 Nhóm: Điểm phân phối (DistributionPoint) — thay thế nhóm Customer

| UC | Tên | Actor | Mô tả | Trạng thái |
|----|-----|-------|-------|------------|
| UC18 | Tìm kiếm sản phẩm | DistributionPoint | Tìm thực phẩm theo từ khóa, quận/huyện, mùa vụ | Giữ — **đổi context: tìm nguồn cung, không phải mua sắm** |
| UC19 | Lọc sản phẩm | DistributionPoint | Lọc theo danh mục, NCC, giá, sắp xếp | Giữ — **bỏ RetailPrice, lọc theo UnitCost** |
| UC20 | Xem chi tiết sản phẩm | DistributionPoint | Xem thông tin sản phẩm, NCC, tồn kho, lô hàng | Giữ — **bỏ averageRating/totalReviews** |
| UC21 | ~~Giỏ hàng~~ | ~~Customer~~ | ~~Thêm/sửa/xóa sản phẩm trong giỏ~~ | **XÓA — ngoài scope** |
| UC22 | ~~Đặt hàng~~ → Tạo yêu cầu cung ứng | DistributionPoint | Tạo phiếu yêu cầu cung ứng thực phẩm (chọn sản phẩm, số lượng, ngày cần hàng) | **ĐỔI — SupplyRequest thay Order** |
| UC23 | ~~Thanh toán online~~ | ~~Customer~~ | ~~Thanh toán qua VNPay/Momo/Wallet~~ | **XÓA — ngoài scope** |
| UC23* | Xác nhận nhận hàng | DistributionPoint | Xác nhận đã nhận đủ hàng, báo thiếu/hư hỏng nếu có | **MỚI** |
| UC24 | ~~Theo dõi đơn hàng~~ → Theo dõi yêu cầu cung ứng | DistributionPoint | Xem trạng thái yêu cầu: Pending → Approved → Dispatched → InTransit → Received | **ĐỔI tên + status flow** |

### 2.5 Nhóm: Vận chuyển (Logistics) — thay thế nhóm Shipper

| UC | Tên | Actor | Mô tả | Trạng thái |
|----|-----|-------|-------|------------|
| UC26 | Xem lô hàng cần vận chuyển | LogisticsOperator | Xem danh sách shipment được giao | **ĐỔI tên — logic tương tự** |
| UC27 | Nhận lô hàng vận chuyển | LogisticsOperator | Xác nhận nhận vận chuyển lô hàng | **ĐỔI tên** |
| UC29 | Cập nhật trạng thái vận chuyển | LogisticsOperator | Cập nhật: PickedUp → InTransit → Arrived | **ĐỔI status values** |
| UC30 | Xác nhận giao hàng | LogisticsOperator | Upload ảnh xác nhận + chữ ký điểm phân phối | Giữ — **đổi context** |

### 2.6 Nhóm: Truy xuất nguồn gốc & ATTP

| UC | Tên | Actor | Mô tả | Trạng thái |
|----|-----|-------|-------|------------|
| UC31* | Quét QR truy xuất nguồn gốc | Tất cả | Quét mã QR lô hàng → xem thông tin nguồn gốc, chứng nhận | **Đã có entity QRCode/Batch — cần bổ sung UC** |
| UC32* | Cảnh báo hết hạn | System | Tự động cảnh báo lô hàng sắp hết hạn sử dụng | **MỚI — dùng Batch.ExpiryDate + Notification** |
| UC33* | Báo cáo chất lượng nguồn cung | Admin | Thống kê chất lượng NCC: tỷ lệ giao đúng hạn, đủ số lượng, chất lượng | **MỚI — thay Review** |

---

## 3. MAPPING ENTITY: HIỆN TẠI → NÊN ĐỔI

### 3.1 Giữ nguyên

| Entity | Lý do |
|--------|-------|
| `User`, `Role`, `UserRole` | Hạ tầng auth — scope-neutral |
| `Category` | Phân loại thực phẩm — đúng scope |
| `Product` | Sản phẩm thực phẩm — đúng scope (cần bỏ `RetailPrice`) |
| `ProductImage` | Hình ảnh sản phẩm — đúng scope |
| `PriceHistory` | Lịch sử giá — đúng scope (cần bỏ `RetailPrice`) |
| `Inventory` | Tồn kho — đúng scope |
| `Batch` | Lô hàng + truy xuất nguồn gốc — **rất đúng scope** |
| `QRCode` | Mã QR truy xuất — **rất đúng scope** |
| `SupplierProfile` | Hồ sơ NCC — đúng scope |
| `District`, `Address` | Vị trí địa lý Đà Nẵng — đúng scope |
| `Notification` | Thông báo hệ thống — scope-neutral |

### 3.2 Đổi tên / Tái cấu trúc

| Hiện tại | Đổi thành | Thay đổi chi tiết |
|----------|-----------|-------------------|
| `Order` | `SupplyRequest` | `CustomerId` → `DistributionPointId`, bỏ `DiscountAmount`, bỏ `VoucherId`, thêm `RequestedDeliveryDate`, `Priority` |
| `OrderItem` | `SupplyRequestItem` | Giữ fields, đổi FK |
| `OrderStatus` | `SupplyRequestStatus` | Giá trị: `Pending → Approved → Dispatched → InTransit → Received → Rejected → Cancelled` |
| `OrderStatusHistory` | `SupplyRequestStatusHistory` | Đổi FK |
| `SupplierOrderConfirmation` | `SupplierConfirmation` | Giữ logic, đổi FK |
| `Delivery` | `Shipment` | `ShipperId` → `LogisticsOperatorId`, bỏ `ShipperEarning` |
| `DeliveryStatus` | `ShipmentStatus` | Giá trị: `Pending → Assigned → PickedUp → InTransit → Arrived → Failed` |
| `DeliveryStatusHistory` | `ShipmentStatusHistory` | Đổi FK |
| `ShipperProfile` | `LogisticsProfile` | Bỏ `AverageRating`, thêm `CompanyName`, `LicenseType` |
| `ShipperOrderAction` | `LogisticsAction` | Đổi FK |
| `DeliveryZone` | `DistributionZone` | Đổi tên — logic giữ |
| `DeliveryType` | `FulfillmentType` | `Immediate` → `Standard`, `Scheduled` → `Scheduled` |
| `Product.RetailPrice` | **Xóa field** | Chỉ giữ `WholesalePrice` → đổi tên `UnitCost` |
| `PriceHistory.RetailPrice` | **Xóa field** | Tương tự |
| Role `Customer` | Role `DistributionPoint` | Đổi tên + seed data |
| Role `Shipper` | Role `LogisticsOperator` | Đổi tên + seed data |

### 3.3 Xóa hoàn toàn

| Entity | Lý do |
|--------|-------|
| `Cart` | Giỏ hàng = TMĐT. SupplyRequest tạo trực tiếp |
| `CartItem` | Phụ thuộc Cart |
| `Payment` | Thanh toán consumer (VNPay/Momo). Thay bằng `Invoice` nếu cần |
| `Wallet` | Ví điện tử = B2C |
| `WalletTransaction` | Phụ thuộc Wallet |
| `Voucher` | Mã giảm giá = TMĐT |
| `VoucherUsage` | Phụ thuộc Voucher |
| `Review` | Đánh giá sao = marketplace. Thay bằng `SupplierEvaluation` |

### 3.4 Thêm mới — Phase 1 (Core)

| Entity mới | Mục đích | Fields chính |
|------------|----------|-------------|
| `DistributionPointProfile` | Hồ sơ điểm phân phối (chợ, siêu thị, bếp ăn) | `UserId`, `PointName`, `PointType` (Market/Supermarket/Canteen), `Capacity`, `DistrictId` |

### 3.5 Thêm mới — Phase 2 (Mở rộng, tích hợp sau)

| Entity mới | Mục đích | Fields chính | Điểm hook vào Phase 1 |
|------------|----------|-------------|----------------------|
| `Invoice` | Công nợ / Hóa đơn B2B — thanh toán sau kiểu doanh nghiệp | `SupplyRequestId`, `SupplierId`, `Amount`, `DueDate`, `Status` (Unpaid → Paid) | Hook sau bước `SupplyRequest.Status = Received` → tự tạo `Invoice(Unpaid)` |
| `SupplierEvaluation` | Đánh giá KPI nhà cung cấp theo kỳ | `SupplierId`, `Period`, `OnTimeRate`, `QualityRate`, `FulfillmentRate`, `Note` | Tính từ dữ liệu SupplyRequest + Shipment đã có |
| `StockTransfer` | Điều chuyển hàng giữa các kho/điểm | `FromLocationId`, `ToLocationId`, `Items`, `Status` | Mở rộng khi có nhiều kho, không ảnh hưởng Phase 1 |

---

## 4. LUỒNG NGHIỆP VỤ CHÍNH

### 4.1 Luồng cung ứng thực phẩm (thay thế luồng đặt hàng)

```
Điểm phân phối                  Hệ thống                    Nhà cung cấp              Vận chuyển
      │                            │                            │                        │
      │ 1. Tạo yêu cầu cung ứng   │                            │                        │
      │ ──────────────────────────► │                            │                        │
      │   (sản phẩm, SL,           │ 2. Gửi thông báo           │                        │
      │    ngày cần hàng)           │ ──────────────────────────► │                        │
      │                            │                            │                        │
      │                            │   3. Duyệt/Từ chối         │                        │
      │                            │ ◄─────────────────────────  │                        │
      │                            │                            │                        │
      │                            │ 4. Tạo Shipment            │                        │
      │                            │ ──────────────────────────────────────────────────► │
      │                            │                            │                        │
      │                            │                    5. Nhận & vận chuyển              │
      │                            │                            │ ◄───────────────────── │
      │                            │                            │                        │
      │ 6. Xác nhận nhận hàng      │                            │                        │
      │ ──────────────────────────► │                            │                        │
      │   (đủ/thiếu/hư hỏng)       │ 7. Cập nhật trạng thái     │                        │
      │                            │ ──────────────────────────► │                        │
```

### 4.2 Trạng thái yêu cầu cung ứng (SupplyRequest)

```
  [Pending] ──────► [Approved] ──────► [Dispatched] ──────► [InTransit] ──────► [Received]
      │                  │                                                          │
      │                  │                                                   [PartialReceived]
      │                  ▼                                                          │
      │             [Rejected]                                               (báo thiếu/hỏng)
      ▼
  [Cancelled]
```

### 4.3 Trạng thái vận chuyển (Shipment)

```
  [Pending] ──► [Assigned] ──► [PickedUp] ──► [InTransit] ──► [Arrived] ──► [Confirmed]
                    │                                              │
                    ▼                                              ▼
               [Declined]                                      [Failed]
```

### 4.4 Luồng truy xuất nguồn gốc

```
Nhà cung cấp                         Hệ thống                        Người quét QR
      │                                  │                                │
      │ 1. Tạo lô hàng (Batch)           │                                │
      │   + chứng nhận ATTP              │                                │
      │ ────────────────────────────────► │                                │
      │                                  │ 2. Sinh mã QR cho lô           │
      │                                  │ ─────────────────►              │
      │                                  │                                │
      │                                  │                 3. Quét QR      │
      │                                  │ ◄───────────────────────────── │
      │                                  │                                │
      │                                  │ 4. Trả về:                     │
      │                                  │   - NCC, vùng trồng            │
      │                                  │   - Ngày thu hoạch/SX          │
      │                                  │   - Hạn sử dụng               │
      │                                  │   - Chứng nhận (VietGAP...)    │
      │                                  │ ──────────────────────────────► │
```

### 4.5 Luồng công nợ B2B (Phase 2 — tích hợp sau)

> **Lưu ý:** Luồng này KHÔNG nằm trong Phase 1. Thiết kế Phase 1 đảm bảo dễ plug-in sau mà không cần sửa kiến trúc.

```
Điểm phân phối         Hệ thống              Nhà cung cấp / Admin
      │                    │                        │
      │ 1. Xác nhận        │                        │
      │    nhận hàng       │                        │
      │ ──────────────────►│                        │
      │                    │ 2. Tự tạo Invoice      │
      │                    │    (Status: Unpaid)     │
      │                    │ ──────────────────────► │  (NCC nhận thông báo)
      │                    │                        │
      │     ... cuối kỳ thanh toán (tuần/tháng) ... │
      │                    │                        │
      │ 3. Thanh toán      │                        │
      │    (chuyển khoản   │                        │
      │     ngân hàng)     │                        │
      │ ──────────────────►│                        │
      │                    │ 4. NCC/Admin xác nhận  │
      │                    │ ◄───────────────────── │
      │                    │                        │
      │                    │ 5. Invoice → Paid      │
      │                    │                        │
```

**Thiết kế Phase 1 hỗ trợ sẵn:**
- `SupplyRequest.FinalAmount` → Invoice lấy giá trị từ đây
- `SupplyRequest.Status = Received` → trigger point tạo Invoice
- Chỉ cần thêm: 1 entity `Invoice`, 1 enum `InvoiceStatus`, vài API endpoints

---

## 5. API ENDPOINT — SAU KHI CHUYỂN ĐỔI

### 5.1 Giữ nguyên

| Nhóm | Endpoints | Ghi chú |
|------|-----------|---------|
| Auth | `POST /api/auth/register`, `login`, `logout`, `refresh-token`, `change-password` | Không đổi |
| Admin Users | `GET/PUT /api/admin/users/...` | Không đổi |
| Admin Suppliers | `GET/PUT /api/admin/suppliers/...` | Không đổi |
| Admin Categories | `GET/POST/PUT/DELETE /api/admin/categories/...` | Không đổi |
| Supplier Products | `GET/POST/PUT/DELETE /api/supplier/products/...` | Bỏ `retailPrice` khỏi request/response |
| Supplier Inventory | `GET/PUT /api/supplier/inventory/...` | Không đổi |
| Profile | `GET/PUT /api/profile` | Không đổi |
| Districts | `GET /api/districts` | Không đổi |
| Categories (public) | `GET /api/categories` | Không đổi |

### 5.2 Đổi tên / Cấu trúc lại

| Cũ | Mới | Thay đổi |
|----|-----|----------|
| `GET /api/products/search` | `GET /api/products/search` | Giữ URL, bỏ `retailPrice` khỏi response |
| `GET /api/products` | `GET /api/products` | Giữ URL, bỏ `retailPrice`, `minPrice/maxPrice` filter theo `unitCost` |
| `GET /api/products/{id}` | `GET /api/products/{id}` | Bỏ `averageRating`, `totalReviews`, `retailPrice` |
| `GET /api/supplier/orders` | `GET /api/supplier/supply-requests` | Đổi endpoint + `customerName` → `distributionPointName` |
| `PUT /api/supplier/orders/{id}/confirm` | `PUT /api/supplier/supply-requests/{id}/confirm` | Đổi endpoint |
| `PUT /api/supplier/orders/{id}/reject` | `PUT /api/supplier/supply-requests/{id}/reject` | Đổi endpoint |
| `POST /api/orders` | `POST /api/supply-requests` | Bỏ `voucherCode`, `addressId` → `distributionPointId`, thêm `requestedDeliveryDate` |
| `DELETE /api/orders/{id}/cancel` | `PUT /api/supply-requests/{id}/cancel` | Đổi verb + endpoint |
| `GET /api/orders` | `GET /api/supply-requests` | Đổi endpoint + bỏ `discountAmount` |
| `GET /api/orders/{id}` | `GET /api/supply-requests/{id}` | Đổi endpoint + bỏ payment/voucher info |
| `GET /api/orders/{id}/history` | `GET /api/supply-requests/{id}/history` | Đổi endpoint |
| `GET /api/shipper/deliveries` | `GET /api/logistics/shipments` | Đổi endpoint + `customerName` → `distributionPointName` |
| `PUT /api/shipper/deliveries/{id}/accept` | `PUT /api/logistics/shipments/{id}/accept` | Đổi endpoint |
| `PUT /api/shipper/deliveries/{id}/status` | `PUT /api/logistics/shipments/{id}/status` | Đổi endpoint + status values |
| `PUT /api/shipper/deliveries/{id}/complete` | `PUT /api/logistics/shipments/{id}/complete` | Đổi endpoint |
| `PUT /api/shipper/status` | `PUT /api/logistics/status` | Đổi endpoint |
| `PUT /api/shipper/location` | `PUT /api/logistics/location` | Đổi endpoint |
| `GET/POST/PUT /api/addresses` | `GET/POST/PUT /api/distribution-points/{id}/address` | Ngữ cảnh: địa chỉ điểm phân phối |
| `POST /api/vouchers/validate` | **XÓA** | Ngoài scope |
| `GET/POST/PUT /api/admin/vouchers` | **XÓA** hoặc → `GET/POST/PUT /api/admin/supply-policies` | Thay bằng chính sách cung ứng |

### 5.3 Xóa hoàn toàn

| Endpoint | Lý do |
|----------|-------|
| `GET /api/cart` | Giỏ hàng = TMĐT |
| `POST /api/cart/items` | Giỏ hàng = TMĐT |
| `PUT /api/cart/items/{id}` | Giỏ hàng = TMĐT |
| `DELETE /api/cart/items/{id}` | Giỏ hàng = TMĐT |
| `DELETE /api/cart` | Giỏ hàng = TMĐT |
| `POST /api/payments/vnpay` | Thanh toán consumer |
| `GET /api/payments/vnpay/callback` | Thanh toán consumer |
| `POST /api/payments/momo` | Thanh toán consumer |
| `POST /api/payments/momo/callback` | Thanh toán consumer |
| `POST /api/payments/wallet` | Thanh toán consumer |
| `POST /api/payments/{orderId}/refund` | Hoàn tiền consumer |
| `GET /api/wallet` | Ví điện tử = B2C |
| `POST /api/wallet/topup` | Nạp tiền = B2C |
| `GET /api/wallet/transactions` | Lịch sử ví = B2C |
| `POST /api/vouchers/validate` | Voucher = TMĐT |

### 5.4 Thêm mới — Phase 1

| Endpoint | Mục đích |
|----------|----------|
| `GET/POST /api/supplier/batches` | Quản lý lô hàng (đã có entity) |
| `GET /api/supplier/batches/{id}` | Chi tiết lô hàng + chứng nhận |
| `GET /api/batches/{id}/qr` | Lấy mã QR truy xuất nguồn gốc |
| `GET /api/traceability/{qrCode}` | Public — quét QR xem nguồn gốc |
| `POST /api/supply-requests/{id}/receive` | Điểm phân phối xác nhận nhận hàng |
| `GET /api/notifications/expiry-warnings` | Cảnh báo lô hàng sắp hết hạn |

### 5.5 Thêm mới — Phase 2 (tích hợp sau)

| Endpoint | Mục đích | Điểm hook |
|----------|----------|-----------|
| `GET /api/invoices` | Danh sách hóa đơn/công nợ (filter theo status, supplier, period) | Sau khi có Invoice entity |
| `GET /api/invoices/{id}` | Chi tiết hóa đơn | |
| `PUT /api/invoices/{id}/confirm-payment` | NCC/Admin xác nhận đã thanh toán → Invoice.Status = Paid | |
| `GET /api/admin/invoices/summary` | Tổng hợp công nợ theo kỳ, theo NCC | |
| `GET /api/admin/supplier-evaluations` | Báo cáo KPI nhà cung cấp | Tính từ SupplyRequest + Shipment data |
| `GET /api/admin/supply-reports` | Thống kê cung ứng theo khu vực/thời gian | Tổng hợp từ data Phase 1 |

---

## 6. TÍNH NĂNG ĐÃ CÓ — PHÙ HỢP SCOPE CHUỖI CUNG ỨNG

Các entity/tính năng sau đã được xây dựng đúng hướng quản lý nguồn cung:

| Tính năng | Entity | Mô tả |
|-----------|--------|-------|
| Quản lý lô hàng | `Batch` | Mã lô, ngày thu hoạch, ngày SX, hạn sử dụng, vùng trồng |
| Chứng nhận ATTP | `Batch.CertificateType` | VietGAP, GlobalGAP, Organic |
| Truy xuất QR | `QRCode` | Mã QR gắn với lô hàng, đếm lượt quét |
| Quản lý NCC | `SupplierProfile` | Hồ sơ doanh nghiệp, mã số thuế, giấy phép, chứng nhận ATTP |
| Phê duyệt NCC | Admin UC09 | Quy trình duyệt/từ chối NCC |
| Quản lý tồn kho | `Inventory` | Số lượng tồn, số lượng đã đặt |
| Lịch sử giá | `PriceHistory` | Theo dõi biến động giá cung ứng |
| Vùng phân phối | `DeliveryZone`, `District` | Phân vùng theo quận/huyện Đà Nẵng |
| Cảnh báo hết hạn | `BatchStatus.Warning` | Đã có trạng thái cảnh báo |
| Đóng gói tiêu chuẩn | `Product.PackagingStandard` | Quy cách đóng gói thực phẩm |

---

## 7. TỔNG KẾT THAY ĐỔI

### Phase 1 — Core Supply Chain

| Hạng mục | Số lượng |
|----------|----------|
| Entity giữ nguyên | 11 |
| Entity đổi tên/cấu trúc | 11 |
| Entity xóa | 7 (Cart, CartItem, Payment, Wallet, WalletTransaction, Voucher, VoucherUsage, Review) |
| Entity thêm mới | 1 (DistributionPointProfile) |
| API giữ nguyên | ~22 |
| API đổi tên/cấu trúc | ~15 |
| API xóa | ~15 |
| API thêm mới | ~6 |
| UC giữ nguyên | 8 |
| UC đổi tên/context | 7 |
| UC xóa | 3 (UC11 Voucher, UC21 Cart, UC23 Payment) |
| UC thêm mới | 4 (UC11* Policy, UC14* Batch, UC23* Receive, UC31* QR Traceability) |

### Phase 2 — Mở rộng (tích hợp sau, không ảnh hưởng kiến trúc Phase 1)

| Hạng mục | Số lượng |
|----------|----------|
| Entity thêm mới | 3 (Invoice, SupplierEvaluation, StockTransfer) |
| API thêm mới | ~6 (invoices, supplier-evaluations, supply-reports) |
| UC thêm mới | 3 (UC32* Expiry Warning, UC33* Supplier KPI, UC34* Invoice/Công nợ) |

### Nguyên tắc tách Phase

1. **Phase 1 không phụ thuộc Phase 2** — chuỗi cung ứng hoạt động đầy đủ mà không cần Invoice/KPI
2. **Phase 2 chỉ hook vào Phase 1** — Invoice tạo sau `SupplyRequest.Received`, KPI tính từ data đã có
3. **Không cần sửa schema Phase 1** khi thêm Phase 2 — chỉ thêm entity mới + FK vào entity cũ
