import { useState } from "react";
import { Link, useRouterState } from "@tanstack/react-router";
import { Menu, X, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

const LINKS = [
  { to: "/", hash: "mission", label: "Миссия" },
  { to: "/about", label: "О компании" },
  { to: "/technologies", label: "Технологии" },
  {
    to: "/products",
    label: "Продукты",
    submenu: [
      { to: "/products/socio", label: "Социально-экономические" },
      { to: "/products/political", label: "Политический консалтинг" },
      { to: "/products/marketing", label: "Маркетинговые" },
    ],
  },
  { to: "/news", label: "Новости" },
  { to: "/", hash: "contact", label: "Контакты" },
] as const;

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const [productsOpen, setProductsOpen] = useState(false);
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-border bg-bg-elevated/80 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-5 sm:px-6">
        <Link to="/" className="flex items-center gap-3">
          <span className="font-serif text-2xl font-semibold tracking-wide text-gold">Auria</span>
        </Link>

        <nav className="hidden items-center gap-7 text-sm text-muted lg:flex">
          {LINKS.map((l) => {
            const active = l.to !== "/" && pathname.startsWith(l.to);
            const hasSubmenu = "submenu" in l;

            if (hasSubmenu) {
              return (
                <div
                  key={l.label}
                  className="relative"
                  onMouseEnter={() => setProductsOpen(true)}
                  onMouseLeave={() => setProductsOpen(false)}
                >
                  <Link
                    to={l.to}
                    className={cn(
                      "flex items-center gap-1 transition-colors hover:text-fg",
                      active && "text-accent",
                    )}
                  >
                    {l.label}
                    <ChevronDown className={cn("size-3.5 transition-transform", productsOpen && "rotate-180")} />
                  </Link>
                  {productsOpen && (
                    <div className="absolute left-0 top-full pt-2">
                      <div className="min-w-[200px] rounded-lg border border-border bg-bg-elevated p-2 shadow-lg">
                        {l.submenu.map((sub) => (
                          <Link
                            key={sub.to}
                            to={sub.to}
                            className={cn(
                              "block rounded-md px-3 py-2 text-sm transition-colors hover:bg-surface hover:text-fg",
                              pathname === sub.to && "text-accent",
                            )}
                          >
                            {sub.label}
                          </Link>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              );
            }

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
            {LINKS.map((l) => {
              const hasSubmenu = "submenu" in l;

              if (hasSubmenu) {
                return (
                  <div key={l.label} className="flex flex-col">
                    <Link
                      to={l.to}
                      onClick={() => setOpen(false)}
                      className="flex min-h-11 items-center border-b border-border text-base text-fg"
                    >
                      {l.label}
                    </Link>
                    <div className="ml-4 flex flex-col">
                      {l.submenu.map((sub) => (
                        <Link
                          key={sub.to}
                          to={sub.to}
                          onClick={() => setOpen(false)}
                          className="flex min-h-9 items-center text-sm text-muted hover:text-fg"
                        >
                          {sub.label}
                        </Link>
                      ))}
                    </div>
                  </div>
                );
              }

              return (
                <Link
                  key={l.label}
                  to={l.to}
                  hash={"hash" in l ? l.hash : undefined}
                  onClick={() => setOpen(false)}
                  className="flex min-h-11 items-center border-b border-border text-base text-fg"
                >
                  {l.label}
                </Link>
              );
            })}
          </nav>
        </div>
      )}
    </header>
  );
}
