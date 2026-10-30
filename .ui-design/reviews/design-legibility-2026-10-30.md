# Auditoría de diseño y legibilidad — portfolio de Leandro Eguia

Fecha: 2026-10-30. Alcance: página completa en localhost:4173, temas claro/oscuro, ES/EN y responsive. Estado: auditoría terminada; acciones pendientes. No se modificó el producto ni se publicó durante esta revisión. Se incluye el ajuste local anterior de Experiencia, todavía pendiente de aprobación.

## Diagnóstico

El problema principal es la combinación de texto pequeño, trazos visualmente finos y una jerarquía demasiado dependiente de títulos grandes, etiquetas monoespaciadas y texto secundario. El tema claro añade demasiados verdes próximos entre sí. La página funciona, pero necesita una dirección tipográfica y de superficies consistente para sentirse terminada.

No encontré evidencia de fuentes ausentes ni de un fallo del framework. Tampoco corresponde presentar todos los problemas como incumplimientos de contraste: los textos informativos comprobados pasan el mínimo, aunque algunos con poco margen y una apariencia débil. Los cambios más valiosos son de legibilidad y composición, no de tecnología ni de agregar efectos.

8 acciones: 0 críticas, 4 mayores, 3 menores, 1 sugerencia. Estas prioridades son de producto/diseño; no equivalen a la severidad de axe ni a una declaración de conformidad WCAG.

## Método y evidencia

- Skills aplicadas: `design-review`, `visual-design-foundations` (tipografía y color), `accessibility-audit`, `responsive-design`, `avoid-ai-design` en modo **detect**. Sin reescritura, delegación, dependencias nuevas ni cambios de stack.
- Inspección de capturas de toda la página y de Sobre mí, Experiencia y Áreas de trabajo, a 390 y 1440 px, ambos temas. Se recorrieron las secciones con sus observadores reales antes de congelar las animaciones para las capturas.
- Medición DOM de tamaños, colores, interlineados, tracking, superficies y fuentes efectivamente utilizadas con Chrome DevTools Protocol.
- Reejecución de `npm run test:browser`: ES/EN × claro/oscuro, 9 anchos (320, 375, 390, 580, 768, 800, 1024, 1440, 1920), sin fallos. Incluye overflow, espaciado de texto, teclado, navegación, clipboard, persistencia y contenido sin JavaScript. Axe se ejecuta a 390/1440; no en los nueve anchos.
- Nueva ejecución de axe sobre la versión española a 390/1440, ambos temas: sin violaciones detectadas, pero contraste incompleto en 4/9 nodos del tema oscuro y 65/69 del claro, respectivamente. Los degradados y pseudoelementos impiden parte del cálculo automático.
- Complemento de contraste en escritorio: captura del fondo con el texto transparente, muestras centrales bajo cada elemento y cálculo de luminancia con el color CSS original del texto. Evita medir el antialiasing como si fuera el color de la fuente. Es una muestra localizada, no una prueba exhaustiva de todos los píxeles y estados.
- Archivos variables inspeccionados: Manrope tiene eje de peso 200–800; Space Grotesk 300–700. Las declaraciones CSS usan subconjuntos válidos. Las medidas canvas cambian al pedir 400, 500 y 800. El nombre interno `Manrope ExtraLight` corresponde a los metadatos del archivo variable y **no demuestra** que todo se renderice con peso 200.

Evidencia reproducible local en [metrics.json](../evidence/legibility-2026-10-30/metrics.json), [sampled-contrast.json](../evidence/legibility-2026-10-30/sampled-contrast.json) y [font-verification.json](../evidence/legibility-2026-10-30/font-verification.json). Las capturas y mediciones quedan ignoradas por Git dentro de `.ui-design/evidence/`; los informes sí son versionables.

## Accionables priorizados

### D01 — Mayor: corregir la escala tipográfica antes de cambiar de fuente

**Comprobado:** en oscuro/escritorio, 137 de 179 elementos con texto directo medidos usan 14 px o menos (~77 %; es un conteo de elementos, no de palabras). Las descripciones de responsabilidades usan 14 px/400; cargos y fechas de trabajos anteriores, 12 px. Los títulos de sección llegan a 48 px y el nombre a ~124 px. El tracking del nombre llega a -6 px.

**Impacto:** cuesta leer la información profesional que debería sostener el portfolio. La combinación de texto pequeño, mucho aire y títulos dominantes hace que el contenido parezca una nota al pie. Las capturas confirman este desequilibrio en ambos temas.

**Ubicación:** `app/globals.css:75` (base), `:371` (hero), `:803` (Sobre mí), `:905` (responsabilidades), `:1099` (experiencia), `:1158` (cards), y sus overrides responsive.

