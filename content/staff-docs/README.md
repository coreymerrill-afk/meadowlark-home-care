# Staff documents (authenticated)

These PDFs are **not** in `public/`. Vercel serves `public/` as static files and that can bypass the `/staff` login gate.

Place the binaries here, then they are served only by auth-checked route handlers:

| Route | File |
| --- | --- |
| `/staff/docs/handbook` | `employee-handbook.pdf` |
| `/staff/docs/hipaa` | `hipaa-confidentiality-agreement.pdf` |
| `/staff/docs/axiscare-guide` | `axiscare-mobile-caregiver-guide.pdf` |
| `/staff/docs/axiscare-tip-sheet` | `axiscare-tip-sheet.pdf` |

Do not use Google Drive “anyone with the link.” If a file is missing, the route returns 503 until the PDF is committed.
