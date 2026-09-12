# Meadowlark Home Care

Production website for [Meadowlark Home Care, LLC](https://meadowlarkhomecare.com) in Missoula, Montana. Built with Next.js App Router, TypeScript, Tailwind CSS, and shadcn/ui.

The site replaces the previous HostGator pages with five public routes:

- `/` — home, services overview, dual CTAs
- `/about` — founders and mission
- `/services` — four Compass cards: CFCS/PCS, HCBS waiver, nursing, private pay & VA / third party
- `/apply` — short caregiver application (name, phone, email, preferred office, optional note)
- `/work-with-us` — hiring areas, PTO, raises, advancement, short `/apply` form
- `/contact` — office details and a working contact form

`/careers` and the old `.html` HostGator paths redirect to these routes.

Unlisted staff tools (not in the public nav, sitemap, or robots allow list).
Header/footer **Login** goes to `/login`. `robots.txt` keeps `Disallow: /staff/`. Staff pages are noindex.

- `/login` — Google SSO + email/password + magic-link. Request access is on `/login/request-access` (emails `hr@meadowlarkhomecare.com`)
- `/login/set-password` — forgot / first-time set password (email link or signed-in session)
- `/staff` — post-login landing (caregiver docs; admin sees AxisCare, Qliq, Employee Navigator, Hireology, ADP, and employment forms)
- `/staff/docs/*` — authenticated PDFs (handbook, HIPAA, AxisCare guide, tip sheet, admin employment forms). Not in `public/`.
- `/staff/employment-forms` — **admin-only** on-hire PDF hub
- `/staff/forms` — **admin-only** forms hub (quiet link from admin landing)
- `/staff/forms/sltc` — SLTC phone form filler entry (Apps Script CTA; Meadowlark Google account required)

Staff documents live in `content/staff-docs/` and are served only after login. Do not put them in `public/`. All four PDFs (handbook, HIPAA, AxisCare mobile guide, tip sheet) are committed.

## Local development

Requirements: Node.js 20+ and npm.

```bash
git clone <your-repo-url>
cd meadowlark-home-care
cp .env.example .env.local
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

Useful scripts:

```bash
npm run dev      # development server
npm run build    # production build
npm run start    # serve the production build
npm run lint     # ESLint
```

## Contact form environment variables

The form posts to a server action in `src/app/actions/contact.ts`.

| Variable | Required | Purpose |
| --- | --- | --- |
| `NEXT_PUBLIC_SITE_URL` | **Required on Vercel Production before DNS cutover** | Must be `https://www.meadowlarkhomecare.com`. Drives canonical URLs, `og:url`, sitemap, and the sitemap line in `robots.txt`. Localhost values from `.env.local` are ignored on production builds. If unset, the build falls back to `VERCEL_PROJECT_PRODUCTION_URL` / `VERCEL_URL`, then `https://www.meadowlarkhomecare.com`. |
| `RESEND_API_KEY` | For live email | Sends submissions through [Resend](https://resend.com). |
| `CONTACT_FROM_EMAIL` | With Resend | Must use a domain verified in Resend. Example: `Meadowlark Home Care <noreply@meadowlarkhomecare.com>`. |
| `CONTACT_TO_EMAIL` | With Resend | Inbox that receives messages. Defaults to `hr@meadowlarkhomecare.com`. |

Without `RESEND_API_KEY`, the form still validates and submits. It logs the message on the server and returns a preview-mode success so local and Vercel preview deploys are usable before email is configured.

## Staff auth

Auth.js (NextAuth v5) with JWT sessions. Google OAuth is **not** domain-locked: any Google account can sign in if the email is an admin or on the caregiver whitelist. Magic links and email/password use the same allow list. Magic-link tokens are short-lived JWTs (no database adapter). Password hashes are bcrypt in a private Vercel Blob JSON file (local `.data/` fallback). See [STAFF_AUTH_SETUP.md](./STAFF_AUTH_SETUP.md).

| Role | Who |
| --- | --- |
| `admin` | `cmerrill@meadowlarkhomecare.com` and `corey.merrill@gmail.com` (override with comma-separated `STAFF_ADMIN_EMAILS`) |
| `caregiver` | Any signed-in email on the AxisCare ACTIVE whitelist (case-insensitive), Google or magic-link |
| no portal role | Google/magic-link/password is rejected with a not-whitelisted error. Request access is on `/login/request-access`. A leftover session with no role still sees **Request access** on `/staff`. |

`/staff/*` is gated in `src/proxy.ts` and again in the staff layout. Unauthenticated visitors go to `/login?next=...`. Caregivers who open `/staff/forms` are sent back to `/staff`.

Whitelist sources (merged):

1. `src/data/staff-whitelist.csv` — AxisCare **Active** export (`email`, `name`, `status`, `role`)
2. `STAFF_WHITELIST_EMAILS` (optional extra emails)
3. `src/data/caregiver-whitelist.json` (optional extras)

Only `status=Active` rows with a non-empty email count (case-insensitive). CSV `role=admin` does not grant admin by itself; admin remains `STAFF_ADMIN_EMAILS` or the two default addresses (Natalie Redman is a caregiver in this export).

Handbook / HIPAA / AxisCare PDFs are **not** Drive links. They are served from `/staff/docs/handbook`, `/staff/docs/hipaa`, `/staff/docs/axiscare-guide`, and `/staff/docs/axiscare-tip-sheet` after a valid portal session.

Google OAuth leftover (exact redirect URIs): **[STAFF_AUTH_SETUP.md](./STAFF_AUTH_SETUP.md)**.

| Variable | Required | Purpose |
| --- | --- | --- |
| `AUTH_SECRET` | Runtime sign-in | Session + magic-link signing. Generate with `npx auth secret`. |
| `AUTH_GOOGLE_ID` / `AUTH_GOOGLE_SECRET` | Google SSO | Google Cloud OAuth client. Production redirect: `https://www.meadowlarkhomecare.com/api/auth/callback/google`. |
| `AUTH_RESEND_KEY` | Optional | Preferred staff Resend key. Falls back to `RESEND_API_KEY` (already on Vercel). Contact/apply read `RESEND_API_KEY` only. |
| `AUTH_URL` | Recommended on Vercel | Canonical origin. Production/Preview: `https://www.meadowlarkhomecare.com`. |
| `AUTH_TRUST_HOST` | Recommended on Vercel | Set `true`. Auth.js host trust (`src/auth.ts` also sets `trustHost: true`). |
| `STAFF_WHITELIST_EMAILS` | Optional | Extra Active caregiver emails on top of the CSV. |
| `STAFF_ADMIN_EMAILS` | Optional | Comma-separated admin emails. Defaults to `cmerrill@meadowlarkhomecare.com,corey.merrill@gmail.com`. Setting this replaces the defaults, so include every admin address. |
| `BLOB_READ_WRITE_TOKEN` | Password on Vercel | Private Blob store for bcrypt hashes. Local/dev uses `.data/staff-password-hashes.json` (gitignored). |

The production build succeeds if Google/Resend/Auth secrets are missing. Sign-in and magic-link actions return a clear configuration error at runtime instead of crashing the app.

Vercel env status (what is already set vs Corey-only Google OAuth) is in [docs/staff-auth-vercel.md](docs/staff-auth-vercel.md).

A hidden honeypot field (`companyWebsite`) silently accepts bot submissions.

### Resend setup

1. Create a Resend account and verify `meadowlarkhomecare.com`.
2. Create an API key.
3. Set the three email variables in Vercel (Production, Preview, and Development as needed).
4. Send a test from `/contact`.

## Deploy on Vercel (required for a lasting production URL)

Anonymous `vercel deploy --temporary` URLs expire and cannot hold custom domains. Production must live on a Vercel project owned by Corey.

**Auth blocker from this environment:** `vercel whoami` returns **Logged out**. There is no `VERCEL_TOKEN` in the agent environment, so this repo cannot create a durable project, add domains, or set Production env vars from here.

GitHub repo for lasting hosting: [github.com/coreymerrill-afk/meadowlark-home-care](https://github.com/coreymerrill-afk/meadowlark-home-care). Do not use `vercel deploy --temporary`.

Corey must do this once (about five minutes):

1. Confirm this Next.js app is on `main` of that GitHub repo (not only the auto-init README).
2. Sign in at [vercel.com](https://vercel.com) with the Meadowlark / Corey account.
3. Import **coreymerrill-afk/meadowlark-home-care** at [vercel.com/new](https://vercel.com/new). Framework: **Next.js**. Build: `npm run build`.
4. In **Settings → Environment Variables**, add for **Production** (and Preview if you want matching metadata):

   `NEXT_PUBLIC_SITE_URL` = `https://www.meadowlarkhomecare.com`

   Staff leftover is Google OAuth (`AUTH_GOOGLE_ID` / `AUTH_GOOGLE_SECRET`) plus optional Blob (`BLOB_READ_WRITE_TOKEN`) for password hashes. Steps: [STAFF_AUTH_SETUP.md](./STAFF_AUTH_SETUP.md). `AUTH_SECRET` and Resend (`RESEND_API_KEY`) are already on Vercel — do not regenerate the secret. Whitelist: `src/data/staff-whitelist.csv`.

   Do not set this to localhost. Redeploy Production after saving so metadata rebuilds.
5. In **Settings → Domains**, add:
   - `www.meadowlarkhomecare.com` — set as the **primary** domain
   - `meadowlarkhomecare.com` — redirect to `www.meadowlarkhomecare.com`
6. Confirm the exact A / CNAME values on each domain card (they should match the HostGator table below). Then change HostGator DNS.

Optional: send a Vercel personal token as `VERCEL_TOKEN` in a follow-up so an agent can finish steps 3–5. Create one at [vercel.com/account/tokens](https://vercel.com/account/tokens) (scope: the team that will own the project).

## HostGator DNS records (web only — leave mail alone)

Do **not** change nameservers. Changing NS to Vercel will break HostGator email unless every MX/TXT record is recreated first.

In HostGator cPanel → Zone Editor (or the registrar that actually hosts DNS), replace **only** the web records for the apex and `www`. Leave **MX**, mail **TXT/SPF/DKIM**, and any existing email CNAMEs untouched.

| Type | Name / Host | Value | TTL |
| --- | --- | --- | --- |
| A | `@` (or `meadowlarkhomecare.com`) | `76.76.21.21` | default (or 14400) |
| CNAME | `www` | `cname.vercel-dns-0.com` | default (or 14400) |

Notes:

- These are Vercel’s current general-purpose values ([custom domain docs](https://vercel.com/docs/domains/set-up-custom-domain)). After the project exists, open each domain card in Vercel and use **that** A / CNAME if it differs (some projects show a unique `*.vercel-dns-###.com` target).
- Do **not** add an AAAA record unless Vercel’s domain card shows one. Vercel does not serve IPv6 on the apex today.
- Do **not** put a CNAME on `@`. Apex must stay an A record so MX can keep working.
- Delete old HostGator A / CNAME records that still point at the previous web host. Conflicting A records will block Vercel.
- If Vercel asks for domain verification, add the `_vercel` TXT value it shows, then wait.
- If the zone already has CAA records, keep or add `0 issue "letsencrypt.org"` so Vercel can issue the certificate.

Verify after saving (propagation can take minutes to a few hours):

```bash
dig A meadowlarkhomecare.com +short
# expect: 76.76.21.21

dig CNAME www.meadowlarkhomecare.com +short
# expect: cname.vercel-dns-0.com. (or the project-specific target)

dig MX meadowlarkhomecare.com +short
# unchanged — still HostGator / current mail
```

Then open `https://www.meadowlarkhomecare.com` and `https://meadowlarkhomecare.com` (the apex should 308/301 to www). Confirm the certificate is valid before taking HostGator web hosting offline.

## Content notes

- Do not use the old slogan “Quality care through compassion and innovation” anywhere on public pages. Footer line: “Home care for Missoula families since 2015.”
- About has no testimonials and states the founders’ origin once (2015, Corey Merrill and Natalie Redman).
- Services uses four Compass cards: agency-based CFCS/PCS (formerly CFC/PAS); HCBS Big Sky / SDMI / DD; skilled nursing; and private pay / insurance / VA Community Care with respite.Respite is offered. Shared eligibility disclaimer: the state or VA decides — not Meadowlark. Confirm on .gov pages.
- The primary **Apply online** CTA is the short `/apply` form (emails HR via Resend). AxisCare URL kept in `site.axisCareApplyUrl` as optional backup only.
- The [Hireology careers board](https://careers.hireology.com/meadowlarkhomecare3) is linked as a secondary option on Work With Us.
- Facebook: [facebook.com/meadowlarkhomecare](https://www.facebook.com/meadowlarkhomecare/).
- Contact form success copy is always visitor-facing. It never surfaces HostGator-style “server encountered an error” text. Without `RESEND_API_KEY`, submissions still succeed and are logged on the server.

## Project layout

```
STAFF_AUTH_SETUP.md Google OAuth + Resend + Vercel env checklist
src/app/            App Router pages, sitemap, robots, contact/apply/staff actions
src/auth.ts         Auth.js config (Google + magic-link credentials)
src/proxy.ts        Unauthenticated /staff/* → /login?next=...
src/data/           AxisCare Active whitelist CSV + optional JSON extras
content/staff-docs/ Authenticated PDFs (not publicly fetchable)
docs/               Staff auth Vercel env notes
src/components/     Header, footer, form, shared sections, shadcn/ui
src/lib/site.ts     Business details used across pages
public/images/      Page photography
```

## Photo credits

- About page river photo: [Clark Fork River, Missoula, MT](https://commons.wikimedia.org/wiki/File:Clark_Fork_River,_Missoula,_MT.jpg) by w_lemay, [CC BY-SA 2.0](https://creativecommons.org/licenses/by-sa/2.0/).
- Home hero (`hero-mountains.jpg`): caregiver + older adult at home, faces left for the teal gradient. Not a landscape hero.
- Do not use Banff/Moraine Lake, UI wireframes, or generic SaaS laptop stock.

© Meadowlark Home Care, LLC. Copyright year is generated dynamically in the footer.
