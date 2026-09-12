# Staff portal auth setup

Production Google SSO and magic-link login for `/login` and `/staff`. Auth.js (NextAuth v5) lives in `src/auth.ts`. Callbacks are served at `/api/auth/*`.

Do **not** invent or commit Google or Resend secrets. Generate `AUTH_SECRET` locally; create the other secrets in Google Cloud and Resend, then paste them into Vercel.

## What the app reads

| Variable | Required to sign in | What uses it |
| --- | --- | --- |
| `AUTH_SECRET` | Yes | Auth.js JWT sessions + magic-link token signing (`src/lib/magic-link.ts`). |
| `AUTH_GOOGLE_ID` | Google SSO | Google provider in `src/auth.ts`. |
| `AUTH_GOOGLE_SECRET` | Google SSO | Google provider in `src/auth.ts`. |
| `AUTH_RESEND_KEY` | Magic link / request access | Preferred Resend key (`src/lib/auth-env.ts` → `getResendApiKey()`). |
| `RESEND_API_KEY` | Fallback / public forms | Used if `AUTH_RESEND_KEY` is empty. **Contact and apply only read this name.** |
| `AUTH_URL` | Recommended on Vercel | Canonical origin for Auth.js and magic-link URLs (`src/lib/request-origin.ts`). |
| `AUTH_TRUST_HOST` | Recommended on Vercel | Auth.js host trust. Code also sets `trustHost: true`. |
| `CONTACT_FROM_EMAIL` | Live email | From address for magic-link, request-access, contact, and apply. |
| `CONTACT_TO_EMAIL` | Request access | Inbox for access requests (default `hr@meadowlarkhomecare.com`). |

Google SSO is skipped at runtime until `AUTH_SECRET`, `AUTH_GOOGLE_ID`, and `AUTH_GOOGLE_SECRET` are all set. Magic links need `AUTH_SECRET` plus `AUTH_RESEND_KEY` or `RESEND_API_KEY`. The production build succeeds if they are missing.

Workspace domain in code: `@meadowlarkhomecare.com` (`hd` param + `isWorkspaceEmail`). Admin default: `cmerrill@meadowlarkhomecare.com`.

## Values to set on Vercel (Production and Preview)

Set these in the `meadowlark-home-care` project → **Settings → Environment Variables**, scoped to **Production** and **Preview**:

| Name | Value | Sensitive |
| --- | --- | --- |
| `AUTH_SECRET` | Output of `npx auth secret` (or `openssl rand -base64 32`) | Yes |
| `AUTH_URL` | `https://www.meadowlarkhomecare.com` | No |
| `AUTH_TRUST_HOST` | `true` | No |
| `AUTH_GOOGLE_ID` | Google OAuth **Client ID** (Corey) | No |
| `AUTH_GOOGLE_SECRET` | Google OAuth **Client secret** (Corey) | Yes |
| `AUTH_RESEND_KEY` | Resend API key (Corey). Or set `RESEND_API_KEY` instead / as well. | Yes |
| `CONTACT_FROM_EMAIL` | `Meadowlark Home Care <noreply@meadowlarkhomecare.com>` | No |

Pinning `AUTH_URL` to the www production origin means Google callbacks and magic-link emails always use that host, including from Preview deployments. That is intentional: Google does not allow wildcard `*.vercel.app` redirect URIs.

After saving, **Redeploy** Production (and any open Preview) so the new env vars load.

Local `.env.local` should use `AUTH_URL=http://localhost:3000` instead.

## 1. Google Cloud OAuth (Corey)

Goal: a **Web application** OAuth client whose redirect URI is exactly the Auth.js Google callback.

### Create or select the project

