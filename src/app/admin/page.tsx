// src/app/admin/page.tsx
"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { apiFetch } from "@/lib/http";

interface Disco {
  id: string;
  titulo: string;
  artista: string;
  genero: string;
  precio: number;
  imagen: string;
  stock: number;
}

interface Pedido {
  id: string;
  usuario: { nombre: string; email: string };
  disco: { titulo: string };
  cantidad: number;
  mensaje?: string;
  estado: string;
  createdAt: string;
}

export default function AdminPage() {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [discos, setDiscos] = useState<Disco[]>([]);
  const [pedidos, setPedidos] = useState<Pedido[]>([]);
  const [form, setForm] = useState<Partial<Disco>>({});
  const [editingId, setEditingId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  // Verificar autenticación y rol admin
  useEffect(() => {
    const stored = typeof window !== "undefined" ? localStorage.getItem("vinilos_user") : null;
    if (stored) {
      const parsed = JSON.parse(stored);
      setUser(parsed);
      if (parsed.role !== "admin") router.push("/");
    } else {
      router.push("/login");
    }
  }, []);

  const fetchData = async () => {
    try {
      const [discosRes, pedidosRes] = await Promise.all([
        apiFetch(`${process.env.NEXT_PUBLIC_API_HOST}/api/discos`),
        apiFetch(`${process.env.NEXT_PUBLIC_API_HOST}/api/pedidos`),
      ]);
      setDiscos(discosRes.data);
      setPedidos(pedidosRes);
    } catch (e: any) {
      setError(e.message || "Error al cargar datos");
    }
  };

  useEffect(() => {
    if (user && user.role === "admin") fetchData();
  }, [user]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: name === "precio" || name === "stock" ? Number(value) : value }));
  };

  const submitDisco = async (e: React.FormEvent) => {
    e.preventDefault();
    const method = editingId ? "PUT" : "POST";
    const endpoint = editingId
      ? `${process.env.NEXT_PUBLIC_API_HOST}/api/discos/${editingId}`
      : `${process.env.NEXT_PUBLIC_API_HOST}/api/discos`;
    try {
      await apiFetch(endpoint, { method, body: JSON.stringify(form) });
      setForm({});
      setEditingId(null);
      fetchData();
    } catch (e: any) {
      setError(e.message || "Error al guardar disco");
    }
  };

  const editDisco = (d: Disco) => {
    setForm(d);
    setEditingId(d.id);
  };

  const deleteDisco = async (id: string) => {
    if (!confirm("¿Confirmar eliminación del disco?")) return;
    try {
      await apiFetch(`${process.env.NEXT_PUBLIC_API_HOST}/api/discos/${id}`, { method: "DELETE" });
      fetchData();
    } catch (e: any) {
      setError(e.message || "Error al eliminar disco");
    }
  };

  return (
    <div className="p-6 bg-[#f9f9f9] min-h-screen">
      <h1 className="mb-4 text-3xl font-bold text-[#2c3e50]">Panel Admin</h1>
      {error && <p className="mb-2 text-red-600">{error}</p>}

      {/* Formulario de alta / edición */}
      <form onSubmit={submitDisco} className="mb-6 rounded bg-white p-4 shadow-md">
        <h2 className="mb-2 text-xl font-semibold text-[#2c3e50]">{editingId ? "Editar" : "Nuevo"} Disco</h2>
        <div className="grid grid-cols-1 gap-2 md:grid-cols-2">
          <input name="titulo" placeholder="Título" value={form.titulo || ""} onChange={handleInputChange} className="rounded border p-2" required />
          <input name="artista" placeholder="Artista" value={form.artista || ""} onChange={handleInputChange} className="rounded border p-2" required />
          <input name="genero" placeholder="Género" value={form.genero || ""} onChange={handleInputChange} className="rounded border p-2" required />
          <input name="precio" type="number" placeholder="Precio" value={form.precio ?? ""} onChange={handleInputChange} className="rounded border p-2" required />
          <input name="stock" type="number" placeholder="Stock" value={form.stock ?? ""} onChange={handleInputChange} className="rounded border p-2" required />
          <input name="imagen" placeholder="Nombre de la imagen" value={form.imagen || ""} onChange={handleInputChange} className="rounded border p-2" required />
        </div>
        <button type="submit" className="mt-2 rounded bg-[#d35400] px-4 py-2 text-white hover:bg-[#c14400]">
          {editingId ? "Actualizar" : "Crear"}
        </button>
      </form>

      {/* Lista de discos */}
      <section className="mb-8">
        <h2 className="mb-2 text-2xl font-semibold text-[#2c3e50]">Catálogo de Discos</h2>
        <table className="w-full table-auto rounded bg-white shadow-md">
          <thead className="bg-[#2c3e50] text-white">
            <tr>
              <th className="p-2">Título</th>
              <th className="p-2">Artista</th>
              <th className="p-2">Género</th>
              <th className="p-2">Precio</th>
              <th className="p-2">Stock</th>
              <th className="p-2">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {discos.map(d => (
              <tr key={d.id} className="border-b">
                <td className="p-2">{d.titulo}</td>
                <td className="p-2">{d.artista}</td>
                <td className="p-2">{d.genero}</td>
                <td className="p-2 text-[#d35400]">${d.precio}</td>
                <td className="p-2">{d.stock}</td>
                <td className="p-2 space-x-2">
                  <button onClick={() => editDisco(d)} className="rounded bg-blue-500 px-2 py-1 text-white hover:bg-blue-600">Editar</button>
                  <button onClick={() => deleteDisco(d.id)} className="rounded bg-red-500 px-2 py-1 text-white hover:bg-red-600">Eliminar</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      {/* Tabla de pedidos */}
      <section>
        <h2 className="mb-2 text-2xl font-semibold text-[#2c3e50]">Pedidos</h2>
        <table className="w-full table-auto rounded bg-white shadow-md">
          <thead className="bg-[#2c3e50] text-white">
            <tr>
              <th className="p-2">Usuario</th>
              <th className="p-2">Disco</th>
              <th className="p-2">Cantidad</th>
              <th className="p-2">Estado</th>
              <th className="p-2">Fecha</th>
            </tr>
          </thead>
          <tbody>
            {pedidos.map(p => (
              <tr key={p.id} className="border-b">
                <td className="p-2">{p.usuario?.email}</td>
                <td className="p-2">{p.disco?.titulo}</td>
                <td className="p-2">{p.cantidad}</td>
                <td className="p-2">{p.estado}</td>
                <td className="p-2">{new Date(p.createdAt).toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </div>
  );
}
