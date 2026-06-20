// ============================================================
// Resaltador de sintaxis SQL — minimalista, sin dependencias.
// Busca <code class="language-sql"> y le aplica spans con clases
// tok-kw / tok-str / tok-num / tok-com / tok-fn (ver style.css).
// ============================================================

(function () {
  const KEYWORDS = [
    "SELECT", "FROM", "WHERE", "AND", "OR", "NOT", "NULL", "IS",
    "INNER", "LEFT", "RIGHT", "FULL", "OUTER", "JOIN", "ON",
    "GROUP", "BY", "ORDER", "HAVING", "AS", "DESC", "ASC",
    "INSERT", "INTO", "VALUES", "UPDATE", "SET", "DELETE",
    "CREATE", "TABLE", "ALTER", "DROP", "PRIMARY", "KEY",
    "FOREIGN", "REFERENCES", "DEFAULT", "IDENTITY", "CONSTRAINT",
    "CASE", "WHEN", "THEN", "ELSE", "END", "IN", "EXISTS",
    "BETWEEN", "LIKE", "DISTINCT", "TOP", "DECLARE", "BEGIN",
    "PRINT", "WHILE", "FETCH", "NEXT", "OPEN", "CLOSE",
    "DEALLOCATE", "CURSOR", "FOR", "PROCEDURE", "EXEC", "EXECUTE",
    "OUTPUT", "RETURN", "TRIGGER", "AFTER", "BEFORE", "EXEC",
    "UNION", "ALL", "INTO", "VARCHAR", "INT", "DECIMAL", "DATE",
    "DATETIME", "GETDATE", "COUNT", "SUM", "AVG", "MAX", "MIN"
  ];

  const KW_REGEX = new RegExp("\\b(" + KEYWORDS.join("|") + ")\\b", "gi");

  function escapeHtml(str) {
    return str
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;");
  }

  function highlight(sql) {
    const placeholders = [];

    // 1. proteger strings y comentarios primero
    let work = sql.replace(/('([^']|'')*')/g, (m) => {
      placeholders.push({ cls: "tok-str", text: m });
      return "\u0000" + (placeholders.length - 1) + "\u0000";
    });
    work = work.replace(/(--[^\n]*)/g, (m) => {
      placeholders.push({ cls: "tok-com", text: m });
      return "\u0000" + (placeholders.length - 1) + "\u0000";
    });

    work = escapeHtml(work);

    // 2. funciones tipo NOMBRE(
    work = work.replace(/\b([A-Za-z_][A-Za-z0-9_]*)(\s*\()/g, (m, name, rest) => {
      if (KEYWORDS.includes(name.toUpperCase())) return m;
      return `<span class="tok-fn">${name}</span>${rest}`;
    });

    // 3. números
    work = work.replace(/\b(\d+(\.\d+)?)\b/g, '<span class="tok-num">$1</span>');

    // 4. keywords
    work = work.replace(KW_REGEX, (m) => `<span class="tok-kw">${m.toUpperCase()}</span>`);

    // 5. restaurar strings/comentarios protegidos, ya escapados
    work = work.replace(/\u0000(\d+)\u0000/g, (_, idx) => {
      const ph = placeholders[Number(idx)];
      return `<span class="${ph.cls}">${escapeHtml(ph.text)}</span>`;
    });

    return work;
  }

  document.addEventListener("DOMContentLoaded", () => {
    document.querySelectorAll("code.language-sql").forEach((el) => {
      const raw = el.textContent;
      el.innerHTML = highlight(raw);
    });
  });
})();
