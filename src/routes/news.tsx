import { createFileRoute } from "@tanstack/react-router";
import { formatNewsDate, newsByDateDesc } from "@/data/site";

export const Route = createFileRoute("/news")({
  head: () => ({ meta: [{ title: "Новости — Auria" }] }),
  component: News,
});

function News() {
  const items = newsByDateDesc();

  return (
    <main className="page-enter pt-16">
      <section className="py-16">
        <div className="mx-auto max-w-7xl px-5 sm:px-6">
          <h1 className="text-4xl font-semibold">Новости и материалы</h1>
          <p className="mt-4 max-w-2xl text-lg text-muted">
            Аналитика и публикации команды Auria. Материалы отсортированы по дате публикации — сначала новые.
          </p>
          <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {items.map((n) => (
              <article
                key={n.id}
                id={n.id}
                className="scroll-mt-24 rounded-xl border border-border bg-surface p-7"
              >
                <p className="text-xs text-subtle">{formatNewsDate(n.publishedAt)}</p>
                <h2 className="mt-3 text-xl font-medium">{n.title}</h2>
                <p className="mt-3 text-sm leading-relaxed text-muted">{n.excerpt}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
