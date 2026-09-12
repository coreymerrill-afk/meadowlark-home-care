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
| `AUTH_URL` | Production + Preview | `https://www.meadowlarkhomecare.com` |
| `AUTH_TRUST_HOST` | Production + Preview | `true` (Auth.js host trust; `src/auth.ts` also sets `trustHost: true`) |
| `AUTH_GOOGLE_ID` | Runtime Google SSO | Corey creates this in Google Cloud |
| `AUTH_GOOGLE_SECRET` | Runtime Google SSO | Corey creates this in Google Cloud |
| `AUTH_RESEND_KEY` | Optional | App falls back to `RESEND_API_KEY` |
| `STAFF_WHITELIST_EMAILS` | Optional | Extra Active emails on top of `src/data/staff-whitelist.csv` |
| `STAFF_ADMIN_EMAILS` | Optional | Defaults to `cmerrill@meadowlarkhomecare.com` |

Local placeholders live in `.env.example`.

## Already set on Vercel (claimed by prior CLI; re-verify)

On project `meadowlark-home-care` a prior agent commit claimed:

- `NEXT_PUBLIC_SITE_URL` — Production
- `RESEND_API_KEY`, `CONTACT_FROM_EMAIL`, `CONTACT_TO_EMAIL` — Production + Preview
- `AUTH_SECRET` — Production + Preview
- `AUTH_URL=https://www.meadowlarkhomecare.com` — Production

A later run (`vercel whoami` → Logged out, no `VERCEL_TOKEN`) could not re-list or write env vars. Confirm the list in the Vercel dashboard.

Still missing (do not invent Google or Resend secrets):

- `AUTH_GOOGLE_ID` / `AUTH_GOOGLE_SECRET` — Corey
- `AUTH_TRUST_HOST=true` — Production + Preview
- `AUTH_URL=https://www.meadowlarkhomecare.com` — Preview (Production was claimed)

Full Google + Resend click-path: [STAFF_AUTH_SETUP.md](../STAFF_AUTH_SETUP.md).

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
printf '%s' '...' | vercel env add AUTH_GOOGLE_ID preview --project meadowlark-home-care
printf '%s' '...' | vercel env add AUTH_GOOGLE_SECRET preview --project meadowlark-home-care

printf '%s' 'https://www.meadowlarkhomecare.com' | vercel env add AUTH_URL preview --project meadowlark-home-care
printf '%s' 'true' | vercel env add AUTH_TRUST_HOST production --project meadowlark-home-care
printf '%s' 'true' | vercel env add AUTH_TRUST_HOST preview --project meadowlark-home-care
```

Then redeploy Production so the new env vars are picked up.
