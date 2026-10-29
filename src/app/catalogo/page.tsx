"use client";

import { useEffect, useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { apiFetch } from "@/lib/http";
import Link from "next/link";

interface Disco {
  id: string;
  titulo: string;
  artista: string;
  genero: string;
  precio: number;
  imagen: string;
  stock: number;
}

interface PaginatedResponse {
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
  data: Disco[];
}

function CatalogoContent() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [discos, setDiscos] = useState<Disco[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(() => Number(searchParams.get("page")) || 1);
  const [search, setSearch] = useState(() => searchParams.get("q") || "");
  const [genre, setGenre] = useState(() => searchParams.get("genero") || "");
  const [totalPages, setTotalPages] = useState(1);
  const [pedidoStatus, setPedidoStatus] = useState<string | null>(null);

  const fetchDiscos = async () => {
    setLoading(true);
    setError(null);
    try {
      const queryParams = new URLSearchParams({
        page: String(page),
        limit: "9",
      });
      if (search.trim()) queryParams.set("q", search.trim());
      if (genre.trim()) queryParams.set("genero", genre.trim());

      const apiHost = process.env.NEXT_PUBLIC_API_HOST || "http://localhost:4000";
      const res: PaginatedResponse = await apiFetch(`${apiHost}/api/discos?${queryParams.toString()}`);
      if (res?.data) {
        setDiscos(res.data);
        setTotalPages(res.pagination?.totalPages || 1);
      }
    } catch (e: any) {
      setError(e.message || "Error al cargar catálogo.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDiscos();
  }, [page, genre]);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setPage(1);
    fetchDiscos();
  };

  const handleAddPedido = async (discoId: string, discoTitulo: string) => {
    try {
      const apiHost = process.env.NEXT_PUBLIC_API_HOST || "http://localhost:4000";
      await apiFetch(`${apiHost}/api/pedidos`, {
        method: "POST",
        body: JSON.stringify({ discoId, cantidad: 1 }),
      });
      setPedidoStatus(`¡Pedido registrado para "${discoTitulo}"!`);
      setTimeout(() => setPedidoStatus(null), 4000);
    } catch (e: any) {
      alert(e.message || "Debes iniciar sesión para realizar pedidos.");
    }
  };

  return (
    <div className="min-h-screen bg-[#f9f9f9] py-10 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-[#2c3e50]">Catálogo de Vinilos & CDs</h1>
            <p className="text-gray-600 mt-1">Explora nuestra colección musical en formato físico.</p>
          </div>
          <Link
            href="/"
            className="text-[#d35400] font-semibold hover:underline inline-flex items-center gap-1"
          >
            &larr; Volver al inicio
          </Link>
        </div>

        {pedidoStatus && (
          <div className="mb-6 p-4 rounded bg-green-100 border border-green-300 text-green-800 font-medium">
            {pedidoStatus}
          </div>
        )}

        {/* Barra de Filtros */}
        <div className="bg-white p-5 rounded-lg shadow-sm border border-gray-200 mb-8">
          <form onSubmit={handleSearchSubmit} className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="md:col-span-2">
              <label className="block text-xs font-semibold text-gray-500 uppercase mb-1">Buscar</label>
              <input
                type="text"
                placeholder="Título del álbum o artista..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full rounded border border-gray-300 px-3 py-2 text-sm focus:border-[#d35400] focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-500 uppercase mb-1">Género</label>
              <select
                value={genre}
                onChange={(e) => {
                  setGenre(e.target.value);
                  setPage(1);
                }}
                className="w-full rounded border border-gray-300 px-3 py-2 text-sm focus:border-[#d35400] focus:outline-none bg-white"
              >
                <option value="">Todos los géneros</option>
                <option value="reggaeton">Reggaetón / Urbano</option>
                <option value="rock-ingles">Rock en Inglés</option>
                <option value="rock-pop-espanol">Rock en Español</option>
                <option value="salsa">Salsa</option>
              </select>
            </div>
            <div className="flex items-end">
              <button
                type="submit"
                className="w-full rounded bg-[#d35400] hover:bg-[#a04000] text-white py-2 text-sm font-semibold transition-colors"
              >
                Buscar
              </button>
            </div>
          </form>
        </div>

        {/* Lista de Discos */}
        {loading ? (
          <div className="text-center py-20 text-gray-500">
            <p className="text-lg">Cargando colección de vinilos...</p>
          </div>
        ) : error ? (
          <div className="text-center py-12 bg-white rounded border border-red-200 text-red-600">
            <p className="font-semibold">{error}</p>
          </div>
        ) : discos.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-lg border border-gray-200 p-8">
            <p className="text-gray-600 text-lg">No encontramos discos con los filtros seleccionados.</p>
            <button
              onClick={() => {
                setSearch("");
                setGenre("");
                setPage(1);
              }}
              className="mt-4 text-[#d35400] underline font-medium"
            >
              Limpiar filtros
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {discos.map((d) => (
              <div
                key={d.id}
                className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow flex flex-col justify-between"
              >
                <div>
                  <div className="h-60 bg-gray-100 relative overflow-hidden flex items-center justify-center">
                    <img
                      src={d.imagen}
                      alt={d.titulo}
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                      onError={(e) => {
                        (e.currentTarget as HTMLImageElement).src =
                          "https://images.unsplash.com/photo-1539185441755-769473a23570?w=500&auto=format&fit=crop&q=60";
                      }}
                    />
                    <span className="absolute top-3 right-3 bg-[#2c3e50]/80 text-white text-xs px-2.5 py-1 rounded-full uppercase tracking-wider">
                      {d.genero}
                    </span>
                  </div>
                  <div className="p-5">
                    <h2 className="text-xl font-bold text-[#2c3e50]">{d.titulo}</h2>
                    <p className="text-sm font-semibold text-gray-600">{d.artista}</p>
                    <p className="text-xs text-gray-400 mt-1">Disponibles: {d.stock} copias</p>
                  </div>
                </div>
                <div className="p-5 pt-0">
                  <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                    <span className="text-xl font-bold text-[#d35400]">
                      ${d.precio.toLocaleString("es-CO")}
                    </span>
                    <button
                      onClick={() => handleAddPedido(d.id, d.titulo)}
                      className="rounded bg-[#d35400] hover:bg-[#a04000] text-white px-4 py-2 text-sm font-semibold transition-colors"
                    >
                      Pedir ahora
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Paginación */}
        {totalPages > 1 && (
          <div className="mt-10 flex justify-center items-center gap-3">
            <button
              disabled={page <= 1}
              onClick={() => setPage((prev) => Math.max(1, prev - 1))}
              className="rounded bg-white border border-gray-300 px-4 py-2 text-sm font-medium hover:bg-gray-50 disabled:opacity-40"
            >
              &larr; Anterior
            </button>
            <span className="text-sm font-medium text-gray-600">
              Página {page} de {totalPages}
            </span>
            <button
              disabled={page >= totalPages}
              onClick={() => setPage((prev) => Math.min(totalPages, prev + 1))}
              className="rounded bg-white border border-gray-300 px-4 py-2 text-sm font-medium hover:bg-gray-50 disabled:opacity-40"
            >
              Siguiente &rarr;
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default function CatalogoPage() {
  return (
    <Suspense fallback={<div className="p-10 text-center">Cargando catálogo...</div>}>
      <CatalogoContent />
    </Suspense>
  );
}
