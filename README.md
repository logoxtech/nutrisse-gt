# Nutrissé GT — Plataforma Web

> Plataforma de nutrición funcional con tienda en línea, agendamiento de citas y panel de administración.

---

## Stack Tecnológico

| Capa | Tecnología |
|---|---|
| Framework | Next.js 14 (App Router) |
| Lenguaje | TypeScript |
| Estilos | Tailwind CSS |
| Backend / Auth | Firebase (Auth + Firestore + Storage) |
| Estado del carrito | Zustand |
| Formularios | React Hook Form + Zod |
| Gráficas (admin) | Recharts |
| Pagos (fase 2) | Stripe |
| Íconos | Lucide React |

---

## Desarrollado por

**Logox** — Diseño y Desarrollo Web  
🌐 [logox.tech](https://logox.tech)

---

## Instrucciones de Instalación

### 1. Clonar el repositorio

```bash
git clone https://github.com/TU_USUARIO/nutrisse-gt.git
cd nutrisse-gt
```

### 2. Instalar dependencias

```bash
npm install
```

### 3. Configurar variables de entorno

```bash
cp .env.local.example .env.local
```

Luego abre `.env.local` y rellena con tus credenciales reales de Firebase:

```env
NEXT_PUBLIC_FIREBASE_API_KEY=tu_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=tu_proyecto.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=tu_proyecto
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=tu_proyecto.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=tu_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=tu_app_id
```

### 4. Iniciar servidor de desarrollo

```bash
npm run dev
```

Abre [http://localhost:3000](http://localhost:3000) en tu navegador.

---

## Estructura de Rutas

```
/                  → Landing page pública
/tienda            → Tienda de productos
/tienda/[slug]     → Detalle de producto
/agendar           → Formulario de citas (MVP)
/login             → Inicio de sesión
/registro          → Registro de usuario
/cuenta            → Dashboard del cliente (requiere login)
/dashboard         → Panel admin — Dashboard (requiere rol admin)
/pedidos           → Panel admin — Pedidos
/productos         → Panel admin — Productos
/categorias        → Panel admin — Categorías
/citas             → Panel admin — Citas
/inventario        → Panel admin — Inventario
```

---

## Deploy

El proyecto se despliega automáticamente a **Firebase Hosting** al hacer push a la rama `main` mediante GitHub Actions.

### Configuración del secreto en GitHub

1. Ejecuta en tu terminal (con Firebase CLI instalado):
   ```bash
   firebase login:ci
   ```
2. Copia el token generado.
3. Ve a tu repositorio en GitHub → **Settings → Secrets and variables → Actions**.
4. Crea un nuevo secreto llamado `FIREBASE_TOKEN` y pega el token.

El workflow `.github/workflows/deploy.yml` se encarga del resto.

---

## Fases del Proyecto

- ✅ **Fase 1 (MVP):** Landing page, tienda, citas (form manual), auth Firebase, panel admin
- 🔲 **Fase 2:** Integración Stripe (pagos), Google Calendar vía n8n (citas automáticas)
- 🔲 **Fase 3:** App móvil, análisis epigenético interactivo
