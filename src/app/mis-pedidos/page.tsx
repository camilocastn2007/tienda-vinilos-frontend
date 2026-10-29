"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { apiFetch } from "@/lib/http";

interface Pedido {
  id: string;
  cantidad: number;
  mensaje: string | null;
  estado: string;
  createdAt: string;
  disco: {
    id: string;
    titulo: string;
    artista: string;
    precio: number;
    imagen: string;
    genero: string;
  };
}

export default function MisPedidosPage() {
  const router = useRouter();
  const [pedidos, setPedidos] = useState<Pedido[]>([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const token = typeof window !== "undefined" ? localStorage.getItem("vinilos_token") : null;
    if (!token) {
      router.push("/login");
      return;
    }

    const apiHost = process.env.NEXT_PUBLIC_API_HOST || "http://localhost:4000";
    apiFetch(`${apiHost}/api/pedidos/mias`)
      .then((data) => {
        if (Array.isArray(data)) {
          setPedidos(data);
        } else {
          setPedidos([]);
        }
      })
      .catch((err) => {
        setError(err.message || "Error al cargar tus pedidos.");
      })
      .finally(() => {
        setCargando(false);
      });
  }, [router]);

  return (
    <div className="min-h-screen bg-[#f9f9f9] py-10 px-4">
      <div className="max-w-5xl mx-auto">
        <div className="mb-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-[#2c3e50]">Mis Pedidos</h1>
            <p className="text-gray-600 mt-1">Historial de tus compras y solicitudes de vinilos.</p>
          </div>
          <Link
            href="/catalogo"
            className="bg-[#d35400] hover:bg-[#a04000] text-white px-5 py-2.5 rounded font-semibold text-sm transition-colors text-center"
          >
            + Seguir Comprando
          </Link>
        </div>

        {cargando ? (
          <div className="text-center py-20 text-gray-500">
            <p className="text-lg">Cargando tus pedidos...</p>
          </div>
        ) : error ? (
          <div className="bg-red-50 border border-red-200 text-red-700 p-6 rounded-lg text-center">
            <p className="font-semibold">{error}</p>
            <button
              onClick={() => window.location.reload()}
              className="mt-4 text-sm text-[#d35400] underline"
            >
              Intentar de nuevo
            </button>
          </div>
        ) : pedidos.length === 0 ? (
          <div className="bg-white rounded-lg border border-gray-200 p-12 text-center shadow-sm">
            <div className="text-5xl mb-4">📦</div>
            <h2 className="text-2xl font-bold text-[#2c3e50] mb-2">Aún no tienes pedidos registrados</h2>
            <p className="text-gray-500 max-w-md mx-auto mb-6">
              Explora nuestro catálogo con más de 20 vinilos y CDs originales y haz tu primera compra hoy mismo.
            </p>
            <Link
              href="/catalogo"
              className="inline-block bg-[#d35400] hover:bg-[#a04000] text-white px-6 py-3 rounded font-semibold transition-colors"
            >
              Ver Catálogo
            </Link>
          </div>
        ) : (
          <div className="space-y-4">
            {pedidos.map((p) => {
              const total = (p.disco?.precio || 0) * (p.cantidad || 1);
              const fecha = new Date(p.createdAt).toLocaleDateString("es-CO", {
                year: "numeric",
                month: "long",
                day: "numeric",
              });

              return (
                <div
                  key={p.id}
                  className="bg-white rounded-lg border border-gray-200 p-5 shadow-sm hover:shadow-md transition-shadow flex flex-col md:flex-row md:items-center justify-between gap-5"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-20 h-20 bg-gray-100 rounded-md overflow-hidden flex-shrink-0 border border-gray-200">
                      <img
                        src={p.disco?.imagen || ""}
                        alt={p.disco?.titulo || "Disco"}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          (e.currentTarget as HTMLImageElement).src =
                            "https://images.unsplash.com/photo-1539185441755-769473a23570?w=500&auto=format&fit=crop&q=60";
                        }}
                      />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-[#2c3e50]">
                        {p.disco?.titulo || "Disco no disponible"}
                      </h3>
                      <p className="text-sm font-medium text-gray-600">
                        {p.disco?.artista || "Artista desconocido"}
                      </p>
                      <p className="text-xs text-gray-400 mt-1">Pedido el {fecha}</p>
                    </div>
                  </div>

                  <div className="flex flex-wrap items-center justify-between md:justify-end gap-6 pt-3 md:pt-0 border-t md:border-t-0 border-gray-100">
                    <div className="text-left md:text-right">
                      <span className="text-xs text-gray-400 block">Cantidad: {p.cantidad}</span>
                      <span className="text-lg font-bold text-[#d35400]">
                        ${total.toLocaleString("es-CO")}
                      </span>
                    </div>

                    <div>
                      <span
                        className={`inline-block px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider ${
                          p.estado === "PENDIENTE"
                            ? "bg-amber-100 text-amber-800"
                            : p.estado === "ENVIADO" || p.estado === "COMPLETADO"
                            ? "bg-green-100 text-green-800"
                            : "bg-blue-100 text-blue-800"
                        }`}
                      >
                        {p.estado}
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
