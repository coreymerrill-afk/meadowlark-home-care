# Hireology openings on `/apply`

Public apply uses a checked-in snapshot of open roles from the [Hireology careers site](https://careers.hireology.com/meadowlarkhomecare3). Do not invent listings.

## Source

`GET https://api.hireology.com/v2/public/careers/meadowlarkhomecare3`

No API key or other secret is required. Only `status: "Open"` rows are kept.

## Refresh

```bash
npm run refresh:hireology-jobs
```

That writes `src/data/hireology-jobs.json`. Commit the file when titles, locations, or summaries change.

Titles map to **Caregiver** (PCA/CNA and similar) or **Nurse** (LPN/RN) when the name is clear. Unmapped titles still appear; the applicant picks Caregiver or Nurse on the form.

## Why a file instead of a live fetch

The public endpoint works without secrets, but a checked-in JSON file keeps `/apply` and HR email lookup stable if Hireology is down or the payload shape changes. Re-run the script when Corey updates postings.
