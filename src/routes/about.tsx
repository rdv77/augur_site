import { createFileRoute, Link } from "@tanstack/react-router";

export const Route = createFileRoute("/about")({
  head: () => ({ meta: [{ title: "About us – Auguria" }] }),
  component: About,
});

function About() {
  return (
    <main className="page-enter pt-16">
      <section className="relative overflow-hidden">
        <img
          src="/assets/about-visual.jpg"
          alt=""
          className="absolute inset-0 h-full w-full object-cover object-[center_28%] opacity-40"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-bg via-bg/80 to-bg/50" />
        <div className="relative mx-auto max-w-7xl px-5 py-20 sm:px-6 sm:py-24">
          <p className="mb-3 text-xs uppercase tracking-[0.18em] text-accent">About us</p>
          <h1 className="text-4xl font-semibold sm:text-5xl">Who we are</h1>
          <p className="mt-6 max-w-2xl text-xl leading-relaxed text-fg/90">
            “Auguria” is a next-generation consulting company. We combine in-depth sociological expertise with cutting-edge AI technologies.
          </p>
          <div className="mt-6 max-w-2xl space-y-4 leading-relaxed text-muted">
            <p>
              We work at the intersection of classical sociology and artificial intelligence. Our solutions let clients see social processes not after the fact, but in real time — and even predict how they will unfold.
            </p>
            <p>
              Large language models (LLMs), multi-agent modeling, and predictive analytics give us the speed of a machine. Decades of sociological expertise give us the depth of understanding of people and society.
            </p>
          </div>
        </div>
      </section>

      <section className="pb-24 pt-10">
        <div className="mx-auto grid max-w-7xl gap-5 px-5 sm:px-6 md:grid-cols-3">
          {[
            ["Sociological expertise", "Decades of work with public data, research methodology, and qualitative and quantitative methods."],
            ["AI technologies", "LLMs, multi-agent modeling, predictive analytics. AI is a full-fledged research tool, not a trendy add-on."],
            ["Mission", "Giving clients the superpower to understand society faster, deeper, and more precisely."],
          ].map(([t, d]) => (
            <div key={t} className="rounded-xl border border-border bg-surface p-7">
              <h2 className="text-xl font-medium">{t}</h2>
              <p className="mt-3 text-sm leading-relaxed text-muted">{d}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="border-t border-border bg-bg-elevated py-16 text-center">
        <h2 className="text-2xl font-semibold">Want to see how it works in practice?</h2>
        <Link
          to="/"
          hash="contact"
          className="mt-6 inline-flex h-12 items-center rounded-md bg-accent px-6 text-sm font-medium text-accent-fg"
        >
          Submit a request
        </Link>
      </section>
    </main>
  );
}