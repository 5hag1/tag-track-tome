import { Link } from "@tanstack/react-router";
import { formatDate, type Post } from "@/lib/posts";

export function PostCard({ post }: { post: Post }) {
  return (
    <article className="panel group p-6 transition-colors hover:border-primary/60">
      <div className="flex flex-wrap items-center gap-3 label-mono">
        <span className="text-accent">{post.tema}</span>
        <span aria-hidden>/</span>
        <time dateTime={post.date}>{formatDate(post.date)}</time>
        <span aria-hidden>/</span>
        <span>{post.lectura} min</span>
      </div>

      <h2 className="mt-3 text-xl font-semibold leading-snug">
        <Link
          to="/articulos/$slug"
          params={{ slug: post.slug }}
          className="transition-colors group-hover:text-primary"
        >
          {post.title}
        </Link>
      </h2>

      <p className="mt-2 text-sm text-muted-foreground">{post.resumen}</p>

      <div className="mt-4 flex flex-wrap gap-2">
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
    </article>
  );
}
