const CATEGORIAS = ["Todas", "Espacio", "Salud", "Tecnología", "Medioambiente", "Física"];

let todos = [];
let activa = "Todas";
let errorCarga = false;

const fmtFecha = (f) =>
  new Date(f + "T00:00:00").toLocaleDateString("es", { day: "numeric", month: "long", year: "numeric" });

function publicados() {
  return todos
    .filter((a) => a.publicado === true)
    .sort((a, b) => b.fecha.localeCompare(a.fecha));
}

function pintarFiltros() {
  const cont = document.getElementById("filtros");
  const pub = publicados();
  cont.replaceChildren();
  CATEGORIAS.forEach((cat) => {
    const n = cat === "Todas" ? pub.length : pub.filter((a) => a.categoria === cat).length;
    const b = document.createElement("button");
    b.type = "button";
    b.textContent = `${cat} (${n})`;
    b.setAttribute("aria-pressed", String(cat === activa));
    b.addEventListener("click", () => {
      activa = cat;
      pintar();
    });
    cont.appendChild(b);
  });
}

function pintarRejilla() {
  const cont = document.getElementById("ultimas");
  const vacio = document.getElementById("vacio");
  cont.replaceChildren();

  if (errorCarga) {
    vacio.textContent = "No se pudieron cargar los artículos. Intenta de nuevo más tarde.";
    vacio.hidden = false;
    return;
  }
  vacio.textContent = "Todavía no hay artículos publicados.";

  const lista = publicados().filter((a) => activa === "Todas" || a.categoria === activa);
  vacio.hidden = lista.length > 0;

  lista.forEach((a) => {
    const enlace = document.createElement("a");
    enlace.className = "tarjeta";
    enlace.href = `articulo.html?id=${encodeURIComponent(a.id)}`;

    if (a.imagen) {
      const img = document.createElement("img");
      img.src = a.imagen;
      img.alt = a.imagen_alt || "";
      img.loading = "lazy";
      enlace.appendChild(img);
    }

    const c = document.createElement("div");
    c.className = "cuerpo";

    const et = document.createElement("span");
    et.className = "etiqueta";
    et.textContent = a.categoria;

    const h = document.createElement("h2");
    h.textContent = a.titulo;

    const p = document.createElement("p");
    p.textContent = a.bajada;

    const m = document.createElement("div");
    m.className = "meta";
    m.textContent = `${fmtFecha(a.fecha)} · ${a.lectura} min de lectura`;

    c.append(et, h, p, m);
    enlace.appendChild(c);
    cont.appendChild(enlace);
  });
}

function pintar() {
  pintarFiltros();
  pintarRejilla();
}

async function iniciar() {
  document.getElementById("anio").textContent = new Date().getFullYear();
  try {
    const r = await fetch("data/articulos.json", { cache: "no-cache" });
    if (!r.ok) throw new Error(String(r.status));
    todos = await r.json();
  } catch (e) {
    errorCarga = true;
  }
  pintar();
}

iniciar();
