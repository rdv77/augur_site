import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { getSql } from "@/lib/db";
import { sendInquiryEmail } from "@/lib/mailer";

const inquirySchema = z.object({
  name: z.string().trim().min(1).max(120),
  contact: z.string().trim().min(2).max(200),
  message: z.string().trim().max(2000).optional(),
});

function withTimeout<T>(p: Promise<T>, ms: number): Promise<T> {
  return Promise.race([
    p,
    new Promise<never>((_, reject) =>
      setTimeout(() => reject(new Error("db timeout")), ms),
    ),
  ]);
}

export const submitInquiry = createServerFn({ method: "POST" })
  .validator((data: unknown) => inquirySchema.parse(data))
  .handler(async ({ data }) => {
    // 1) Письмо — критичный путь: если упадёт, форма покажет ошибку
    await sendInquiryEmail(data);

    // 2) БД — best effort: зависание или ошибка не блокируют ответ
    try {
      const sql = await withTimeout(getSql(), 5000);
      const id = crypto.randomUUID();
      await withTimeout(
        sql`
          insert into inquiries (id, name, contact, message)
          values (${id}, ${data.name}, ${data.contact}, ${data.message ?? null})
        `,
        5000,
      );
    } catch (err) {
      console.error("[inquiries] db save skipped:", err);
    }

    return { ok: true as const };
  });