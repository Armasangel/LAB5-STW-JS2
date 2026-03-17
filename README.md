# 📌 BULLETIN — Mini Blog / Bulletin Board

> Laboratorio de JavaScript: DOM, Eventos y REST APIs  
> Consumiendo [DummyJSON Posts API](https://dummyjson.com/docs/posts)

---

## 📋 Descripción

**BULLETIN** es un Mini Blog / Tablero de publicaciones construido con **HTML, CSS y JavaScript puro** (sin librerías ni frameworks), que consume la API pública de DummyJSON.

### Funcionalidades implementadas

| Funcionalidad | Descripción |
|---|---|
| 🏠 Home | Listado de posts en formato de cards con paginación |
| 🔍 Búsqueda | Búsqueda en tiempo real usando query params (`?q=texto`) |
| ✦ Crear Post | Formulario con validación, vista previa en vivo y envío via POST |
| 💬 Modal | Detalle completo de cada post al hacer clic |
| 🔔 Toasts | Notificaciones de éxito/error |

### UI States implementados

| State | Descripción |
|---|---|
| **idle** | Estado inicial antes de cargar posts |
| **loading** | Spinner animado durante peticiones HTTP |
| **success** | Grid de cards con los posts obtenidos |
| **empty** | Mensaje cuando una búsqueda no retorna resultados |
| **error** | Mensaje de error + botón de Retry |

### Endpoints consumidos

| Método | Endpoint | Uso |
|---|---|---|
| `GET` | `/posts?limit=N&skip=N` | Listar posts con paginación |
| `GET` | `/posts/search?q=texto` | Buscar posts por texto |
| `POST` | `/posts/add` | Crear nuevo post (JSON en body) |

---

## 🗂 Estructura del proyecto

```
miniblog/
├── index.html          ← Único archivo en raíz
├── css/
│   └── styles.css      ← Estilos (diseño editorial/brutalista)
├── js/
│   ├── api.js          ← Módulo de comunicación con DummyJSON
│   ├── posts.js        ← Módulo de listado, búsqueda y UI States
│   ├── form.js         ← Módulo del formulario de creación
│   ├── modal.js        ← Módulo del modal de detalle
│   ├── toast.js        ← Sistema de notificaciones
│   └── app.js          ← Inicialización y navegación
└── README.md
```

---

## 🚀 Guía de instalación

### Opción 1 — Abrir directamente

1. Clonar el repositorio:
   ```bash
   git clone https://github.com/TU_USUARIO/bulletin-miniblog.git
   cd bulletin-miniblog
   ```
2. Abrir `index.html` en el navegador.

> ⚠️ Para que la fuente de Google Fonts cargue correctamente se necesita conexión a internet.

### Opción 2 — Servidor local (recomendado)

```bash
# Con Python
python -m http.server 5500

# Con Node.js
npx serve .

# Con VS Code
# Usar la extensión "Live Server" y hacer clic en "Go Live"
```

Luego visitar `http://localhost:5500`


## 📸 Capturas de pantalla

> *(Ver carpeta `/assets/screenshots/`)*

| Vista | Descripción |
|---|---|
| `home.png` | Tablero con listado de posts |
| `search.png` | Resultado de búsqueda |
| `empty.png` | Estado empty sin resultados |
| `create.png` | Formulario de creación |
| `error.png` | Estado de error con botón retry |
| `modal.png` | Modal de detalle de un post |

---

## 🛠 Tecnologías

- HTML5 semántico
- CSS3 (Variables CSS, Grid, Flexbox, Animaciones)
- JavaScript ES6+ (Módulos IIFE, Async/Await, Fetch API)
- [DummyJSON API](https://dummyjson.com)
- Google Fonts (Bebas Neue, DM Mono, DM Serif Display)
