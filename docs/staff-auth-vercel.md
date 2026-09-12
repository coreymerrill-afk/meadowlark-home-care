# Staff auth on Vercel (`meadowlark-home-care`)

Do not commit real secrets. Do not regenerate `AUTH_SECRET`.

Google click-path and exact redirect URIs: [STAFF_AUTH_SETUP.md](../STAFF_AUTH_SETUP.md).

## Already set

| Variable | Scope | Notes |
| --- | --- | --- |
| `AUTH_SECRET` | Production + Preview | Leave as-is. |
| `AUTH_URL` | Production (`https://www.meadowlarkhomecare.com`); Preview being set to the same | Pins Google + magic-link origin to www. |
| `RESEND_API_KEY` | Production + Preview | Contact/apply. Staff email falls back to this. |
| `CONTACT_FROM_EMAIL` | Production + Preview | From address for staff + public forms. |
| `CONTACT_TO_EMAIL` | Production + Preview | Request-access inbox (default `hr@`). |
| `NEXT_PUBLIC_SITE_URL` | Production | `https://www.meadowlarkhomecare.com` |

## Resend: no extra key required

`getResendApiKey()` in `src/lib/auth-env.ts` reads `AUTH_RESEND_KEY` first, then `RESEND_API_KEY`. With `RESEND_API_KEY` already on the project, magic-link and request-access are wired.

Optional later: copy the same value to `AUTH_RESEND_KEY`. Not required.

## Leftover (Corey only)

- `AUTH_GOOGLE_ID`
- `AUTH_GOOGLE_SECRET`

Production redirect URI:

```
https://www.meadowlarkhomecare.com/api/auth/callback/google
```

Local: `http://localhost:3000/api/auth/callback/google`. Skip Vercel preview URIs while `AUTH_URL` is the www production origin (Google does not allow `*.vercel.app` wildcards).
