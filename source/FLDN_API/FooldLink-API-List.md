# FOODLINK – DANH SÁCH API ĐẦY ĐỦ
# 19 Use Case | ~45 API Endpoints
# Base URL: /api

================================================================
 AUTH & ACCOUNT — UC01, UC03, UC04, UC07
================================================================

UC01 – Đăng ký
──────────────────────────────────────────────────────────────
POST   /api/auth/register
  Body: { fullName, email, phone, password, confirmPassword }
  Res:  { userId, message: "Đăng ký thành công" }

UC03 – Đăng nhập
──────────────────────────────────────────────────────────────
POST   /api/auth/login
  Body: { email, password }
  Res:  { accessToken, refreshToken, user: { userId, fullName, role } }

POST   /api/auth/refresh-token
  Body: { refreshToken }
  Res:  { accessToken, refreshToken }

UC04 – Đăng xuất
──────────────────────────────────────────────────────────────
POST   /api/auth/logout
  Header: Authorization: Bearer <token>
  Body:  { refreshToken }
  Res:   { message: "Đăng xuất thành công" }

UC07 – Đổi mật khẩu
──────────────────────────────────────────────────────────────
PUT    /api/auth/change-password
  Header: Authorization: Bearer <token>
  Body:  { currentPassword, newPassword, confirmNewPassword }
  Res:   { message: "Đổi mật khẩu thành công" }


================================================================
 ADMIN — UC08, UC09, UC10, UC11
================================================================

UC08 – Quản lý tài khoản
──────────────────────────────────────────────────────────────
GET    /api/admin/users
  Query: ?role=&isActive=&page=&pageSize=
  Res:  [ { userId, fullName, email, phone, role, isActive, createdAt } ]

GET    /api/admin/users/{id}
  Res:  { userId, fullName, email, phone, role, isActive, createdAt }

PUT    /api/admin/users/{id}/lock
  Res:  { message: "Đã khóa tài khoản" }

PUT    /api/admin/users/{id}/unlock
  Res:  { message: "Đã mở khóa tài khoản" }

POST   /api/admin/users/{id}/reset-password
  Body: { newPassword }
  Res:  { message: "Đã reset mật khẩu" }

UC09 – Phê duyệt nhà cung cấp
──────────────────────────────────────────────────────────────
GET    /api/admin/suppliers
  Query: ?status=Pending|Approved|Rejected&page=&pageSize=
  Res:  [ { supplierId, businessName, status, createdAt } ]

GET    /api/admin/suppliers/{id}
  Res:  { supplierId, businessName, taxCode, licenseNumber,
          attpCertificateUrl, status, serviceFeeRate, discountRate }

PUT    /api/admin/suppliers/{id}/approve
  Res:  { message: "Đã phê duyệt nhà cung cấp" }

PUT    /api/admin/suppliers/{id}/reject
  Body: { reason }
  Res:  { message: "Đã từ chối hồ sơ" }

PUT    /api/admin/suppliers/{id}/fee
  Body: { serviceFeeRate, discountRate }
  Res:  { message: "Đã cập nhật biểu phí" }

UC10 – Quản lý danh mục thực phẩm
──────────────────────────────────────────────────────────────
GET    /api/admin/categories
  Res:  [ { categoryId, name, parentCategoryId, isActive, children: [] } ]

POST   /api/admin/categories
  Body: { name, description, imageUrl, parentCategoryId }
  Res:  { categoryId, name }

PUT    /api/admin/categories/{id}
  Body: { name, description, imageUrl, isActive }
  Res:  { message: "Đã cập nhật danh mục" }

DELETE /api/admin/categories/{id}
  Res:  { message: "Đã ẩn danh mục" }

UC11 – Quản lý Voucher (đơn giản hóa – chỉ Fixed Amount)
──────────────────────────────────────────────────────────────
GET    /api/admin/vouchers
  Query: ?isActive=&page=&pageSize=
  Res:  [ { voucherId, code, voucherName, discountValue,
            minOrderValue, usageLimit, usedCount, startDate, endDate, isActive } ]

POST   /api/admin/vouchers
  Body: { code, voucherName, discountType, discountValue,
          minOrderValue, maxDiscount, usageLimit, startDate, endDate }
  Res:  { voucherId, code }

PUT    /api/admin/vouchers/{id}
  Body: { voucherName, discountValue, minOrderValue,
          usageLimit, startDate, endDate }
  Res:  { message: "Đã cập nhật voucher" }

PUT    /api/admin/vouchers/{id}/toggle
  Res:  { isActive: true|false }


================================================================
 SUPPLIER — UC12, UC13, UC17
================================================================

UC12 – Quản lý sản phẩm
──────────────────────────────────────────────────────────────
GET    /api/supplier/products
  Query: ?categoryId=&isActive=&page=&pageSize=
  Res:  [ { productId, name, retailPrice, wholesalePrice,
            unit, isActive, categoryName } ]

