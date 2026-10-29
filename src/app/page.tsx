"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

interface Disco {
  id: string;
  artista: string;
  titulo: string;
  genero: string;
  precio: number;
  imagen: string;
  stock: number;
}

export default function Home() {
  const [discos, setDiscos] = useState<Disco[]>([]);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    const apiHost = process.env.NEXT_PUBLIC_API_HOST || "http://localhost:4000";
    fetch(`${apiHost}/api/discos?limit=6`)
      .then((res) => res.json())
      .then((res) => {
        if (res?.data) {
          setDiscos(res.data);
        }
      })
      .catch((err) => {
        console.error("Error al cargar discos:", err);
      })
      .finally(() => {
        setCargando(false);
      });
  }, []);

  return (
    <div className="min-h-screen bg-[#f9f9f9] text-[#333333] font-sans">
      {/* Hero */}
      <section id="inicio" className="bg-[#2c3e50] text-white py-20 px-4 text-center">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">
          Vinilos<span className="text-[#d35400]">Milo</span>
        </h1>
        <p className="text-lg md:text-xl text-gray-300 max-w-2xl mx-auto">
          Tu tienda especializada en musica fisica en Apartado y Medellin, Antioquia.
          Las mejores joyas en vinilos y CDs originales.
        </p>
        <div className="mt-8 flex justify-center gap-4">
          <Link
            href="/catalogo"
            className="bg-[#d35400] hover:bg-[#a04000] text-white font-semibold px-8 py-3 rounded transition-colors"
          >
            Explorar Catalogo Completo
          </Link>
          <a
            href="#catalogo"
            className="border-2 border-white/80 hover:bg-white hover:text-[#2c3e50] text-white font-semibold px-6 py-3 rounded transition-colors"
          >
            Ver Destacados
          </a>
        </div>
      </section>

      {/* Catalogo Destacado */}
      <section id="catalogo" className="max-w-6xl mx-auto px-4 py-16">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
          <div>
            <h2 className="text-3xl font-bold text-[#2c3e50] mb-2">Discos en Coleccion</h2>
            <p className="text-gray-600">Explora parte de nuestras joyas disponibles en vinilo y CD.</p>
          </div>
          <Link
            href="/catalogo"
            className="text-[#d35400] font-semibold hover:underline inline-flex items-center gap-1"
          >
            Ver todos los discos &rarr;
          </Link>
        </div>

        {cargando ? (
          <div className="text-center py-12 text-gray-500">
            <p className="text-lg">Cargando discos...</p>
          </div>
        ) : discos.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-lg border border-gray-200">
            <p className="text-gray-600 mb-2">Aun no hay discos disponibles en la base de datos.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {discos.map((disco) => (
              <div
                key={disco.id}
                className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow-lg transition-all flex flex-col"
              >
                <div className="h-56 bg-gray-100 relative overflow-hidden flex items-center justify-center">
                  <img
                    src={disco.imagen}
                    alt={disco.titulo}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                    onError={(e) => {
                      (e.currentTarget as HTMLImageElement).src =
                        "https://images.unsplash.com/photo-1539185441755-769473a23570?w=500&auto=format&fit=crop&q=60";
                    }}
                  />
                  <span className="absolute top-3 right-3 bg-[#2c3e50]/80 text-white text-xs px-2.5 py-1 rounded-full uppercase tracking-wider">
                    {disco.genero}
                  </span>
                </div>
                <div className="p-5 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="text-xl font-bold text-[#2c3e50] leading-snug">{disco.titulo}</h3>
                    <p className="text-sm font-medium text-gray-600 mb-2">{disco.artista}</p>
                    <p className="text-xs text-gray-400">Stock disponible: {disco.stock} unidades</p>
                  </div>
                  <div className="mt-5 pt-4 border-t border-gray-100 flex items-center justify-between">
                    <span className="text-xl font-bold text-[#d35400]">
                      ${disco.precio.toLocaleString("es-CO")}
                    </span>
                    <Link
                      href="/catalogo"
                      className="bg-[#2c3e50] hover:bg-[#1a252f] text-white text-sm font-semibold px-4 py-2 rounded transition-colors"
                    >
                      Ver en catalogo
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Nosotros */}
      <section id="nosotros" className="bg-white py-16 px-4 border-y border-gray-100">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-[#2c3e50] mb-4">Sobre Nosotros</h2>
          <p className="text-gray-600 leading-relaxed max-w-3xl text-lg">
            VinilosMilo nacio de la pasion por la musica fisica. Somos coleccionistas y amantes del
            sonido analogico que decidimos compartir nuestra coleccion con los amantes de la buena
            musica en Apartado y Medellin. Cada disco que vendemos ha sido seleccionado con cuidado
            para garantizar la mejor experiencia sonora.
          </p>
        </div>
      </section>

      {/* Hacer Pedido */}
      <section id="pedidos" className="max-w-6xl mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold text-[#2c3e50] mb-4">Buscas un disco en especial?</h2>
        <p className="text-gray-600 mb-6 max-w-2xl text-lg">
          Tienes en mente un album o edicion rara que no ves aqui? Escribenos o crea tu cuenta para solicitar pedidos especiales.
        </p>
        <div className="flex flex-col sm:flex-row gap-4">
          <Link
            href="/catalogo"
            className="bg-[#d35400] hover:bg-[#a04000] text-white font-semibold px-6 py-3 rounded transition-colors text-center"
          >
            Ir al Catalogo Completo
          </Link>
          <Link
            href="/registro"
            className="border-2 border-[#2c3e50] hover:bg-[#2c3e50] hover:text-white text-[#2c3e50] font-semibold px-6 py-3 rounded transition-colors text-center"
          >
            Crear Cuenta Gratis
          </Link>
        </div>
      </section>
    </div>
  );
}