**Acción:** definir tokens de texto por función. Punto de partida: cuerpo principal 16–17 px, secundario 14–15 px, fechas/cargos 14 px; reservar 12 px para metadatos breves y no esenciales. Probar peso 450/500 en descripciones y navegación; 600 en títulos de cards. Mantener inicialmente Manrope y Space Grotesk para aislar el efecto de la escala. Limitar el tracking negativo por nivel, preferentemente en `em`. Reducir el uso de mono fuera de tecnologías/etiquetas breves.

**Aceptación:** descripciones profesionales legibles al 100 % sin zoom en 390/1440; cargos y fechas no dependen de microtexto; misma función = mismo token en todas las secciones. Sin overflow al aplicar espaciado ampliado. 16 px es una decisión de usabilidad propuesta, no un mínimo obligatorio de WCAG.

### D02 — Mayor: dar más margen a textos secundarios y etiquetas del tema claro

**Comprobado:** `MI LADO PERSONAL` usa #3c641d sobre #cbd5c1: contraste ~4,56:1, con fuente monoespaciada de 12 px/400. Pasa AA nominalmente, pero está muy cerca del mínimo. En Sobre mí, el secundario #46523f sobre #cbd5c1 da ~5,44:1. Las responsabilidades oscuras dan ~6,69:1; su problema de lectura se explica mejor por tamaño/trazo que por un fallo numérico.

Los separadores decorativos `/` del header y footer tienen valores menores; no se registran como fallos de texto informativo: no llevan contenido necesario y están ocultos a tecnologías de asistencia cuando corresponde.

**Ubicación:** `app/globals.css:36` (tokens claros), `:744` (etiqueta personal), `:905`, `:2131` y overrides claros.

**Acción:** separar `text-primary`, `text-secondary` y `text-label` de `accent`. Oscurecer el texto secundario/etiquetas claros y ajustar su peso junto con D01. Reservar el verde de acento para énfasis e interacción, sin aplicarlo por defecto a toda etiqueta pequeña. Revisar normal, hover y foco por componente.

**Aceptación:** texto normal ≥4,5:1 y texto grande ≥3:1 en fondos efectivos; objetivo de diseño ≥6:1 para las etiquetas pequeñas seleccionadas, sin tratarlo como obligación normativa. Documentar las combinaciones y revisar los fondos degradados que axe deja incompletos. No medir contraste de texto desde sus píxeles suavizados.

