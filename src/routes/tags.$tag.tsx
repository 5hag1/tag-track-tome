import { createFileRoute, Link } from "@tanstack/react-router";
import { PostCard } from "@/components/PostCard";
import { posts } from "@/lib/posts";

export const Route = createFileRoute("/tags/$tag")({
  loader: ({ params }) => ({
    tag: params.tag,
    results: posts.filter((p) => p.tags.includes(params.tag)),
  }),
  head: ({ params }) => ({
    meta: [
      { title: `#${params.tag} — Bitácora Cero` },
      {
        name: "description",
        content: `Artículos de ciberseguridad etiquetados como ${params.tag}.`,
      },
      { property: "og:title", content: `#${params.tag} — Bitácora Cero` },
      {
        property: "og:description",
        content: `Artículos de ciberseguridad etiquetados como ${params.tag}.`,
      },
    ],
  }),
  component: TagPage,
});

function TagPage() {
  const { tag, results } = Route.useLoaderData();
  return (
    <div className="mx-auto max-w-3xl px-5 py-12">
      <Link to="/tags" className="label-mono transition-colors hover:text-foreground">
        ← todas las etiquetas
      </Link>
      <h1 className="mt-6 font-mono text-3xl font-semibold text-primary">#{tag}</h1>
      <p className="mt-2 label-mono">
        {results.length} artículo{results.length === 1 ? "" : "s"}
      </p>

      <div className="mt-8 flex flex-col gap-5">
        {results.map((post) => (
          <PostCard key={post.slug} post={post} />
        ))}
        {results.length === 0 && (
          <div className="panel p-8 text-sm text-muted-foreground">
            Aún no hay artículos con esta etiqueta.
          </div>
        )}
      </div>
    </div>
  );
}
