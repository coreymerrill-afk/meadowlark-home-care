# Hireology roles on `/apply`

Public apply shows **two generic role descriptions** derived from Meadowlark’s Hireology postings — not the six individual listing cards.

- **PCA/CNA (Caregiver)**
- **LPN/RN (Nurse)**

Applicants choose Caregiver or Nurse, plus office and availability, on the form. The [Hireology careers board](https://careers.hireology.com/meadowlarkhomecare3) stays a quiet secondary link for full listings.

Do not invent services. Blurbs stay generalized from the live PCA/CNA and LPN/RN copy. Caregiver starting wage is **$19.75/hour**.

## File

`src/data/hireology-jobs.json` is curated. Edit the two `roles` summaries by hand when Hireology duties or the wage change.

## Live listings

`GET https://api.hireology.com/v2/public/careers/meadowlarkhomecare3` still lists individual openings (no API key). To compare against the generic blurbs:

```bash
npm run refresh:hireology-jobs
```

That prints current open titles and locations. It does **not** replace the two generic roles with per-listing cards.
