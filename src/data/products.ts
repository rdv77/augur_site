import { parseFrontmatter, parseSections } from "@/lib/markdown";

const files = import.meta.glob("../content/products/*.md", {
  eager: true,
  query: "?raw",
  import: "default",
}) as Record<string, string>;

export type Product = {
  id: string;
  title: string;
  description: string;
  category: "socio" | "political";
  order: number;
  image: string;
  sections: { title: string; content: string }[];
};

export const PRODUCTS: Product[] = Object.values(files)
  .map((raw) => {
    const { meta, body } = parseFrontmatter(raw);
    const category = meta.category === "political" ? "political" : "socio";
    return {
      id: meta.slug,
      title: meta.title,
      description: meta.description,
      category,
      order: Number(meta.order || 0),
      image: meta.image,
      sections: parseSections(body),
    } satisfies Product;
  })
  .sort((a, b) => a.order - b.order);

export const SOCIO_PRODUCTS = PRODUCTS.filter((p) => p.category === "socio");
export const POLITICAL_PRODUCTS = PRODUCTS.filter((p) => p.category === "political");