La [explicación de contraste de W3C](https://www.w3.org/WAI/WCAG22/Understanding/contrast-minimum.html) advierte que una fuente de trazo fino puede parecer tenue incluso cuando su combinación de colores supera el mínimo.

### D03 — Mayor: construir una jerarquía de superficies coherente entre temas

**Observado:** fondo, header, paneles, cards, badges y textos secundarios claros comparten verdes cercanos. Experiencia recibió paneles mucho más claros que las cards de Sobre mí/Especialidades. Además, los trabajos anteriores son filas abiertas en oscuro y tarjetas separadas en claro. El cambio de tema modifica el lenguaje visual, no solamente los colores.

**Ubicación:** `app/globals.css:47`, `:770`, `:1088`, `:1134`, `:2138`, `:2170` y `:2199`.

**Acción:** mantener el degradado algo oscuro solicitado, bajando su saturación y reservándolo al lienzo. Definir tres niveles: lienzo, superficie de lectura y superficie destacada. Usar neutros con una leve temperatura verde; conservar lima para CTAs/iconos. Dar a cada tipo de card la misma estructura, padding y jerarquía en ambos temas. Elegir una presentación común para la trayectoria anterior.

**Aceptación:** al cambiar el tema se conserva la composición; se distinguen secciones y cards sin depender de sombras fuertes o de bordes. Comparar capturas de Sobre mí/Experiencia/Áreas juntas. Los bordes decorativos tenues no se consideran por sí solos un incumplimiento de contraste no textual.

### D04 — Menor: resolver el header móvil en una composición intencional

**Comprobado:** a 390 px, el botón de menú salta a una segunda fila casi vacía; el header mide aproximadamente 103 px. La combinación de marca, subtítulo, idiomas y tema consume el ancho antes de ubicar el menú. Es un problema de aprovechamiento y orden visual, no de controles ausentes.

**Ubicación:** `app/globals.css:1473` y `:1494`; `components/header.jsx`.

**Acción:** priorizar marca abreviada + menú + tema en una fila; ubicar ES/EN dentro del desplegable si hace falta. Conservar nombres accesibles, orden de foco coherente y áreas táctiles generosas. Coordinar scroll offsets con la altura real.

**Aceptación:** 320/375/390/580 px sin una segunda fila accidental; objetivo de altura ~72–80 px. Menú usable por teclado, Escape y tacto, con anclas visibles bajo el header.

### D05 — Menor: mejorar la edición y el ritmo de lectura

**Observado y medido:** la página alcanza ~8.161 px en oscuro y ~8.353 px en claro a 390 px. La extensión no es un defecto por sí misma; el problema es repetir información de Java, microservicios, eventos y datos en hero, Sobre mí, experiencia y cards con un tratamiento similar. Los hobbies reciben una estructura extensa frente a algunos cargos profesionales de 12 px.

**Ubicación:** `components/sections/about.jsx`, `experience.jsx`, `expertise.jsx`, `lib/experience.js`; `app/globals.css:138`, `:793`, `:895`.

**Acción:** asignar una función a cada sección: presentación breve; perfil y perspectiva; experiencia con responsabilidades concretas; cards de capacidades como síntesis. Acortar redundancias, destacar empresa/cargo/fechas y organizar responsabilidades en unidades escaneables. Compactar el bloque personal sin quitarlo. No inventar métricas ni logros que el usuario no haya aportado.

**Aceptación:** se puede localizar empleador actual, rol, especialidad y contacto mediante un barrido visual; cada sección aporta información diferenciada. Probar lectura móvil con los textos ampliados de D01 antes de fijar alturas o recortar contenido.

### D06 — Sugerencia: reducir decoración repetida y reforzar la identidad personal

**Observado:** numeración 01/02/03, overlines monoespaciadas, flechas, órbitas y bloques de iconos compiten por atención. El detector estático encontró 5 señales en 18 archivos: 2 P1 y 3 P2 según su propia taxonomía. Son pistas estilísticas; no prueban mala calidad ni autoría por IA. Por ejemplo, señaló un supuesto acento en “Leandro” que no confirma correctamente la apariencia del título renderizado.

**Acción:** conservar las cards de Áreas de trabajo, la foto, el tipeado y la paleta solicitados. Elegir un detalle protagonista (por ejemplo, foto/órbita) y reducir índices decorativos, flechas redundantes y overlines donde no agregan orientación. Evitar reemplazar toda la identidad por otra plantilla de moda.

**Aceptación:** cada adorno tiene una función o refuerza una decisión explícita de identidad. La tipografía del contenido y el recorrido profesional dominan sobre la decoración. Esta acción se evalúa visualmente, no por limpiar el scanner.

### D07 — Mayor: acotar el movimiento continuo sin perder las animaciones por defecto

**Comprobado:** `motion` es constante `true`, se ignora `prefers-reduced-motion`, y el retrato se anima con un ciclo de 7 segundos infinito. El cursor de escritura termina junto con el tipeado: no se registra como parpadeo permanente. Las entradas y el scroll ya están implementados; el problema actual no es falta de animaciones.

**Ubicación:** `components/portfolio-provider.jsx:24`, `components/motion-controller.jsx`, `components/typewriter.jsx`, `app/globals.css:2120`.

**Contexto:** el usuario pidió expresamente motion por defecto y quitar el botón de pausa. Esta auditoría no revierte esa decisión ni propone reintroducir el botón como requisito automático de la skill.

**Acción propuesta:** mantener tipeado, entradas y scroll animado por defecto; reemplazar la flotación infinita por una entrada breve que termine. Ofrecer como mejora de accesibilidad respetar la preferencia del sistema para quienes la activaron, sin mostrar un interruptor en la página. Reducir repetición de fade-up y reservar el movimiento más marcado para hitos.

**Aceptación:** no hay movimiento automático persistente mientras se lee; el recorrido normal conserva animaciones. Verificar con sistema en `reduce` y `no-preference` y revisar explícitamente la decisión de producto. La relación de la flotación del retrato con [WCAG 2.2.2, Pause/Stop/Hide](https://www.w3.org/WAI/WCAG22/Understanding/pause-stop-hide.html) requiere resolver si se trata como contenido informativo o decoración; no se declara conformidad a partir de axe. Ignorar reduced-motion no se etiqueta por sí solo como fallo AA universal.

### D08 — Menor: ordenar el CSS para sostener el rediseño

**Comprobado:** `app/globals.css` tiene ~2.300 líneas, varias capas de reglas responsive y overrides de tema al final. Mezcla tokens con colores literales y conserva reglas de presentaciones anteriores, como `.work-card-health`, `.health-line` y `.work-card-content`, ajenas a la composición actual de Experiencia.

**Acción:** consolidar primero tokens de tipografía/color/espaciado; agrupar estilos por componente y sus variantes; retirar selectores comprobados sin uso; reducir especificidad como `html[data-theme="light"] #work ...`. Crear una referencia breve de decisiones de diseño. No añadir una biblioteca de UI ni cambiar Next/GitHub Pages para resolverlo.

**Aceptación:** una modificación del token secundario actualiza todas las descripciones equivalentes; cada componente concentra sus reglas y estados; ambos temas conservan paridad visual. Ejecutar build, export y pruebas de navegador/motion después de implementar, no añadir tests que solo repitan declaraciones CSS.

## Orden recomendado de implementación

1. **Lectura:** D01 + D02. Cambios transversales de escala, pesos y colores de texto. Comparar primero Sobre mí y Experiencia en ambos temas.
2. **Composición:** D03 + D04. Resolver superficies y header móvil antes de seguir agregando efectos.
3. **Edición y pulido:** D05 + D06 + D07, conservando preferencias explícitas y revisando la propuesta de movimiento reducido.
4. **Consolidación:** D08 durante las tandas anteriores, evitando otra capa de parches al final del CSS.

Cada tanda debe quedar visible localmente y revisarse antes de publicar, como pidió el usuario.

## Lo que se conserva y lo pendiente

Se conservan el export estático y GitHub Pages, ES/EN, temas, cards de Áreas de trabajo, tipeado de “Ingeniero en Computación”, scroll animado y contenido profesional aportado. La navegación y las pruebas funcionales actuales ofrecen una base útil; no hay evidencia que justifique otra migración.

Esta revisión no es una certificación WCAG. Quedan pendientes lector de pantalla real, zoom nativo del navegador, forced colors, dispositivos físicos y una comprobación exhaustiva de contraste en todos los estados y puntos del degradado. No se ejecutó Lighthouse ni se atribuye a performance un problema observado de diseño. No hay formularios ni flujos de compra que auditar; tampoco corresponde aplicar convenciones específicas de Al Toque, instalar herramientas o aplicar el modo rewrite de la skill.

## Implementación local posterior a la auditoría

El usuario autorizó aplicar las mejoras. Se implementaron D01–D06 y D08: cuerpo de 16 px/450, secundarios de 14 px, fechas/cargos con fuente de lectura, etiquetas breves de 12 px/600, tokens de texto independientes del acento, superficies neutras coherentes entre temas, cards de trayectoria en ambos modos, header móvil de 76 px en una fila, textos de capacidades resumidos en ES/EN y reducción de numeración/decoración repetida. Se mantuvieron las familias tipográficas para evaluar la mejora de escala y peso por separado.

El CSS se organizó en `app/styles/` por secciones, con tokens en `foundations.css`, breakpoints en `responsive.css` y animaciones en `motion.css`. Se retiraron reglas de diagramas/tarjetas anteriores y overrides claros por sección. Las decisiones quedan en [DESIGN.md](../../DESIGN.md).

D07 se aplicó parcialmente: la foto tiene una entrada de 1,2 segundos que termina; se conserva el tipeado y scroll animado, sin botón de pausa. Respetar reduced-motion queda pendiente para no contradecir la instrucción previa explícita de motion activo también en ese entorno. No se considera resuelto ese punto de accesibilidad.

Validación: build/export estático, suite de navegador ES/EN × claro/oscuro en nueve anchos y pruebas de motion. Se añadió una comprobación de que el retrato deja de animarse tras su entrada. Se revisaron capturas nuevas a 390/1440 de ambos temas, guardadas separadamente de las originales en `.ui-design/evidence/design-applied-2026-10-30/`. Axe no detectó violaciones; permanecen 26/27 nodos de contraste incompleto por los degradados claros a 390/1440. En oscuro, el recorrido adicional no dejó contraste incompleto. Los mínimos entre los nodos de texto comprobados por axe fueron 7,46:1 en oscuro y 6,26:1 en claro; no se extrapolan a todo estado ni a todos los puntos del degradado.

Tras las iteraciones locales, el usuario aprobó publicar la tanda con la instrucción explícita de hacer commit y push. La versión final incorpora el verde común `#b6d973`, detalles adicionales en claro, fondo orgánico sutil de ancho completo en el hero oscuro, ajustes de ancho/altura en Sobre mí, LinkedIn separado como botón, experiencias anteriores plegables con transición de altura/opacidad y una composición móvil con tecnologías en etiquetas y CTAs alineadas. Las fechas y la modalidad de los trabajos anteriores se muestran únicamente al abrir cada desplegable.

La validación final incluye los desplegables abiertos/cerrados, operación por teclado y sin JavaScript, reversión rápida de animaciones y contenido expandido sin desborde. Las mediciones de contraste del párrafo anterior corresponden a la primera pasada documentada; no se presentan como nuevas mediciones de la paleta final.
