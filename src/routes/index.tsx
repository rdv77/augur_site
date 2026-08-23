import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { ContactForm } from "@/components/contact-form";
import { NEWS, PARADIGMS, POLITICAL_PRODUCTS, SOCIO_PRODUCTS, MARKETING_PRODUCTS, formatNewsDate, newsByDateDesc } from "@/data/site";

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
          <p className="mx-auto mt-10 max-w-xl text-xl font-medium leading-snug text-fg sm:text-2xl">
            Консалтинг на базе искусственного интеллекта
          </p>
          <p className="mx-auto mt-4 max-w-lg text-base leading-relaxed text-muted sm:text-lg">
            Мы превращаем хаос общественных настроений в точные управленческие решения
          </p>
          <div className="mt-10 flex flex-wrap justify-center gap-3">
            <Link
              to="/products"
              className="inline-flex h-12 items-center gap-2 rounded-md bg-accent px-6 text-sm font-medium text-accent-fg hover:bg-accent-dim"
            >
              Смотреть продукты <ArrowRight className="size-4" />
            </Link>
            <Link
              to="/about"
              className="inline-flex h-12 items-center rounded-md border border-border-strong px-6 text-sm font-medium text-fg hover:border-accent/40"
            >
              О компании
            </Link>
          </div>
        </div>
      </section>

      <section id="mission" className="scroll-mt-24 py-24">
        <div className="mx-auto max-w-7xl px-5 sm:px-6">
          <p className="mb-3 text-xs uppercase tracking-[0.18em] text-accent">Миссия</p>
          <h2 className="max-w-3xl text-3xl font-semibold sm:text-4xl">
            Между обществом и знанием о нём — три вызова
          </h2>
          <div className="mt-12 grid gap-5 md:grid-cols-3">
            {[
              { t: "Вызов времени", d: "Общество меняется за дни. Исследования занимают месяцы. К моменту результата картина уже другая." },
              { t: "Вызов масштаба", d: "Общество говорит миллионами голосов, исследователь слышит выборку." },
              { t: "Вызов решения", d: "Решения о людях принимаются раньше, чем появляются знания о них. Цена ошибки — доверие, деньги, время." },
            ].map((c) => (
              <div key={c.t} className="rounded-xl border border-border bg-surface p-7">
                <h3 className="text-lg font-medium text-gold">{c.t}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">{c.d}</p>
              </div>
            ))}
          </div>
          <p className="mt-14 text-center text-lg text-muted">
            Auria существует, чтобы преодолеть все три вызова
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
            <p className="mb-3 text-xs uppercase tracking-[0.18em] text-accent">О компании</p>
            <h2 className="text-3xl font-semibold sm:text-4xl">Кто мы</h2>
            <p className="mt-5 max-w-2xl text-lg leading-relaxed text-fg/90">
              <span className="text-gold">«Auria»</span> — консалтинговая компания нового поколения. Мы объединяем глубокую социологическую экспертизу с передовыми ИИ-технологиями.
            </p>
            <div className="mt-8 grid gap-3 sm:grid-cols-3">
              {[
                ["Социологическая экспертиза", "Десятилетия работы с общественными данными и методологией исследований"],
                ["ИИ-технологии", "LLM, мультиагентное моделирование, предиктивная аналитика"],
                ["Миссия", "Понимать общество быстрее, глубже и точнее"],
              ].map(([t, d]) => (
                <div key={t} className="rounded-lg border border-border bg-bg/70 p-4 backdrop-blur-sm">
                  <h3 className="font-medium">{t}</h3>
                  <p className="mt-1 text-sm text-muted">{d}</p>
                </div>
              ))}
            </div>
            <Link to="/about" className="mt-8 inline-flex items-center gap-2 text-sm text-accent hover:underline">
              Подробнее о компании <ArrowRight className="size-4" />
            </Link>
          </div>
        </div>
      </section>

      <section className="py-24">
        <div className="mx-auto max-w-7xl px-5 sm:px-6">
          <div className="mx-auto mb-12 max-w-2xl text-center">
            <p className="mb-3 text-xs uppercase tracking-[0.18em] text-accent">Экспертиза</p>
            <h2 className="text-3xl font-semibold sm:text-4xl">
              Наши 4 парадигмы использования технологий искусственного интеллекта
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
                <p className="text-xs tracking-wide text-accent">Парадигма {p.num}</p>
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
            <p className="mb-3 text-xs uppercase tracking-[0.18em] text-accent">Продукты</p>
            <h2 className="text-3xl font-semibold sm:text-4xl">Три направления решений</h2>
          </div>
          <div className="grid gap-6 lg:grid-cols-3">
            <ProductRubric
              to="/products/socio"
              image="/assets/product-digital-twin.jpg"
              title="Социально-экономические продукты"
              products={SOCIO_PRODUCTS}
            />
            <ProductRubric
              to="/products/political"
              image="/assets/product-strategist.jpg"
              title="Политический консалтинг"
              products={POLITICAL_PRODUCTS}
            />
            <ProductRubric
              to="/products/marketing"
              image="/assets/agents.jpg"
              title="Маркетинговые продукты"
              products={MARKETING_PRODUCTS}
            />
          </div>
        </div>
      </section>

      <section className="py-24">
        <div className="mx-auto max-w-7xl px-5 sm:px-6">
          <div className="mb-10 flex items-end justify-between gap-4">
            <div>
              <p className="mb-3 text-xs uppercase tracking-[0.18em] text-accent">Новости</p>
              <h2 className="text-3xl font-semibold">Материалы и аналитика</h2>
            </div>
            <Link to="/news" className="text-sm text-accent hover:underline">
              Все материалы
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
            Готовы видеть будущее{" "}
            <span className="text-accent">до того, как оно наступит?</span>
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-muted">
            Оставьте заявку — обсудим задачу и покажем, как решения работают на практике.
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
              <Link
                to={to}
                hash={p.id}
                className="flex gap-2 transition-colors hover:text-fg"
              >
                <span className="mt-2 size-1 shrink-0 rounded-full bg-accent" />
                {p.title}
              </Link>
            </li>
          ))}
        </ul>
        <Link to={to} className="mt-6 inline-flex items-center gap-2 text-sm text-accent">
          Смотреть все продукты <ArrowRight className="size-4" />
        </Link>
      </div>
    </div>
  );
}
