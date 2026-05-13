# SE AI Audit Project Template

## 1. Project Information

| Item | Description |
|---|---|
| Course | PRN232 |
| Class | SE18D05 |
| Semester | SU26 |
| Group | 5 |
| Topic |  |
| Repository |  |

---

## 2. Team Members

| No | Student ID | Full Name              | Email                       | Role   |
|---:|------------|------------------------|-----------------------------|--------|
|  1 | DE180079   | Nguyễn Thị Khánh Dương | DuongNTKDE180079@fpt.edu.vn | Leader |
|  2 | DE180148   | Võ Thành Nhiệm         | NhiemVTDE180148@fpt.edu.vn  | Member |
|  3 | DE180942   | Trần Quang Huy         | HuyTQDE180942@fpt.edu.vn    | Member |
|  4 | DE170043   | Nguyễn Phi Hùng        | hungnpde170043@fpt.edu.vn   | Member |

---

## 3. Project Structure

```text
src/
docs/
.github/
README.md
```

---

## 4. Required AI Audit Documents

Each group must maintain the following documents:

```text
docs/AI_AUDIT_LOG.md
docs/PROMPTS.md
docs/REFLECTION.md
docs/CHANGELOG.md
```

---

## 5. Workflow

Students must follow this workflow:

```text
Issue → Branch → Commit → Pull Request → Review → Merge
```

Direct push to the `main` branch should be avoided.

---

## 6. Branch Naming Convention

```text
feature/studentid-task-name
bugfix/studentid-error-name
docs/studentid-update-audit-log
test/studentid-test-case-name
```

Example:

```text
feature/se123456-login-page
bugfix/se123456-login-validation
docs/se123456-update-ai-audit-log
```

---

## 7. Commit Message Convention

```text
[StudentID] type: short description
```

Examples:

```text
[SE123456] feat: add login page
[SE123456] fix: fix login validation
[SE123456] docs: update AI audit log
[SE123456] test: add login test cases
```

Common types:

```text
feat, fix, docs, test, refactor, style, chore
```

---

## 8. How to Run

### Prerequisites

- [.NET SDK 8.0+](https://dotnet.microsoft.com/download)
- SQL Server (local or remote)
- Visual Studio 2022 / VS Code / Rider

### Steps

**1. Clone repository**

```bash
git clone <repository-url>
cd <project-folder>
```

**2. Configure connection string**

Open `appsettings.json` (or `appsettings.Development.json`) and update:

```json
{
  "ConnectionStrings": {
    "DefaultConnection": "Server=YOUR_SERVER;Database=YOUR_DB;Trusted_Connection=True;TrustServerCertificate=True"
  }
}
```

**3. Apply database migrations**

```bash
dotnet ef database update
```

**4. Restore packages and build**

```bash
dotnet restore
dotnet build
```

**5. Run the API**

```bash
dotnet run --project src/YourProject.API
```

API runs at `https://localhost:7xxx` / `http://localhost:5xxx` by default.  
Swagger UI available at `/swagger`.

---

## 9. AI Usage Rule

Students are allowed to use AI tools such as ChatGPT, Gemini, Claude, GitHub Copilot, Cursor, Antigravity, or similar tools.

However, all important AI usage must be recorded in:

```text
docs/AI_AUDIT_LOG.md
docs/PROMPTS.md
docs/CHANGELOG.md
docs/REFLECTION.md
```

Students must be able to explain, verify, and defend all submitted work.
