import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";
import { ChevronUp, MoreHorizontal } from "lucide-react";
import { Markdown } from "@/components/markdown";
import { cn } from "@/lib/utils";
import type { Product } from "@/data/products";

type ProductsRoute = "/products/socio" | "/products/political" | "/products/marketing";

export function ProductJumpNav({
  items,
  to,
}: {
  items: readonly { id: string; title: string }[];
  to: ProductsRoute;
}) {
  return (
    <div className="mt-8 flex flex-wrap gap-2">
      {items.map((p) => (
        <Link
          key={p.id}
          to={to}
          hash={p.id}
          className="rounded-full border border-border bg-surface px-3 py-1.5 text-xs text-muted transition-colors hover:border-accent/40 hover:text-fg"
        >
          {p.title}
        </Link>
      ))}
    </div>
  );
}

export function ProductArticle({ product, reverse }: { product: Product; reverse?: boolean }) {
  const [open, setOpen] = useState(false);

  // Если пришли по якорю из jump-навигации — раскрываем нужный продукт
  useEffect(() => {
    if (typeof window !== "undefined" && window.location.hash === `#${product.id}`) {
      setOpen(true);
    }
  }, [product.id]);

  return (
    <article id={product.id} className="scroll-mt-24">
      <div className="grid gap-8 lg:grid-cols-2 lg:items-center">
        <div className={cn("relative overflow-hidden rounded-xl border border-border", reverse && "lg:order-2")}>
          <img src={product.image} alt="" className="h-64 w-full object-cover opacity-80 sm:h-72" />
          <div className="absolute inset-0 bg-gradient-to-t from-surface to-transparent" />
        </div>

        <div className={cn(reverse && "lg:order-1")}>
          <h2 className="text-2xl font-semibold sm:text-3xl">{product.title}</h2>
          <p className="mt-4 leading-relaxed text-muted">{product.description}</p>

          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            title={open ? "Свернуть" : "Подробнее"}
            className="mt-6 inline-flex size-11 items-center justify-center rounded-full border border-border text-muted transition-colors hover:border-accent/40 hover:text-accent"
          >
            {open ? <ChevronUp className="size-5" /> : <MoreHorizontal className="size-5" />}
          </button>
        </div>
      </div>

      {open && (
        <div className="mt-10 space-y-10 rounded-xl border border-border bg-surface p-7 sm:p-10">
          {product.sections.map((s) => (
            <section key={s.title}>
              <h3 className="text-xl font-medium text-gold">{s.title}</h3>
              <div className="mt-3 leading-relaxed text-muted">
                <Markdown>{s.content}</Markdown>
              </div>
            </section>
          ))}
          <div className="text-center">
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="inline-flex h-10 items-center gap-2 rounded-md border border-border px-4 text-sm text-muted transition-colors hover:border-accent/40 hover:text-fg"
            >
              <ChevronUp className="size-4" /> Свернуть
            </button>
          </div>
        </div>
      )}
    </article>
  );
}

export function ProductCta() {
  return (
    <section className="border-t border-border py-20">
      <div className="mx-auto max-w-3xl px-5 text-center sm:px-6">
        <h2 className="text-3xl font-semibold sm:text-4xl">
          Готовы видеть будущее <span className="text-accent">до того, как оно наступит?</span>
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-muted">
          Первая диагностическая сессия — бесплатно. Покажем на ваших данных, что умеют наши модели.
        </p>
        <Link
          to="/"
          hash="contact"
          className="mt-8 inline-flex h-12 items-center rounded-md bg-accent px-6 text-sm font-medium text-accent-fg transition-colors hover:bg-accent-dim"
        >
          Оставить заявку
        </Link>
      </div>
    </section>
  );
}
