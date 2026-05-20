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
| Ngày cập nhật gần nhất | 20/5/2026 |
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