GET    /api/supplier/products/{id}
  Res:  { productId, name, description, retailPrice, wholesalePrice,
          unit, packagingStandard, isActive, images: [], category }

POST   /api/supplier/products
  Body (form-data): { name, description, categoryId, wholesalePrice,
                      retailPrice, unit, packagingStandard, images[] }
  Res:  { productId, name }

PUT    /api/supplier/products/{id}
  Body: { name, description, wholesalePrice, retailPrice,
          unit, packagingStandard, isActive }
  Res:  { message: "Đã cập nhật sản phẩm" }

DELETE /api/supplier/products/{id}
  Res:  { message: "Đã ẩn sản phẩm" }

POST   /api/supplier/products/{id}/images
  Body (form-data): { images[], isMain }
  Res:  [ { imageId, imageUrl, isMain } ]

POST   /api/supplier/products/{id}/price
  Body: { wholesalePrice, retailPrice, effectiveDate }
  Res:  { message: "Đã cập nhật giá" }

UC13 – Quản lý tồn kho
──────────────────────────────────────────────────────────────
GET    /api/supplier/inventory
  Query: ?page=&pageSize=
  Res:  [ { productId, productName, quantity, reservedQty, updatedAt } ]

PUT    /api/supplier/inventory/{productId}
  Body: { quantity }
  Res:  { productId, quantity, updatedAt }

UC17 – Xác nhận đơn hàng
──────────────────────────────────────────────────────────────
GET    /api/supplier/orders
  Query: ?status=Pending|Accepted|Rejected&page=&pageSize=
  Res:  [ { orderId, customerName, totalAmount,
            status, createdAt, items: [] } ]

GET    /api/supplier/orders/{orderId}
  Res:  { orderId, customerName, address, items: [],
          totalAmount, status, createdAt }

PUT    /api/supplier/orders/{orderId}/confirm
  Res:  { message: "Đã xác nhận đơn hàng" }

PUT    /api/supplier/orders/{orderId}/reject
  Body: { reason }
  Res:  { message: "Đã từ chối đơn hàng" }


================================================================
 CUSTOMER — UC18, UC19, UC20, UC21, UC22, UC23, UC24
================================================================

UC18 – Tìm kiếm sản phẩm
──────────────────────────────────────────────────────────────
GET    /api/products/search
  Query: ?keyword=&districtId=&season=
  Res:  [ { productId, name, retailPrice, unit,
            supplierName, mainImage, categoryName } ]

UC19 – Lọc sản phẩm
──────────────────────────────────────────────────────────────
GET    /api/products
  Query: ?categoryId=&supplierId=&minPrice=&maxPrice=
         &sort=price_asc|price_desc|newest
         &page=&pageSize=
  Res:  [ { productId, name, retailPrice, unit,
            supplierName, mainImage, categoryName } ]

UC20 – Xem chi tiết sản phẩm
──────────────────────────────────────────────────────────────
GET    /api/products/{id}
  Res:  { productId, name, description, retailPrice, wholesalePrice,
          unit, packagingStandard, images: [],
          supplier: { supplierId, businessName },
          category: { categoryId, name },
          inventory: { quantity },
          averageRating, totalReviews }

UC21 – Quản lý giỏ hàng
──────────────────────────────────────────────────────────────
GET    /api/cart
  Res:  { cartId, items: [ { cartItemId, productId, productName,
          supplierId, supplierName, quantity, unitPrice, subTotal,
          mainImage } ], totalAmount }

POST   /api/cart/items
  Body: { productId, supplierId, quantity }
  Res:  { cartItemId, productId, quantity, unitPrice }

PUT    /api/cart/items/{cartItemId}
  Body: { quantity }
  Res:  { cartItemId, quantity, unitPrice, subTotal }

DELETE /api/cart/items/{cartItemId}
  Res:  { message: "Đã xóa sản phẩm khỏi giỏ" }

DELETE /api/cart
  Res:  { message: "Đã xóa toàn bộ giỏ hàng" }

UC22 – Đặt hàng
──────────────────────────────────────────────────────────────
POST   /api/orders
  Body: { addressId, deliveryType, scheduledTime,
          voucherCode, note,
          items: [ { cartItemId } ] }
  Res:  { orderId, finalAmount, status }

DELETE /api/orders/{id}/cancel
  Body: { cancelReason }
  Res:  { message: "Đã hủy đơn hàng" }

UC23 – Thanh toán
──────────────────────────────────────────────────────────────
POST   /api/payments/vnpay
  Body: { orderId }
  Res:  { paymentUrl }          ← redirect sang cổng VNPAY

