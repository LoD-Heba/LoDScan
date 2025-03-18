import React, { useState } from "react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-gradient-to-r from-blue-800 to-blue-950 opacity-95">
      <div className="container mx-auto px-4">
        <div className="flex justify-around items-center py-4">
          <div className="hidden md:flex space-x-4">
            <a href="/" className="text-white hover:text-gray-200">
              Catálogo
            </a>
            <a href="/about" className="text-white hover:text-gray-200">
              Todos los articulos
            </a>
            <a href="/services" className="text-white hover:text-gray-200">
              Servicios
            </a>
            <a href="/contact" className="text-white hover:text-gray-200">
              Contacto
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
}
