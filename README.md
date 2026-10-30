# Leandro Eguia — Next.js portfolio

Portfolio personal en **Next.js 16 / React 19**, con exportación estática para GitHub Pages. Conserva el dominio `leandroeguia.com.ar`, la verificación de Google y el contenido completo en español e inglés.

## Desarrollo local

Node.js 22 o superior:

```sh
npm ci
npm run dev
```

Abrir **http://localhost:4173**. Next actualiza la página al editar componentes o estilos.

Para ver la exportación que se publicará:

```sh
npm run build
npm run preview
```

La preview también usa el puerto 4173: detener el servidor de desarrollo antes de levantarla. `PORT` permite elegir otro puerto para la preview estática.

## Animaciones

El efecto de tipeo vive en `components/typewriter.jsx`. Las entradas al recorrer secciones usan el mismo patrón de `IntersectionObserver`, estados `pending`/`done` y keyframes CSS inspeccionado en la landing local de Al Toque. La navegación entre secciones tiene desplazamiento animado, y el retrato tiene movimiento suave.

Las animaciones están **activadas por defecto** al abrir **http://localhost:4173/**. El botón de sol/luna del encabezado cambia entre modo claro y oscuro; guarda la elección localmente. En la primera visita se utiliza el tema del sistema. El tema se aplica antes de mostrar la página para evitar un destello del tema incorrecto.

No se necesitan parámetros en la URL ni cambios en Windows. El movimiento permanece activo en ambos temas. Con JavaScript deshabilitado, el contenido permanece visible en inglés.

## Organización

```text
app/
  layout.jsx                 Metadata, fuentes locales y layout raíz
  page.jsx                   Composición de la landing
  not-found.jsx              Página 404
  globals.css                Sistema visual, responsive y keyframes
components/
  portfolio-provider.jsx     Idioma, tema y animaciones activas
  header.jsx                 Navegación, idioma y selector de tema
  typewriter.jsx             Título profesional tipeado
  motion-controller.jsx      Reveal al scrollear y limpieza de listeners
  runtime/scroll.js          Scroll animado interrumpible
  sections/                  Hero, perfil, experiencia, especialidades y contacto
  footer.jsx                 Pie de página
lib/
  translations.js            Español y descripciones SEO
  profile.js                 Datos estructurados públicos
  experience.js              Experiencia, fechas, responsabilidades y tecnologías
public/
  assets/                    Imágenes, SVG y fuentes con licencias OFL
  CNAME                      Dominio existente
  .nojekyll                  Publicación de recursos _next
scripts/                     Preview, pruebas y generación de imagen social
.github/workflows/pages.yml   Build y publicación de out en GitHub Pages
```

La foto original se conserva en `assets/source/portrait.png`. `skills/` es la biblioteca de trabajo agregada al repo; no forma parte de los archivos publicados.

El inglés se edita en los componentes de `components/sections/`. Las etiquetas `<T id="...">Texto en inglés</T>` se corresponden con las claves de `lib/translations.js`. Los colores y fuentes están en `:root`, al principio de `app/globals.css`.

## Verificación

Con la exportación generada y su preview corriendo:

```sh
npm test
npm run test:browser
npm run test:motion
```

Se verifican contenido prerenderizado, assets, dominio, anclas, ambos idiomas y temas en nueve anchos, axe, teclado, texto ampliado, menú móvil, contacto, persistencia del idioma/tema y uso sin JavaScript. Las pruebas de movimiento comprueban tipeo, scroll, entradas, cambio de idioma y animaciones activas por defecto, incluso al cambiar de tema.

Las capturas quedan en `test-results/`, excluido de Git. Las pruebas usan Chrome o Edge instalados; `BROWSER_PATH` permite elegir otro ejecutable y `BASE_URL` otro servidor. `npm run format` formatea el código. `node scripts/generate-social.mjs` regenera la imagen social en `public/assets/img/`.

## GitHub Pages

`next.config.mjs` usa `output: 'export'`. `npm run build` produce `out/` con HTML, CSS, JavaScript y los recursos de `public/`. No hace falta un servidor Next para alojarla. [Documentación oficial de exportación estática](https://nextjs.org/docs/app/guides/static-exports).

En GitHub: **Settings → Pages → Build and deployment → Source → GitHub Actions**. El workflow preparado compila al subir cambios a `master`, verifica la exportación y publica `out/`. Se puede ejecutar manualmente desde Actions. [Documentación de workflows para Pages](https://docs.github.com/en/pages/getting-started-with-github-pages/using-custom-workflows-with-github-pages).

La configuración corresponde a este repositorio personal (`leandroeguia.github.io`) y a su dominio propio: ambos sirven desde la raíz. Otro repositorio con subruta requeriría configurar `basePath`. GitHub Pages sirve archivos estáticos; las funciones de Next que requieren un servidor no forman parte de este proyecto.
