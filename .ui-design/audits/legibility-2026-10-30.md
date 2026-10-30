# Auditoría de accesibilidad visual — 2026-10-30

Objetivo de referencia: WCAG 2.2 AA. Alcance: portfolio completo, ES/EN, claro/oscuro. Auditoría completada; conformidad completa no establecida.

El informe de diseño incluye los hallazgos, evidencia y criterios de aceptación: [Auditoría de diseño y legibilidad](../reviews/design-legibility-2026-10-30.md).

- Suite de navegador actual: sin fallos en los 4 escenarios de idioma/tema y 9 anchos; axe en 390/1440. Verifica espaciado ampliado, teclado, anclas, menús, persistencia y contenido sin JavaScript.
- Medición adicional ES: sin violaciones axe detectadas. Contraste incompleto en 4/9 nodos oscuro y 65/69 claro a 390/1440, respectivamente. Degradados y pseudoelementos requieren revisión complementaria.
- Muestreo de fondos en escritorio: etiqueta personal clara ~4,56:1; secundario sobre panel claro ~5,44:1; descripciones de responsabilidades oscuras ~6,69:1. No se confirma un fallo de contraste en estos textos. Se recomienda aumentar tamaño/peso y dar más margen a etiquetas pequeñas (D01/D02).
- Movimiento continuo del retrato, sin pausa y sin atender reduced-motion: hallazgo D07. Existe una preferencia explícita del usuario de animar por defecto y eliminar el botón. Se propone movimiento finito y revisar la preferencia del sistema sin reintroducir controles visibles. Pendiente evaluar aplicabilidad de 2.2.2 al contenido del retrato; no confundir una recomendación de reduced-motion con un incumplimiento AA universal.
- Header móvil a 390 px con menú en segunda fila: mejora de composición D04; no se observó fallo de operación por teclado en la suite.

Pendientes: lector de pantalla real, zoom nativo, forced colors, dispositivos físicos y contraste exhaustivo en estados/degradados. Los bordes y separadores decorativos tenues no se contabilizan automáticamente como fallos de contenido informativo.
