# Accesibilidad — auditoría inicial

Alcance: landing completa ES/EN, objetivo de revisión WCAG 2.2 AA. Fecha: 2026-10-30. Skill: `accessibility-audit`. Informe general y evidencia: [revisión frontend](../reviews/frontend-2026-10-30.md).

Estado inicial: necesita mejoras. No se declara conformidad integral.

| Hallazgo | Severidad de revisión | Reproducción |
| --- | --- | --- |
| F01: secuencia del menú móvil | Seria | Foco en menú → Enter → Tab salta los enlaces y cierra el menú. |
| F02: desborde con texto espaciado | Moderada | Viewport 320 px y ajustes de texto del informe: scrollWidth 344 px. Requiere revisar reflow y adaptación del texto; no se infiere incumplimiento solo del escáner. |
| F05: información laboral oculta | Moderada | Tipo de contratación se elimina a ≤800 px, sin equivalente visible. |
| F04: lectura de textos secundarios | Menor | Tamaños de 8–11 px; problema de usabilidad, sin afirmar un mínimo de fuente universal en WCAG. |

Comprobado: alternativas de imagen, controles con nombre, landmarks, encabezados, foco visible por CSS, Escape, cambios de idioma, status del clipboard, contenido sin JS y reflow estándar con cursos expandidos. Axe: cero violaciones en los estados registrados. La suite existente no cubría Tab después de abrir menú ni ajustes de espaciado.

Pendiente: lector de pantalla real, forced colors, zoom nativo y dispositivos físicos. No aplican autenticación, formularios, tablas de datos ni multimedia. Las correcciones fueron autorizadas después de documentar la línea de base.

## Revisión posterior

Se corrigieron la secuencia del menú, el desborde con espaciado ampliado y la información laboral oculta. Se aumentó la tipografía secundaria a 12 px como mínimo. Las pruebas ES/EN ahora comprueban Tab, Shift+Tab, Escape y espaciado ampliado a 320/390 px; pasan junto a axe y las regresiones existentes. Se inspeccionaron las capturas resultantes. Permanecen las limitaciones de verificación indicadas; no se declara conformidad integral.
