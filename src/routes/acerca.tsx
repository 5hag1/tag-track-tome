import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/acerca")({
  head: () => ({
    meta: [
      { title: "Acerca — Bitácora Cero" },
      {
        name: "description",
        content:
          "Qué es Bitácora Cero y cómo se publican los artículos de ciberseguridad desde archivos markdown en GitHub.",
      },
      { property: "og:title", content: "Acerca — Bitácora Cero" },
      {
        property: "og:description",
        content: "Blog de ciberseguridad con contenido en archivos markdown dentro del repositorio.",
      },
    ],
  }),
  component: About,
});

function About() {
  return (
    <div className="mx-auto max-w-3xl px-5 py-12">
      <p className="label-mono">acerca</p>
      <h1 className="mt-2 text-3xl font-semibold">Bitácora Cero</h1>

      <div className="prose-cyber mt-6">
        <p>
          Bitácora Cero reúne notas prácticas de ciberseguridad: respuesta a incidentes, identidad y
          accesos, detección y seguridad del software.
        </p>
        <h2>Cómo se publica</h2>
        <p>
          Cada artículo es un archivo de texto dentro del repositorio, en{" "}
          <code>src/content/posts/</code>. Al agregar un archivo nuevo aparece automáticamente en el
          listado, en la búsqueda y en sus etiquetas.
        </p>
        <pre>
          <code>{`---
title: "Título del artículo"
date: 2026-09-20
tema: Respuesta a incidentes
tags: ransomware, respaldo
resumen: "Una o dos frases de resumen."
autor: Tu nombre
---

Aquí va el contenido en markdown.`}</code>
        </pre>
        <p>
          Los detalles completos, incluida la publicación en GitHub Pages, están en el archivo{" "}
          <code>CONTENIDO.md</code> del repositorio.
        </p>
      </div>
    </div>
  );
}
