import { Link } from "@tanstack/react-router";
import { BlendImage } from "@/components/blend-image";
import { Markdown } from "@/components/markdown";
import type { Product } from "@/data/products";

export function ProductJumpNav({
  items,
  to,
}: {
  items: Product[];
  to: "/products/socio" | "/products/political";
}) {
  return (
    <ul className="mt-8 grid gap-2 sm:grid-cols-2">
      {items.map((p) => (
        <li key={p.id}>
          <Link
            to={to}
            hash={p.id}
            className="flex gap-2 rounded-lg border border-border bg-surface px-4 py-3 text-sm text-muted transition-colors hover:border-accent/30 hover:text-fg"
          >
            <span className="mt-2 size-1.5 shrink-0 rounded-full bg-accent" />
            {p.title}
          </Link>
        </li>
      ))}
    </ul>
  );
}

export function ProductBanner({ title, image }: { title: string; image: string }) {
  return (
    <div className="relative mb-16 overflow-hidden rounded-xl">
      <img src={image} alt="" className="h-44 w-full object-cover opacity-50 sm:h-56" />
      <div className="absolute inset-0 bg-gradient-to-t from-bg via-bg/50 to-transparent" />
      <h2 className="absolute bottom-6 left-6 text-2xl font-semibold sm:text-3xl">{title}</h2>
    </div>
  );
}

export function ProductArticle({ product, reverse }: { product: Product; reverse: boolean }) {
  return (
    <article id={product.id} className="scroll-mt-24">
      <div className="mx-auto grid max-w-7xl items-center gap-10 px-5 sm:px-6 lg:grid-cols-2">
        <div className={reverse ? "lg:order-2" : ""}>
          <p className="text-xs tracking-wide text-accent">
            {product.category === "socio" ? "Социально-экономический продукт" : "Политический консалтинг"}
          </p>
          <h2 className="mt-3 text-3xl font-semibold">{product.title}</h2>
          <p className="mt-4 text-lg leading-relaxed text-muted">{product.description}</p>
        </div>
        <BlendImage
          src={product.image}
          alt={product.title}
          side={reverse ? "right" : "left"}
          className={`aspect-[16/10] ${reverse ? "lg:order-1" : ""}`}
        />
      </div>
      <div className="mx-auto mt-10 max-w-7xl space-y-8 px-5 sm:px-6 lg:max-w-4xl">
        {product.sections.map((section) => (
          <div key={section.title}>
            <h3 className="text-lg font-medium">{section.title}</h3>
            <Markdown source={section.content} />
          </div>
        ))}
      </div>
    </article>
  );
}

export function ProductCta() {
  return (
    <section className="border-t border-border bg-bg-elevated py-16 text-center">
      <h2 className="text-2xl font-semibold">Нужна комбинация решений?</h2>
      <Link
        to="/"
        hash="contact"
        className="mt-6 inline-flex h-12 items-center rounded-md bg-accent px-6 text-sm font-medium text-accent-fg"
      >
        Обсудить задачу
      </Link>
    </section>
  );
}
