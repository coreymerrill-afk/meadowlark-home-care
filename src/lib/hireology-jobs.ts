import hireologyJobsFile from "@/data/hireology-jobs.json";
import {
  applyPositionOptions,
  type ApplyOffice,
  type ApplyPosition,
} from "@/lib/site";

export const GENERAL_HIREOLOGY_JOB_ID = "general";

export type HireologyJob = {
  id: string;
  title: string;
  location: string;
  employmentStatus: string;
  url: string;
  summary: string;
  position: ApplyPosition | null;
};

export type HireologyJobsFile = {
  fetchedAt: string;
  source: string;
  careersUrl: string;
  jobs: HireologyJob[];
};

const file = hireologyJobsFile as HireologyJobsFile;

export function mapHireologyTitleToPosition(title: string): ApplyPosition | null {
  const normalized = title.toLowerCase();
  if (/\b(lpn|r\.?n\.?|nurse|nursing)\b/.test(normalized)) {
    return "Nurse";
  }
  if (/\b(pca|cna|caregiver|home health aide|hha)\b/.test(normalized)) {
    return "Caregiver";
  }
  return null;
}

export function officeFromHireologyLocation(
  location: string
): ApplyOffice | undefined {
  const normalized = location.toLowerCase();
  const missoula = normalized.includes("missoula");
  const greatFalls = normalized.includes("great falls");
  if (missoula && !greatFalls) {
    return "Missoula";
  }
  if (greatFalls && !missoula) {
    return "Great Falls";
  }
  return undefined;
}

function normalizeJob(job: HireologyJob): HireologyJob {
  const mapped = mapHireologyTitleToPosition(job.title);
  const position =
    job.position && (applyPositionOptions as readonly string[]).includes(job.position)
      ? job.position
      : mapped;

  return {
    ...job,
    id: String(job.id),
    position,
  };
}

export function getHireologyJobsFile(): HireologyJobsFile {
  return file;
}

export function getHireologyJobs(): HireologyJob[] {
  return file.jobs.map(normalizeJob);
}

export function findHireologyJob(
  id: string | undefined,
  jobs: HireologyJob[] = getHireologyJobs()
): HireologyJob | undefined {
  if (!id || id === GENERAL_HIREOLOGY_JOB_ID) {
    return undefined;
  }
  return jobs.find((job) => job.id === id);
}

export function isHireologyJobId(
  id: string,
  jobs: HireologyJob[] = getHireologyJobs()
): boolean {
  if (id === GENERAL_HIREOLOGY_JOB_ID) {
    return true;
  }
  return jobs.some((job) => job.id === id);
}

export function describeHireologyOpening(
  jobId: string | undefined,
  jobs: HireologyJob[] = getHireologyJobs()
): { title: string; url: string } {
  const job = findHireologyJob(jobId, jobs);
  if (job) {
    return {
      title: `${job.title} (${job.location})`,
      url: job.url,
    };
  }

  return {
    title: "General application (no specific listing)",
    url: file.careersUrl,
  };
}

