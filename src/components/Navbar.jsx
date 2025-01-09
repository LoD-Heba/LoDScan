import React, {useState} from "react";

function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
  
    return (
      <nav className="bg-blue-500">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center py-4">
            <div className="text-white text-2xl font-bold">
              <a href="/">MiSitio</a>
            </div>
            <div className="hidden md:flex space-x-4">
              <a href="/" className="text-white hover:text-gray-200">
                Inicio
              </a>
              <a href="/about" className="text-white hover:text-gray-200">
                Nosotros
              </a>
              <a href="/services" className="text-white hover:text-gray-200">
                Servicios
              </a>
              <a href="/contact" className="text-white hover:text-gray-200">
                Contacto
              </a>
            </div>
            <button
              className="text-white md:hidden focus:outline-none"
              onClick={() => setIsOpen(!isOpen)}
            >
              <svg
                className="w-6 h-6"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d={isOpen ? 'M6 18L18 6M6 6l12 12' : 'M4 6h16M4 12h16M4 18h16'}
                />
              </svg>
            </button>
          </div>
          {isOpen && (
            <div className="md:hidden">
              <a href="/" className="block text-white hover:text-gray-200 py-2">
                Inicio
              </a>
              <a href="/about" className="block text-white hover:text-gray-200 py-2">
                Nosotros
              </a>
              <a href="/services" className="block text-white hover:text-gray-200 py-2">
                Servicios
              </a>
              <a href="/contact" className="block text-white hover:text-gray-200 py-2">
                Contacto
              </a>
            </div>
          )}
        </div>
      </nav>
    );
  }
  
  export default Navbar;