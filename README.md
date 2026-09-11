# Meadowlark Home Care

Production website for [Meadowlark Home Care, LLC](https://meadowlarkhomecare.com) in Missoula, Montana. Built with Next.js App Router, TypeScript, Tailwind CSS, and shadcn/ui.

The site replaces the previous HostGator pages with five public routes:

- `/` — home, services overview, Family Learning Center, dual CTAs
- `/services` — nursing, CFC/Medicaid PAS, Medicaid Waiver/HCBS, private pay / VA / third party
- `/about` — founders, mission, labeled testimonial placeholders
- `/careers` — culture, PTO, raises, advancement, Hireology apply link
- `/contact` — office details and a working contact form

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

## Deploy on Vercel

1. Push this repository to GitHub, GitLab, or Bitbucket.
2. Import the project at [vercel.com/new](https://vercel.com/new).
3. Framework preset: Next.js. Build command: `npm run build`. Output: default.
4. Add environment variables from `.env.example`.
5. Deploy. Confirm the five pages, mobile nav, and contact form on the preview URL.
6. In the Vercel project, open **Settings → Domains** and add `meadowlarkhomecare.com` and `www.meadowlarkhomecare.com`.

Vercel will show the exact DNS records to copy. Use those values — do not guess IPs from older docs.

## HostGator DNS cutover

Keep the HostGator site online until the Vercel domain is verified and the new site looks correct.

1. Find where DNS is hosted today. The domain may use HostGator nameservers, or a registrar such as GoDaddy.
2. In Vercel, copy the records for the apex domain and `www`.
3. In the current DNS panel, replace the HostGator **A** record for `@` and the **CNAME** (or A) for `www` with the Vercel records. Leave MX records alone if you still receive email through the current host or Google Workspace.
4. If HostGator email is on the same account, confirm MX and SPF still point at the mail provider after the web records change.
5. Wait for DNS to propagate (often minutes, sometimes up to 48 hours). Check with `dig meadowlarkhomecare.com` and `dig www.meadowlarkhomecare.com`.
6. In Vercel, wait until both domains show a valid certificate.
7. Browse the live site on a phone and a desktop. Submit the contact form.
8. After cutover is confirmed, cancel or archive the HostGator web hosting. You can keep the HostGator account only for email or the domain registration if that is still where those live.

If the domain uses HostGator nameservers and you would rather manage DNS in Vercel, change nameservers only after you have recreated MX and any other existing records in Vercel DNS.

## Content notes

- Testimonials on `/about` are clearly labeled placeholders. Replace them with real, permissioned quotes before treating them as customer proof.
- Service copy is cleaned up from the previous site (for example, “medication” and “Personal Assistance Services”). No licenses or medical claims were added.
- Careers applications go to [Hireology](https://careers.hireology.com/meadowlarkhomecare3). Hiring copy mentions Missoula and the Great Falls area.

## Project layout

```
src/app/            App Router pages, sitemap, robots, contact action
src/components/     Header, footer, form, shared sections, shadcn/ui
src/lib/site.ts     Business details used across pages
public/images/      Page photography
```

## Photo credits

- Hero and supporting lifestyle photos: [Pexels](https://www.pexels.com/license/) (free to use).
- About page river photo: [Clark Fork River, Missoula, MT](https://commons.wikimedia.org/wiki/File:Clark_Fork_River,_Missoula,_MT.jpg) by w_lemay, [CC BY-SA 2.0](https://creativecommons.org/licenses/by-sa/2.0/).

© Meadowlark Home Care, LLC. Copyright year is generated dynamically in the footer.
