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
      toast.success("Request submitted. We will get in touch with you.");
    } catch {
      toast.error("Could not send the request. Please try again.");
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
          <Label htmlFor="name">Name</Label>
          <Input id="name" name="name" required placeholder="How should we address you?" />
        </div>
        <div>
          <Label htmlFor="contact">Email or Telegram</Label>
          <Input id="contact" name="contact" required placeholder="Contact details" />
        </div>
        <div>
          <Label htmlFor="message">Briefly about the task</Label>
          <Textarea id="message" name="message" placeholder="Optional" />
        </div>
        <Button type="submit" className="w-full" size="lg" disabled={pending}>
          {pending ? "Sending…" : "Submit a request"}
        </Button>
      </div>
      <p className="mt-4 text-center text-xs text-subtle">
        By clicking the button, you agree to the{" "}
        <Link to="/privacy" className="text-accent hover:underline">
          privacy policy
        </Link>
      </p>
    </form>
  );
}