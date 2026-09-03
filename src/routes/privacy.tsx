import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/privacy")({
  head: () => ({ meta: [{ title: "Политика конфиденциальности — Auguria" }] }),
  component: Privacy,
});

function Privacy() {
  return (
    <main className="page-enter pt-16">
      <article className="mx-auto max-w-3xl px-5 py-16 sm:px-6">
        <h1 className="text-4xl font-semibold">Политика конфиденциальности</h1>
        <p className="mt-6 leading-relaxed text-muted">
          Заполняя форму заявки на сайте, вы передаёте имя и контактные данные. Мы используем их исключительно для ответа на обращение и не передаём третьим лицам.
        </p>
        <p className="mt-4 leading-relaxed text-muted">
          Данные хранятся в защищённом контуре. По запросу мы удалим вашу заявку. Для вопросов: воспользуйтесь формой на главной странице.
        </p>
      </article>
    </main>
  );
}
