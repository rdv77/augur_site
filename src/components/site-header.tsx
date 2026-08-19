import { useState } from "react";
import { Link, useRouterState } from "@tanstack/react-router";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";

const LINKS = [
  { to: "/", hash: "problem", label: "Проблема" },
  { to: "/about", label: "О компании" },
  { to: "/technologies", label: "Технологии" },
  { to: "/products", label: "Продукты" },
  { to: "/news", label: "Новости" },
  { to: "/", hash: "contact", label: "Контакты" },
] as const;

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-border bg-bg-elevated/80 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-5 sm:px-6">
        <Link to="/" className="flex items-center gap-3">
          <span className="font-serif text-2xl font-semibold tracking-wide text-gold">Auria</span>
          <span className="hidden rounded-full border border-accent/25 px-2 py-0.5 text-[10px] uppercase tracking-[0.16em] text-accent/80 sm:inline">
            AI-Powered Strategy
          </span>
        </Link>

        <nav className="hidden items-center gap-7 text-sm text-muted lg:flex">
          {LINKS.map((l) => {
            const active = l.to !== "/" && pathname.startsWith(l.to);
            return (
              <Link
                key={l.label}
                to={l.to}
                hash={"hash" in l ? l.hash : undefined}
                className={cn(
                  "transition-colors hover:text-fg",
                  active && "text-accent",
                )}
              >
                {l.label}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-2">
          <Link
            to="/"
            hash="contact"
            className="hidden h-10 items-center rounded-md bg-accent px-4 text-sm font-medium text-accent-fg transition-colors hover:bg-accent-dim lg:inline-flex"
          >
            Оставить заявку
          </Link>
          <button
            type="button"
            className="inline-flex size-11 items-center justify-center rounded-md text-fg lg:hidden"
            aria-label={open ? "Закрыть меню" : "Открыть меню"}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>
      </div>

      {open && (
        <div className="border-t border-border bg-bg-elevated px-5 py-4 lg:hidden">
          <nav className="flex flex-col">
            {LINKS.map((l) => (
              <Link
                key={l.label}
                to={l.to}
                hash={"hash" in l ? l.hash : undefined}
                onClick={() => setOpen(false)}
                className="flex min-h-11 items-center border-b border-border text-base text-fg"
              >
                {l.label}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}
