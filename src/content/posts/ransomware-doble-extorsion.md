---
title: "Ransomware de doble extorsión: cómo preparar la respuesta"
date: 2026-09-18
tema: Respuesta a incidentes
tags: ransomware, respaldo, respuesta a incidentes, extorsión
resumen: "Los grupos actuales cifran y filtran. La contención ya no basta: hay que planificar la fuga de datos como parte del incidente."
autor: Jorge Cultid
---

El modelo de **doble extorsión** cambió la economía del ransomware: primero se exfiltra información sensible y después se cifra la infraestructura. Aunque restaures desde respaldos en horas, la amenaza de publicación sigue viva.

## Señales tempranas

- Creación de cuentas de servicio fuera de horario.
- Uso anómalo de herramientas legítimas (`rclone`, `7z`, `PsExec`).
- Picos de tráfico de salida hacia almacenamiento en la nube poco habitual.

## Plan mínimo de respuesta

1. **Aislar** los segmentos afectados sin apagar equipos, para conservar memoria volátil.
2. **Preservar evidencia**: imágenes de disco, registros de EDR y del firewall perimetral.
3. **Cuantificar la fuga** antes de negociar cualquier cosa: qué salió, de quién y con qué obligación legal.
4. **Comunicar** con un guion preparado: personal, clientes y autoridad de protección de datos.

> Un respaldo que nunca se probó restaurando no es un respaldo, es una esperanza.

## Controles que reducen el impacto

| Control | Efecto |
| --- | --- |
| Respaldos inmutables y fuera de línea | Evita el cifrado del respaldo |
| Segmentación de red | Limita el movimiento lateral |
| MFA resistente a phishing | Corta el acceso inicial más común |
| Monitoreo de exfiltración | Detecta la fase previa al cifrado |

La conclusión práctica: mide tu tiempo de detección. Si los atacantes pasan semanas dentro de la red, el cifrado es solo el final del recorrido.
