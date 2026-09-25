import { createFileRoute, Link } from "@tanstack/react-router";
import { allTags } from "@/lib/posts";

export const Route = createFileRoute("/tags/")({
  head: () => ({
    meta: [
      { title: "Etiquetas — Bitácora Cero" },
      {
        name: "description",
        content: "Índice de etiquetas del blog de ciberseguridad Bitácora Cero.",
      },
      { property: "og:title", content: "Etiquetas — Bitácora Cero" },
      {
        property: "og:description",
        content: "Explora los artículos de ciberseguridad por etiqueta.",
      },
    ],
  }),
  component: TagsIndex,
});

function TagsIndex() {
  const tags = allTags();
  return (
    <div className="mx-auto max-w-3xl px-5 py-12">
      <p className="label-mono">índice</p>
      <h1 className="mt-2 text-3xl font-semibold">Etiquetas</h1>
      <p className="mt-3 text-sm text-muted-foreground">
        {tags.length} etiquetas en uso. Cada una tiene su propia página.
      </p>

      <div className="mt-8 flex flex-wrap gap-3">
        {tags.map(({ tag, count }) => (
          <Link
            key={tag}
            to="/tags/$tag"
            params={{ tag }}
            className="panel px-4 py-2 font-mono text-sm transition-colors hover:border-primary hover:text-primary"
          >
            #{tag} <span className="text-muted-foreground">{count}</span>
          </Link>
        ))}
      </div>
    </div>
  );
}
