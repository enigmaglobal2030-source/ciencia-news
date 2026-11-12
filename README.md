# Enigma Ciencia

Sitio estático en español. No necesita servidor ni base de datos: los artículos viven en `data/articulos.json` y sus imágenes en `img/`.

## Estructura

```
index.html          Portada con categorías y tarjetas
articulo.html       Página de un artículo (se llena con ?id=...)
css/estilo.css      Estilos
js/listado.js       Pinta la portada desde el JSON
js/articulo.js      Pinta un artículo desde el JSON
data/articulos.json Todos los artículos (publicados y borradores)
img/                Imágenes de los artículos
.nojekyll           Necesario para GitHub Pages
```

## Agregar un artículo

1. Sube la imagen a `img/` en formato WebP, de 1600 × 900 px y menos de 300 KB. Nombre sin espacios, por ejemplo `exoplanetas-agua.webp`.
2. Agrega un objeto en `data/articulos.json`:

```json
{
  "id": "exoplanetas-agua",
  "publicado": true,
  "titulo": "Nombre completo del tema y el titular",
  "bajada": "Resumen de una o dos frases.",
  "categoria": "Espacio",
  "fecha": "2026-11-11",
  "lectura": 4,
  "autor": "Redacción Enigma Ciencia",
  "imagen": "img/exoplanetas-agua.webp",
  "imagen_alt": "Descripción de la imagen",
  "cuerpo": ["Párrafo 1", "Párrafo 2"],
  "fuentes": ["Revista o institución, título del estudio, año."],
  "etiquetas": ["#CienciaNews", "#Espacio"]
}
```

3. Guarda y publica el cambio (ver abajo).

Campos:

- `id`: sin espacios ni acentos, único. Es la dirección del artículo: `articulo.html?id=...`.
- `publicado`: `false` deja el artículo oculto; `true` lo muestra.
- `categoria`: debe coincidir con una de estas: Espacio, Salud, Tecnología, Medioambiente, Física.
- `fecha`: formato `AAAA-MM-DD`. Los artículos se ordenan por esta fecha, del más reciente al más antiguo.
- `cuerpo`: cada elemento es un párrafo. El texto va sin HTML.
- `fuentes`: texto plano, sin enlaces.

## Publicar

Se publica con un commit al repositorio. Con GitHub Pages activado en la rama principal, el sitio se actualiza en uno o dos minutos.

Activar GitHub Pages (una sola vez): en el repositorio, Settings → Pages → Build and deployment → Deploy from a branch → rama `main`, carpeta `/ (root)`.

## Pendiente (no incluido aún)

- Boletín por correo: necesita un proveedor (por ejemplo Buttondown o Mailchimp). Cuando lo elijas, se añade el formulario.
- Página de contacto y enlaces sociales: se agregan con las direcciones reales.
- Dominio propio: se configura en Settings → Pages.
