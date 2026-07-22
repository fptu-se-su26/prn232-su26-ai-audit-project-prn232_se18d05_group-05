# Prompt Log – DE180942 Trần Quang Huy

| Thông tin | Nội dung |
|---|---|
| Môn học | PRN232 |
| Mã môn học | PRN232 |
| Lớp | SE18D05 |
| Học kỳ | SU26 |
| Tên bài tập / Project | Food Link |
| Tên sinh viên / Nhóm | Trần Quang Huy - Nhóm 5 |
| MSSV / Danh sách MSSV | DE180942 |
| Giảng viên hướng dẫn | Thầy Quang |
| Ngày bắt đầu | 11/5/2026 |
| Ngày cập nhật gần nhất | 22/7/2026 |
| Công cụ AI | Claude (Claude Code CLI), OpenCode (Codex) |

---

## Bảng tổng hợp

| STT | Ngày | Công cụ | Mục đích | Có áp dụng? |
|---:|---|---|---|---|
| 1 | 2026-05-20 | Claude | Cấu hình frontend với Tailwind, Vite, PWA | Có |
| 2 | 2026-05-20 | Claude | Thêm middleware xác thực và phân quyền | Có |
| 3 | 2026-06-06 | Claude | Cấu hình pnpm cho frontend | Có |
| 4 | 2026-06-06 | Claude | Cài TanStack Query và tailwind-merge | Có |
| 5 | 2026-06-08 | Claude | Tạo domain entities, EF config và migration | Có |
| 6 | 2026-06-09 | Claude | Implement login, logout, verify email (UC03–UC04) | Có |
| 7 | 2026-06-09 | Claude | Implement forgot/reset password + refactor auth utils (UC05–UC06) | Có |
| 8 | 2026-06-11 | Claude | Implement admin module UC08–UC11 (17 endpoints) | Có |
| 9 | 2026-06-11 | Claude | Refactor scope: xóa e-commerce entities, rename Order→SupplyRequest, Delivery→Shipment, đồng bộ EntityBase cho toàn bộ entities | Có |
| 10 | 2026-07-22 | Claude | Migrate FE sang Next.js, implement auth guard, login page, Zustand store, ProtectedRoute | Có |
| 11 | 2026-07-22 | Claude | Implement admin module FE: sidebar, header, Users/Suppliers/Categories pages với CRUD actions | Có |

---

## Prompt 1 – Cấu hình frontend

**Mục đích:** Thiết lập frontend để dùng Tailwind, cấu hình Vite và PWA

**Prompt (tóm tắt):** Yêu cầu Claude kiểm tra frontend đã có Tailwind chưa, cấu hình lại theo PostCSS, cập nhật `vite.config.js` với alias, port, proxy và PWA cho dự án Food Link.

**Kết quả áp dụng:** Có. Đã kiểm tra lại bằng `npm run build`.

---

## Prompt 2 – Middleware auth

**Mục đích:** Thêm middleware xác thực, phân quyền và các route bảo vệ cơ bản

**Prompt (tóm tắt):** Yêu cầu Claude thêm `authUtils`, `AuthMiddleware`, `AuthGuard`, `ProtectedRoute`, tạo các trang lỗi và nối router cơ bản cho `login`, `dashboard`, `admin`.

**Kết quả áp dụng:** Có. Đã kiểm tra lại bằng `npm run lint` và `npm run build`.

---

## Prompt 3 – Cấu hình pnpm

**Mục đích:** Chuyển package manager từ npm sang pnpm

**Prompt (tóm tắt):** Yêu cầu Claude config pnpm cho project FE — thêm `packageManager` field, tạo `.npmrc`, xóa `package-lock.json` và cài lại bằng pnpm.

**Kết quả áp dụng:** Có. `pnpm-lock.yaml` được tạo, `package-lock.json` đã xóa.

---

## Prompt 4 – Cài TanStack Query và tailwind-merge

**Mục đích:** Thêm TanStack Query và utility class cho Tailwind vào project

**Prompt (tóm tắt):** Yêu cầu Claude cài `@tanstack/react-query`, `tailwind-merge`, `clsx`, tạo `queryClient.js` và `cn.js`, wrap app với `QueryClientProvider`.

**Kết quả áp dụng:** Có. App chạy bình thường với provider mới.

---

## Prompt 6 – Implement login, logout, verify email

**Mục đích:** Implement UC03 login, UC04 logout, và email verification sau register

**Prompt (tóm tắt):** Yêu cầu Claude implement `POST /api/auth/login` trả AccessToken (stateless JWT) + RefreshToken lưu Redis, `POST /api/auth/logout` revoke token, `GET /api/auth/verify-email` kích hoạt tài khoản. Register đổi `IsActive = false`, gửi verify link qua Quartz background job. Thêm Swagger JWT Bearer config.

