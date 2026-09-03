import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { getSql } from "@/lib/db";
import { sendInquiryEmail } from "@/lib/mailer";

const inquirySchema = z.object({
  name: z.string().trim().min(1).max(120),
  contact: z.string().trim().min(2).max(200),
  message: z.string().trim().max(2000).optional(),
});

export const submitInquiry = createServerFn({ method: "POST" })
  .validator((data: unknown) => inquirySchema.parse(data))
  .handler(async ({ data }) => {
    const sql = await getSql();
    const id = crypto.randomUUID();
    await sql`
      insert into inquiries (id, name, contact, message)
      values (${id}, ${data.name}, ${data.contact}, ${data.message ?? null})
    `;

    try {
      await sendInquiryEmail(data);
    } catch (err) {
      console.error("[inquiries] email notification failed:", err);
    }

    return { ok: true as const };
  });