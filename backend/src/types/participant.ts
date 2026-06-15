import { z } from "zod";

export const registerParticipantSchema = z.object({
  name: z.string().trim().min(1, "Name is required"),
  email: z
    .string()
    .trim()
    .email("Invalid email address")
    .transform((value) => value.toLowerCase()),
  consentGiven: z.literal(true, {
    error: "Consent is required",
  }),
  prizeDrawConsent: z.boolean(),
});

export type RegisterParticipantInput = z.infer<typeof registerParticipantSchema>;
