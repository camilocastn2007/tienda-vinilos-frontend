# VinilosMilo Frontend

Este es el **frontend** de la tienda de vinilos VinilosMilo, construido con **Next.js 13+**, **TypeScript** y **Tailwind CSS**. Utiliza la API del backend para autenticar usuarios, mostrar el catálogo y gestionar pedidos.

## Scripts

```bash
npm run dev   # Ejecuta el servidor de desarrollo en http://localhost:3000
npm run build # Genera una versión optimizada para producción
npm start     # Inicia la aplicación en modo producción
```

## Variables de entorno

Crea un archivo `.env.local` en la raíz del proyecto con al menos la siguiente variable:

```
NEXT_PUBLIC_API_HOST=http://localhost:4000   # URL del backend
```

## Autenticación

- **Login**: `/login`
- **Registro**: `/registro`
- El token JWT se guarda en `localStorage` bajo la clave `vinilos_token` y la información del usuario bajo `vinilos_user`.
- El `Navbar` escucha el evento `auth‑change` para actualizar su estado.

## Catálogo

- Ruta: `/catalogo`
- Permite filtrar por título/artista, género y rango de precio.
- Paginación configurable (10 ítems por página).
- Cada disco muestra su portada, título, artista, género y precio.
- Botón **Agregar al carrito** crea un pedido mediante `POST /api/pedidos`.

## Panel de Administración (Admin)

- Ruta: `/admin`
- Acceso restringido a usuarios con rol `admin`.
- **CRUD de discos**: crear, editar y eliminar discos del catálogo.
- **Listado de pedidos**: tabla con usuario, disco, cantidad, estado y fecha.
- Todas las llamadas a la API usan el cliente centralizado `apiFetch` que inyecta el JWT y gestiona automáticamente redirecciones a `/login` en caso de 401.
- El panel incluye confirmación antes de eliminar un disco.

## README técnico adicional

- El backend y el frontend comparten la misma paleta de colores de VinilosMilo (`#d35400`, `#2c3e50`, `#f9f9f9`).
- Credenciales de prueba (configuradas en el seed del backend):
  - **Admin**: `admin@vinilosmilo.com` / `Admin123*`
  - **Usuario**: `user@vinilosmilo.com` / `User123*`
- Para ejecutar la aplicación completa, sigue los pasos del `README.md` en el repositorio del **backend** y luego:
  ```bash
  cd frontend
  npm install
  npm run dev
  ```

---

> **Importante**: cualquier cambio futuro en la API (nuevos endpoints, cambios en la estructura de datos) deberá actualizarse también en este README y en los componentes que consumen la API.
