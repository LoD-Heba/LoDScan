import React, { useState } from "react";

function Footer() {
    const [isOpen, setIsOpen] = useState(false);
    return (
      <footer className="bg-blue-950 text-gray-300 py-6">
        <div className="flex justify-center">
          {/* Sección 3: Redes sociales */}
          <div>
          <div className="flex space-x-4 mt-2">
              <a href="#" className="hover:text-blue-400">📘 Facebook</a>
              <a href="#" className="hover:text-blue-400">🐦 Twitter</a>
              <a href="#" className="hover:text-blue-400">📸 Instagram</a>
            </div>
            <h3 className="flex justify-center text-lg font-semibold text-white pt-2">Síguenos</h3>
          </div>
        </div>
  
        {/* Derechos de autor */}
        <div className="text-center text-sm border-t border-gray-700 mt-6 pt-4">
          &copy; {new Date().getFullYear()} ScanNovels. Todos los derechos reservados.
        </div>
      </footer>
    );
  };
  
  export default Footer;
  