export default function Home() {
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
        <a
          href="#catalogo"
          className="mt-8 inline-block bg-[#d35400] hover:bg-[#a04000] text-white font-semibold px-8 py-3 rounded transition-colors"
        >
          Ver Catalogo
        </a>
      </section>

      {/* Catalogo */}
      <section id="catalogo" className="max-w-6xl mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold text-[#2c3e50] mb-2">Catalogo de Discos</h2>
        <p className="text-gray-600 mb-8">Explora nuestra coleccion de vinilos y CDs originales.</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {["Reggaeton", "Rock Clasico", "Salsa", "Pop", "Alternativo", "Electronica"].map((genero) => (
            <div key={genero} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-[#d35400] rounded-full flex items-center justify-center mb-4">
                <span className="text-white text-xl">&#127925;</span>
              </div>
              <h3 className="text-lg font-semibold text-[#2c3e50] mb-2">{genero}</h3>
              <p className="text-sm text-gray-500">Seleccion especial de los mejores artistas del genero.</p>
              <a href="#pedidos" className="mt-4 inline-block text-[#d35400] text-sm font-medium hover:underline">
                Hacer pedido
              </a>
            </div>
          ))}
        </div>
      </section>

      {/* Nosotros */}
      <section id="nosotros" className="bg-white py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-[#2c3e50] mb-4">Sobre Nosotros</h2>
          <p className="text-gray-600 leading-relaxed max-w-3xl">
            VinilosMilo nacio de la pasion por la musica fisica. Somos coleccionistas y amantes del
            sonido analogico que decidimos compartir nuestra coleccion con los amantes de la buena
            musica en Apartado y Medellin. Cada disco que vendemos ha sido seleccionado con cuidado
            para garantizar la mejor experiencia sonora.
          </p>
        </div>
      </section>

      {/* Hacer Pedido */}
      <section id="pedidos" className="max-w-6xl mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold text-[#2c3e50] mb-4">Hacer un Pedido</h2>
        <p className="text-gray-600 mb-6">
          Quieres un disco especifico? Contactanos y lo conseguimos para ti.
        </p>
        <div className="flex flex-col sm:flex-row gap-4">
          <a
            href="mailto:contacto@vinilosmilo.com"
            className="bg-[#d35400] hover:bg-[#a04000] text-white font-semibold px-6 py-3 rounded transition-colors text-center"
          >
            Escribir por Email
          </a>
          <a
            href="/registro"
            className="border-2 border-[#2c3e50] hover:bg-[#2c3e50] hover:text-white text-[#2c3e50] font-semibold px-6 py-3 rounded transition-colors text-center"
          >
            Crear Cuenta
          </a>
        </div>
      </section>

      {/* Contacto */}
      <section className="bg-[#2c3e50] text-white py-12 px-4">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between gap-8">
          <div>
            <h3 className="text-xl font-bold mb-3">VinilosMilo</h3>
            <p className="text-gray-300 text-sm">Tu tienda de musica fisica en Colombia.</p>
          </div>
          <div>
            <h4 className="font-semibold mb-2">Ubicacion</h4>
            <p className="text-gray-300 text-sm">Apartado y Medellin, Colombia</p>
          </div>
          <div>
            <h4 className="font-semibold mb-2">Contacto</h4>
            <p className="text-gray-300 text-sm">contacto@vinilosmilo.com</p>
          </div>
        </div>
        <p className="text-center text-gray-500 text-xs mt-8">2026 VinilosMilo. Todos los derechos reservados.</p>
      </section>

    </div>
  );
}
