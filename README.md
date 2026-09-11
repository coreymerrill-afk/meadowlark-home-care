# Meadowlark Home Care

Production website for [Meadowlark Home Care, LLC](https://meadowlarkhomecare.com) in Missoula, Montana. Built with Next.js App Router, TypeScript, Tailwind CSS, and shadcn/ui.

The site replaces the previous HostGator pages with five public routes:

- `/` — home, services overview, Family Learning Center, dual CTAs
- `/about` — founders and mission
- `/services` — CFCS/PCS, Medicaid HCBS waiver, skilled nursing, private pay / VA / third party
- `/work-with-us` — culture, PTO, raises, advancement, AxisCare apply CTA
- `/contact` — office details and a working contact form

`/careers` and the old `.html` HostGator paths redirect to these routes.

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
| `NEXT_PUBLIC_SITE_URL` | Recommended | Canonical site URL for sitemap, robots, and metadata. Defaults to `https://meadowlarkhomecare.com`. |
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

## Deploy on Vercel (do this first)

1. Push this repository to GitHub, GitLab, or Bitbucket.
2. Import the project at [vercel.com/new](https://vercel.com/new).
3. Framework preset: **Next.js**. Build command: `npm run build`. Output: default.
4. Add environment variables from `.env.example` (`NEXT_PUBLIC_SITE_URL` plus Resend keys when email should go live).
5. Deploy and open the Vercel preview URL.
6. Check all five pages on a phone and a desktop, submit the contact form, and click **Apply online** (AxisCare).
7. When the preview looks right, open **Settings → Domains** and add `meadowlarkhomecare.com` and `www.meadowlarkhomecare.com`. Copy the exact DNS records Vercel shows.

The site is ready to preview and ship on Vercel before any DNS change.

## HostGator DNS cutover (later)

HostGator access is available when you are ready to point the live domain. Keep the current HostGator site online until the Vercel domain shows a valid certificate and the new site looks correct.

1. In Vercel, copy the A / CNAME records for `@` and `www`.
2. In HostGator (or the registrar that actually hosts DNS), replace only the web records. Leave MX and email records alone unless you intend to move mail.
3. Wait for propagation. Confirm with `dig meadowlarkhomecare.com` and `dig www.meadowlarkhomecare.com`.
4. Browse the live domain on a phone and a desktop, then submit the contact form.
5. After cutover is confirmed, cancel or archive HostGator web hosting. Keep the account if the domain or email still lives there.

If you move nameservers to Vercel, recreate MX and any other existing records in Vercel DNS first.

## Content notes

- About has no testimonials.
- Services uses four Compass cards (CFCS/PCS, HCBS waiver, skilled nursing, private pay / VA / third party) plus a How to get started strip with official .gov links. Copy is careful: Meadowlark does not decide Medicaid or VA eligibility. The footer repeats that disclaimer and notes Meadowlark is not a hospice provider.
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

- Hero mountain lake and supporting lifestyle photos: [Pexels](https://www.pexels.com/license/) (free to use).
- About page river photo: [Clark Fork River, Missoula, MT](https://commons.wikimedia.org/wiki/File:Clark_Fork_River,_Missoula,_MT.jpg) by w_lemay, [CC BY-SA 2.0](https://creativecommons.org/licenses/by-sa/2.0/).

© Meadowlark Home Care, LLC. Copyright year is generated dynamically in the footer.
