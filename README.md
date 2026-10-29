# Frontend - Tienda de Vinilos y CDs (VinilosMilo)

Aplicación web desarrollada con Next.js 15 (App Router), React y Tailwind CSS para la tienda virtual VinilosMilo. Consume la API REST del backend para mostrar el catálogo de discos, permitir el registro/login de usuarios y gestionar pedidos en tiempo real.

## Repositorios del Proyecto

- Repositorio Frontend: https://github.com/camilocastn2007/tienda-vinilos-frontend
- Repositorio Backend: https://github.com/camilocastn2007/tienda-vinilos-backend

## Tecnologías Utilizadas

- Next.js 15 con TypeScript y App Router
- React 19
- Tailwind CSS v4 para los estilos
- Fetch API centralizado con manejo de autenticación JWT

## Requisitos

- Node.js 18 o superior
- Tener el backend corriendo en el puerto 4000

## Pasos para ejecutar el frontend

1. **Instalar dependencias:**
   ```bash
   npm install
   ```

2. **Variables de entorno:**
   Verificar que exista el archivo `.env.local` con la URL del backend:
   ```env
   NEXT_PUBLIC_API_HOST=http://localhost:4000
   ```

3. **Iniciar el servidor de desarrollo:**
   ```bash
   npm run dev
   ```
   La aplicación se abrirá en http://localhost:3000

## Páginas de la aplicación

- `/`: Página principal con presentación de la tienda y discos destacados.
- `/catalogo`: Catálogo completo con buscador por título/artista, filtro por género y paginación.
- `/registro`: Formulario para crear una cuenta nueva en la tienda.
- `/login`: Inicio de sesión para usuarios y administradores.
- `/mis-pedidos`: Historial de pedidos del usuario autenticado con opción de cancelar pedidos.

## Cuentas de prueba

- Administrador: `admin@vinilosmilo.com` / `Admin123*`
- Cliente: `user@vinilosmilo.com` / `User123*`
