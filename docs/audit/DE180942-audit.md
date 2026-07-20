# AI Audit Log – DE180942 Trần Quang Huy

| Thông tin | Nội dung |
|---|---|
| Môn học | PRN232 |
| Mã môn học | PRN232 |
| Lớp | SE18D05 |
| Học kỳ | SU26 |
| Tên bài tập / Project | Food Link |
| Tên sinh viên / Nhóm | Trần Quang Huy - Nhóm 5 |
| MSSV | DE180942 |
| Giảng viên hướng dẫn | Thầy Quang |
| Ngày bắt đầu | 11/5/2026 |
| Ngày cập nhật gần nhất | 11/6/2026 |
| Công cụ AI | Claude (Claude Code CLI), OpenCode (Codex) |

---

## Lần 1 – Cập nhật README và .gitignore

| Nội dung | Thông tin |
|---|---|
| Ngày | 2026-05-11 |
| Công cụ AI | Claude |
| Mục đích | Cập nhật thông tin project vào README, bổ sung .gitignore |
| Phần việc | Documentation |
| Mức độ sử dụng | AI hỗ trợ nhiều |

**Việc AI hỗ trợ:**
- Điền thông tin Course, Class, Group, Team Members vào `README.md`
- Viết hướng dẫn "How to Run" cho dự án .NET API
- Bổ sung rule vào `.gitignore`: `appsettings.*.json`, `.env`, `.claude/settings.local.json`, `.obsidian/`
- Tư vấn convention đặt tên branch và commit message

**Phần tự kiểm tra / chỉnh sửa:**
- Xác nhận thông tin team member, email chính xác trước khi điền
- Kiểm tra `.gitignore` không bỏ sót file nhạy cảm
- Quyết định cấu trúc folder `docs/audit/` và `docs/prompts/` tách theo thành viên

**Kết quả áp dụng:** Có – commit vào branch `docs/DE180942-update-readme`

---

## Lần 6 – Định nghĩa Domain Entities và EF Core Configuration

| Nội dung | Thông tin |
|---|---|
| Ngày | 2026-06-08 |
| Công cụ AI | Claude |
| Mục đích | Tạo toàn bộ domain models và cấu hình EF Core, chạy migration |
| Phần việc | Backend – Domain & Infrastructure |
| Mức độ sử dụng | AI hỗ trợ nhiều |

**Việc AI hỗ trợ:**
- Tạo 34 entity class trong `Domain/Entities/` từ SQL schema (User, Product, Order, Delivery, v.v.)
- Tạo 15 enum trong `Domain/Enums/`
- Tạo 31 EF configuration class trong `Infrastructure/Data/Configurations/`
- Cập nhật `ApplicationDbContext` với đầy đủ DbSet
- Fix lỗi cascade delete cycle, shadow FK warnings
- Chạy `dotnet ef migrations add InitialCreate` và `database update` thành công

**Phần tự kiểm tra / chỉnh sửa:**
- Xác nhận SQL schema và quyết định entity nào dùng `ISoftDeletable`
- Kiểm tra build 0 lỗi trước khi migration
- Xác nhận connection string remote database

**Kết quả áp dụng:** Có – migration `InitialCreate` đã apply lên DB, branch `feat/DE180942-define-domain-entities`

---

## Lần 7 – Implement Auth Module UC03–UC06

| Nội dung | Thông tin |
|---|---|
| Ngày | 2026-06-09 |
| Công cụ AI | Claude |
| Mục đích | Implement đầy đủ auth: login, logout, verify email, forgot/reset password |
| Phần việc | Backend – Auth |
| Mức độ sử dụng | AI hỗ trợ nhiều |

**Việc AI hỗ trợ:**
- `POST /api/auth/login` — stateless JWT, RefreshToken lưu Redis + HttpOnly cookie
- `POST /api/auth/logout` — revoke RefreshToken khỏi Redis, xóa cookie
- `GET /api/auth/verify-email` — kích hoạt tài khoản qua link email (TTL 10 phút)
- `POST /api/auth/forgot-password` + `POST /api/auth/reset-password` — token Redis 10 phút, gửi mail qua Quartz background job
- Register cập nhật: `IsActive = false` cho đến khi verify email
- Tạo `AppConstants`, `EmailTemplates`, `SwaggerExtensions` (JWT Bearer)
- Tạo DTOs, validators (FluentValidation) cho tất cả endpoints

