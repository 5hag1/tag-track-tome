---
title: "Threat hunting con los registros que ya tienes"
date: 2026-06-02
tema: Monitoreo y detección
tags: threat hunting, siem, logs, detección
resumen: "No necesitas una plataforma nueva para empezar a cazar amenazas: necesitas hipótesis concretas y tres o cuatro fuentes bien normalizadas."
autor: Jorge Cultid
---

La caza de amenazas es un ejercicio de hipótesis, no de comprar herramientas. Empieza con una pregunta verificable: *"¿algún equipo de contabilidad ejecutó PowerShell codificado en los últimos 30 días?"*

## Fuentes con mejor relación esfuerzo/valor

1. Autenticación de identidad (inicios fallidos, países nuevos, tokens renovados).
2. Creación de procesos en estaciones de trabajo.
3. Consultas DNS de salida.
4. Reglas de correo y reenvíos automáticos creados por usuarios.

## Ciclo de trabajo

- **Hipótesis** basada en una técnica de MITRE ATT&CK.
- **Consulta** acotada a una ventana de tiempo y un grupo de activos.
- **Triaje** de resultados, separando ruido conocido.
- **Producto**: una regla de detección nueva o una excepción documentada.

Cada cacería debe terminar en algo permanente. Si no genera detección ni conocimiento, fue solo una consulta bonita.
