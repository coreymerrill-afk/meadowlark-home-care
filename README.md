# Meadowlark Home Care

Production website for [Meadowlark Home Care, LLC](https://meadowlarkhomecare.com) in Missoula, Montana. Built with Next.js App Router, TypeScript, Tailwind CSS, and shadcn/ui.

The site replaces the previous HostGator pages with five public routes:

- `/` — home, services overview, Family Learning Center, dual CTAs
- `/about` — founders and mission
- `/services` — four Compass cards: CFCS/PCS, HCBS waiver, nursing, private pay & VA / third party
- `/work-with-us` — hiring areas, PTO, raises, advancement, AxisCare apply CTA
- `/contact` — office details and a working contact form

`/careers` and the old `.html` HostGator paths redirect to these routes.

Unlisted staff tools (not in the public nav, sitemap, or robots allow list):

- `/staff/forms` — internal forms hub
- `/staff/forms/sltc` — SLTC phone form filler entry (Meadowlark Google account required)

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

A hidden honeypot field (`companyWebsite`) silently accepts bot submissions.

### Resend setup

1. Create a Resend account and verify `meadowlarkhomecare.com`.
2. Create an API key.
3. Set the three email variables in Vercel (Production, Preview, and Development as needed).
4. Send a test from `/contact`.

## Deploy on Vercel (required for a lasting production URL)

Anonymous `vercel deploy --temporary` URLs expire and cannot hold custom domains. Production must live on a Vercel project owned by Corey.

**Auth blocker from this environment:** `vercel whoami` returns **Logged out**. There is no `VERCEL_TOKEN` in the agent environment, so this repo cannot create a durable project, add domains, or set Production env vars from here.

Corey must do this once (about five minutes):

1. Create a GitHub repository for this project (use **Create repo** in Cursor if the project is still on a temporary remote).
2. Sign in at [vercel.com](https://vercel.com) with the Meadowlark / Corey account.
3. Import the GitHub repo at [vercel.com/new](https://vercel.com/new). Framework: **Next.js**. Build: `npm run build`.
4. In **Settings → Environment Variables**, add for **Production** (and Preview if you want matching metadata):

   `NEXT_PUBLIC_SITE_URL` = `https://www.meadowlarkhomecare.com`

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

- Do not use the old slogan “Quality care through compassion and innovation” in the hero, footer, About, or metadata.
- About has no testimonials.
- Services uses four Compass cards: agency-based CFCS/PCS (formerly CFC/PAS); HCBS Big Sky / SDMI / DD; skilled nursing; and private pay / insurance / VA Community Care with respite. Do not mention hospice. Shared eligibility disclaimer: the state or VA decides — not Meadowlark. Confirm on .gov pages.
- The primary **Apply online** CTA is AxisCare: [4170.axiscare.com caregiver application](https://4170.axiscare.com/?caregivers-applications.php).
- The [Hireology careers board](https://careers.hireology.com/meadowlarkhomecare3) is linked as a secondary option on Work With Us.
- Facebook: [facebook.com/meadowlarkhomecare](https://www.facebook.com/meadowlarkhomecare/).
- The old Family Learning Center host (`flc.ipced.com/meadowlarkhomecare`) does not resolve. The site describes the resource and does not use that broken outbound URL.
- Contact form success copy is always visitor-facing. It never surfaces HostGator-style “server encountered an error” text. Without `RESEND_API_KEY`, submissions still succeed and are logged on the server.

## Project layout

```
src/app/            App Router pages, sitemap, robots, contact action
src/components/     Header, footer, form, shared sections, shadcn/ui
src/lib/site.ts     Business details used across pages
public/images/      Page photography
```

## Photo credits

- About page river photo: [Clark Fork River, Missoula, MT](https://commons.wikimedia.org/wiki/File:Clark_Fork_River,_Missoula,_MT.jpg) by w_lemay, [CC BY-SA 2.0](https://creativecommons.org/licenses/by-sa/2.0/).
- Home hero, Family Learning, and Work With Us photographs are generated stand-ins (caregiver + client at home). Replace with Meadowlark’s own photos when available.

© Meadowlark Home Care, LLC. Copyright year is generated dynamically in the footer.
