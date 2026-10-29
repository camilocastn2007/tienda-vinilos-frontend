// src/app/catalogo/page.tsx
 use client;

import { useEffect, useState } from react;
import { useRouter, useSearchParams } from next/navigation;
import { apiFetch } from @/lib/http;

interface Disco {
  id: string;
  titulo: string;
  artista: string;
  genero: string;
  precio: number;
  imagen: string;
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

export default function CatalogoPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [discos, setDiscos] = useState<Disco[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(() => Number(searchParams.get(page)) || 1);
  const [search, setSearch] = useState(() => searchParams.get(q) || );
 const [genre, setGenre] = useState(() => searchParams.get(genero) || );
  const [priceMin, setPriceMin] = useState(() => searchParams.get(priceMin) || );
 const [priceMax, setPriceMax] = useState(() => searchParams.get(priceMax) || );

  const fetchDiscos = async () => {
    setLoading(true);
    setError(null);
    try {
      const query = new URLSearchParams({
        page: String(page),
        limit: 10,
        q: search,
        genero: genre,
        priceMin,
        priceMax,
      });
      const res: PaginatedResponse = await apiFetch(
        ${process.env.NEXT_PUBLIC_API_HOST}/api/discos?
      );
      setDiscos(res.data);
    } catch (e: any) {
      setError(e.message || Error al cargar catalogo);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDiscos();
  }, [page, search, genre, priceMin, priceMax]);

  const handleAddPedido = async (discoId: string) => {
    const cantidad = 1; // for simplicity
    try {
      await apiFetch(${process.env.NEXT_PUBLIC_API_HOST}/api/pedidos, {
        method: POST,
        body: JSON.stringify({ discoId, cantidad }),
      });
      alert(Pedido creado con éxito);
    } catch (e: any) {
      alert(e.message || Error al crear pedido);
    }
  };

  const changePage = (newPage: number) => {
    setPage(newPage);
    router.push(?page=&q=&genero=&priceMin=&priceMax=);
  };

  return (
    <div className=p-4 bg-[#f9f9f9] min-h-screen>
      <h1 className=mb-4 text-3xl font-bold text-[#2c3e50]>Catálogo de Vinilos</h1>
      {/* Filtros */}
      <div className=mb-6 grid grid-cols-1 gap-4 md:grid-cols-4>
        <input
          type=text
          placeholder=Buscar por título o artista
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className=rounded border border-gray-300 p-2 focus:border-[#d35400]
        />
        <input
          type=text
          placeholder=Género
          value={genre}
          onChange={(e) => setGenre(e.target.value)}
          className=rounded border border-gray-300 p-2 focus:border-[#d35400]
        />
        <input
          type=number
          placeholder=Precio mín
          value={priceMin}
          onChange={(e) => setPriceMin(e.target.value)}
          className=rounded border border-gray-300 p-2 focus:border-[#d35400]
        />
        <input
          type=number
          placeholder=Precio máx
          value={priceMax}
          onChange={(e) => setPriceMax(e.target.value)}
          className=rounded border border-gray-300 p-2 focus:border-[#d35400]
        />
        <button
          onClick={() => setPage(1)}
          className=col-span-4 rounded bg-[#d35400] py-2 text-white hover:bg-[#c14400]
        >
          Aplicar filtros
        </button>
      </div>

      {loading && <p>Cargando...</p>}
      {error && <p className=text-red-600>{error}</p>}

      <div className=grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3>
        {discos.map((d) => (
          <div key={d.id} className=rounded bg-white p-4 shadow>
            <img src={/img/discos/} alt={d.titulo} className=mb-2 h-48 w-full object-cover />
            <h2 className=text-xl font-semibold text-[#2c3e50]>{d.titulo}</h2>
            <p className=text-sm text-[#333333]>{d.artista}</p>
            <p className=text-sm text-[#333333]>{d.genero}</p>
            <p className=text-lg font-bold text-[#d35400]></p>
            <button
              onClick={() => handleAddPedido(d.id)}
              className=mt-2 w-full rounded bg-[#d35400] py-1 text-white hover:bg-[#c14400]
            >
              Agregar al carrito
            </button>
          </div>
        ))}
      </div>

      {/* Paginación simple */}
      <div className=mt-6 flex justify-center space-x-2>
        <button
          disabled={page <= 1}
          onClick={() => changePage(page - 1)}
          className=rounded bg-gray-300 px-3 py-1 disabled:opacity-50
        >
          Anterior
        </button>
        <span className=px-2 py-1>Página {page}</span>
        <button
          onClick={() => changePage(page + 1)}
          className=rounded bg-gray-300 px-3 py-1
        >
          Siguiente
        </button>
      </div>
    </div>
  );
}
