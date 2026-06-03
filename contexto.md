# Contexto del Proyecto — AdminAgro IA-V2

## Descripción General

AdminAgro es una plataforma web de gestión agropecuaria para el campo colombiano. Combina Flask como backend con un asistente conversacional (AgriBot) impulsado por Google Gemini. Incluye módulos de gestión de cultivos, animales, inventario, labores y gastos, junto con una interfaz moderna con diseño Glint-AdminAgro.

Está desplegado en producción en **Render.com**: https://adminagro.onrender.com

---

## Estructura de Directorios

```
D:\AdminAgro IA-V2\
├── main.py                        # Aplicación Flask principal (6 rutas GET + POST /chat)
├── requirements.txt               # Flask, gunicorn, google-genai, python-dotenv
├── Procfile                       # web: gunicorn main:app
├── .env                           # Variables de entorno locales (NO en git)
├── .gitignore
├── contexto.md                    # Este archivo
│
├── chatbot/
│   ├── __init__.py
│   ├── ai.py                      # Integración Google Gemini (GEMINI_API_KEY, GEMINI_MODEL)
│   └── static/
│       ├── css/style.css          # Estilos globales (paleta AdminAgro + estética Glint)
│       ├── js/app.js              # Lógica del chat en frontend
│       ├── demo-app.html          # Demo interactiva versión escritorio
│       ├── demo-app-mobile.html   # Demo interactiva versión móvil
│       └── img/
│           ├── AdminAgro-Logo.png
│           ├── favicon.ico
│           ├── hero-campo.jpg     # Imagen hero principal
│           └── ...otras imágenes
│
└── templates/
    ├── base.html                  # Template base: navbar, footer con formulario, chat widget
    ├── index.html                 # Landing principal (hero, stats, módulos, demos, pricing)
    ├── cultivos.html
    ├── animales.html
    ├── inventario.html
    ├── labores.html
    └── gastos.html
```

---

## Tecnologías

| Capa | Tecnología |
|------|-----------|
| Backend | Flask 3.x, Python 3.12 |
| IA / Chatbot | Google Gemini API (`google-genai` SDK) |
| Frontend | HTML5, CSS3 (custom properties), JavaScript vanilla, Jinja2 |
| Tipografía | Poppins (Google Fonts) — única fuente del proyecto |
| Producción | Gunicorn + Render.com (free tier) |
| Variables de entorno | `GEMINI_API_KEY`, `GEMINI_MODEL` |
| Control de versiones | Git + GitHub (`natalia-lopez-carmona`) |

---

## Rutas de la Aplicación

| Método | Ruta | Descripción |
|--------|------|-------------|
| GET | `/` | Landing principal con hero, stats, módulos, demos, pricing, testimonios |
| GET | `/cultivos` | Módulo de gestión de cultivos |
| GET | `/animales` | Módulo de gestión de animales |
| GET | `/inventario` | Módulo de inventario |
| GET | `/labores` | Módulo de labores agrícolas |
| GET | `/gastos` | Módulo de gastos |
| POST | `/chat` | API JSON: recibe mensaje del usuario, devuelve respuesta de AgriBot (Gemini) |

---

## Flujo del Chatbot (AgriBot)

```
Usuario escribe en UI (app.js)
  → POST /chat con mensaje (JSON)
    → main.py llama predict_answer() de chatbot.ai
      → chatbot/ai.py consulta Google Gemini API
      → Devuelve respuesta en texto
  ← JSON con respuesta
← app.js renderiza burbuja en chat (soporte Markdown via marked.js)
```

**Modelo**: Google Gemini (configurable via `GEMINI_MODEL` en `.env` / variables de entorno de Render).

---

## Diseño y Estilos

- **Paleta AdminAgro** definida en `:root` de `style.css`:
  - `--verde: #1a7835`, `--verde-medio: #2d9940`, `--verde-claro: #5dbf4e`
  - `--lima: #f0e030`, `--naranja: #f5a520`, `--crema: #fdf8ee`, `--oscuro: #0d2b3e`
- **Estética Glint** aplicada al index: eyebrow labels (uppercase, letter-spacing 2.5px), section titles (font-weight 500, letter-spacing -1px), card hover con `translateY(-6px)` + sombra verde
- **Scroll reveal** via IntersectionObserver (clase `.reveal` → `.visible`)
- **Chat widget** flotante en todas las páginas vía `base.html`
- **Footer** con formulario de contacto de 2 columnas (marca + links | formulario)
- **Bottom nav** móvil fijo en la parte inferior

---

## Estado del Proyecto

### Completado
- Estructura Flask con 6 rutas web + API de chat
- AgriBot funcional con Google Gemini (respuestas agropecuarias)
- Widget de chat flotante en todas las páginas (base.html)
- Landing page rediseñada con estética Glint-AdminAgro
- Stats bar, grid de módulos, sección de demos, pricing, testimonios
- Demos interactivas escritorio y móvil con botón de regreso
- Footer con formulario de contacto
- Bottom navigation móvil
- Deploy en producción: https://adminagro.onrender.com
- Repositorio GitHub: natalia-lopez-carmona

### Pendiente / Mejoras futuras
- Backend del formulario de contacto del footer (actualmente solo muestra mensaje de gracias)
- Módulos internos (cultivos, animales, inventario, labores, gastos) por desarrollar
- Sin sistema de autenticación / usuarios
- Sin base de datos persistente

---

## Deploy en Render

- **URL**: https://adminagro.onrender.com
- **Servicio**: Web Service, free tier
- **Build command**: `pip install -r requirements.txt`
- **Start command**: `gunicorn main:app` (Procfile)
- **Variables de entorno en Render**: `GEMINI_API_KEY`, `GEMINI_MODEL`
- **Auto-deploy**: activado desde rama `main` de GitHub

---

## Git

- **Rama activa**: `main`
- **Remoto**: `origin` → GitHub (`natalia-lopez-carmona/AdminAgro`)
- **Deploy automático**: push a `main` → Render redeploya automáticamente
