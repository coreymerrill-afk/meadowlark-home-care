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

## On-hire / AxisCare forms

The four employment routes are scaffolded. AxisCare form PDFs were **not** scraped in this environment (no AxisCare credentials). To publish:

1. Export the PDF from AxisCare (or HR’s packet).
2. Name it exactly as in the table.
3. Commit it here. Empty files are treated as missing (503).

Suggested next exports if Meadowlark uses them: I-9, W-4, direct deposit, emergency contact. Add more slugs in `src/lib/staff-docs.ts` the same way.

Handbook and HIPAA are already committed and linked from the employment-forms page.

Do not use Google Drive “anyone with the link.”
