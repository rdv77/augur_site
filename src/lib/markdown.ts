export type Frontmatter = Record<string, string>;

export function parseFrontmatter(raw: string): { meta: Frontmatter; body: string } {
  if (!raw.startsWith("---")) return { meta: {}, body: raw };
  const end = raw.indexOf("\n---", 3);
  if (end === -1) return { meta: {}, body: raw };
  const header = raw.slice(4, end);
  const body = raw.slice(end + 4).replace(/^\n/, "");
  const meta: Frontmatter = {};
  for (const line of header.split("\n")) {
    const i = line.indexOf(":");
    if (i === -1) continue;
    const key = line.slice(0, i).trim();
    let val = line.slice(i + 1).trim();
    if (
      (val.startsWith('"') && val.endsWith('"')) ||
      (val.startsWith("'") && val.endsWith("'"))
    ) {
      val = val.slice(1, -1);
    }
    meta[key] = val;
  }
  return { meta, body };
}

export function parseSections(body: string): { title: string; content: string }[] {
  return body
    .split(/^## /m)
    .map((s) => s.trim())
    .filter(Boolean)
    .map((chunk) => {
      const nl = chunk.indexOf("\n");
      if (nl === -1) return { title: chunk.trim(), content: "" };
      return { title: chunk.slice(0, nl).trim(), content: chunk.slice(nl + 1).trim() };
    });
}
