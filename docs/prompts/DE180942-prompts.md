# Prompt Log

## 1. Thông tin chung

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
| Ngày bắt đầu | 2026-05-11 |
| Ngày cập nhật gần nhất | 20/5/2026 |
| Công cụ AI | Claude (Claude Code CLI) |

---

## 2. Công cụ AI đã sử dụng

- [x] Claude

---

## 3. Bảng tổng hợp

| STT | Ngày | Công cụ | Mục đích | Có áp dụng? |
|---:|---|---|---|---|
| 1 | 2026-05-20 | Claude | Cấu hình frontend với Tailwind, Vite, PWA | Có |
| 2 | 2026-05-20 | Claude | Thêm middleware xác thực và phân quyền | Có |

## 4. Prompt chi tiết

### Prompt 1 – Cấu hình frontend

**Mục đích:** Thiết lập frontend để dùng Tailwind, cấu hình Vite và PWA

**Prompt (tóm tắt):** Yêu cầu Claude kiểm tra frontend đã có Tailwind chưa, cấu hình lại theo PostCSS, cập nhật `vite.config.js` với alias, port, proxy và PWA cho dự án Food Link.

**Kết quả áp dụng:** Có. Đã kiểm tra lại bằng `npm run build`.

### Prompt 2 – Middleware auth

**Mục đích:** Thêm middleware xác thực, phân quyền và các route bảo vệ cơ bản

**Prompt (tóm tắt):** Yêu cầu Claude thêm `authUtils`, `AuthMiddleware`, `AuthGuard`, `ProtectedRoute`, tạo các trang lỗi và nối router cơ bản cho `login`, `dashboard`, `admin`.

**Kết quả áp dụng:** Có. Đã kiểm tra lại bằng `npm run lint` và `npm run build`.
