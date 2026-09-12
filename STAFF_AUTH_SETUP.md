# Staff portal auth setup

Google SSO + email/password + magic-link for `/login` and `/staff`. Auth.js (NextAuth v5) is in `src/auth.ts`. Callbacks live at `/api/auth/*`.

Google is **not** domain-locked. Personal Gmail (and other Google accounts) work if the email is an admin or on the caregiver whitelist. Do not set `hd=` and do not use an Internal-only OAuth client.

**Do not regenerate `AUTH_SECRET`.** It is already set on Vercel Production + Preview.

**Leftover for Corey:** create a Google OAuth Web client and paste `AUTH_GOOGLE_ID` + `AUTH_GOOGLE_SECRET` into Vercel. For password sign-in on Vercel, also add a Blob store token (`BLOB_READ_WRITE_TOKEN`). Resend is already wired.

## Vercel status (`meadowlark-home-care`)

| Variable | Status |
| --- | --- |
| `AUTH_SECRET` | Set — Production + Preview. Do not rotate. |
| `AUTH_URL` | Production set to `https://www.meadowlarkhomecare.com`. Preview being set to the same. |
| `RESEND_API_KEY` | Set (contact form). Staff magic-link + request-access use this as fallback. |
| `CONTACT_FROM_EMAIL` | Set (contact form). Same From address for staff email. |
| `AUTH_TRUST_HOST` | Optional. `src/auth.ts` already sets `trustHost: true`. |
| `AUTH_GOOGLE_ID` | **Not set — Corey** |
| `AUTH_GOOGLE_SECRET` | **Not set — Corey** |
| `STAFF_ADMIN_EMAILS` | Optional. Comma-separated admin list. If unset, defaults are `cmerrill@meadowlarkhomecare.com` and `corey.merrill@gmail.com`. Setting the env **replaces** those defaults, so include every admin. |
| `AUTH_RESEND_KEY` | Not required (see below). |
| `BLOB_READ_WRITE_TOKEN` | **Not set — Corey** if you want password sign-in on Vercel. |

## Resend key names (confirmed in code)

`src/lib/auth-env.ts` → `getResendApiKey()`:

```ts
process.env.AUTH_RESEND_KEY?.trim() || process.env.RESEND_API_KEY?.trim() || ""
```

- Staff magic-link (`src/app/actions/staff-auth.ts`) and request-access (`src/app/actions/request-access.ts`) call `getResendApiKey()`.
- Contact and apply read **`RESEND_API_KEY` only**.

Because `RESEND_API_KEY` is already on Vercel, magic-link and request-access email work **without** `AUTH_RESEND_KEY`.

Optional later: mirror the same key to `AUTH_RESEND_KEY` on Production + Preview if you want Auth.js-style naming. Not required. Do not create a second Resend key unless you intend to rotate.

From address for staff mail is `CONTACT_FROM_EMAIL` (already set). Inbox for request-access is `CONTACT_TO_EMAIL` or `hr@meadowlarkhomecare.com`.

## Exact Google redirect URIs

Auth.js Google callback path is `/api/auth/callback/google`. URIs must match byte-for-byte (scheme, host, path, no trailing slash).

**Authorized JavaScript origins** (no path):

```
https://www.meadowlarkhomecare.com
http://localhost:3000
```

**Authorized redirect URIs**

Production (required):

```
https://www.meadowlarkhomecare.com/api/auth/callback/google
```

Local:

```
http://localhost:3000/api/auth/callback/google
```

Vercel Preview: Google does **not** allow `https://*.vercel.app/...`. With `AUTH_URL=https://www.meadowlarkhomecare.com` on Preview, Google always returns to the production callback — **do not add preview URIs**.

If you ever test Google SSO on a preview host *without* `AUTH_URL` pinned, add that exact host only:

```
https://<deployment-host>.vercel.app/api/auth/callback/google
```

Examples (replace hash / team / branch from the real deployment URL):

```
https://meadowlark-home-care-<hash>-<team>.vercel.app/api/auth/callback/google
https://meadowlark-home-care-git-<branch>-<team>.vercel.app/api/auth/callback/google
```

Optional apex origin/callback only if the site is ever served on `https://meadowlarkhomecare.com` without redirecting to www.

## Google Cloud OAuth (Corey)

