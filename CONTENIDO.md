# Cómo publicar en Bitácora Cero

Todo el contenido vive en archivos de texto dentro del repositorio, así que el sitio
puede alojarse en GitHub y no necesita base de datos.

## 1. Crear un artículo

Agrega un archivo nuevo en `src/content/posts/` con extensión `.md`. El nombre del
archivo define la dirección del artículo: `passkeys-en-la-empresa.md` se publica en
`/articulos/passkeys-en-la-empresa`.

Estructura del archivo:

```markdown
---
title: "Título del artículo"
date: 2026-09-20
tema: Respuesta a incidentes
tags: ransomware, respaldo, mfa
resumen: "Una o dos frases que aparecen en el listado y en las redes sociales."
autor: Jorge Cultid
---

## Subtítulo

Texto en markdown: **negritas**, listas, tablas, citas y bloques de código.
```

Campos disponibles:

| Campo     | Obligatorio | Uso |
| --------- | ----------- | --- |
| `title`   | sí          | Título mostrado y usado en buscadores |
| `date`    | sí          | Orden cronológico (formato `AAAA-MM-DD`) |
| `tema`    | sí          | Agrupa artículos por tema; se listan en la portada |
| `tags`    | recomendado | Lista separada por comas; genera páginas `/tags/<etiqueta>` |
| `resumen` | recomendado | Descripción corta para el listado y las vistas previas |
| `autor`   | opcional    | Firma al final del artículo |
| `slug`    | opcional    | Dirección personalizada si no quieres usar el nombre del archivo |

El tiempo de lectura se calcula automáticamente.

## 2. Crear un tema o una etiqueta nueva

No hay que registrar nada aparte: basta escribir el tema o la etiqueta en un
artículo. La portada, el índice de etiquetas y el buscador se actualizan solos.

## 3. Consultar el contenido

- **Palabra clave**: buscador en la portada, revisa título, resumen, tema, etiquetas y cuerpo.
- **Etiqueta**: filtros en la portada, índice en `/tags` y una página por etiqueta.
- **Tema y fecha**: la portada agrupa por tema y ordena del más reciente al más antiguo.

## 4. Publicar en GitHub

1. Conecta el proyecto a GitHub desde el menú **+** del editor (GitHub → Conectar proyecto).
2. Cada cambio se sincroniza en ambos sentidos: puedes escribir artículos directamente
   en GitHub y aparecerán en el sitio.
3. Para servir el sitio con GitHub Pages hace falta generar la versión estática en un
   flujo de GitHub Actions; pídelo y se configura.
