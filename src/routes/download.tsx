import { createFileRoute } from "@tanstack/react-router";
import { Download } from "lucide-react";

export const Route = createFileRoute("/download")({
  head: () => ({ meta: [{ title: "Скачать проект — Auria" }] }),
  component: DownloadPage,
});

function DownloadPage() {
  return (
    <main className="page-enter flex min-h-[80vh] items-center justify-center pt-16">
      <div className="mx-auto max-w-lg px-5 py-20 text-center">
        <p className="mb-3 text-xs uppercase tracking-[0.18em] text-accent">Архив проекта</p>
        <h1 className="text-4xl font-semibold">Скачать сайт Auria</h1>
        <p className="mt-4 text-muted">
          ZIP-архив со всем кодом, текстами и иллюстрациями. Без node_modules — их нужно поставить у себя командой npm install.
        </p>
        <a
          href="/api/download-project"
          download="auria-site.zip"
          target="_blank"
          rel="noreferrer"
          className="mt-10 inline-flex h-12 items-center gap-2 rounded-md bg-accent px-6 text-sm font-medium text-accent-fg hover:bg-accent-dim"
        >
          <Download className="size-4" />
          Скачать auria-site.zip
        </a>
        <p className="mt-8 text-left text-sm leading-relaxed text-subtle">
          После скачивания на компьютере:
          <br />
          1. Распакуйте архив
          <br />
          2. В папке auria-site выполните npm install
          <br />
          3. Затем npm run dev — сайт откроется локально
        </p>
      </div>
    </main>
  );
}
