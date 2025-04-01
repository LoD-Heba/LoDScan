export default function Footer() {
  return (
    <footer className="bg-gradient-to-r from-blue-900 to-blue-950 text-gray-300 py-6 px-4 sm:px-6">
      <div className="max-w-6xl mx-auto">
        {/* Contenido principal del footer */}
        <div className="flex flex-col md:flex-row justify-between items-center">
          
          {/* Logo y descripción (opcional) */}
          <div className="mb-4 md:mb-0 text-center md:text-left">
            <h2 className="text-xl font-bold text-white">El Rincón del Lector</h2>
            <p className="text-sm mt-1 max-w-xs">Descubre tu próxima aventura literaria</p>
          </div>
          
          {/* Redes sociales */}
          <div className="flex flex-col items-center md:items-end">
            <h3 className="text-lg font-semibold text-white mb-2 sm:mb-3">Síguenos</h3>
            <div className="flex space-x-3 sm:space-x-4">
              <a 
                href="#" 
                className="hover:text-blue-400 transition-colors duration-200 flex items-center"
                aria-label="Facebook"
              >
                <span className="hidden sm:inline">📘</span>
                <span className="text-sm sm:text-base ml-1">Facebook</span>
              </a>
              <a 
                href="#" 
                className="hover:text-blue-400 transition-colors duration-200 flex items-center"
                aria-label="Twitter"
              >
                <span className="hidden sm:inline">🐦</span>
                <span className="text-sm sm:text-base ml-1">Twitter</span>
              </a>
              <a 
                href="#" 
                className="hover:text-blue-400 transition-colors duration-200 flex items-center"
                aria-label="Instagram"
              >
                <span className="hidden sm:inline">📸</span>
                <span className="text-sm sm:text-base ml-1">Instagram</span>
              </a>
            </div>
          </div>
        </div>
        
        {/* Separador y derechos de autor */}
        <div className="mt-6 pt-4 border-t border-gray-700">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-xs sm:text-sm text-center md:text-left mb-2 md:mb-0">
              &copy; 2025 El Rincón del Lector - Todos los derechos reservados.
            </p>
            
            {/* Enlaces legales (opcional) */}
            <div className="flex space-x-3 sm:space-x-4 text-xs sm:text-sm">
              <a href="#" className="hover:text-white transition-colors duration-200">Términos</a>
              <a href="#" className="hover:text-white transition-colors duration-200">Privacidad</a>
              <a href="#" className="hover:text-white transition-colors duration-200">Contacto</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}