import React, { useState, useRef, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const { user, isAuthenticated, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const menuRef = useRef(null);
  const profileRef = useRef(null);

  // Cerrar menús al hacer clic fuera
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsOpen(false);
      }
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setIsProfileOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleLogout = () => {
    logout();
    navigate("/");
    setIsOpen(false);
    setIsProfileOpen(false);
  };

  // Páginas donde ocultar elementos específicos
  const hiddenPages = ["/perfil", "/login", "/registro"];
  const shouldHide = hiddenPages.includes(location.pathname);

  return (
    <nav className="bg-gradient-to-r from-blue-800 to-blue-950 opacity-95 sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center py-3 md:py-4">
          {/* Logo/Marca */}
          <Link to="/" className="flex items-center">
            <span className="text-white font-bold text-xl">TuLogo</span>
          </Link>

          {/* Menú hamburguesa para móvil */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-white focus:outline-none"
              aria-label="Toggle menu"
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
          <div className="hidden md:flex space-x-6 items-center">
            <Link
              to="/"
              className={`text-white hover:text-gray-200 transition-all duration-300 pb-1 ${
                location.pathname === "/" ? "border-b-2 border-white" : ""
              }`}
            >
              Inicio
            </Link>
            <Link
              to="/discover"
              className={`text-white hover:text-gray-200 transition-all duration-300 pb-1 ${
                location.pathname === "/discover" ? "border-b-2 border-white" : ""
              }`}
            >
              Catálogo
            </Link>

            {/* Menú de usuario autenticado */}
            {isAuthenticated ? (
              <div className="relative" ref={profileRef}>
                <button 
                  onClick={() => setIsProfileOpen(!isProfileOpen)}
                  className="flex items-center space-x-2 focus:outline-none"
                >
                  <span className="text-white">{user?.username}</span>
                  <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-white">
                    {user?.username?.charAt(0).toUpperCase()}
                  </div>
                </button>
                
                {isProfileOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50">
                    <Link
                      to="/perfil"
                      className="block px-4 py-2 text-gray-800 hover:bg-blue-100"
                      onClick={() => setIsProfileOpen(false)}
                    >
                      Mi Perfil
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="block w-full text-left px-4 py-2 text-gray-800 hover:bg-blue-100"
                    >
                      Cerrar sesión
                    </button>
                  </div>
                )}
              </div>
            ) : (
              !shouldHide && (
                <div className="flex space-x-4">
                  <Link
                    to="/login"
                    className="text-white px-4 py-2 bg-blue-600 rounded-md hover:bg-blue-700 transition"
                  >
                    Iniciar sesión
                  </Link>
                  <Link
                    to="/registro"
                    className="text-white px-4 py-2 bg-green-600 rounded-md hover:bg-green-700 transition"
                  >
                    Registrarse
                  </Link>
                </div>
              )
            )}
          </div>
        </div>

        {/* Menú desplegable para móvil */}
        {isOpen && (
          <div 
            className="md:hidden pb-3 bg-blue-900 rounded-lg mt-2"
            ref={menuRef}
          >
            <div className="flex flex-col space-y-3 px-4 py-2">
              <Link
                to="/"
                className="text-white hover:bg-blue-800 px-3 py-2 rounded"
                onClick={() => setIsOpen(false)}
              >
                Inicio
              </Link>
              <Link
                to="/discover"
                className="text-white hover:bg-blue-800 px-3 py-2 rounded"
                onClick={() => setIsOpen(false)}
              >
                Catálogo
              </Link>

              {isAuthenticated ? (
                <>
                  <Link
                    to="/perfil"
                    className="text-white hover:bg-blue-800 px-3 py-2 rounded"
                    onClick={() => setIsOpen(false)}
                  >
                    Mi Perfil
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="text-white hover:bg-blue-800 px-3 py-2 rounded text-left"
                  >
                    Cerrar sesión
                  </button>
                </>
              ) : (
                !shouldHide && (
                  <>
                    <Link
                      to="/login"
                      className="text-white hover:bg-blue-800 px-3 py-2 rounded"
                      onClick={() => setIsOpen(false)}
                    >
                      Iniciar sesión
                    </Link>
                    <Link
                      to="/registro"
                      className="text-white hover:bg-blue-800 px-3 py-2 rounded"
                      onClick={() => setIsOpen(false)}
                    >
                      Registrarse
                    </Link>
                  </>
                )
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}