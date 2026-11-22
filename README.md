# 🎓 Preparador para la Prueba Técnica - Universidad de la Costa (CUC)
### Vacante: Practicante en Sistemas, Análisis y Desarrollo de Software o Afines

Aplicación web completa, interactiva y pedagógica diseñada para la preparación integral de la prueba técnica presencial en la **Universidad de la Costa (CUC)**.

---

## ⚡ Estructura del Proyecto

```text
Entrevista_CUC/
├── index.html           # Aplicación web SPA completa
├── _headers             # Encabezados de seguridad y caché para Cloudflare Pages
├── .gitignore           # Archivos ignorados por Git
├── css/
│   └── styles.css       # Estilos personalizados, animaciones 3D y contrastes
├── js/
│   ├── data.js          # Información general, banco oral (25) y flashcards (30+)
│   ├── data_theory.js   # Manual técnico de 8 módulos detallados
│   ├── data_practice.js # Banco de más de 125 retos prácticos (25 por tema)
│   └── app.js           # Lógica interactiva, evaluadores, tablero limpio y temporizador
└── assets/
    └── convocatoria_cuc.jpg # Afiche oficial de la convocatoria CUC
```

---

## ☁️ Despliegue en Cloudflare Pages

La aplicación es un sitio estático puro (HTML5, Tailwind CSS, JavaScript vanilla). No requiere ningún paso de compilación (*Build Step*).

### Opción 1: Conectar Repositorio de GitHub en Cloudflare Dashboard (Recomendada)

1. Ingresa a tu cuenta en [Cloudflare Dashboard](https://dash.cloudflare.com/).
2. En el menú lateral, dirígete a **Compute (Workers & Pages)** > **Pages**.
3. Haz clic en **Create a project** > **Connect to Git**.
4. Selecciona el repositorio: `Luis9007/Interview-CUC`.
5. Configura los parámetros de compilación:
   - **Framework preset:** `None`
   - **Build command:** *(dejar en blanco)*
   - **Build output directory:** `/` *(o dejar en blanco)*
   - **Root directory:** `/` *(o dejar en blanco)*
6. Haz clic en **Save and Deploy**. En menos de 30 segundos, Cloudflare generará tu URL pública gratuita con HTTPS (ejemplo: `https://interview-cuc.pages.dev`).

### Opción 2: Despliegue con Wrangler CLI

Si tienes instalado Wrangler en tu máquina:
```bash
npx wrangler pages deploy . --project-name=interview-cuc
```

---

## 💻 Ejecución en Local

Simplemente abre el archivo `index.html` en cualquier navegador web o ejecuta el servidor local en PowerShell:
```powershell
powershell -ExecutionPolicy Bypass -File server.ps1
```
E ingresa a: `http://localhost:5173/`