GET    /api/payments/vnpay/callback
  Query: (tham số VNPAY trả về)
  Res:  redirect về app + cập nhật Payment.Status

POST   /api/payments/momo
  Body: { orderId }
  Res:  { paymentUrl }          ← redirect sang cổng MOMO

POST   /api/payments/momo/callback
  Body: (tham số MOMO trả về)
  Res:  { message } + cập nhật Payment.Status

POST   /api/payments/wallet
  Body: { orderId }
  Res:  { message: "Thanh toán thành công", remainingBalance }

POST   /api/payments/{orderId}/refund
  Body: { reason }
  Res:  { message: "Đã hoàn tiền" }

GET    /api/wallet
  Res:  { walletId, balance, points }

POST   /api/wallet/topup
  Body: { amount }
  Res:  { balance }

GET    /api/wallet/transactions
  Query: ?page=&pageSize=
  Res:  [ { transactionId, type, amount,
            balanceBefore, balanceAfter, description, createdAt } ]

UC24 – Theo dõi đơn hàng
──────────────────────────────────────────────────────────────
GET    /api/orders
  Query: ?status=&page=&pageSize=
  Res:  [ { orderId, status, finalAmount,
            createdAt, itemCount } ]

GET    /api/orders/{id}
  Res:  { orderId, status, finalAmount, shippingFee, discountAmount,
          address, deliveryType, scheduledTime, note,
          items: [ { productName, quantity, unitPrice, subTotal } ],
          payment: { method, status, paidAt },
          delivery: { shipperName, shipperPhone, status } }

GET    /api/orders/{id}/history
  Res:  [ { status, note, createdAt, createdBy } ]


================================================================
 SHIPPER — UC26, UC27, UC29, UC30
================================================================

UC26 – Xem đơn được giao
──────────────────────────────────────────────────────────────
GET    /api/shipper/deliveries
  Query: ?status=&page=&pageSize=
  Res:  [ { deliveryId, orderId, customerName, customerPhone,
            address, status, shippingFee, assignedAt } ]

GET    /api/shipper/deliveries/{id}
  Res:  { deliveryId, orderId,
          customer: { name, phone },
          address: { fullAddress, lat, lng },
          items: [ { productName, quantity } ],
          status, shippingFee, shipperEarning,
          estimatedDistance, note }

UC27 – Nhận đơn hàng
──────────────────────────────────────────────────────────────
PUT    /api/shipper/deliveries/{id}/accept
  Res:  { message: "Đã nhận đơn", deliveryId, status: "Assigned" }

UC29 – Cập nhật trạng thái giao hàng
──────────────────────────────────────────────────────────────
PUT    /api/shipper/deliveries/{id}/status
  Body: { status, note }
        status: PickedUp | Delivering | Failed
  Res:  { deliveryId, status, updatedAt }

PUT    /api/shipper/status
  Body: { status }
        status: Available | Off
  Res:  { shipperId, status }

PUT    /api/shipper/location
  Body: { latitude, longitude }
  Res:  { message: "Đã cập nhật vị trí" }

UC30 – Xác nhận giao hàng bằng ảnh
──────────────────────────────────────────────────────────────
PUT    /api/shipper/deliveries/{id}/complete
  Body (form-data): { confirmImage }
  Res:  { deliveryId, status: "Delivered",
          confirmImageUrl, deliveredAt }


================================================================
 DÙNG CHUNG – TẤT CẢ ROLE
================================================================

GET    /api/categories
  Res:  [ { categoryId, name, children: [] } ]

GET    /api/districts
  Res:  [ { districtId, name, code } ]

GET    /api/addresses
  Res:  [ { addressId, receiverName, receiverPhone,
            fullAddress, districtName, isDefault } ]

POST   /api/addresses
  Body: { receiverName, receiverPhone, fullAddress,
          districtId, latitude, longitude, isDefault }
  Res:  { addressId }

PUT    /api/addresses/{id}
  Body: { receiverName, receiverPhone, fullAddress,
          districtId, isDefault }
  Res:  { message: "Đã cập nhật địa chỉ" }

DELETE /api/addresses/{id}
  Res:  { message: "Đã xóa địa chỉ" }

GET    /api/profile
  Res:  { userId, fullName, email, phone, avatarUrl }

PUT    /api/profile
  Body (form-data): { fullName, phone, avatar }
  Res:  { userId, fullName, phone, avatarUrl }

POST   /api/vouchers/validate
  Body: { voucherCode, orderAmount }
  Res:  { voucherId, discountAmount, finalAmount }


================================================================
 TỔNG KẾT
================================================================

Nhóm           UC   API
─────────────────────────────
Auth            4    4
Admin           4    17
Supplier        3    11
Customer        7    20
Shipper         4    7
Dùng chung      -    9
─────────────────────────────
TỔNG           19   ~48 API