import crypto from "node:crypto";

const TOKEN_TTL_MS = 8 * 60 * 60 * 1000;

type AdminTokenPayload = {
  role: "admin";
  exp: number;
};

export function getAdminPassword(): string | undefined {
  return process.env.ADMIN_PASSWORD?.trim() || undefined;
}

function signPayload(payload: string, secret: string): string {
  return crypto.createHmac("sha256", secret).update(payload).digest("hex");
}

export function createAdminToken(secret: string): string {
  const payload: AdminTokenPayload = {
    role: "admin",
    exp: Date.now() + TOKEN_TTL_MS,
  };
  const encoded = Buffer.from(JSON.stringify(payload)).toString("base64url");
  const signature = signPayload(encoded, secret);
  return `${encoded}.${signature}`;
}

export function verifyAdminToken(token: string, secret: string): boolean {
  const [encoded, signature] = token.split(".");

  if (!encoded || !signature) {
    return false;
  }

  const expectedSignature = signPayload(encoded, secret);

  const signatureBuffer = Buffer.from(signature);
  const expectedBuffer = Buffer.from(expectedSignature);

  if (signatureBuffer.length !== expectedBuffer.length) {
    return false;
  }

  if (!crypto.timingSafeEqual(signatureBuffer, expectedBuffer)) {
    return false;
  }

  try {
    const payload = JSON.parse(
      Buffer.from(encoded, "base64url").toString("utf8"),
    ) as AdminTokenPayload;

    return payload.role === "admin" && payload.exp > Date.now();
  } catch {
    return false;
  }
}

export function passwordsMatch(provided: string, expected: string): boolean {
  const providedHash = crypto.createHash("sha256").update(provided).digest();
  const expectedHash = crypto.createHash("sha256").update(expected).digest();
  return crypto.timingSafeEqual(providedHash, expectedHash);
}
