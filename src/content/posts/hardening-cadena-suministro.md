---
title: "Cadena de suministro de software: SBOM, firmas y dependencias"
date: 2026-07-12
tema: Seguridad ofensiva y defensiva
tags: devsecops, sbom, dependencias, supply chain
resumen: "Un paquete comprometido entra por la puerta principal. Qué revisar en tu tubería de construcción antes de que ocurra."
autor: Jorge Cultid
---

Los ataques a la cadena de suministro aprovechan la confianza implícita en el código de terceros. Conviene tratar cada dependencia como entrada no confiable.

## Prácticas base

- Generar un **SBOM** (CycloneDX o SPDX) en cada compilación y guardarlo como artefacto.
- Fijar versiones con archivo de bloqueo y verificar integridad por hash.
- Firmar artefactos y verificar la firma en el despliegue.
- Aislar el entorno de compilación: sin credenciales de producción, sin red abierta.

## Señales de un paquete sospechoso

```text
- scripts de postinstalación que descargan binarios
- mantenedor nuevo en un paquete antiguo y muy usado
- versión publicada sin cambios en el repositorio público
- ofuscación o cadenas codificadas en base64
```

Automatiza el análisis, pero conserva un control humano para aprobar dependencias nuevas en componentes críticos.
