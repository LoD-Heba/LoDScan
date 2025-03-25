import React, { useState } from "react";
import { Search } from "lucide-react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState("");

  const handleSearch = (e) => {
    e.preventDefault();
    console.log("Buscando:", search);
  };

  return (
    <nav className="bg-gradient-to-r from-blue-800 to-blue-950 opacity-95">
    <div className="container mx-auto px-4">
      <div className="flex justify-between items-center py-4">
        <div className="hidden md:flex space-x-4">
          <a href="/" className="text-white hover:text-gray-200">Catálogo</a>
          <a href="/about" className="text-white hover:text-gray-200">Todos los artículos</a>
          <a href="/services" className="text-white hover:text-gray-200">Servicios</a>
          <a href="/contact" className="text-white hover:text-gray-200">Contacto</a>
        </div>
        <form onSubmit={handleSearch} className="relative w-64">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full px-4 py-2 rounded-lg bg-white text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Buscar..."
          />
          <button
            type="submit"
            className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-600 hover:text-gray-900"
          >
            <Search size={20} />
          </button>
        </form>
      </div>
    </div>
  </nav>
  );
}
