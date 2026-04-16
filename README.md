# Nutrissé GT — Plataforma Web

Plataforma digital de nutrición funcional con tienda en línea, 
agendamiento de citas y panel de administración.

Desarrollado por **[Logox](https://logox.tech)**

---

## Stack

| Capa | Tecnología |
|---|---|
| Framework | Next.js 14 (App Router, Static Export) |
| Lenguaje | TypeScript |
| Estilos | Tailwind CSS |
| Backend / Auth | Firebase (Auth + Firestore + Storage) |
| Estado del carrito | Zustand |
| Formularios | React Hook Form + Zod |
| Gráficas | Recharts |
| Íconos | Lucide React |
| Pagos (Fase 2) | Stripe |
| CI/CD | GitHub Actions → Firebase Hosting |

---

## Rutas

| Ruta | Descripción |
|---|---|
| / | Landing page |
| /servicios | Página de servicios |
| /test-epigenetico | Test epigenético |
| /tienda | Tienda de productos |
| /tienda/[slug] | Detalle de producto |
| /agendar | Formulario de citas (MVP) |
| /login | Inicio de sesión |
| /registro | Registro de usuario |
| /cuenta | Dashboard del cliente |
| /dashboard | Panel admin — resumen |
| /pedidos | Panel admin — pedidos |
| /productos | Panel admin — productos |
| /categorias | Panel admin — categorías |
| /citas | Panel admin — citas |
| /inventario | Panel admin — inventario |

---

## Setup local

```bash
git clone https://github.com/logoxtech/nutrisse-gt.git
cd nutrisse-gt
npm install
cp .env.local.example .env.local
# Fill in .env.local with real Firebase credentials
npm run dev
```

---

## Variables de entorno

Copiar .env.local.example y completar con las credenciales 
reales del proyecto nutrisse-gt en Firebase Console →
Project Settings → Your apps → SDK config.

```
NEXT_PUBLIC_FIREBASE_API_KEY=
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=
NEXT_PUBLIC_FIREBASE_PROJECT_ID=
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=
NEXT_PUBLIC_FIREBASE_APP_ID=
NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID=
```

---

## Deploy

Auto-deploy a Firebase Hosting en cada push a main 
vía GitHub Actions.

Requiere los siguientes secrets en el repositorio GitHub:
- Todas las variables NEXT_PUBLIC_FIREBASE_* 
- FIREBASE_SERVICE_ACCOUNT_NUTRISSE_GT

---

## Fases del proyecto

- ✅ Fase 1 (MVP): Landing, servicios, test epigenético, 
  tienda, citas (form manual), auth, panel admin
- 🔲 Fase 2: Stripe (pagos), Google Calendar vía n8n, 
  FEL Guatemala (SAT)
- 🔲 Fase 3: Omnichannel (FB/IG/WhatsApp → Tiledesk → n8n)
