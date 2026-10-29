"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    if (!email || !password) {
      setError("Ambos campos son obligatorios.");
      return;
    }
    setLoading(true);
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_HOST}/api/auth/login`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, password }),
        }
      );
      if (!response.ok) {
        const data = await response.json();
        setError(data.message || "Error al iniciar sesion.");
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
        <h2 className="mb-6 text-center text-2xl font-bold text-[#2c3e50]">Iniciar Sesion</h2>
        {error && (
          <div className="mb-4 rounded bg-red-100 p-3 text-red-700 text-sm">{error}</div>
        )}
        <form onSubmit={handleSubmit} className="space-y-4">
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
              placeholder="********"
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full rounded bg-[#d35400] py-2.5 text-white font-semibold hover:bg-[#a04000] transition-colors disabled:opacity-60"
          >
            {loading ? "Cargando..." : "Acceder"}
          </button>
        </form>
        <p className="mt-5 text-center text-sm text-gray-600">
          No tienes cuenta?{" "}
          <a href="/registro" className="text-[#d35400] font-medium hover:underline">
            Registrate
          </a>
        </p>
      </div>
    </div>
  );
}
