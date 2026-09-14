import hireologyJobsFile from "@/data/hireology-jobs.json";
import {
  applyPositionOptions,
  type ApplyPosition,
} from "@/lib/site";

export type HireologyRole = {
  id: string;
  title: string;
  location: string;
  employmentStatus: string;
  summary: string;
  position: ApplyPosition;
};

export type HireologyJobsFile = {
  updatedAt: string;
  source: string;
  careersUrl: string;
  startingWage: string;
  roles: Array<Omit<HireologyRole, "position"> & { position?: ApplyPosition }>;
};

const file = hireologyJobsFile as HireologyJobsFile;

export function hireologyCareersUrl() {
  return file.careersUrl;
}

export function hireologyStartingWage() {
  return file.startingWage;
}

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

function normalizeRole(
  role: HireologyJobsFile["roles"][number]
): HireologyRole | null {
  const mapped = mapHireologyTitleToPosition(role.title);
  const position =
    role.position &&
    (applyPositionOptions as readonly string[]).includes(role.position)
      ? role.position
      : mapped;

  if (!position) {
    return null;
  }

  return {
    id: String(role.id),
    title: role.title,
    location: role.location,
    employmentStatus: role.employmentStatus,
    summary: role.summary,
    position,
  };
}

export function getHireologyJobsFile(): HireologyJobsFile {
  return file;
}

export function getHireologyRoles(): HireologyRole[] {
  return file.roles
    .map(normalizeRole)
    .filter((role): role is HireologyRole => role !== null);
}

export function findHireologyRole(
  id: string | undefined,
  roles: HireologyRole[] = getHireologyRoles()
): HireologyRole | undefined {
  if (!id) {
    return undefined;
  }
  return roles.find((role) => role.id === id);
}

export function positionFromApplyQuery(
  value: string | undefined,
  roles: HireologyRole[] = getHireologyRoles()
): ApplyPosition | undefined {
  if (!value) {
    return undefined;
  }
  if ((applyPositionOptions as readonly string[]).includes(value)) {
    return value as ApplyPosition;
  }
  return findHireologyRole(value, roles)?.position;
}

export function describeApplyRole(
  position: ApplyPosition,
  roles: HireologyRole[] = getHireologyRoles()
): { title: string; url: string } {
  const role = roles.find((item) => item.position === position);
  if (role) {
    return {
      title: role.title,
      url: file.careersUrl,
    };
  }

  return {
    title: position,
    url: file.careersUrl,
  };
}