1. Open [Google Cloud Console](https://console.cloud.google.com/) signed in as a Meadowlark Workspace admin (prefer `cmerrill@meadowlarkhomecare.com`).
2. Create or select a project (example name: **Meadowlark Home Care**).
3. Confirm the project is in the **meadowlarkhomecare.com** Workspace organization if you want **Internal** users only. A personal Gmail-owned project cannot use Internal.

### Branding / OAuth consent

Current UI: **Google Auth Platform → Branding**  
Older UI: **APIs & Services → OAuth consent screen**

1. User type:
   - **Internal** — only `@meadowlarkhomecare.com` accounts (recommended).
   - **External** — only if Internal is unavailable. Add test users, then publish, and rely on the app’s `hd=meadowlarkhomecare.com` check.
2. App name: `Meadowlark Staff Portal`.
3. User support email and developer contact: Corey’s Meadowlark address.
4. App domain / authorized domain: `meadowlarkhomecare.com`.
5. Homepage: `https://www.meadowlarkhomecare.com`.
6. Scopes: the Google provider defaults (`openid`, `email`, `profile`). No extra Drive/Gmail scopes.

### Create the Web client

Current UI: **Google Auth Platform → Clients → Create client**  
Older UI: **APIs & Services → Credentials → Create credentials → OAuth client ID**

1. Application type: **Web application**.
2. Name: `Meadowlark staff portal`.
3. **Authorized JavaScript origins** (no path, no trailing slash):

   ```
   https://www.meadowlarkhomecare.com
   http://localhost:3000
   ```

   Optional if the apex is ever used without redirecting: `https://meadowlarkhomecare.com`.

4. **Authorized redirect URIs** (must match byte-for-byte; include the path; no trailing slash):

   **Production (required)**

   ```
   https://www.meadowlarkhomecare.com/api/auth/callback/google
   ```

   **Local development**

   ```
   http://localhost:3000/api/auth/callback/google
   ```

   **Vercel Preview (only if you test Google SSO on a preview host without `AUTH_URL` pinned)**

   Google does **not** accept `https://*.vercel.app/...`. Add the exact host from the Vercel deployment:

   ```
   https://<deployment-host>.vercel.app/api/auth/callback/google
   ```

   Typical Vercel hosts (replace the unique suffix and team slug from the deployment URL):

   ```
   https://meadowlark-home-care-<hash>-<team>.vercel.app/api/auth/callback/google
   https://meadowlark-home-care-git-<branch>-<team>.vercel.app/api/auth/callback/google
   ```

   With `AUTH_URL=https://www.meadowlarkhomecare.com` on Preview (recommended), you do **not** need preview redirect URIs. Google always returns to the production callback.

5. Create the client. Copy:
   - **Client ID** → Vercel `AUTH_GOOGLE_ID`
   - **Client secret** → Vercel `AUTH_GOOGLE_SECRET`

### Workspace restriction

The app already sends `hd=meadowlarkhomecare.com` and rejects non-Workspace Google accounts. Internal consent is the extra Cloud-side lock.

If Google shows `redirect_uri_mismatch`, the URI in Cloud does not match the live callback. Check `www` vs apex, `http` vs `https`, and `/api/auth/callback/google`.

## 2. Resend (Corey)

Used for magic-link email, staff access requests, and (via `RESEND_API_KEY`) the public contact/apply forms.

1. Sign in at [resend.com](https://resend.com).
2. **Domains → Add domain** → `meadowlarkhomecare.com`.
3. Add the DNS records Resend shows (DKIM CNAMEs; SPF include if requested). Do **not** replace HostGator MX records.
4. Wait until the domain status is **Verified**.
5. **API Keys → Create**. Permission: sending. Copy the key once.
6. In Vercel (Production + Preview):
   - `AUTH_RESEND_KEY` = that key (staff email), **and/or**
   - `RESEND_API_KEY` = the same key (required for `/contact` and `/apply`; also the staff fallback).
7. Confirm `CONTACT_FROM_EMAIL` is on the verified domain:

   ```
   Meadowlark Home Care <noreply@meadowlarkhomecare.com>
   ```

   `src/lib/auth-env.ts` uses this value (or that default) as the From address.

8. Confirm `CONTACT_TO_EMAIL=hr@meadowlarkhomecare.com` so request-access mail lands in HR.

Without a Resend key, request-access still “succeeds” in preview-log mode. Magic-link sign-in returns a configuration error instead.

## 3. Vercel env (agent vs Corey)

This environment’s `vercel` CLI is **logged out** (`vercel whoami` → Logged out; no `VERCEL_TOKEN`). This run could not create or verify project env vars.

A prior commit on this branch (`docs/staff-auth-vercel.md`) **claims** these were already written on project `meadowlark-home-care`:

- `AUTH_SECRET` — Production + Preview
- `AUTH_URL=https://www.meadowlarkhomecare.com` — Production only
- `RESEND_API_KEY`, `CONTACT_FROM_EMAIL`, `CONTACT_TO_EMAIL` — Production + Preview
- `NEXT_PUBLIC_SITE_URL` — Production

**Confirm those in the Vercel dashboard.** This run could not re-check them.

Still not claimed, and still Corey (or a logged-in CLI):

```bash
printf '%s' 'https://www.meadowlarkhomecare.com' | vercel env add AUTH_URL preview
printf '%s' 'true' | vercel env add AUTH_TRUST_HOST production
printf '%s' 'true' | vercel env add AUTH_TRUST_HOST preview
```

If `AUTH_SECRET` is missing when you look, generate one and add it:

```bash
npx auth secret
printf '%s' '<generated-secret>' | vercel env add AUTH_SECRET production --sensitive
printf '%s' '<generated-secret>' | vercel env add AUTH_SECRET preview --sensitive
```

Dashboard: [vercel.com](https://vercel.com) → `meadowlark-home-care` → Settings → Environment Variables.

Do not set `AUTH_GOOGLE_*` or Resend keys to placeholders. Use `vercel env add … --force` (or Dashboard edit) if a name already exists.

## 4. Smoke test after secrets are live

1. Redeploy Production.
2. Open `https://www.meadowlarkhomecare.com/login`.
3. **Google:** sign in as `cmerrill@meadowlarkhomecare.com` → should land on `/staff` as admin (Forms hub visible).
4. A Workspace account that is not admin and not on `src/data/staff-whitelist.csv` may sign in but sees **Request access**, not portal links.
5. A personal Gmail is rejected (`workspace-only`).
6. **Magic link:** use an Active whitelist email. The message comes from `CONTACT_FROM_EMAIL`. The link expires in 20 minutes and hits `/login/verify`.
7. **Request access:** submit the form and confirm HR received mail at `hr@meadowlarkhomecare.com`.

## Corey leftover checklist

**Confirm in Vercel** (claimed by a prior branch commit; this run could not verify):

- [ ] `AUTH_SECRET` exists on Production + Preview.
- [ ] `AUTH_URL=https://www.meadowlarkhomecare.com` exists on Production.
- [ ] `RESEND_API_KEY` and `CONTACT_FROM_EMAIL` exist (or add `AUTH_RESEND_KEY`).

**Still to do (this run did not set these):**

- [ ] Set `AUTH_URL=https://www.meadowlarkhomecare.com` on **Preview**.
- [ ] Set `AUTH_TRUST_HOST=true` on Production + Preview.
- [ ] Create the Google OAuth Web client; add the production (and localhost) redirect URIs above.
- [ ] Set `AUTH_GOOGLE_ID` and `AUTH_GOOGLE_SECRET` on Vercel Production + Preview.
- [ ] If Resend is not already live: verify `meadowlarkhomecare.com`, create an API key, set `AUTH_RESEND_KEY` and/or `RESEND_API_KEY`.
- [ ] Redeploy Production and run the smoke test.
