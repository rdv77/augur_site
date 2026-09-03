import { createFileRoute, Link } from "@tanstack/react-router";
import { BlendImage } from "@/components/blend-image";
import { PARADIGMS } from "@/data/site";

export const Route = createFileRoute("/technologies")({
  head: () => ({ meta: [{ title: "Technology – Auria" }] }),
  component: Technologies,
});

function Technologies() {
  return (
    <main className="page-enter pt-16">
      <section className="py-16">
        <div className="mx-auto max-w-7xl px-5 sm:px-6">
          <p className="mb-3 text-xs uppercase tracking-[0.18em] text-accent">Our expertise</p>
          <h1 className="max-w-3xl text-4xl font-semibold sm:text-5xl">
            Our four paradigms for using{" "}
            <span className="text-accent">artificial intelligence technology</span>
          </h1>
          <p className="mt-5 max-w-2xl text-lg text-muted">
            Each area delivers specific, measurable results for your business or department.
          </p>
        </div>
      </section>

      <section className="space-y-28 pb-28">
        {PARADIGMS.map((p, i) => {
          const reverse = i % 2 === 1;
          return (
            <article key={p.id} id={p.id} className="scroll-mt-24">
              <div className="mx-auto grid max-w-7xl items-center gap-10 px-5 sm:px-6 lg:grid-cols-2">
                <div className={reverse ? "lg:order-2" : ""}>
                  <p className="text-xs tracking-wide text-accent">PARADIGM {p.num}</p>
                  <h2 className="mt-3 text-3xl font-semibold">{p.title}</h2>
                  <p className="mt-4 text-lg leading-relaxed text-muted">{p.short}</p>
                </div>
                <BlendImage
                  src={p.image}
                  alt={p.title}
                  side={reverse ? "right" : "left"}
                  className={`aspect-[16/10] ${reverse ? "lg:order-1" : ""}`}
                />
              </div>
              <div className="mx-auto mt-10 max-w-7xl space-y-8 px-5 sm:px-6 lg:max-w-4xl">
                <Block title="Problem">{p.problem}</Block>
                <Block title="What this product is">{p.product}</Block>
                <div>
                  <h3 className="text-lg font-medium">How it's implemented</h3>
                  <ul className="mt-3 space-y-2 text-muted">
                    {p.points.map((pt) => (
                      <li key={pt} className="flex gap-2">
                        <span className="mt-2 size-1 shrink-0 rounded-full bg-accent" />
                        {pt}
                      </li>
                    ))}
                  </ul>
                </div>
                <Block title="Timelines and results">{p.result}</Block>
              </div>
            </article>
          );
        })}
      </section>

      <section className="border-t border-border bg-bg-elevated py-16 text-center">
        <Link
          to="/"
          hash="contact"
          className="inline-flex h-12 items-center rounded-md bg-accent px-6 text-sm font-medium text-accent-fg"
        >
          Discuss the task
        </Link>
      </section>
    </main>
  );
}

function Block({ title, children }: { title: string; children: string }) {
  return (
    <div>
      <h3 className="text-lg font-medium">{title}</h3>
      <p className="mt-2 leading-relaxed text-muted">{children}</p>
    </div>
  );
}