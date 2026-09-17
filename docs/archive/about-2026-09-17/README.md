# Archived About page (2026-09-17)

Temporarily removed from the public site. Do not delete this folder.

The live route is gone. `/about` and `/about-us.html` redirect home (307, not a rewrite). Nav, footer, and sitemap no longer list About.

## Restore

1. Copy `page.tsx` to `src/app/about/page.tsx`.
2. Copy `about-missoula.jpg` to `public/images/about-missoula.jpg` if that file is missing.
3. Add `{ href: "/about", label: "About Us" }` back to `navLinks` in `src/lib/site.ts` (after Home).
4. Add `"/about"` to `paths` in `src/app/sitemap.ts`.
5. In `next.config.ts`, remove the `/about` → `/` redirect and point `/about-us.html` at `/about` again.
6. Put About back into `src/lib/public-copy.test.ts` (public file list, PCCA/HCBS check, locked “HCBS Big Sky and SDMI waiver supports” string, and the once-only eligibility disclaimer).

`/about` is then a public page again. No rewrite is required.
