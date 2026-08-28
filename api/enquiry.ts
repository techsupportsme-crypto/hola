/*
 * Vercel serverless function: POST /api/enquiry
 * Receives contact-form leads and emails them to the site owner via Resend.
 *
 * Required environment variables (set in the Vercel project settings):
 *   RESEND_API_KEY    — API key from https://resend.com
 *   ENQUIRY_TO_EMAIL  — where leads are delivered
 *   ENQUIRY_FROM_EMAIL — verified sender (falls back to onboarding@resend.dev)
 */

import { z } from "zod";

const enquirySchema = z.object({
  firstName: z.string().min(1),
  lastName: z.string().min(1),
  email: z.string().email(),
  mobile: z.string().optional(),
  message: z.string().optional(),
  source: z.enum(["brochure", "villa", "contact"]).default("contact"),
  villaName: z.string().optional(),
});

export default async function handler(req: any, res: any) {
  if (req.method !== "POST") {
    res.status(405).json({ error: "Method not allowed" });
    return;
  }

  const parsed = enquirySchema.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: "Invalid enquiry payload" });
    return;
  }
  const input = parsed.data;

  const apiKey = process.env.RESEND_API_KEY;
  const toEmail = process.env.ENQUIRY_TO_EMAIL;
  if (!apiKey || !toEmail) {
    console.error(
      "[enquiry] RESEND_API_KEY / ENQUIRY_TO_EMAIL not configured — lead NOT delivered:",
      JSON.stringify(input)
    );
    res.status(502).json({ error: "Enquiry service not configured" });
    return;
  }

  const sourceLabel =
    input.source === "brochure"
      ? "Brochure Download"
      : input.source === "villa"
        ? `Villa Enquiry — ${input.villaName ?? "Unknown"}`
        : "Contact Form";

  const lines = [
    `Name: ${input.firstName} ${input.lastName}`,
    `Email: ${input.email}`,
    input.mobile ? `Mobile: ${input.mobile}` : null,
    input.message ? `Message: ${input.message}` : null,
  ].filter(Boolean);

  const resendResp = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: process.env.ENQUIRY_FROM_EMAIL ?? "onboarding@resend.dev",
      to: [toEmail],
      reply_to: input.email,
      subject: `New Hola Paje Lead — ${sourceLabel}`,
      text: lines.join("\n"),
    }),
  });

  if (!resendResp.ok) {
    const body = await resendResp.text().catch(() => "");
    console.error(`[enquiry] Resend error ${resendResp.status}: ${body}`);
    res.status(502).json({ error: "Failed to deliver enquiry" });
    return;
  }

  res.status(200).json({ success: true });
}
