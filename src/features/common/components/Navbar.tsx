// src/features/common/components/Navbar.tsx
'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export interface NavbarUser {
  id: string;
  nombre: string;
  email: string;
  role: 'admin' | 'user';
}

export const Navbar: React.FC = () => {
  const [menuAbierto, setMenuAbierto] = useState(false);
  const [usuario, setUsuario] = useState<NavbarUser | null>(null);
  const router = useRouter();

  // Función para leer la sesión desde localStorage
  const actualizarSesion = () => {
    if (typeof window !== 'undefined') {
      const userStr = localStorage.getItem('vinilos_user');
      if (userStr) {
        try {
          setUsuario(JSON.parse(userStr));
        } catch {
          setUsuario(null);
        }
      } else {
        setUsuario(null);
      }
    }
  };

  useEffect(() => {
    actualizarSesion();
    // Escucha eventos de cambio de sesión para reaccionar al instante
    window.addEventListener('storage', actualizarSesion);
    window.addEventListener('auth-change', actualizarSesion);

    return () => {
      window.removeEventListener('storage', actualizarSesion);
      window.removeEventListener('auth-change', actualizarSesion);
    };
  }, []);

  const handleCerrarSesion = () => {
    localStorage.removeItem('vinilos_token');
    localStorage.removeItem('vinilos_user');
    setUsuario(null);
    window.dispatchEvent(new Event('auth-change'));
    router.push('/login');
  };

  return (
    <header className="sticky top-0 z-50 bg-[#2c3e50] text-white shadow-md">
      <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="text-2xl font-bold tracking-wider text-white hover:text-[#d35400] transition-colors">
          Vinilos<span className="text-[#d35400]">Milo</span>
        </Link>

        {/* Botón hamburguesa para móvil */}
        <button
          onClick={() => setMenuAbierto(!menuAbierto)}
          className="md:hidden flex flex-col gap-1.5 p-2 focus:outline-none"
          aria-label="Abrir menú"
          aria-expanded={menuAbierto}
        >
          <span className={`block w-6 h-0.5 bg-white transition-transform ${menuAbierto ? 'rotate-45 translate-y-2' : ''}`} />
          <span className={`block w-6 h-0.5 bg-white transition-opacity ${menuAbierto ? 'opacity-0' : ''}`} />
          <span className={`block w-6 h-0.5 bg-white transition-transform ${menuAbierto ? '-rotate-45 -translate-y-2' : ''}`} />
        </button>

        {/* Menú de escritorio */}
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium">
          <Link href="/#inicio" className="hover:text-[#d35400] transition-colors">
            Inicio
          </Link>
          <Link href="/#catalogo" className="hover:text-[#d35400] transition-colors">
            Catálogo
          </Link>
          <Link href="/#nosotros" className="hover:text-[#d35400] transition-colors">
            Nosotros
          </Link>
          <Link href="/#pedidos" className="hover:text-[#d35400] transition-colors">
            Hacer Pedido
          </Link>

          {/* Rutas exclusivas según estado de sesión */}
          {usuario ? (
            <div className="flex items-center gap-4 pl-4 border-l border-gray-600">
              <Link
                href="/mis-pedidos"
                className="hover:text-[#d35400] transition-colors"
              >
                Mis Pedidos
              </Link>

              {usuario.role === 'admin' && (
                <Link
                  href="/admin"
                  className="bg-amber-600 text-white px-3 py-1.5 rounded text-xs font-semibold hover:bg-amber-700 transition-colors"
                >
                  Administración
                </Link>
              )}

              <span className="text-xs text-gray-300">
                Hola, <strong className="text-white">{usuario.nombre.split(' ')[0]}</strong>
              </span>

              <button
                onClick={handleCerrarSesion}
                className="text-xs bg-red-600/80 hover:bg-red-700 text-white px-3 py-1.5 rounded transition-colors"
              >
                Salir
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-3 pl-4 border-l border-gray-600">
              <Link
                href="/login"
                className="bg-[#d35400] hover:bg-[#a04000] text-white px-4 py-2 rounded text-xs font-semibold transition-colors"
              >
                Ingresar
              </Link>
              <Link
                href="/registro"
                className="border border-white/60 hover:border-white text-white px-3 py-1.5 rounded text-xs font-semibold transition-colors"
              >
                Registrarse
              </Link>
            </div>
          )}
        </nav>
      </div>

      {/* Menú móvil desplegable */}
      {menuAbierto && (
        <nav className="md:hidden bg-[#243342] border-t border-gray-700 px-6 py-4 flex flex-col gap-3 text-sm">
          <Link
            href="/#inicio"
            onClick={() => setMenuAbierto(false)}
            className="hover:text-[#d35400] py-1"
          >
            Inicio
          </Link>
          <Link
            href="/#catalogo"
            onClick={() => setMenuAbierto(false)}
            className="hover:text-[#d35400] py-1"
          >
            Catálogo
          </Link>
          <Link
            href="/#nosotros"
            onClick={() => setMenuAbierto(false)}
            className="hover:text-[#d35400] py-1"
          >
            Nosotros
          </Link>
          <Link
            href="/#pedidos"
            onClick={() => setMenuAbierto(false)}
            className="hover:text-[#d35400] py-1"
          >
            Hacer Pedido
          </Link>

          {usuario ? (
            <div className="pt-3 border-t border-gray-600 flex flex-col gap-2">
              <Link
                href="/mis-pedidos"
                onClick={() => setMenuAbierto(false)}
                className="text-white font-medium hover:text-[#d35400]"
              >
                Mis Pedidos
              </Link>

              {usuario.role === 'admin' && (
                <Link
                  href="/admin"
                  onClick={() => setMenuAbierto(false)}
                  className="text-amber-400 font-semibold"
                >
                  Panel de Administración
                </Link>
              )}

              <p className="text-xs text-gray-400 mt-1">
                Conectado como: {usuario.nombre} ({usuario.role})
              </p>

              <button
                onClick={() => {
                  setMenuAbierto(false);
                  handleCerrarSesion();
                }}
                className="text-left text-sm text-red-400 hover:text-red-300 font-semibold mt-1"
              >
                Cerrar Sesión
              </button>
            </div>
          ) : (
            <div className="pt-3 border-t border-gray-600 flex flex-col gap-2">
              <Link
                href="/login"
                onClick={() => setMenuAbierto(false)}
                className="bg-[#d35400] text-center text-white py-2 rounded text-xs font-semibold"
              >
                Ingresar
              </Link>
              <Link
                href="/registro"
                onClick={() => setMenuAbierto(false)}
                className="border border-white/60 text-center text-white py-2 rounded text-xs font-semibold"
              >
                Registrarse
              </Link>
            </div>
          )}
        </nav>
      )}
    </header>
  );
};
