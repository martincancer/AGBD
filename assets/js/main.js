// ============================================================
// Bases de Datos — interacciones base (sin dependencias)
// ============================================================

document.addEventListener("DOMContentLoaded", () => {
  // Menú móvil
  const toggle = document.querySelector(".nav-toggle");
  const nav = document.querySelector(".main-nav");
  if (toggle && nav) {
    toggle.addEventListener("click", () => {
      const isOpen = nav.classList.toggle("open");
      toggle.setAttribute("aria-expanded", isOpen ? "true" : "false");
    });
  }

  // Botón "copiar" en bloques de código
  document.querySelectorAll(".code-block").forEach((block) => {
    const btn = document.createElement("button");
    btn.className = "copy-btn";
    btn.type = "button";
    btn.textContent = "Copiar";
    btn.addEventListener("click", () => {
      const code = block.querySelector("code");
      const text = code ? code.innerText : "";
      navigator.clipboard.writeText(text).then(() => {
        btn.textContent = "¡Copiado!";
        btn.classList.add("copied");
        setTimeout(() => {
          btn.textContent = "Copiar";
          btn.classList.remove("copied");
        }, 1600);
      });
    });
    block.appendChild(btn);
  });
});
