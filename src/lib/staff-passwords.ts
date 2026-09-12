import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";

import { get, put } from "@vercel/blob";
import bcrypt from "bcryptjs";

import { normalizeEmail } from "@/lib/caregiver-whitelist";

const BLOB_PATH = "staff/password-hashes.json";
const LOCAL_STORE_PATH = path.join(
  process.cwd(),
  ".data",
  "staff-password-hashes.json"
);
const BCRYPT_ROUNDS = 10;
/** Valid bcrypt hash used only so failed lookups still take a compare() call. */
const DUMMY_HASH =
  "$2a$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lhWy";

export type StaffPasswordStore = {
  version: 1;
  hashes: Record<string, string>;
};

export function getBlobReadWriteToken(): string {
  return process.env.BLOB_READ_WRITE_TOKEN?.trim() ?? "";
}

export function isPasswordStoreConfigured(): boolean {
  if (getBlobReadWriteToken()) {
    return true;
  }
  // Vercel’s filesystem is not durable. Local/dev can use `.data/`.
  return !process.env.VERCEL;
}

function emptyStore(): StaffPasswordStore {
  return { version: 1, hashes: {} };
}

function parseStore(raw: string): StaffPasswordStore {
  try {
    const parsed = JSON.parse(raw) as Partial<StaffPasswordStore>;
    if (parsed.version !== 1 || !parsed.hashes || typeof parsed.hashes !== "object") {
      return emptyStore();
    }
    const hashes: Record<string, string> = {};
    for (const [email, hash] of Object.entries(parsed.hashes)) {
      if (typeof hash === "string" && hash) {
        hashes[normalizeEmail(email)] = hash;
      }
    }
    return { version: 1, hashes };
  } catch {
    return emptyStore();
  }
}

async function streamToText(stream: ReadableStream<Uint8Array>): Promise<string> {
  return new Response(stream).text();
}

async function readBlobStore(): Promise<StaffPasswordStore> {
  const result = await get(BLOB_PATH, {
    access: "private",
    useCache: false,
  });
  if (!result || result.statusCode !== 200 || !result.stream) {
    return emptyStore();
  }
  return parseStore(await streamToText(result.stream));
}

async function writeBlobStore(store: StaffPasswordStore): Promise<void> {
  await put(BLOB_PATH, JSON.stringify(store), {
    access: "private",
    addRandomSuffix: false,
    allowOverwrite: true,
    contentType: "application/json",
    cacheControlMaxAge: 60,
  });
}

async function readLocalStore(): Promise<StaffPasswordStore> {
  try {
    const raw = await readFile(LOCAL_STORE_PATH, "utf8");
    return parseStore(raw);
  } catch {
    return emptyStore();
  }
}

async function writeLocalStore(store: StaffPasswordStore): Promise<void> {
  await mkdir(path.dirname(LOCAL_STORE_PATH), { recursive: true });
  await writeFile(LOCAL_STORE_PATH, `${JSON.stringify(store, null, 2)}\n`, "utf8");
}

async function readStore(): Promise<StaffPasswordStore> {
  if (!isPasswordStoreConfigured()) {
    return emptyStore();
  }
  if (getBlobReadWriteToken()) {
    return readBlobStore();
  }
  return readLocalStore();
}

async function writeStore(store: StaffPasswordStore): Promise<void> {
  if (getBlobReadWriteToken()) {
    await writeBlobStore(store);
    return;
  }
  if (process.env.VERCEL) {
    throw new Error("Password store is not configured. Set BLOB_READ_WRITE_TOKEN.");
  }
  await writeLocalStore(store);
}

export async function getPasswordHash(email: string): Promise<string | null> {
  const store = await readStore();
  return store.hashes[normalizeEmail(email)] ?? null;
}

export async function hasPasswordHash(email: string): Promise<boolean> {
  return Boolean(await getPasswordHash(email));
}

export async function setPasswordHash(
  email: string,
  password: string
): Promise<void> {
  const normalized = normalizeEmail(email);
  const hash = await bcrypt.hash(password, BCRYPT_ROUNDS);
  const store = await readStore();
  store.hashes[normalized] = hash;
  await writeStore(store);
}

export async function verifyPassword(
  email: string,
  password: string
): Promise<boolean> {
  const stored = await getPasswordHash(email);
  const hash = stored ?? DUMMY_HASH;
  const matches = await bcrypt.compare(password, hash);
  return Boolean(stored) && matches;
}
