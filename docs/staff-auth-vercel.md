# Staff auth on Vercel (`meadowlark-home-care`)

Do not commit real secrets. Do not regenerate `AUTH_SECRET`.

Google click-path and exact redirect URIs: [STAFF_AUTH_SETUP.md](../STAFF_AUTH_SETUP.md).

Google sign-in is **not** locked to `@meadowlarkhomecare.com`. The app allows the same people as magic-link: admin (`STAFF_ADMIN_EMAILS` or the four default addresses) or the AxisCare caregiver whitelist.

## Already set

| Variable | Scope | Notes |
| --- | --- | --- |
| `AUTH_SECRET` | Production + Preview | Leave as-is. |
| `AUTH_URL` | Production (`https://www.meadowlarkhomecare.com`); Preview being set to the same | Pins Google + magic-link origin to www. |
| `RESEND_API_KEY` | Production + Preview | Contact/apply. Staff email falls back to this. |
| `CONTACT_FROM_EMAIL` | Production + Preview | From address for staff + public forms. |
| `CONTACT_TO_EMAIL` | Production + Preview | Public **contact** inbox. Should be `info@meadowlarkhomecare.com`. Request-access and employment applications go to `hr@`, not this variable. |
| `NEXT_PUBLIC_SITE_URL` | Production | `https://www.meadowlarkhomecare.com` |

## Resend: no extra key required

`getResendApiKey()` in `src/lib/auth-env.ts` reads `AUTH_RESEND_KEY` first, then `RESEND_API_KEY`. With `RESEND_API_KEY` already on the project, magic-link and request-access are wired.

Optional later: copy the same value to `AUTH_RESEND_KEY`. Not required.

## Optional admin list

`STAFF_ADMIN_EMAILS` — comma-separated. If unset, defaults are `cmerrill@meadowlarkhomecare.com`, `corey.merrill@gmail.com`, `nredman@meadowlarkhomecare.com`, and `nredman44@gmail.com`. Setting the env replaces those defaults; include all four. Do not put secrets in this file.

## Password store

`BLOB_READ_WRITE_TOKEN` — not set. Needed only for email/password on Vercel. Local/dev writes hashes to `.data/` without this token. Setup: [STAFF_AUTH_SETUP.md](../STAFF_AUTH_SETUP.md).

## Leftover (Corey only)

- `AUTH_GOOGLE_ID`
- `AUTH_GOOGLE_SECRET`
- `BLOB_READ_WRITE_TOKEN` (password sign-in / set / reset on Vercel)
- Optionally `STAFF_ADMIN_EMAILS` on Production + Preview if you want to set the list explicitly

Production redirect URI:

```
https://www.meadowlarkhomecare.com/api/auth/callback/google
```

Local: `http://localhost:3000/api/auth/callback/google`. Skip Vercel preview URIs while `AUTH_URL` is the www production origin (Google does not allow `*.vercel.app` wildcards).
