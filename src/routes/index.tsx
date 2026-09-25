import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { PostCard } from "@/components/PostCard";
import { allTags, allTemas, posts, searchPosts } from "@/lib/posts";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Bitácora Cero — Blog de ciberseguridad" },
      {
        name: "description",
        content:
          "Artículos de ciberseguridad con búsqueda por palabra clave y filtro por etiquetas: ransomware, identidad, detección y DevSecOps.",
      },
      { property: "og:title", content: "Bitácora Cero — Blog de ciberseguridad" },
      {
        property: "og:description",
        content: "Búsqueda por palabra clave y filtro por etiquetas en artículos de ciberseguridad.",
      },
    ],
  }),
  component: Home,
});

function Home() {
  const [query, setQuery] = useState("");
  const [tag, setTag] = useState<string | null>(null);
  const tags = useMemo(() => allTags(), []);
  const temas = useMemo(() => allTemas(), []);
  const results = useMemo(() => searchPosts(query, tag ?? undefined), [query, tag]);

  return (
    <div className="mx-auto max-w-5xl px-5 py-12">
      <section className="panel p-8">
        <p className="label-mono">{posts.length} artículos publicados</p>
        <h1 className="mt-3 max-w-2xl text-4xl font-semibold leading-tight sm:text-5xl">
          Notas técnicas de <span className="text-primary">ciberseguridad</span>, sin relleno.
        </h1>
        <p className="mt-4 max-w-xl text-sm text-muted-foreground">
          Respuesta a incidentes, identidad, detección y seguridad del software. Busca por palabra
          clave o filtra por etiqueta.
        </p>

        <div className="mt-7">
          <label htmlFor="buscar" className="label-mono">
            buscar
          </label>
          <input
            id="buscar"
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="ransomware, passkeys, SBOM…"
            className="mt-2 w-full rounded-md border border-input bg-background/60 px-4 py-3 font-mono text-sm text-foreground outline-none transition-colors placeholder:text-muted-foreground/70 focus:border-primary"
          />
        </div>

        <div className="mt-5 flex flex-wrap items-center gap-2">
          <button
            onClick={() => setTag(null)}
            className={`rounded-full border px-3 py-1 font-mono text-xs transition-colors ${
              tag === null
                ? "border-primary bg-primary text-primary-foreground"
                : "border-border bg-secondary text-muted-foreground hover:text-foreground"
            }`}
          >
            todas
          </button>
          {tags.map(({ tag: t, count }) => (
            <button
              key={t}
              onClick={() => setTag(t === tag ? null : t)}
              className={`rounded-full border px-3 py-1 font-mono text-xs transition-colors ${
                tag === t
                  ? "border-primary bg-primary text-primary-foreground"
                  : "border-border bg-secondary text-muted-foreground hover:text-foreground"
              }`}
            >
              #{t} <span className="opacity-60">{count}</span>
            </button>
          ))}
        </div>
      </section>

      <section className="mt-12 grid gap-8 lg:grid-cols-[1fr_220px]">
        <div>
          <p className="label-mono">
            {results.length} resultado{results.length === 1 ? "" : "s"}
            {tag ? ` · #${tag}` : ""}
          </p>
          <div className="mt-4 flex flex-col gap-5">
            {results.map((post) => (
              <PostCard key={post.slug} post={post} />
            ))}
            {results.length === 0 && (
              <div className="panel p-8 text-sm text-muted-foreground">
                Sin coincidencias. Prueba otra palabra clave o quita el filtro de etiqueta.
              </div>
            )}
          </div>
        </div>

        <aside className="flex flex-col gap-6">
          <div className="panel p-5">
            <p className="label-mono">temas</p>
            <ul className="mt-3 flex flex-col gap-2 text-sm">
              {temas.map(({ tema, count }) => (
                <li key={tema} className="flex items-center justify-between gap-2">
                  <span className="text-muted-foreground">{tema}</span>
                  <span className="font-mono text-xs text-primary">{count}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="panel p-5">
            <p className="label-mono">etiquetas</p>
            <Link
              to="/tags"
              className="mt-3 inline-block font-mono text-xs text-accent underline underline-offset-4"
            >
              ver índice completo →
            </Link>
          </div>
        </aside>
      </section>
    </div>
  );
}
