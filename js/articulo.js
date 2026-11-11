const fmtFecha = (f) =>
  new Date(f + "T00:00:00").toLocaleDateString("es", { day: "numeric", month: "long", year: "numeric" });

const texto = (tag, clase, valor) => {
  const el = document.createElement(tag);
  if (clase) el.className = clase;
  el.textContent = valor;
  return el;
};

const main = document.getElementById("contenido");

function mostrarMensaje(msg) {
  main.replaceChildren(texto("p", "vacio", msg));
}

async function iniciar() {
  document.getElementById("anio").textContent = new Date().getFullYear();

  const id = new URLSearchParams(location.search).get("id");
  if (!id) {
    mostrarMensaje("Artículo no encontrado.");
    return;
  }

  let lista = [];
  try {
    const r = await fetch("data/articulos.json", { cache: "no-cache" });
    if (!r.ok) throw new Error(String(r.status));
    lista = await r.json();
  } catch (e) {
    mostrarMensaje("No se pudo cargar el artículo. Intenta de nuevo más tarde.");
    return;
  }

  const a = lista.find((x) => x.id === id && x.publicado === true);
  if (!a) {
    mostrarMensaje("Artículo no encontrado.");
    return;
  }

  document.title = `${a.titulo} — Ciencia News`;
  const desc = document.querySelector('meta[name="description"]');
  if (desc) desc.content = a.bajada;

  const art = document.createElement("article");
  art.className = "articulo";

  const volver = document.createElement("a");
  volver.href = "index.html";
  volver.className = "volver";
  volver.textContent = "← Volver a las noticias";

  art.append(
    volver,
    texto("span", "etiqueta", a.categoria),
    texto("h1", "", a.titulo),
    texto("p", "bajada", a.bajada),
    texto("div", "meta", `${a.autor} · ${fmtFecha(a.fecha)} · ${a.lectura} min de lectura`)
  );

  if (a.imagen) {
    const fig = document.createElement("figure");
    const img = document.createElement("img");
    img.src = a.imagen;
    img.alt = a.imagen_alt || "";
    fig.appendChild(img);
    art.appendChild(fig);
  }

  (a.cuerpo || []).forEach((p) => {
    // Un elemento que empieza con "## " se pinta como subtítulo de sección.
    if (p.startsWith("## ")) {
      art.appendChild(texto("h2", "", p.slice(3)));
    } else {
      art.appendChild(texto("p", "parrafo", p));
    }
  });

  if (a.fuentes && a.fuentes.length) {
    art.appendChild(texto("h2", "", "Fuentes"));
    const ol = document.createElement("ol");
    a.fuentes.forEach((f) => ol.appendChild(texto("li", "", f)));
    art.appendChild(ol);
  }

  if (a.etiquetas && a.etiquetas.length) {
    const w = document.createElement("div");
    w.className = "etiquetas";
    a.etiquetas.forEach((t) => w.appendChild(texto("span", "", t)));
    art.appendChild(w);
  }

  main.replaceChildren(art);
}

iniciar();
