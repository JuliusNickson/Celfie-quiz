import { describe, it } from "node:test";
import assert from "node:assert/strict";
import {
  createAdminToken,
  passwordsMatch,
  verifyAdminToken,
} from "../config/adminAuth.js";

describe("adminAuth", () => {
  it("creates and verifies admin tokens", () => {
    const secret = "test-password";
    const token = createAdminToken(secret);

    assert.equal(verifyAdminToken(token, secret), true);
    assert.equal(verifyAdminToken(token, "wrong-password"), false);
    assert.equal(verifyAdminToken("invalid.token", secret), false);
  });

  it("compares passwords safely", () => {
    assert.equal(passwordsMatch("secret", "secret"), true);
    assert.equal(passwordsMatch("wrong", "secret"), false);
  });
});