**Phần tự kiểm tra / chỉnh sửa:**
- Xác nhận chiến lược lưu token: AccessToken stateless, RefreshToken Redis
- Điều chỉnh TTL verify email từ 24h xuống 10 phút
- Đổi BaseUrl sang localhost để test local

**Kết quả áp dụng:** Có – build 0 lỗi, branch `feat/DE180942-auth-module`

---

## Lần 8 – Implement Admin Module UC08–UC11

| Nội dung | Thông tin |
|---|---|
| Ngày | 2026-06-11 |
| Công cụ AI | Claude |
| Mục đích | Implement 17 API endpoints quản trị: user, supplier, category, voucher |
| Phần việc | Backend – Admin |
| Mức độ sử dụng | AI hỗ trợ nhiều |

**Việc AI hỗ trợ:**
- UC08: CRUD user (list, detail, lock/unlock, reset password) – 5 endpoints
- UC09: Supplier approval (list, detail, approve/reject, update fee) – 5 endpoints
- UC10: Category management (list tree, create, update, soft-delete) – 4 endpoints
- UC11: Voucher management (list, create, update, toggle) – 4 endpoints
- Tạo DTOs, FluentValidation validators, Mapster mapping config
- Refactor cấu trúc: move services từ Infrastructure lên Application, move interfaces sang Application/Abstractions

**Phần tự kiểm tra / chỉnh sửa:**
- Quyết định cấu trúc folder: Services chia Interface/Implementation trong Application
- Xác nhận Category entity không extend EntityBase nên cần custom repository
- Kiểm tra build 0 lỗi 0 warnings

**Kết quả áp dụng:** Có – build 0 lỗi, branch `feat/DE180942-admin-module`

---

## Lần 9 – Refactor scope: chuyển domain từ TMĐT sang quản lý nguồn cung

| Nội dung | Thông tin |
|---|---|
| Ngày | 2026-06-11 |
| Công cụ AI | Claude |
| Mục đích | Align codebase với đúng scope FoodLink — quản lý nguồn cung thực phẩm TP. Đà Nẵng |
| Phần việc | Backend – Domain refactor |
| Mức độ sử dụng | AI hỗ trợ nhiều |

**Việc AI hỗ trợ:**
- Xóa toàn bộ e-commerce entities: Cart, CartItem, Voucher, VoucherUsage, Wallet, WalletTransaction, Payment, Review
- Rename: Order→SupplyRequest, Delivery→Shipment, ShipperProfile→LogisticsProfile, DeliveryZone→DistributionZone
- Chuẩn hóa tất cả entities kế thừa `EntityBase<Guid>`, bỏ custom PK fields
- Update tất cả EF configurations dùng `BaseEntityConfiguration` / `SoftDeleteEntityConfiguration`
- Thêm `ISoftDeletable` cho DistributionZone, Category, Address
- Cập nhật enums, seed data, DbContext, AdminController, CategoryRepository, AdminCategoryService

**Phần tự kiểm tra / chỉnh sửa:**
- Xác nhận scope thực của hệ thống (supply chain, không phải B2C)
- Quyết định entities nào nên có ISoftDeletable
- Kiểm tra build 0 lỗi 0 warnings sau refactor

**Kết quả áp dụng:** Có – build 0 lỗi, 0 warnings, branch `feat/DE180942-admin-module`

---

## Lần 2 – Cấu hình frontend với Tailwind, Vite và PWA

| Nội dung | Thông tin |
|---|---|
| Ngày | 2026-05-20 |
| Công cụ AI | Claude |
| Mục đích | Cấu hình frontend để dùng Tailwind, chỉnh `vite.config.js` và thiết lập PWA |
| Phần việc | Frontend setup |
| Mức độ sử dụng | AI hỗ trợ nhiều |

**Việc AI hỗ trợ:**
- Kiểm tra frontend đã có Tailwind hay chưa
- Cấu hình Tailwind theo hướng PostCSS
- Cập nhật `vite.config.js` với alias, port `3000`, proxy và PWA

**Phần tự kiểm tra / chỉnh sửa:**
- Xác nhận lại package cần cài và file config phù hợp với project
- Chạy `npm run build` để kiểm tra sau khi cấu hình

**Kết quả áp dụng:** Có

---

