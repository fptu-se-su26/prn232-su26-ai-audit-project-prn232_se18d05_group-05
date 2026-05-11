# Prompt Log – DE180942 Trần Quang Huy

| Thông tin | Nội dung |
|---|---|
| Môn học | PRN232 – SE18D05 – SU26 |
| MSSV | DE180942 |
| Công cụ AI | Claude (Claude Code CLI) |

---

## Bảng tổng hợp

| STT | Ngày | Công cụ | Mục đích | Có áp dụng? |
|---:|---|---|---|---|
| 1 | 2026-05-11 | Claude | Cập nhật README (course info, team, how to run) | Có |
| 2 | 2026-05-11 | Claude | Bổ sung .gitignore rules cho file nhạy cảm | Có |
| 3 | 2026-05-11 | Claude | Tư vấn branch naming và commit convention | Có – áp dụng khi tạo branch |

---

## Prompt 1 – Cập nhật README

**Mục đích:** Điền thông tin course, class, group, team members và hướng dẫn How to Run cho .NET API

**Prompt (tóm tắt):** Yêu cầu Claude chỉnh sửa README.md với Course PRN232, Class SE18D05, Group 5, danh sách 3 thành viên kèm email, và viết hướng dẫn chạy dự án .NET API.

**Kết quả áp dụng:** Có. Kiểm tra lại thông tin team member trước khi commit.

---

## Prompt 2 – Bổ sung .gitignore

**Mục đích:** Tránh commit file chứa connection string và config cá nhân lên GitHub

**Prompt (tóm tắt):** Hỏi Claude file nào nên ignore (appsettings, .env, .claude, .obsidian), yêu cầu thêm vào .gitignore.

**Kết quả áp dụng:** Có. Tự kiểm tra lại không bỏ sót file nhạy cảm.

---

## Prompt 3 – Convention branch / commit

**Mục đích:** Hiểu đúng quy tắc đặt tên branch và commit theo chuẩn repo

**Prompt (tóm tắt):** Hỏi Claude về branch naming convention và commit message format theo template có trong README.

**Kết quả áp dụng:** Có. Tạo branch `docs/DE180942-update-readme`, commit `[DE180942] docs: update README info, add gitignore rules`.
