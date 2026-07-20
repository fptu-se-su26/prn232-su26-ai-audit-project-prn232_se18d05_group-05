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
| Ngày cập nhật gần nhất | 20/7/2026 |
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
| 8 | 2026-07-20 | Claude | Fix Guid/int mismatch, refactor ClaimsPrincipalExtensions, tạo lại migration | Có |

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


## Prompt 5 – Tạo domain entities và EF configuration

**Mục đích:** Implement toàn bộ domain model từ SQL schema và cấu hình EF Core

**Prompt (tóm tắt):** Yêu cầu Claude đọc SQL schema 33 bảng, tạo entity class với `EntityBase`, `ISoftDeletable`, navigation properties hợp lý. Sau đó tạo EF configuration kế thừa `BaseEntityConfiguration` / `SoftDeleteEntityConfiguration`, cập nhật `ApplicationDbContext`, chạy migration và `database update`.

**Kết quả áp dụng:** Có. Build 0 lỗi, migration apply thành công lên remote DB.

---

## Prompt 8 – Fix Guid/int mismatch và refactor auth

**Mục đích:** Đồng nhất kiểu Guid, fix `InvalidCastException`, chuẩn hoá extension đọc claim

**Prompt (tóm tắt):** Sau khi pull main về phát hiện lỗi `System.InvalidCastException: Unable to cast System.Int32 to System.Guid` khi tạo tài khoản. Yêu cầu Claude tìm nguyên nhân — do `UserCredentials.Id` và `GetUserId()` vẫn dùng `int` trong khi entity `User : EntityBase<Guid>`. Yêu cầu đổi toàn bộ về Guid, xoá migration cũ, tạo lại `InitialCreate`. Sau đó refactor `ClaimsPrincipalExtensions` theo pattern WMS-API: đọc claim `JwtRegisteredClaimNames.Sub`, dùng `Guid.TryParse` thay vì `Guid.Parse`.

**Kết quả áp dụng:** Có. Build 0 lỗi, migration mới tạo thành công.