"use client";
// src/features/common/components/Footer.tsx
import React from "react";
import Link from "next/link";

export const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();
  return (
    <footer className="bg-[#2c3e50] text-white mt-auto pt-10 pb-6 px-6 sm:px-12">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between gap-8 mb-8">
        <div className="flex-1 min-w-[240px]">
          <h3 className="text-[#d35400] text-xl font-bold mb-3 tracking-wide">VinilosMilo</h3>
          <p className="text-gray-300 text-sm leading-relaxed">
            Tu tienda especializada en música física en Apartadó y Medellín, Antioquia. Coleccionando las mejores joyas en vinilos y CDs originales.
          </p>
        </div>

        <div className="flex-1 min-w-[200px]">
          <h4 className="text-white text-base font-semibold mb-3">Navegación</h4>
          <ul className="space-y-2 text-sm text-gray-300">
            <li><Link href="/#inicio" className="hover:text-[#d35400] transition-colors">Inicio</Link></li>
            <li><Link href="/#catalogo" className="hover:text-[#d35400] transition-colors">Catálogo de Discos</Link></li>
            <li><Link href="/#pedidos" className="hover:text-[#d35400] transition-colors">Hacer un Pedido</Link></li>
            <li><Link href="/#nosotros" className="hover:text-[#d35400] transition-colors">Sobre Nosotros</Link></li>
          </ul>
        </div>

        <div className="flex-1 min-w-[200px]">
          <h4 className="text-white text-base font-semibold mb-3">Contacto y Ubicación</h4>
          <p className="text-gray-300 text-sm leading-relaxed mb-2">📍 Apartadó & Medellín, Colombia</p>
          <p className="text-gray-300 text-sm">✉️ contacto@vinilosmilo.com</p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto border-t border-gray-700/60 pt-6 text-center text-xs text-gray-400">
        &copy; {currentYear} VinilosMilo. Todos los derechos reservados. — Entrega 3 Desarrollo Web
      </div>
    </footer>
  );
};
