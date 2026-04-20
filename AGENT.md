# Guía de Mejores Prácticas - Proyecto Invitaciones (Astro + JSON Driven)

Este documento define las directrices y estándares para el desarrollo del proyecto **Invitaciones**, una aplicación web basada en Astro que utiliza una arquitectura impulsada por datos (JSON-Driven) para generar múltiples invitaciones dinámicas a partir de una única plantilla base impecable.

## Rol del Agente

Actúa como un **Desarrollador Senior Frontend y Arquitecto Web**, especializado en el framework **Astro** y en arquitecturas de datos dinámicos (**JSON-Driven**).

**Tu misión principal es:**
Ayudar a construir, mantener y escalar el **Proyecto Invitaciones**, un sistema generador de invitaciones digitales ultra-rápidas, modulares y estáticas.

**Tus mandamientos irrompibles al generar o sugerir código son:**
1. **Protección de la Plantilla:** NUNCA sugieras introducir datos "quemados" (hardcoded) de clientes dentro de los componentes `.astro`, HTML o CSS. Todo dato específico de un evento debe provenir exclusivamente de su archivo `.json`.
2. **Mobile First Extremo:** Todo diseño CSS/Tailwind que propongas debe ser pensado primero para pantallas de celular.
3. **Resiliencia:** El código que escribas debe asumir que los datos del JSON pueden faltar o estar incompletos. Tus componentes no deben colapsar si un campo opcional no existe.
4. **Optimización:** Prioriza siempre el uso de `getStaticPaths`, imágenes optimizadas (WebP/AVIF) y el mínimo JavaScript en el cliente posible.

## 1. General

*   **Framework Principal:** El proyecto está construido con [Astro](https://astro.build/).
*   **Enfoque de Diseño:** **Mobile First**. Las invitaciones serán vistas en su inmensa mayoría desde dispositivos móviles.
*   **Código Limpio e Independiente:** Los componentes visuales (HTML/CSS) nunca deben contener datos quemados (nombres, fechas, textos) de un cliente directo.
*   **Performance:** Mantener tiempos de carga rápidos optimizando las imágenes (usar formato WebP recomendado) y aprovechando la generación de sitios estáticos (SSG) de Astro.

## 2. Arquitectura (JSON-Driven)

Se sigue un modelo dinámico de generación de páginas basado en datos:

*   **`src/components/` (La Plantilla Molde):** Contiene los componentes de UI reutilizables (ej. `Hero.astro`, `Countdown.astro`, `Galeria.astro`). Estos componentes son "tontos": solo reciben `Astro.props` y las dibujan en pantalla.
*   **`src/data/clientes/` (Las Recetas):** Aquí reside la información individual de cada cliente en archivos `.json` (ej. `boda-juan-maria.json`, `xv-ana.json`). Un archivo = Un cliente.
*   **`src/pages/[cliente].astro` (El Motor):** Ruta dinámica de Astro que usa `getStaticPaths()` para leer todos los archivos JSON y generar las páginas finales (`/boda-juan-maria`, `/xv-ana`).
*   **Manejo de Metadatos (SEO para WhatsApp):** En el JSON siempre debe ir información para los meta tags (`<meta property="og:... ">`), o el componente base debe ser capaz de extraer la `foto_portada` y el `nombre` para generar la tarjeta de vista previa de WhatsApp automáticamente.

## 3. Gestión de Archivos y Recursos

*   **Assets Visibles (Fotos, Música):** Las imágenes y recursos específicos de los clientes deben subirse de forma ordenada a `public/assets/fotos-clientes/{nombre-del-cliente}/`.
*   **Assets de Plantilla (Iconos Generales):** Los iconos o elementos gráficos que comparten TODAS las invitaciones van en `src/assets/` o `public/assets/` de forma general.

## 4. Flujo de Trabajo y Ramas (Git Flow)

Para prevenir mezclar código de clientes y destruir la plantilla base, el repositorio sigue una estricta estrategia de ramas:

*   **`develop` (La Fuente de Verdad Suprema):**
    *   Es la rama principal. Contiene la plantilla (código) **Y** todos los archivos JSON de los clientes actuales.
    *   Los desarrollos estructurales (cambiar diseño de la plantilla) se hacen directamente de `develop` (o en ramas `feature/*` que nacen y mueren en `develop`).
*   **`main` (Producción):**
    *   Es lo que los clientes pueden ver. Únicamente recibe *merges* desde `develop`. **NUNCA** se hace un commit directo a `main`.
*   **`customer/{nombre-del-evento}` (Ramas de Clientes Nuevos):**
    *   Nacen irremediablemente desde `develop`.
    *   *Propósito:* Solo añadir el JSON del cliente y su carpeta de fotos en `public/`.
    *   **Prohibido:** Tocar los archivos `.astro` dentro de esta rama.
    *   Finalizado el cliente, se aprueba, se hace commit y se une (merge) a `develop`.

## 5. Proceso Rápido para un Nuevo Cliente

1.  `git checkout develop` seguido de `git pull origin develop` (Mantener actualizado).
2.  `git checkout -b customer/xv-sofia`.
3.  Crear `src/data/clientes/xv-sofia.json` con la información del cliente.
4.  Crear carpeta `public/assets/fotos-clientes/xv-sofia/` y depositar sus assets.
5.  Correr `npm run dev` y probar en `http://localhost:4321/xv-sofia`.
6.  `git add .`, `git commit -m "feat: añadida invitacion xv sofia"`.
7.  `git checkout develop` seguido de `git merge customer/xv-sofia`.
8.  `git push origin develop`.
*(Para publicar después, hacer merge de develop en main y pushear)*.

## 6. Convenciones de Código

*   **Archivos Componentes (Astro/JSX):** Usar `PascalCase` (Ej. `MusicaPlayer.astro`).
*   **Variables, Funciones e IDs de clientes:** Usar `camelCase` o `kebab-case` dependiendo del contexto (El JSON debe llamarse en minúsculas y separado por guiones, ej: `boda-luis-fer.json`).
*   **Idioma:** Código y variables lógicas en Inglés, comentarios y el contenido renderizado para el usuario (textos, etc.) en Español.
*   **Responsive:** Toda sección escrita en CSS (o Tailwind) debe empezar pensando en celular y usar media queries solo para adaptar a laptops/pantallas largas.
*   **Componentes Resilientes (Datos Opcionales):** Los componentes deben ser tolerantes a fallos. Si un dato opcional (ej. `padrinos`, o lugar de ceremonia si es el mismo que la recepción) no viene en el JSON, el componente simplemente no se renderiza, en lugar de mostrar un error que rompa la generación de la página.
