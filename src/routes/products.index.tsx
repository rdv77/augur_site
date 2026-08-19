import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { POLITICAL_PRODUCTS, SOCIO_PRODUCTS } from "@/data/products";

export const Route = createFileRoute("/products/")({
  head: () => ({ meta: [{ title: "Продукты — Auria" }] }),
  component: ProductsHub,
});

function ProductsHub() {
  return (
    <main className="page-enter pt-16">
      <section className="py-16">
        <div className="mx-auto max-w-7xl px-5 sm:px-6">
          <p className="mb-3 text-xs uppercase tracking-[0.18em] text-accent">Продукты</p>
          <h1 className="text-4xl font-semibold sm:text-5xl">Два направления решений</h1>
          <p className="mt-4 max-w-2xl text-lg text-muted">
            Выберите рубрику — откроется отдельная страница с описанием продуктов.
          </p>

          <div className="mt-12 grid gap-6 lg:grid-cols-2">
            <RubricCard
              to="/products/socio"
              image="/assets/product-digital-twin.jpg"
              title="Социально-экономические продукты"
              products={SOCIO_PRODUCTS}
            />
            <RubricCard
              to="/products/political"
              image="/assets/product-strategist.jpg"
              title="Политический консалтинг"
              products={POLITICAL_PRODUCTS}
            />
          </div>
        </div>
      </section>
    </main>
  );
}

function RubricCard({
  to,
  image,
  title,
  products,
}: {
  to: "/products/socio" | "/products/political";
  image: string;
  title: string;
  products: readonly { id: string; title: string }[];
}) {
  return (
    <div className="overflow-hidden rounded-xl border border-border bg-surface">
      <Link to={to} className="group block">
        <div className="relative h-44 overflow-hidden">
          <img
            src={image}
            alt=""
            className="h-full w-full object-cover opacity-70 transition-opacity group-hover:opacity-90"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-surface to-transparent" />
        </div>
      </Link>
      <div className="p-7">
        <Link to={to}>
          <h2 className="text-xl font-medium hover:text-accent">{title}</h2>
        </Link>
        <ul className="mt-4 space-y-2 text-sm text-muted">
          {products.map((p) => (
            <li key={p.id}>
              <Link to={to} hash={p.id} className="flex gap-2 transition-colors hover:text-fg">
                <span className="mt-2 size-1 shrink-0 rounded-full bg-accent" />
                {p.title}
              </Link>
            </li>
          ))}
        </ul>
        <Link to={to} className="mt-6 inline-flex items-center gap-2 text-sm text-accent">
          Открыть раздел <ArrowRight className="size-4" />
        </Link>
      </div>
    </div>
  );
}
