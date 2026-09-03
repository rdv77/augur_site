import { createFileRoute, Link } from "@tanstack/react-router";
import { ProductArticle, ProductCta, ProductJumpNav } from "@/components/product-page";
import { POLITICAL_PRODUCTS } from "@/data/products";

export const Route = createFileRoute("/products/political")({
  head: () => ({ meta: [{ title: "Political consulting – Auguria" }] }),
  component: PoliticalProducts,
});

function PoliticalProducts() {
  return (
    <main className="page-enter pt-16">
      <section className="py-16">
        <div className="mx-auto max-w-7xl px-5 sm:px-6">
          <p className="mb-3 text-xs uppercase tracking-[0.18em] text-accent">
            <Link to="/products" className="hover:underline">
              Products
            </Link>
            <span className="text-subtle"> / </span>
            Political consulting
          </p>
          <h1 className="text-4xl font-semibold sm:text-5xl">Political consulting</h1>
          <p className="mt-4 max-w-2xl text-lg text-muted">
            Tools for campaigns, headquarters, and political risk assessment. Click a title — the page will scroll to the description.
          </p>
          <ProductJumpNav items={POLITICAL_PRODUCTS} to="/products/political" />
        </div>
      </section>

      <div className="space-y-28 pb-20">
        {POLITICAL_PRODUCTS.map((p, i) => (
          <ProductArticle key={p.id} product={p} reverse={i % 2 === 1} />
        ))}
      </div>

      <div className="pb-10 text-center">
        <Link to="/products/socio" className="text-sm text-accent hover:underline">
          Go to socio-economic products
        </Link>
      </div>
      <ProductCta />
    </main>
  );
}