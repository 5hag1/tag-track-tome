import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { formatDate, getPost, posts, renderMarkdown } from "@/lib/posts";

export const Route = createFileRoute("/articulos/$slug")({
  loader: ({ params }) => {
    const post = getPost(params.slug);
    if (!post) throw notFound();
    return { post, html: renderMarkdown(post.body) };
  },
  head: ({ loaderData }) => {
    if (!loaderData) {
      return {
        meta: [{ title: "Artículo no disponible" }, { name: "robots", content: "noindex" }],
      };
    }
    const { post } = loaderData;
    return {
      meta: [
        { title: `${post.title} — Bitácora Cero` },
        { name: "description", content: post.resumen },
        { property: "og:title", content: post.title },
        { property: "og:description", content: post.resumen },
        { property: "og:type", content: "article" },
      ],
    };
  },
  component: ArticlePage,
  notFoundComponent: ArticleNotFound,
});

function ArticleNotFound() {
  return (
    <div className="mx-auto max-w-3xl px-5 py-20 text-center">
      <p className="label-mono">artículo no encontrado</p>
      <h1 className="mt-2 text-2xl font-semibold">Ese artículo no existe</h1>
      <Link to="/" className="mt-6 inline-block font-mono text-sm text-accent underline">
        volver al listado
      </Link>
    </div>
  );
}

function ArticlePage() {
  const { post, html } = Route.useLoaderData();
  const relacionados = posts
    .filter((p) => p.slug !== post.slug && p.tags.some((t) => post.tags.includes(t)))
    .slice(0, 3);

  return (
    <div className="mx-auto max-w-3xl px-5 py-12">
      <Link to="/" className="label-mono transition-colors hover:text-foreground">
        ← todos los artículos
      </Link>

      <header className="mt-6 border-b border-border pb-6">
        <div className="flex flex-wrap items-center gap-3 label-mono">
          <span className="text-accent">{post.tema}</span>
          <span aria-hidden>/</span>
          <time dateTime={post.date}>{formatDate(post.date)}</time>
          <span aria-hidden>/</span>
          <span>{post.lectura} min de lectura</span>
        </div>
        <h1 className="mt-4 text-3xl font-semibold leading-tight sm:text-4xl">{post.title}</h1>
        <p className="mt-3 text-sm text-muted-foreground">{post.resumen}</p>
        <div className="mt-5 flex flex-wrap gap-2">
          {post.tags.map((tag) => (
            <Link
              key={tag}
              to="/tags/$tag"
              params={{ tag }}
              className="rounded-full border border-border bg-secondary px-3 py-1 font-mono text-xs text-muted-foreground transition-colors hover:border-primary hover:text-foreground"
            >
              #{tag}
            </Link>
          ))}
        </div>
      </header>

      <div className="prose-cyber mt-8" dangerouslySetInnerHTML={{ __html: html }} />

      <p className="mt-10 label-mono">por {post.autor}</p>

      {relacionados.length > 0 && (
        <section className="mt-12 border-t border-border pt-8">
          <p className="label-mono">relacionados</p>
          <ul className="mt-4 flex flex-col gap-3">
            {relacionados.map((p) => (
              <li key={p.slug}>
                <Link
                  to="/articulos/$slug"
                  params={{ slug: p.slug }}
                  className="text-sm font-medium transition-colors hover:text-primary"
                >
                  {p.title}
                </Link>
              </li>
            ))}
          </ul>
        </section>
      )}
    </div>
  );
}
