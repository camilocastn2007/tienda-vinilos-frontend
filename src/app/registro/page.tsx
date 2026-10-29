// src/app/registro/page.tsx
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

/**
 * Formulario de registro de usuarios.
 * Envía los datos a `/api/auth/register` del backend.
 * En caso de éxito guarda el JWT y la información del usuario en localStorage,
 * dispara el evento `auth-change` para actualizar la UI (Navbar) y redirige al home.
 */
export default function RegistroPage() {
  const router = useRouter();
  const [nombre, setNombre] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    if (!nombre || !email || !password) {
      setError("Todos los campos son obligatorios.");
      return;
    }
    setLoading(true);
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_HOST}/api/auth/register`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ nombre, email, password }),
        }
      );
      if (!response.ok) {
        const data = await response.json();
        setError(data.message || "Error al registrar.");
        setLoading(false);
        return;
      }
      const data = await response.json();
      // Backend expected to return { token, user }
      localStorage.setItem("vinilos_token", data.token);
      localStorage.setItem("vinilos_user", JSON.stringify(data.user));
      window.dispatchEvent(new Event("auth-change"));
      router.push("/");
    } catch (err) {
      setError("Fallo de conexión.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#f9f9f9]">
      <div className="w-full max-w-sm rounded-lg bg-white p-6 shadow-md">
        <h2 className="mb-4 text-center text-2xl font-bold text-[#2c3e50]">Registrarse</h2>
        {error && (
          <div className="mb-4 rounded bg-red-100 p-2 text-red-700">{error}</div>
        )}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-[#333333]" htmlFor="nombre">Nombre</label>
            <input
              id="nombre"
              type="text"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              required
              className="mt-1 block w-full rounded border border-gray-300 px-3 py-2 focus:border-[#d35400] focus:outline-none"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-[#333333]" htmlFor="email">Email</label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="mt-1 block w-full rounded border border-gray-300 px-3 py-2 focus:border-[#d35400] focus:outline-none"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-[#333333]" htmlFor="password">Contraseña</label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="mt-1 block w-full rounded border border-gray-300 px-3 py-2 focus:border-[#d35400] focus:outline-none"
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full rounded bg-[#d35400] py-2 text-white hover:bg-[#c14400]"
          >
            {loading ? "Cargando..." : "Crear cuenta"}
          </button>
        </form>
        <p className="mt-4 text-center text-sm text-[#333333]">
          ¿Ya tienes cuenta?{' '}
          <a href="/login" className="text-[#d35400] hover:underline">Inicia sesión</a>
        </p>
      </div>
    </div>
  );
}
