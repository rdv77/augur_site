import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input, Label, Textarea } from "@/components/ui/input";
import { submitInquiry } from "@/lib/inquiries";

export function ContactForm() {
  const [pending, setPending] = useState(false);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const fd = new FormData(form);
    setPending(true);
    try {
      await submitInquiry({
        data: {
          name: String(fd.get("name") ?? ""),
          contact: String(fd.get("contact") ?? ""),
          message: String(fd.get("message") ?? ""),
        },
      });
      form.reset();
      toast.success("Заявка отправлена. Мы свяжемся с вами.");
    } catch {
      toast.error("Не удалось отправить. Попробуйте ещё раз.");
    } finally {
      setPending(false);
    }
  }

  return (
    <form
      onSubmit={onSubmit}
      className="mx-auto w-full max-w-lg rounded-xl border border-border bg-surface p-6 text-left sm:p-8"
    >
      <div className="space-y-4">
        <div>
          <Label htmlFor="name">Имя</Label>
          <Input id="name" name="name" required placeholder="Как к вам обращаться" />
        </div>
        <div>
          <Label htmlFor="contact">Email или Telegram</Label>
          <Input id="contact" name="contact" required placeholder="Для связи" />
        </div>
        <div>
          <Label htmlFor="message">Кратко о задаче</Label>
          <Textarea id="message" name="message" placeholder="Опционально" />
        </div>
        <Button type="submit" className="w-full" size="lg" disabled={pending}>
          {pending ? "Отправка…" : "Отправить заявку"}
        </Button>
      </div>
      <p className="mt-4 text-center text-xs text-subtle">
        Нажимая кнопку, вы соглашаетесь с{" "}
        <Link to="/privacy" className="text-accent hover:underline">
          политикой конфиденциальности
        </Link>
      </p>
    </form>
  );
}
