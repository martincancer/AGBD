# Bases de Datos — sitio de apoyo de la materia

Sitio estático en HTML + CSS + JS puro. Sin frameworks, sin paso de build, sin instalar nada: se abre directo en el navegador.

## Cómo verlo

Hacé doble clic en `index.html`. Listo — funciona abriéndolo directamente desde el explorador de archivos (protocolo `file://`), no necesita servidor.

(Si en algún momento agregás algo que use `fetch()` para cargar datos, ahí sí vas a necesitar un servidor local simple — por ejemplo `python -m http.server` parado en esta carpeta y abrir `http://localhost:8000`. Tal como está armado ahora, no hace falta.)

## Estructura

```
index.html                  → portada con el plan de la materia
clases/
  clase-01-diseno-relaciones.html
  clase-02-inner-join.html
  clase-03-subconsultas.html
  clase-04-agregado-case.html
  clase-05-cursores-triggers.html
  clase-06-procedimientos.html
recursos/
  glosario.html
assets/
  css/style.css            → todo el diseño vive acá
  js/main.js                → menú móvil + botón "copiar" en bloques de código
  js/sql-highlight.js       → resaltado de sintaxis SQL (sin librerías externas)
```

## Cómo agregar una clase nueva

1. Copiá un archivo de `clases/` que sea parecido en estructura (por ejemplo `clase-06-procedimientos.html`) y renombralo, por ejemplo `clase-07-vistas.html`.
2. Cambiá:
   - El `<title>` y el `<meta name="description">`.
   - `PK 07` y el texto de `topic-tag` en el header.
   - El `<h1>` con el título de la clase.
   - El contenido dentro de `<article class="class-body">`.
   - Los links de "Clase anterior / Clase siguiente" al final (`class-pagination`).
3. En `index.html`, agregá un nuevo `<article class="class-card">` dentro de `<div class="timeline">`, copiando uno existente y cambiando el número, el título, la descripción y el `href`.
4. En la clase anterior (la 06), actualizá su link "Clase siguiente" para que apunte a la nueva.

No hace falta tocar nada más — el menú, los estilos y el resaltado de código son compartidos automáticamente porque todas las páginas enlazan a los mismos archivos en `assets/`.

## Bloques reutilizables (para copiar y pegar dentro del contenido)

**Bloque de código SQL** (se resalta y tiene botón de copiar solo):
```html
<div class="code-block"><pre><code class="language-sql">
SELECT * FROM Cliente;
</code></pre></div>
```

**Aviso / tip:**
```html
<div class="callout">
  <span class="callout-label">Tip</span>
  <p>Texto del aviso.</p>
</div>
```

**Advertencia** (mismo bloque, agregando la clase `warning`):
```html
<div class="callout warning">
  <span class="callout-label">Atención</span>
  <p>Texto de la advertencia.</p>
</div>
```

**Tabla tipo diccionario de datos:**
```html
<table class="data-table">
  <thead><tr><th>Columna</th><th>Descripción</th></tr></thead>
  <tbody>
    <tr><td>...</td><td>...</td></tr>
  </tbody>
</table>
```

## Publicarlo online (opcional)

Si más adelante querés que los alumnos lo vean desde cualquier lado: subís esta misma carpeta a un repositorio de GitHub y activás GitHub Pages (Settings → Pages → Deploy from branch). No requiere ningún cambio en el código.
