import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { ContactForm } from "@/components/contact-form";
import {
  MARKETING_PRODUCTS,
  NEWS,
  PARADIGMS,
  POLITICAL_PRODUCTS,
  SOCIO_PRODUCTS,
  formatNewsDate,
  newsByDateDesc,
} from "@/data/site";

export const Route = createFileRoute("/")({ component: Home });

function Home() {
  return (
    <main>
      <section className="relative flex min-h-[92vh] items-center justify-center overflow-hidden pt-16">
        <img
          src="/assets/prediction.jpg"
          alt=""
          className="pointer-events-none absolute inset-0 h-full w-full object-cover object-right opacity-50"
        />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-bg via-bg/85 to-bg/30" />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-bg via-transparent to-bg/40" />

        <div className="page-enter relative mx-auto max-w-4xl px-5 py-24 text-center sm:px-6">
          <h1 className="font-serif text-[4.25rem] font-semibold leading-none tracking-tight text-gold sm:text-8xl lg:text-9xl">
            Auria
          </h1>
          <p className="mt-5 text-[11px] uppercase tracking-[0.42em] text-accent/90 sm:text-xs">
            AI-powered consulting
          </p>
          <p className="mx-auto mt-10 max-w-xl text-xl font-medium leading-snug text-fg sm:text-2xl">
            We transform the chaos of public sentiment into precise management decisions
          </p>
          <div className="mt-10 flex flex-wrap justify-center gap-3">
            <Link
              to="/products"
              className="inline-flex h-12 items-center gap-2 rounded-md bg-accent px-6 text-sm font-medium text-accent-fg hover:bg-accent-dim"
            >
              See products <ArrowRight className="size-4" />
            </Link>
            <Link
              to="/about"
              className="inline-flex h-12 items-center rounded-md border border-border-strong px-6 text-sm font-medium text-fg hover:border-accent/40"
            >
              About us
            </Link>
          </div>
        </div>
      </section>

      <section id="mission" className="scroll-mt-24 py-24">
        <div className="mx-auto max-w-7xl px-5 sm:px-6">
          <p className="mb-3 text-xs uppercase tracking-[0.18em] text-accent">Mission</p>
          <h2 className="max-w-3xl text-3xl font-semibold sm:text-4xl">
            Between society and the knowledge of it — three challenges
          </h2>
          <div className="mt-12 grid gap-5 md:grid-cols-3">
            {[
              { t: "Challenge of time", d: "Society changes in days. Studies take months. By the time the results arrive, the picture has already changed." },
              { t: "Challenge of scale", d: "Society speaks with millions of voices; the researcher hears only a sample." },
              { t: "Challenge of decisions", d: "Decisions about people are made before knowledge about them appears. The cost of failure is trust, time, and money." },
            ].map((c) => (
              <div key={c.t} className="rounded-xl border border-border bg-surface p-7">
                <h3 className="text-lg font-medium">{c.t}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">{c.d}</p>
              </div>
            ))}
          </div>
          <p className="mt-14 text-center text-lg text-muted">
            <span className="text-accent">Auria</span> exists to overcome all three challenges.
          </p>
        </div>
      </section>

      <section className="border-y border-border">
        <div className="relative overflow-hidden">
          <img
            src="/assets/about-visual.jpg"
            alt=""
            className="absolute inset-0 h-full w-full object-cover object-[center_30%] opacity-45"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-bg via-bg/80 to-bg/55" />
          <div className="relative mx-auto max-w-7xl px-5 py-20 sm:px-6 sm:py-24">
            <p className="mb-3 text-xs uppercase tracking-[0.18em] text-accent">About us</p>
            <h2 className="text-3xl font-semibold sm:text-4xl">Who we are</h2>
            <p className="mt-5 max-w-2xl text-lg leading-relaxed text-fg/90">
              Society is the most complex object humankind has ever tried to understand: it is made of ourselves and changes while we look at it. Sociology has learned to see structure in this flux, but always paid for it with time. The sociologist worked with a photograph — accurate, but already outdated by the time it was developed.
            </p>
            <p className="mt-4 max-w-2xl text-lg leading-relaxed text-fg/90">
              <span className="text-gold">“Auria”</span> emerged to close this gap. For us, artificial intelligence is not a substitute for human understanding — it is a new lens for it. The telescope did not cancel astronomy — it revealed what had always been close by, yet invisible.
            </p>
            <div className="mt-8 grid gap-3 sm:grid-cols-3">
              {[
                ["Sociological expertise", "Decades of work with public data and research methodology."],
                ["AI technologies", "LLMs, multi-agent modeling, predictive analytics."],
                ["Mission", "Understanding society faster, deeper, and more precisely."],
              ].map(([t, d]) => (
                <div key={t} className="rounded-lg border border-border bg-bg/70 p-4 backdrop-blur-sm">
                  <h3 className="font-medium">{t}</h3>
                  <p className="mt-1 text-sm text-muted">{d}</p>
                </div>
              ))}
            </div>
            <Link to="/about" className="mt-8 inline-flex items-center gap-2 text-sm text-accent hover:underline">
              More about the company <ArrowRight className="size-4" />
            </Link>
          </div>
        </div>
      </section>

      <section className="py-24">
        <div className="mx-auto max-w-7xl px-5 sm:px-6">
          <div className="mx-auto mb-12 max-w-2xl text-center">
            <p className="mb-3 text-xs uppercase tracking-[0.18em] text-accent">Expertise</p>
            <h2 className="text-3xl font-semibold sm:text-4xl">
              Our four paradigms for using artificial intelligence technology
            </h2>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            {PARADIGMS.map((p) => (
              <Link
                key={p.id}
                to="/technologies"
                hash={p.id}
                className="rounded-xl border border-border bg-surface p-7 transition-colors hover:border-accent/30"
              >
                <p className="text-xs tracking-wide text-accent">Paradigm {p.num}</p>
                <h3 className="mt-2 text-lg font-medium">{p.title}</h3>
                <p className="mt-2 text-sm text-muted">{p.short}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section id="products" className="scroll-mt-24 border-y border-border bg-bg-elevated py-24">
        <div className="mx-auto max-w-7xl px-5 sm:px-6">
          <div className="mx-auto mb-12 max-w-2xl text-center">
            <p className="mb-3 text-xs uppercase tracking-[0.18em] text-accent">Products</p>
            <h2 className="text-3xl font-semibold sm:text-4xl">Three solution areas</h2>
          </div>
          <div className="grid gap-6 lg:grid-cols-3">
            <ProductRubric
              to="/products/socio"
              image="/assets/product-digital-twin.jpg"
              title="Socio-economic products"
              products={SOCIO_PRODUCTS}
            />
            <ProductRubric
              to="/products/political"
              image="/assets/product-strategist.jpg"
              title="Political consulting"
              products={POLITICAL_PRODUCTS}
            />
            <ProductRubric
              to="/products/marketing"
              image="/assets/agents.jpg"
              title="Marketing products"
              products={MARKETING_PRODUCTS}
            />
          </div>
        </div>
      </section>

      <section className="py-24">
        <div className="mx-auto max-w-7xl px-5 sm:px-6">
          <div className="mb-10 flex items-end justify-between gap-4">
            <div>
              <p className="mb-3 text-xs uppercase tracking-[0.18em] text-accent">News</p>
              <h2 className="text-3xl font-semibold">Materials and analytics</h2>
            </div>
            <Link to="/news" className="text-sm text-accent hover:underline">
              All materials
            </Link>
          </div>
          <div className="grid gap-4 md:grid-cols-3">
            {newsByDateDesc(NEWS).map((n) => (
              <Link
                key={n.id}
                to="/news"
                hash={n.id}
                className="rounded-xl border border-border bg-surface p-6 transition-colors hover:border-accent/30"
              >
                <p className="text-xs text-subtle">{formatNewsDate(n.publishedAt)}</p>
                <h3 className="mt-3 text-lg font-medium">{n.title}</h3>
                <p className="mt-2 line-clamp-2 text-sm text-muted">{n.excerpt}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section id="contact" className="scroll-mt-24 border-t border-border py-24">
        <div className="mx-auto max-w-3xl px-5 text-center sm:px-6">
          <h2 className="text-3xl font-semibold sm:text-4xl">
            Ready to see the future <span className="text-accent">before it arrives?</span>
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-muted">
            Submit a request — we'll discuss your task and show how our solutions work in practice.
          </p>
          <div className="mt-10">
            <ContactForm />
          </div>
        </div>
      </section>
    </main>
  );
}

function ProductRubric({
  to,
  image,
  title,
  products,
}: {
  to: "/products/socio" | "/products/political" | "/products/marketing";
  image: string;
  title: string;
  products: readonly { id: string; title: string }[];
}) {
  return (
    <div className="overflow-hidden rounded-xl border border-border bg-surface">
      <Link to={to} className="group block">
        <div className="relative h-44 overflow-hidden">
          <img src={image} alt="" className="h-full w-full object-cover opacity-70 transition-opacity group-hover:opacity-90" />
          <div className="absolute inset-0 bg-gradient-to-t from-surface to-transparent" />
        </div>
      </Link>
      <div className="p-7">
        <Link to={to}>
          <h3 className="text-xl font-medium hover:text-accent">{title}</h3>
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
          See all products <ArrowRight className="size-4" />
        </Link>
      </div>
    </div>
  );
}