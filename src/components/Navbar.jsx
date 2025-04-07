import React, { useState } from "react";
import { Link } from "react-router-dom";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const isAuthenticated = false; // Cambiar esto según el estado de autenticación

  //Ocultar ciertos div en otras paginas
  const hiddenPages = ["/perfil", "/login", "/registro"];
  const shouldHide = hiddenPages.includes(location.pathname);

  return (
    <nav className="bg-gradient-to-r from-blue-800 to-blue-950 opacity-95">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center py-3 md:py-4">
          {/* Menú hamburguesa para móvil */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-white focus:outline-none"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                {isOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>

          {/* Menú normal para desktop */}
          <div className="hidden md:flex space-x-4">
            <Link
              to="/"
              className="text-white hover:text-gray-200 transition-all duration-300 pb-1 hover:border-b-2 md:hover:border-b-4 hover:border-gray-300"
            >
              Inicio
            </Link>
            <Link
              to="/discover"
              className="text-white hover:text-gray-200 transition-all duration-300 pb-1 hover:border-b-2 md:hover:border-b-4 hover:border-gray-300"
            >
              Catálogo
            </Link>
          </div>

          {/* Botón de Inicio de Sesión o Perfil */}
          {/* //////////////////////////////////////////////////////////////////////////////////////// */}
          {!shouldHide && (
            <div>
              {isAuthenticated ? (
                <Link
                  to="/perfil"
                  className="hidden sm:block text-white px-4 py-2 bg-green-600 rounded-md hover:bg-green-700 transition"
                >
                  Mi Perfil
                </Link>
              ) : (
                <Link
                  to="/login"
                  className="hidden sm:block text-white px-4 py-2 bg-blue-600 rounded-md hover:bg-blue-700 transition"
                >
                  Iniciar sesión
                </Link>
              )}
            </div>
          )}
          {/* //////////////////////////////////////////////////////////////////////////////////////// */}
        </div>

        {/* Menú desplegable para móvil */}
        {isOpen && (
          <div className="md:hidden pb-3">
            <div className="flex flex-col space-y-2">
              <Link
                to="/"
                className="text-white hover:text-gray-200 px-2 py-1"
                onClick={() => setIsOpen(false)}
              >
                Inicio
              </Link>
              <Link
                to="/discover"
                className="text-white hover:text-gray-200 px-2 py-1"
                onClick={() => setIsOpen(false)}
              >
                Catálogo
              </Link>
              {/* Botón de sesión en móvil */}
              {/* //////////////////////////////////////////////////////////////////////////////////////// */}
              <Link
                to={isAuthenticated ? "/perfil" : "/login"}
                className="text-white hover:text-gray-200 px-2 py-1"
                onClick={() => setIsOpen(false)}
              >
                {isAuthenticated ? "Mi Perfil" : "Iniciar sesión"}
              </Link>
              {/* //////////////////////////////////////////////////////////////////////////////////////// */}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
