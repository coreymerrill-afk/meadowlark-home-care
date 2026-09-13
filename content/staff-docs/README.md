# Staff documents (authenticated)

These PDFs are **not** in `public/`. Vercel serves `public/` as static files and that can bypass the `/staff` login gate.

Place the binaries here, then they are served only by auth-checked route handlers:

| Route | File | Who |
| --- | --- | --- |
| `/staff/docs/handbook` | `employee-handbook.pdf` | Any portal user |
| `/staff/docs/hipaa` | `hipaa-confidentiality-agreement.pdf` | Any portal user |
| `/staff/docs/axiscare-guide` | `axiscare-mobile-caregiver-guide.pdf` | Any portal user |
| `/staff/docs/axiscare-tip-sheet` | `axiscare-tip-sheet.pdf` | Any portal user |
| `/staff/docs/employment-i9` | `employment-i9.pdf` | Admin only |
| `/staff/docs/employment-w4` | `employment-w4.pdf` | Admin only |
| `/staff/docs/employment-direct-deposit` | `employment-direct-deposit.pdf` | Admin only |
| `/staff/docs/employment-emergency-contact` | `employment-emergency-contact.pdf` | Admin only |

Admin hub: `/staff/employment-forms`. Do not roll employment PDFs out to caregivers yet.

## Person packets (Natalie Redman)

Latest signed / AxisCare copies for a person live in a subfolder, not in the shared table above.

| Route | Folder |
| --- | --- |
| `/staff/employment-forms/natalie-redman` | `employment-forms/natalie-redman/` |

Preferred filenames in that folder: `i9.pdf`, `w4.pdf`, `direct-deposit.pdf`, `emergency-contact.pdf`. Any other `.pdf` also appears on her page. Newest matching file wins for a slot. See `employment-forms/natalie-redman/README.md`.

AxisCare exports are pulled separately. Drop the PDFs in when they are ready. Empty files count as missing (503).

## Shared on-hire templates

The four `/staff/docs/employment-*` routes are scaffolded blank office copies. To publish:

1. Export the PDF from AxisCare (or HR’s packet).
2. Name it exactly as in the table.
3. Commit it here. Empty files are treated as missing (503).

Suggested next exports if Meadowlark uses them: I-9, W-4, direct deposit, emergency contact. Add more slugs in `src/lib/staff-docs.ts` the same way.

Handbook and HIPAA are already committed and linked from the employment-forms page.

Do not use Google Drive “anyone with the link.”