**Kết quả áp dụng:** Có. Build 0 lỗi.

---

## Prompt 7 – Implement forgot/reset password và refactor

**Mục đích:** Implement UC05–UC06 và tách AppConstants, EmailTemplates ra riêng

**Prompt (tóm tắt):** Yêu cầu Claude implement `POST /api/auth/forgot-password` sinh reset token Redis 10 phút gửi email background, `POST /api/auth/reset-password` validate token hash password mới. Tách `BuildVerifyEmailBody` ra `Contract/Templates/EmailTemplates.cs`, tạo `AppConstants` lưu BaseUrl và Redis key helpers. Sửa TTL verify email xuống 10 phút.

**Kết quả áp dụng:** Có. Build 0 lỗi.

---


## Prompt 8 – Implement Admin Module UC08–UC11

**Mục đích:** Implement 17 API endpoints quản trị cho admin: quản lý user, duyệt supplier, quản lý category và voucher

**Prompt (tóm tắt):** Yêu cầu Claude implement admin module gồm UC08 (list/lock/unlock/reset password user), UC09 (list/approve/reject supplier, update fee), UC10 (CRUD category dạng tree), UC11 (CRUD voucher, toggle active). Tạo DTOs, validators, mapping config. Refactor cấu trúc project: move service lên Application layer, tách interface sang Abstractions, tạo repository riêng cho từng entity.

**Kết quả áp dụng:** Có. Build 0 lỗi, 0 warnings.

---

## Prompt 5 – Tạo domain entities và EF configuration

**Mục đích:** Implement toàn bộ domain model từ SQL schema và cấu hình EF Core

**Prompt (tóm tắt):** Yêu cầu Claude đọc SQL schema 33 bảng, tạo entity class với `EntityBase`, `ISoftDeletable`, navigation properties hợp lý. Sau đó tạo EF configuration kế thừa `BaseEntityConfiguration` / `SoftDeleteEntityConfiguration`, cập nhật `ApplicationDbContext`, chạy migration và `database update`.

**Kết quả áp dụng:** Có. Build 0 lỗi, migration apply thành công lên remote DB.

---

## Prompt 10 – Migrate FE sang Next.js và implement Auth module

**Mục đích:** Cấu hình lại toàn bộ frontend từ Vite/React sang Next.js App Router, implement auth với Zustand, Axios, shadcn/ui

**Prompt (tóm tắt):** Yêu cầu Claude config FLDN FE giống cấu trúc WMS FE — cài Next.js 16, Zustand, TanStack Query v5, Zod v4, shadcn/ui. Tạo axios client với withCredentials (HttpOnly cookie), auth store không lưu refreshToken, ProtectedRoute hỗ trợ allowedRoles, LoginPage dùng shadcn form + zod schema. Font Be Vietnam Pro cho context B2B logistics.

**Kết quả áp dụng:** Có. Build 0 lỗi, đăng nhập thành công với tài khoản Admin.

---

## Prompt 11 – Implement Admin Module FE

**Mục đích:** Tạo sidebar, header và 3 trang quản trị với bảng dữ liệu và mutation actions

**Prompt (tóm tắt):** Yêu cầu Claude đọc BE source để biết API, tạo admin types/service/hooks (React Query), AppSidebar dùng shadcn Sidebar với nav theo role, AppHeader với logout. UsersTable (lock/unlock), SuppliersTable (approve/reject), CategoriesTable + EditCategoryDialog (chỉnh sửa name, isActive). Layout private bọc SidebarProvider, layout admin bọc role guard Admin-only.

**Kết quả áp dụng:** Có. Build 0 lỗi, 0 warnings.

---

## Prompt 9 – Refactor scope: chuyển từ TMĐT sang quản lý nguồn cung

**Mục đích:** Align codebase với đúng scope hệ thống FoodLink — quản lý nguồn cung thực phẩm TP. Đà Nẵng, không phải bán hàng B2C

**Prompt (tóm tắt):** Yêu cầu Claude xóa toàn bộ e-commerce entities (Cart, Voucher, Wallet, Payment, Review), rename Order→SupplyRequest, Delivery→Shipment, Shipper→LogisticsOperator, DeliveryZone→DistributionZone. Chuẩn hóa tất cả entities kế thừa `EntityBase<Guid>`, configurations dùng `BaseEntityConfiguration`/`SoftDeleteEntityConfiguration`. Thêm `ISoftDeletable` cho master data (DistributionZone, Category, Address). Cập nhật enum values, seed data, DbContext, services liên quan.

**Kết quả áp dụng:** Có. Build 0 lỗi, 0 warnings.
