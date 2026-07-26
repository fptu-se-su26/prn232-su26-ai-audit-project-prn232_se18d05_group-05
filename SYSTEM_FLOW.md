# System Flow — FoodLink

## Tổng quan

FoodLink là hệ thống quản lý chuỗi cung ứng thực phẩm gồm 4 role người dùng.

---

## Roles

| Role | Mô tả |
|------|-------|
| `Admin` | Quản trị viên hệ thống |
| `Supplier` | Nhà cung cấp thực phẩm |
| `DistributionPoint` | Điểm phân phối / nhà hàng / cửa hàng |
| `LogisticsOperator` | Tài xế / vận hành giao vận |

---

## Luồng chính

### 1. Đăng nhập & Phân quyền

```
User → /auth/login
         │
         ├─ role = Admin            → /admin/users
         ├─ role = LogisticsOperator → /logistics (pending shipments)
         └─ role = Supplier / DistributionPoint → /dashboard
```

Auth pages (public): `/auth/login`, `/auth/register`, `/auth/verify-email`, `/auth/forgot-password`, `/auth/reset-password`

Tất cả route private đều qua `ProtectedRoute` — chưa đăng nhập redirect về login, sai role redirect về `/unauthorized`.

---

### 2. Luồng đặt hàng (Supply Request)

```
DistributionPoint                Supplier                  LogisticsOperator
     │
     ├─ Tìm sản phẩm (/products)
     ├─ Tạo đơn (/orders/create)
     │        │
     │        └──────────────────► Nhận yêu cầu (/supplier/supply-requests)
     │                                   │
     │                             Xác nhận / Từ chối
     │                                   │
     │◄── Cập nhật trạng thái ──────────┘
     │                                   │
     │                             Tạo lô hàng để giao
     │                                   │
     │                                   └──────────────► Nhận shipment (/logistics)
     │                                                          │
     │                                                    Xác nhận lấy hàng
     │                                                    (/logistics/{id}/confirm)
     │                                                          │
     │                                                    Giao hàng → POD
     │                                                    (/logistics/{id}/pod)
     │                                                          │
     │◄── Trạng thái: InTransit → Completed ───────────────────┘
     │
     ├─ Xác nhận nhận hàng (/orders → UC23)
     │     └─ Báo cáo: nhận đủ / thiếu / hỏng
     └─ Xem lịch sử đơn (/orders → UC24 timeline)
```

---

### 3. Quản lý sản phẩm & QR (Supplier)

```
Supplier
  ├─ Khai báo sản phẩm (/supplier/products)
  ├─ Tạo lô hàng (batch) + sinh QR code
  ├─ In nhãn QR
  ├─ Cập nhật tồn kho
  └─ Xem cảnh báo hết hạn
```

---

### 4. Quản trị hệ thống (Admin)

```
Admin
  ├─ Quản lý users (/admin/users)
  ├─ Quản lý nhà cung cấp (/admin/suppliers)
  ├─ Quản lý danh mục sản phẩm (/admin/categories)
  ├─ Quản lý đơn vị logistics (/admin/logistics)
  ├─ Quản lý vùng giao hàng (/admin/zones)
  └─ Xem / tạo đơn hàng (/orders, /orders/create)
```

---

## Routes theo Role

### Admin (9 routes)
| Route | Chức năng |
|-------|-----------|
| `/admin` | Dashboard tổng quan |
| `/admin/users` | CRUD người dùng |
| `/admin/suppliers` | CRUD nhà cung cấp |
| `/admin/categories` | CRUD danh mục |
| `/admin/logistics` | CRUD đơn vị logistics |
| `/admin/zones` | CRUD vùng giao hàng |
| `/products` | Tìm kiếm sản phẩm |
| `/orders` | Xem đơn hàng |
| `/orders/create` | Tạo đơn hàng |

### Supplier (4 routes)
| Route | Chức năng |
|-------|-----------|
| `/dashboard` | Dashboard nhà cung cấp |
| `/supplier/products` | Quản lý sản phẩm & lô hàng |
| `/supplier/supply-requests` | Xử lý yêu cầu đặt hàng |
| `/supplier/analytics` | Báo cáo KPI |

### DistributionPoint (4 routes)
| Route | Chức năng |
|-------|-----------|
| `/dashboard` | Dashboard điểm phân phối |
| `/products` | Tìm kiếm sản phẩm |
| `/orders/create` | Tạo yêu cầu đặt hàng |
| `/orders` | Theo dõi & xác nhận nhận hàng |

### LogisticsOperator (6 routes)
| Route | Chức năng |
|-------|-----------|
| `/dashboard` | Dashboard logistics |
| `/logistics` | Danh sách shipment chờ nhận |
| `/logistics/my-shipments` | Shipment đang vận chuyển |
| `/logistics/{id}/confirm` | Xác nhận lấy hàng |
| `/logistics/{id}/pod` | Xác nhận giao hàng (POD) |
| `/orders` | Xem đơn hàng liên quan |

---

## Trạng thái đơn hàng (Supply Request)

```
Pending → Approved → InTransit → Completed
        ↘ Rejected
```

| Trạng thái | Ai thay đổi |
|-----------|-------------|
| `Pending` | DistributionPoint tạo đơn |
| `Approved` | Supplier xác nhận |
| `Rejected` | Supplier từ chối |
| `InTransit` | LogisticsOperator nhận hàng |
| `Completed` | LogisticsOperator giao xong (POD) |