1. Open [Google Cloud Console](https://console.cloud.google.com/) as a Meadowlark Workspace admin (`googleadmin@…` / the real Workspace login).
2. Create or select a project (example: **Meadowlark Home Care**).
3. **Branding / consent**
   - Current UI: **Google Auth Platform → Branding**
   - Older UI: **APIs & Services → OAuth consent screen**
   - User type: **External** (required). **Internal** would lock Google to `@meadowlarkhomecare.com` and block personal Gmail admins and caregivers. The app then allows only admin or whitelist emails — not every Google account.
   - If the client is still in Testing, add each Google account you need (including `corey.merrill@gmail.com`) as a test user, or publish the app. `openid` / `email` / `profile` only.
   - App name: `Meadowlark Staff Portal`
   - Support / developer email: a Workspace admin address that can open Cloud Console
   - Authorized domain: `meadowlarkhomecare.com`
   - Homepage: `https://www.meadowlarkhomecare.com`
   - Scopes: Google defaults only (`openid`, `email`, `profile`). No Drive/Gmail.
4. **Create the Web client**
   - Current UI: **Google Auth Platform → Clients → Create client**
   - Older UI: **APIs & Services → Credentials → Create credentials → OAuth client ID**
   - Application type: **Web application**
   - Name: `Meadowlark staff portal`
   - Add the origins and redirect URIs listed above.
5. Copy **Client ID** → Vercel `AUTH_GOOGLE_ID` (Production + Preview).
6. Copy **Client secret** → Vercel `AUTH_GOOGLE_SECRET` (Production + Preview).

`redirect_uri_mismatch` means the Cloud URI does not match the live callback (`www` vs apex, `http` vs `https`, or a missing `/api/auth/callback/google`).

### Paste into Vercel

Dashboard: project `meadowlark-home-care` → Settings → Environment Variables. Or CLI (do not put secrets in the repo):

```bash
printf '%s' '<client-id>' | vercel env add AUTH_GOOGLE_ID production --project meadowlark-home-care
printf '%s' '<client-secret>' | vercel env add AUTH_GOOGLE_SECRET production --project meadowlark-home-care
printf '%s' '<client-id>' | vercel env add AUTH_GOOGLE_ID preview --project meadowlark-home-care
printf '%s' '<client-secret>' | vercel env add AUTH_GOOGLE_SECRET preview --project meadowlark-home-care
```

Then **Redeploy** Production.

## Smoke test after Google vars are live

1. Open `https://www.meadowlarkhomecare.com/login`.
2. **Google admin:** `corey.merrill@gmail.com` or `cmerrill@meadowlarkhomecare.com` → `/staff` as admin (five office tools + employment forms).
3. **Google caregiver:** a personal Gmail/Yahoo-Google account on `src/data/staff-whitelist.csv` → `/staff` as caregiver.
4. A Google account that is not admin and not on the whitelist is rejected (`not-whitelisted`) and can use **Request access** at `/login/request-access`.
5. **Magic link:** an admin or Active whitelist email should already send (uses existing `RESEND_API_KEY` + `CONTACT_FROM_EMAIL`). Link expires in 20 minutes at `/login/verify`.
6. **Password:** after Google or a magic-link session, use **Set or change password** in the staff bar, or **Forgot / set a password** on `/login`. First-time users should not try to invent a password on the login card.

## Password store (Vercel Blob)

No database. Password hashes are bcrypt (`bcryptjs`, cost 10) in a private JSON blob.

| Environment | Store |
| --- | --- |
| Local / `next dev` | `.data/staff-password-hashes.json` (gitignored). Created on first save. |
| Vercel Production / Preview | Private Blob object `staff/password-hashes.json`. Requires `BLOB_READ_WRITE_TOKEN`. |

Without the Blob token, Vercel deploys still serve Google + magic-link. Password sign-in / set / reset show a configuration error instead of writing to an ephemeral filesystem.

### Set / reset path

1. Allowed email only (`resolveStaffRole !== "none"` — admin list or AxisCare whitelist).
2. User requests a link from `/login/set-password`, or sets a password while already signed in (Google / magic-link / existing password).
3. Email link is a 60-minute signed JWT (`purpose: mlhc-password-reset`), same `AUTH_SECRET` + Resend pattern as magic-link.
4. `/login/set-password?token=…` saves the bcrypt hash and signs the user in.

Do not store plaintext. Do not commit `.data/`.

### Corey leftover for Blob

1. Vercel project → **Storage → Blob → Create**.
2. Copy the read-write token → `BLOB_READ_WRITE_TOKEN` on Production + Preview.
3. Redeploy. Then sign in with Google or a magic link and set a password.

## Corey leftover

- [ ] Create the Google OAuth **Web** client with the production (and localhost) redirect URIs above.
- [ ] Set `AUTH_GOOGLE_ID` and `AUTH_GOOGLE_SECRET` on Vercel Production + Preview.
- [ ] (Password) Create a Vercel Blob store and set `BLOB_READ_WRITE_TOKEN` on Production + Preview.
- [ ] Redeploy Production and run the Google smoke test.

Optional, not blocking: mirror `RESEND_API_KEY` → `AUTH_RESEND_KEY`. Do not regenerate `AUTH_SECRET`.
