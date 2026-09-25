import { marked } from "marked";

export type Post = {
  slug: string;
  title: string;
  date: string;
  tema: string;
  tags: string[];
  resumen: string;
  autor: string;
  lectura: number;
  body: string;
};

type Frontmatter = Record<string, string>;

function parseFrontmatter(raw: string): { data: Frontmatter; body: string } {
  const match = /^---\r?\n([\s\S]*?)\r?\n---\r?\n?([\s\S]*)$/.exec(raw.trim());
  if (!match) return { data: {}, body: raw };
  const data: Frontmatter = {};
  for (const line of match[1]!.split(/\r?\n/)) {
    const idx = line.indexOf(":");
    if (idx === -1) continue;
    const key = line.slice(0, idx).trim();
    let value = line.slice(idx + 1).trim();
    if (
      (value.startsWith('"') && value.endsWith('"')) ||
      (value.startsWith("'") && value.endsWith("'"))
    ) {
      value = value.slice(1, -1);
    }
    data[key] = value;
  }
  return { data, body: match[2] ?? "" };
}

const modules = import.meta.glob("../content/posts/*.md", {
  query: "?raw",
  import: "default",
  eager: true,
}) as Record<string, string>;

function slugFromPath(path: string) {
  return path.split("/").pop()!.replace(/\.md$/, "");
}

export const posts: Post[] = Object.entries(modules)
  .map(([path, raw]) => {
    const { data, body } = parseFrontmatter(raw);
    const words = body.split(/\s+/).filter(Boolean).length;
    return {
      slug: data["slug"] || slugFromPath(path),
      title: data["title"] || slugFromPath(path),
      date: data["date"] || "1970-01-01",
      tema: data["tema"] || "General",
      tags: (data["tags"] || "")
        .split(",")
        .map((t) => t.trim())
        .filter(Boolean),
      resumen: data["resumen"] || "",
      autor: data["autor"] || "Equipo",
      lectura: Math.max(1, Math.round(words / 200)),
      body,
    };
  })
  .sort((a, b) => (a.date < b.date ? 1 : -1));

export function getPost(slug: string) {
  return posts.find((p) => p.slug === slug);
}

export function renderMarkdown(body: string) {
  return marked.parse(body, { async: false }) as string;
}

export function allTags() {
  const counts = new Map<string, number>();
  for (const p of posts) {
    for (const t of p.tags) counts.set(t, (counts.get(t) ?? 0) + 1);
  }
  return [...counts.entries()]
    .map(([tag, count]) => ({ tag, count }))
    .sort((a, b) => b.count - a.count || a.tag.localeCompare(b.tag));
}

export function allTemas() {
  const counts = new Map<string, number>();
  for (const p of posts) counts.set(p.tema, (counts.get(p.tema) ?? 0) + 1);
  return [...counts.entries()]
    .map(([tema, count]) => ({ tema, count }))
    .sort((a, b) => b.count - a.count || a.tema.localeCompare(b.tema));
}

export function formatDate(date: string) {
  const d = new Date(`${date}T00:00:00`);
  return d.toLocaleDateString("es-ES", { year: "numeric", month: "long", day: "numeric" });
}

export function searchPosts(query: string, tag?: string) {
  const q = query.trim().toLowerCase();
  return posts.filter((p) => {
    if (tag && !p.tags.includes(tag)) return false;
    if (!q) return true;
    return [p.title, p.resumen, p.tema, p.body, p.tags.join(" ")]
      .join(" ")
      .toLowerCase()
      .includes(q);
  });
}
