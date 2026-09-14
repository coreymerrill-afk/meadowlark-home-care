import assert from "node:assert/strict";
import { afterEach, describe, it } from "node:test";

import {
  applyInbox,
  DEFAULT_FROM_EMAIL,
  publicFromEmail,
  publicSendFailureMessage,
  resendErrorDetails,
} from "@/lib/mail";

const previousFrom = process.env.CONTACT_FROM_EMAIL;

afterEach(() => {
  if (previousFrom === undefined) {
    delete process.env.CONTACT_FROM_EMAIL;
  } else {
    process.env.CONTACT_FROM_EMAIL = previousFrom;
  }
});

describe("applyInbox", () => {
  it("always sends employment applications to HR", () => {
    assert.equal(applyInbox(), "hr@meadowlarkhomecare.com");
  });
});

describe("publicFromEmail", () => {
  it("uses CONTACT_FROM_EMAIL when set", () => {
    process.env.CONTACT_FROM_EMAIL =
      "Meadowlark Home Care <noreply@meadowlarkhomecare.com>";
    assert.equal(
      publicFromEmail(),
      "Meadowlark Home Care <noreply@meadowlarkhomecare.com>"
    );
  });

  it("falls back to the default Meadowlark from address", () => {
    delete process.env.CONTACT_FROM_EMAIL;
    assert.equal(publicFromEmail(), DEFAULT_FROM_EMAIL);
  });
});

describe("resendErrorDetails", () => {
  it("keeps message, name, and statusCode for server logs", () => {
    assert.deepEqual(
      resendErrorDetails({
        name: "validation_error",
        message: "Invalid `from` field",
        statusCode: 403,
      }),
      {
        message: "Invalid `from` field",
        name: "validation_error",
        statusCode: 403,
      }
    );
  });

  it("redacts Resend API keys if they appear in a message", () => {
    const details = resendErrorDetails({
      message: "Unauthorized key re_abc123DEF456",
      statusCode: 401,
    });
    assert.equal(details.message.includes("re_abc123DEF456"), false);
    assert.match(details.message, /\[redacted\]/);
  });
});

describe("publicSendFailureMessage", () => {
  it("does not leak Resend codes to the visitor", () => {
    const message = publicSendFailureMessage(
      { name: "validation_error", message: "Invalid API key", statusCode: 401 },
      { phone: "(406) 926-3447", email: "hr@meadowlarkhomecare.com" }
    );
    assert.doesNotMatch(message, /validation_error|401|Invalid API key/);
    assert.match(message, /Email delivery is unavailable right now/);
    assert.match(message, /hr@meadowlarkhomecare.com/);
  });

  it("keeps a generic fallback for unknown errors", () => {
    const message = publicSendFailureMessage(new Error("boom"), {
      phone: "(406) 926-3447",
    });
    assert.match(message, /We could not send that just now/);
    assert.doesNotMatch(message, /boom/);
  });
});
