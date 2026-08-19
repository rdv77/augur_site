import { createFileRoute, Link } from "@tanstack/react-router";

export const Route = createFileRoute("/about")({
  head: () => ({ meta: [{ title: "О компании — Auria" }] }),
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
          <p className="mb-3 text-xs uppercase tracking-[0.18em] text-accent">О компании</p>
          <h1 className="text-4xl font-semibold sm:text-5xl">Кто мы</h1>
          <p className="mt-6 max-w-2xl text-xl leading-relaxed text-fg/90">
            «Auria» — консалтинговая компания нового поколения. Мы объединяем глубокую социологическую экспертизу с передовыми ИИ-технологиями.
          </p>
          <div className="mt-6 max-w-2xl space-y-4 leading-relaxed text-muted">
            <p>
              Мы работаем на стыке классической социологии и искусственного интеллекта. Наши решения позволяют заказчикам видеть общественные процессы не постфактум, а в режиме реального времени — и даже прогнозировать их развитие.
            </p>
            <p>
              Большие языковые модели (LLM), мультиагентное моделирование и предиктивная аналитика дают нам скорость машины. Десятилетия социологической экспертизы — глубину понимания человека и общества.
            </p>
          </div>
        </div>
      </section>

      <section className="pb-24 pt-10">
        <div className="mx-auto grid max-w-7xl gap-5 px-5 sm:px-6 md:grid-cols-3">
          {[
            ["Социологическая экспертиза", "Десятилетия работы с общественными данными, методологией исследований, качественными и количественными методами."],
            ["ИИ-технологии", "LLM, мультиагентное моделирование, предиктивная аналитика. ИИ — полноценный инструмент исследования, а не модная приставка."],
            ["Миссия", "Дать заказчикам суперспособность понимать общество быстрее, глубже и точнее."],
          ].map(([t, d]) => (
            <div key={t} className="rounded-xl border border-border bg-surface p-7">
              <h2 className="text-xl font-medium">{t}</h2>
              <p className="mt-3 text-sm leading-relaxed text-muted">{d}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="border-t border-border bg-bg-elevated py-16 text-center">
        <h2 className="text-2xl font-semibold">Хотите узнать, как это работает на практике?</h2>
        <Link
          to="/"
          hash="contact"
          className="mt-6 inline-flex h-12 items-center rounded-md bg-accent px-6 text-sm font-medium text-accent-fg"
        >
          Оставить заявку
        </Link>
      </section>
    </main>
  );
}
