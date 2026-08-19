import type { ReactNode } from "react";

function inline(text: string): ReactNode[] {
  return text.split(/(\*\*[^*]+\*\*)/g).map((part, i) => {
    const m = part.match(/^\*\*(.+)\*\*$/);
    if (m) {
      return (
        <strong key={i} className="font-medium text-fg">
          {m[1]}
        </strong>
      );
    }
    return part;
  });
}

export function Markdown({ source }: { source: string }) {
  if (!source.trim()) {
    return (
      <p className="rounded-lg border border-dashed border-border px-4 py-3 text-sm text-subtle">
        Текст раздела будет добавлен в Markdown-файл продукта.
      </p>
    );
  }

  const lines = source.replace(/\r\n/g, "\n").split("\n");
  const blocks: ReactNode[] = [];
  let i = 0;
  let k = 0;

  while (i < lines.length) {
    const line = lines[i];
    if (!line.trim()) {
      i += 1;
      continue;
    }
    if (line.startsWith("### ")) {
      blocks.push(
        <h4 key={k++} className="mt-5 text-base font-medium text-fg">
          {line.slice(4)}
        </h4>,
      );
      i += 1;
      continue;
    }
    if (line.trim().startsWith("- ") || line.trim().startsWith("* ")) {
      const items: string[] = [];
      while (i < lines.length && /^\s*[-*]\s+/.test(lines[i])) {
        items.push(lines[i].replace(/^\s*[-*]\s+/, ""));
        i += 1;
      }
      blocks.push(
        <ul key={k++} className="mt-3 space-y-2 text-muted">
          {items.map((item, idx) => (
            <li key={idx} className="flex gap-2">
              <span className="mt-2 size-1 shrink-0 rounded-full bg-accent" />
              <span>{inline(item)}</span>
            </li>
          ))}
        </ul>,
      );
      continue;
    }
    if (/^\d+\.\s+/.test(line.trim())) {
      const items: string[] = [];
      while (i < lines.length && /^\s*\d+\.\s+/.test(lines[i])) {
        items.push(lines[i].replace(/^\s*\d+\.\s+/, ""));
        i += 1;
      }
      blocks.push(
        <ol key={k++} className="mt-3 list-decimal space-y-2 pl-5 text-muted">
          {items.map((item, idx) => (
            <li key={idx}>{inline(item)}</li>
          ))}
        </ol>,
      );
      continue;
    }
    const para: string[] = [line];
    i += 1;
    while (
      i < lines.length &&
      lines[i].trim() &&
      !lines[i].startsWith("### ") &&
      !lines[i].trim().startsWith("- ") &&
      !lines[i].trim().startsWith("* ") &&
      !/^\d+\.\s+/.test(lines[i].trim())
    ) {
      para.push(lines[i]);
      i += 1;
    }
    blocks.push(
      <p key={k++} className="mt-3 leading-relaxed text-muted">
        {inline(para.join(" "))}
      </p>,
    );
  }

  return <div>{blocks}</div>;
}
