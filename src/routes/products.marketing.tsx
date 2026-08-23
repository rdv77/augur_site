import { createFileRoute, Link } from "@tanstack/react-router";
import { ProductArticle, ProductCta, ProductJumpNav } from "@/components/product-page";
import { MARKETING_PRODUCTS } from "@/data/products";

export const Route = createFileRoute("/products/marketing")({
  head: () => ({ meta: [{ title: "Маркетинговые продукты — Auguria" }] }),
  component: MarketingProducts,
});

function MarketingProducts() {
  return (
    <main className="page-enter pt-16">
      <section className="py-16">
        <div className="mx-auto max-w-7xl px-5 sm:px-6">
          <p className="mb-3 text-xs uppercase tracking-[0.18em] text-accent">
            <Link to="/products" className="hover:underline">
              Продукты
            </Link>
            <span className="text-subtle"> / </span>
            Маркетинговые
          </p>
          <h1 className="text-4xl font-semibold sm:text-5xl">Маркетинговые продукты</h1>
          <p className="mt-4 max-w-2xl text-lg text-muted">
            Коммерческое применение наших ИИ-движков: креативы, цены, запуски, тренды и конкуренты.
            Нажмите название — страница прокрутится к описанию.
          </p>
          <ProductJumpNav items={MARKETING_PRODUCTS} to="/products/marketing" />
        </div>
      </section>

      <div className="space-y-28 pb-20">
        {MARKETING_PRODUCTS.map((p, i) => (
          <ProductArticle key={p.id} product={p} reverse={i % 2 === 1} />
        ))}
      </div>

      <div className="pb-10 text-center">
        <Link to="/products/socio" className="text-sm text-accent hover:underline">
          Перейти к социально-экономическим продуктам
        </Link>
      </div>
      <ProductCta />
    </main>
  );
}
