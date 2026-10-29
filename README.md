# 🎵 VinilosMilo - Tienda de Vinilos y Música Física

Plataforma web de comercio electrónico especializada en música en formatos físicos (vinilos y CDs), construida con arquitectura moderna desacoplada: **Next.js 15 (Frontend)** y **Node.js / Express con TypeScript y Prisma ORM (Backend)** sobre **PostgreSQL**.

---

## 🚀 Requisitos Previos

- [Node.js](https://nodejs.org/) (versión 18 o superior)
- [Docker Desktop](https://www.docker.com/products/docker-desktop/) (recomendado para la base de datos) o PostgreSQL instalado localmente.
- [Git](https://git-scm.com/)

---

## 📦 Puesta en Marcha Rápida (Paso a Paso)

### 1. Iniciar la Base de Datos con Docker (Recomendado)

Abre Docker Desktop y corre este comando en tu terminal para crear e iniciar el contenedor de PostgreSQL:

```bash
docker run --name vinilosmilo-db -e POSTGRES_USER=postgres -e POSTGRES_PASSWORD=postgres -e POSTGRES_DB=vinilosmilo -p 5432:5432 -d postgres:16
```

> **Nota si usas PostgreSQL local sin Docker:** Asegúrate de tener PostgreSQL corriendo en el puerto 5432 con usuario `postgres`, contraseña `postgres` y una base de datos llamada `vinilosmilo`.

---

### 2. Configurar y Levantar el Backend

En una terminal:

```bash
cd backend

# Instalar dependencias
npm install

# Generar cliente de Prisma y aplicar migraciones
npx prisma db push

# Poblar la base de datos con los 26 discos iniciales y usuarios de prueba
npm run prisma:seed

# Iniciar el servidor backend en modo desarrollo
npm run dev
```

El backend se iniciará en **`http://localhost:4000`** con endpoints disponibles bajo `/api`.

---

### 3. Configurar y Levantar el Frontend

En otra terminal separada:

```bash
cd frontend

# Instalar dependencias
npm install

# Iniciar el servidor Next.js
npm run dev
```

El frontend estará disponible inmediatamente en **`http://localhost:3000`**.

---

## 🔑 Cuentas de Prueba Preconfiguradas (Seed)

| Rol | Correo Electrónico | Contraseña |
|---|---|---|
| **Administrador** | `admin@vinilosmilo.com` | `admin123` |
| **Cliente / Usuario** | `user@vinilosmilo.com` | `user123` |

También puedes registrarte con una cuenta nueva desde `/registro`.

---

## 🌐 Estructura del Proyecto

```text
TiendaVinilos/
├── backend/                  # API REST en 4 capas (TypeScript, Express, Prisma)
│   ├── prisma/               # Schema y seed de discos
│   └── src/
│       ├── domain/           # Entidades del dominio
│       ├── application/      # Casos de uso
│       ├── infrastructure/   # Repositorios Prisma y base de datos
│       └── interface/        # Controladores y rutas HTTP
├── frontend/                 # Aplicación Next.js 15 (App Router, Tailwind CSS)
│   ├── public/               # Portadas de discos y recursos estáticos
│   └── src/
│       ├── app/              # Páginas (Inicio, Catálogo, Login, Registro)
│       ├── features/         # Componentes Navbar, Footer, etc.
│       └── lib/              # Cliente HTTP para llamadas API
└── README.md                 # Guía general de instalación
```