## Lần 3 – Thêm middleware xác thực và phân quyền

| Nội dung | Thông tin |
|---|---|
| Ngày | 2026-05-20 |
| Công cụ AI | Claude |
| Mục đích | Thêm middleware kiểm tra token, role và route bảo vệ cơ bản |
| Phần việc | Frontend auth |
| Mức độ sử dụng | AI hỗ trợ nhiều |

**Việc AI hỗ trợ:**
- Tạo `authUtils`, `AuthMiddleware`, `AuthGuard`, `ProtectedRoute`
- Thêm các trang lỗi `NotFound`, `Unauthorized`, `ServerError`
- Nối router cơ bản cho `portal`, `login`, `dashboard`, `admin`

**Phần tự kiểm tra / chỉnh sửa:**
- Xác nhận role hiện tại của dự án chỉ gồm `Admin` và `User`
- Chạy `npm run lint` và `npm run build` để kiểm tra

**Kết quả áp dụng:** Có

---

## Lần 4 – Cấu hình pnpm cho frontend

| Nội dung | Thông tin |
|---|---|
| Ngày | 2026-06-06 |
| Công cụ AI | Claude |
| Mục đích | Chuyển project FE sang dùng pnpm thay npm |
| Phần việc | Frontend setup |
| Mức độ sử dụng | AI hỗ trợ nhiều |

**Việc AI hỗ trợ:**
- Thêm field `packageManager` vào `package.json`
- Tạo `.npmrc` với `engine-strict=true`
- Xóa `package-lock.json`, chạy `pnpm install` tạo `pnpm-lock.yaml`

**Phần tự kiểm tra / chỉnh sửa:**
- Xác nhận pnpm đã cài trên máy
- Kiểm tra `pnpm-lock.yaml` được tạo đúng

**Kết quả áp dụng:** Có

---

## Lần 5 – Cài và cấu hình TanStack Query, tailwind-merge

| Nội dung | Thông tin |
|---|---|
| Ngày | 2026-06-06 |
| Công cụ AI | Claude |
| Mục đích | Thêm TanStack Query và tiện ích tailwind-merge vào project |
| Phần việc | Frontend setup |
| Mức độ sử dụng | AI hỗ trợ nhiều |

**Việc AI hỗ trợ:**
- Cài `@tanstack/react-query`, `@tanstack/react-query-devtools`, `tailwind-merge`, `clsx`
- Tạo `src/config/queryClient.js` với config mặc định
- Tạo `src/utils/cn.js` là helper `cn()` kết hợp clsx và tailwind-merge
- Wrap `main.jsx` với `QueryClientProvider` và `ReactQueryDevtools`

**Phần tự kiểm tra / chỉnh sửa:**
- Xác nhận cấu trúc folder phù hợp để đặt file
- Kiểm tra app chạy không lỗi sau khi thêm provider

**Kết quả áp dụng:** Có
---

## Lần 10 – Refactor ClaimsPrincipalExtensions, đồng nhất Guid, fix migration

| Nội dung | Thông tin |
|---|---|
| Ngày | 2026-07-20 |
| Công cụ AI | Claude |
| Mục đích | Fix lỗi `InvalidCastException` do mismatch Guid/int, tạo lại migration, chuẩn hoá extension đọc claim từ JWT |
| Phần việc | Backend – Infrastructure & Auth |
| Mức độ sử dụng | AI hỗ trợ nhiều |

**Việc AI hỗ trợ:**
- Fix merge conflict sau `git pull main` — giữ `ShipperController` version service-layer
- Xoá `ShipperSeedController` cũ không tương thích schema mới
- Sửa `UserCredentials.Id` và `GetUserId()` từ `int` sang `Guid`
- Xoá migration cũ, tạo lại `InitialCreate` với toàn bộ Guid PK
- Refactor `ClaimsPrincipalExtensions.GetUserId()` đọc `Sub`/`NameIdentifier` bằng `Guid.TryParse` theo pattern WMS-API

**Phần tự kiểm tra / chỉnh sửa:**
- Quyết định đồng nhất Guid thay vì giữ int (DB remote sẽ tạo lại)
- Xác nhận xoá migration cũ là an toàn
- Quyết định giữ `MigrateAsync()` comment — chạy migration thủ công

**Kết quả áp dụng:** Có – build 0 lỗi, migration mới tạo thành công
