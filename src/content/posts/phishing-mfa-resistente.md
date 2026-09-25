---
title: "MFA resistente a phishing: passkeys frente a los códigos SMS"
date: 2026-08-30
tema: Identidad y accesos
tags: phishing, mfa, passkeys, identidad
resumen: "No todos los segundos factores protegen igual. Comparamos SMS, TOTP y claves FIDO2 frente a proxys de robo de sesión."
autor: Jorge Cultid
---

El phishing moderno usa proxys inversos (`evilginx`, kits de phishing como servicio) que capturan la cookie de sesión **después** de que la víctima aprueba el segundo factor. Eso deja obsoletos varios métodos populares.

## Comparativa rápida

- **SMS**: vulnerable a SIM swapping y a reenvío en tiempo real. Úsalo solo como respaldo.
- **TOTP (app autenticadora)**: mejor, pero el código sigue siendo transcribible a un sitio falso.
- **Notificación push**: expuesta a fatiga de aprobación si no exige número coincidente.
- **FIDO2 / passkeys**: la firma está ligada al dominio real, así que un sitio suplantado no puede reutilizarla.

## Ruta de adopción

1. Habilita passkeys para administradores y cuentas privilegiadas primero.
2. Exige *device binding* o certificado de dispositivo en las consolas críticas.
3. Reduce la vida de las sesiones y revoca tokens ante cambios de riesgo.
4. Elimina los métodos débiles de registro alternativo, que son la puerta trasera habitual.

El objetivo no es sumar factores, sino que el factor sea imposible de entregar a un tercero.
