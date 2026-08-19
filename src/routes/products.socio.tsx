import { createFileRoute, Link } from "@tanstack/react-router";
import { ProductArticle, ProductCta, ProductJumpNav } from "@/components/product-page";
import { SOCIO_PRODUCTS } from "@/data/products";

export const Route = createFileRoute("/products/socio")({
  head: () => ({ meta: [{ title: "Социально-экономические продукты — Auria" }] }),
  component: SocioProducts,
});

function SocioProducts() {
  return (
    <main className="page-enter pt-16">
      <section className="py-16">
        <div className="mx-auto max-w-7xl px-5 sm:px-6">
          <p className="mb-3 text-xs uppercase tracking-[0.18em] text-accent">
            <Link to="/products" className="hover:underline">
              Продукты
            </Link>
            <span className="text-subtle"> / </span>
            Социально-экономические
          </p>
          <h1 className="text-4xl font-semibold sm:text-5xl">Социально-экономические продукты</h1>
          <p className="mt-4 max-w-2xl text-lg text-muted">
            Решения для регионов, ведомств и корпораций. Нажмите название — страница прокрутится к описанию.
          </p>
          <ProductJumpNav items={SOCIO_PRODUCTS} to="/products/socio" />
        </div>
      </section>

      <div className="space-y-28 pb-20">
        {SOCIO_PRODUCTS.map((p, i) => (
          <ProductArticle key={p.id} product={p} reverse={i % 2 === 1} />
        ))}
      </div>

      <div className="pb-10 text-center">
        <Link to="/products/political" className="text-sm text-accent hover:underline">
          Перейти к политическому консалтингу
        </Link>
      </div>
      <ProductCta />
    </main>
  );
}
