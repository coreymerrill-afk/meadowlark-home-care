import assert from "node:assert/strict";
import { afterEach, describe, it } from "node:test";

import { getResendApiKey } from "@/lib/auth-env";

const previousAuth = process.env.AUTH_RESEND_KEY;
const previousResend = process.env.RESEND_API_KEY;

afterEach(() => {
  if (previousAuth === undefined) {
    delete process.env.AUTH_RESEND_KEY;
  } else {
    process.env.AUTH_RESEND_KEY = previousAuth;
  }
  if (previousResend === undefined) {
    delete process.env.RESEND_API_KEY;
  } else {
    process.env.RESEND_API_KEY = previousResend;
  }
});

describe("getResendApiKey", () => {
  it("prefers AUTH_RESEND_KEY over RESEND_API_KEY", () => {
    process.env.AUTH_RESEND_KEY = " auth-key ";
    process.env.RESEND_API_KEY = "resend-key";
    assert.equal(getResendApiKey(), "auth-key");
  });

  it("falls back to RESEND_API_KEY", () => {
    delete process.env.AUTH_RESEND_KEY;
    process.env.RESEND_API_KEY = " resend-key ";
    assert.equal(getResendApiKey(), "resend-key");
  });

  it("returns empty when neither key is set", () => {
    delete process.env.AUTH_RESEND_KEY;
    delete process.env.RESEND_API_KEY;
    assert.equal(getResendApiKey(), "");
  });
});
