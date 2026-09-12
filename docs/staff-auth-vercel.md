# Staff auth on Vercel (`meadowlark-home-care`)

Do not commit real secrets. Values below are names and public origins only.

## Environment variables

| Variable | Needed | Notes |
| --- | --- | --- |
| `NEXT_PUBLIC_SITE_URL` | Production | `https://www.meadowlarkhomecare.com` |
| `RESEND_API_KEY` | Production + Preview | Contact, apply, magic-link, request-access |
| `CONTACT_FROM_EMAIL` | Production + Preview | Verified Resend sender |
| `CONTACT_TO_EMAIL` | Production + Preview | Defaults to `hr@meadowlarkhomecare.com` |
| `AUTH_SECRET` | Production + Preview | Auth.js sessions + magic-link tokens |
| `AUTH_URL` | Production | `https://www.meadowlarkhomecare.com` |
| `AUTH_GOOGLE_ID` | Runtime Google SSO | Corey creates this in Google Cloud |
| `AUTH_GOOGLE_SECRET` | Runtime Google SSO | Corey creates this in Google Cloud |
| `AUTH_RESEND_KEY` | Optional | App falls back to `RESEND_API_KEY` |
| `STAFF_WHITELIST_EMAILS` | Optional | Extra Active emails on top of `src/data/staff-whitelist.csv` |
| `STAFF_ADMIN_EMAILS` | Optional | Defaults to `cmerrill@meadowlarkhomecare.com` |

Local placeholders live in `.env.example`.

## Already set on Vercel (CLI)

On project `meadowlark-home-care`:

- `NEXT_PUBLIC_SITE_URL` — Production
- `RESEND_API_KEY`, `CONTACT_FROM_EMAIL`, `CONTACT_TO_EMAIL` — Production + Preview
- `AUTH_SECRET` — Production + Preview
- `AUTH_URL=https://www.meadowlarkhomecare.com` — Production

Still missing: `AUTH_GOOGLE_ID` and `AUTH_GOOGLE_SECRET`.

## Corey-only: Google OAuth Web client

1. In [Google Cloud Console](https://console.cloud.google.com/apis/credentials) create an OAuth **Web application** client (Meadowlark Workspace).
2. Authorized redirect URI (required):

   `https://www.meadowlarkhomecare.com/api/auth/callback/google`

3. Preview: Google does not allow `https://*.vercel.app/...` as a wildcard. Add a specific preview host later if needed, e.g. `https://<deployment>.vercel.app/api/auth/callback/google`.
4. Restrict the client to `@meadowlarkhomecare.com` if Cloud offers a hosted-domain / Workspace restriction. The app also rejects non-Workspace Google accounts.

## After Corey has the client id and secret

Pipe values in (do not put them in the repo or shell history if you can avoid it):

```bash
printf '%s' '...' | vercel env add AUTH_GOOGLE_ID production --project meadowlark-home-care
printf '%s' '...' | vercel env add AUTH_GOOGLE_SECRET production --project meadowlark-home-care
```

Repeat for Preview if you want Google SSO on preview deploys.

Then redeploy Production so the new env vars are picked up.
