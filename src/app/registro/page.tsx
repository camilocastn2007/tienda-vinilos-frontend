"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function RegistroPage() {
  const router = useRouter();
  const [nombre, setNombre] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmar, setConfirmar] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    if (!nombre || !email || !password || !confirmar) {
      setError("Todos los campos son obligatorios.");
      return;
    }
    if (password !== confirmar) {
      setError("Las contrasenas no coinciden.");
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
        setError(data.message || "Error al registrarse.");
        setLoading(false);
        return;
      }
      const data = await response.json();
      localStorage.setItem("vinilos_token", data.token);
      localStorage.setItem("vinilos_user", JSON.stringify(data.user));
      window.dispatchEvent(new Event("auth-change"));
      router.push("/");
    } catch (_) {
      setError("Fallo de conexion con el servidor.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#f9f9f9]">
      <div className="w-full max-w-sm rounded-lg bg-white p-8 shadow-md">
        <h2 className="mb-6 text-center text-2xl font-bold text-[#2c3e50]">Crear Cuenta</h2>
        {error && (
          <div className="mb-4 rounded bg-red-100 p-3 text-red-700 text-sm">{error}</div>
        )}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-[#333333] mb-1" htmlFor="nombre">
              Nombre completo
            </label>
            <input
              id="nombre"
              type="text"
              value={nombre}
              onChange={e => setNombre(e.target.value)}
              required
              className="block w-full rounded border border-gray-300 px-3 py-2 text-sm focus:border-[#d35400] focus:outline-none focus:ring-1 focus:ring-[#d35400]"
              placeholder="Tu nombre"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-[#333333] mb-1" htmlFor="email">
              Email
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
              className="block w-full rounded border border-gray-300 px-3 py-2 text-sm focus:border-[#d35400] focus:outline-none focus:ring-1 focus:ring-[#d35400]"
              placeholder="tu@email.com"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-[#333333] mb-1" htmlFor="password">
              Contrasena
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              required
              className="block w-full rounded border border-gray-300 px-3 py-2 text-sm focus:border-[#d35400] focus:outline-none focus:ring-1 focus:ring-[#d35400]"
              placeholder="Minimo 6 caracteres"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-[#333333] mb-1" htmlFor="confirmar">
              Confirmar contrasena
            </label>
            <input
              id="confirmar"
              type="password"
              value={confirmar}
              onChange={e => setConfirmar(e.target.value)}
              required
              className="block w-full rounded border border-gray-300 px-3 py-2 text-sm focus:border-[#d35400] focus:outline-none focus:ring-1 focus:ring-[#d35400]"
              placeholder="Repite la contrasena"
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full rounded bg-[#d35400] py-2.5 text-white font-semibold hover:bg-[#a04000] transition-colors disabled:opacity-60"
          >
            {loading ? "Registrando..." : "Crear Cuenta"}
          </button>
        </form>
        <p className="mt-5 text-center text-sm text-gray-600">
          Ya tienes cuenta?{" "}
          <a href="/login" className="text-[#d35400] font-medium hover:underline">
            Inicia sesion
          </a>
        </p>
      </div>
    </div>
  );
}
