// Layout compartido: header y footer comunes para todas las paginas.
(() => {
  const currentScript = document.currentScript;
  const scriptSrc = currentScript ? currentScript.getAttribute("src") || "" : "";
  const root = scriptSrc.startsWith("../") ? "../" : "";
  const path = window.location.pathname.replace(/\\/g, "/");
  const isHome = path.endsWith("/") || path.endsWith("/index.html");

  const activeSection = (() => {
    if (path.endsWith("/clases-grabadas.html")) return "grabaciones";
    if (path.endsWith("/recursos/glosario.html")) return "glosario";
    if (path.includes("/clases/")) return "clases";
    return "inicio";
  })();

  const activeClass = (section) => section === activeSection ? ' class="active"' : "";
  const classHref = isHome ? "#plan" : `${root}index.html#plan`;

  const header = `
<header class="site-header">
  <div class="wrap">
    <a class="brand" href="${root}index.html">
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <ellipse cx="12" cy="5" rx="8" ry="3" stroke="#f2b84b" stroke-width="1.6"/>
        <path d="M4 5V12C4 13.6569 7.58172 15 12 15C16.4183 15 20 13.6569 20 12V5" stroke="#49d3c0" stroke-width="1.6"/>
        <path d="M4 12V19C4 20.6569 7.58172 22 12 22C16.4183 22 20 20.6569 20 19V12" stroke="#49d3c0" stroke-width="1.6"/>
      </svg>
      Administración y Gestión de Bases de Datos
    </a>
    <button class="nav-toggle" aria-label="Abrir menú" aria-expanded="false">&#9776;</button>
    <nav class="main-nav">
      <a href="${root}index.html"${activeClass("inicio")}>Inicio</a>
      <a href="${classHref}"${activeClass("clases")}>Clases</a>
      <a href="${root}clases-grabadas.html"${activeClass("grabaciones")}>Grabaciones</a>
      <a href="${root}recursos/glosario.html"${activeClass("glosario")}>Glosario</a>
    </nav>
  </div>
</header>`;

  const footer = `
<footer class="site-footer">
  <div class="wrap">
    <span>Instituto Superior de Formación Docente y Técnica N° 43 · Lobos</span>
    <span>Tecnicatura Superior en Desarrollo de Software · Administración y Gestión de Bases de Datos</span>
  </div>
</footer>`;

  const headerTarget = document.querySelector("[data-site-header]");
  const footerTarget = document.querySelector("[data-site-footer]");

  if (headerTarget) headerTarget.outerHTML = header;
  if (footerTarget) footerTarget.outerHTML = footer;
})();
