import nodemailer from "nodemailer";

const {
  SMTP_HOST = "smtp.zoho.eu",
  SMTP_PORT = "465",
  SMTP_USER,
  SMTP_PASS,
  MAIL_FROM = "Auguria <info@auguria.biz>",
  MAIL_TO = "info@auguria.biz",
} = process.env;

export async function sendInquiryEmail(data: {
  name: string;
  contact: string;
  message?: string;
}) {
  if (!SMTP_USER || !SMTP_PASS) {
    console.warn("[mailer] SMTP not configured — email skipped");
    return;
  }

  const transporter = nodemailer.createTransport({
    host: SMTP_HOST,
    port: Number(SMTP_PORT),
    secure: Number(SMTP_PORT) === 465,
    auth: { user: SMTP_USER, pass: SMTP_PASS },
    connectionTimeout: 10000,
    greetingTimeout: 10000,
    socketTimeout: 15000,
  });

  const subject = `Новая заявка с auguria.biz — ${data.name}`;
  const text = [
    `Имя: ${data.name}`,
    `Контакт: ${data.contact}`,
    "",
    "Сообщение:",
    data.message || "(без сообщения)",
  ].join("\n");

  await transporter.sendMail({ from: MAIL_FROM, to: MAIL_TO, subject, text });
}