import React, { useState } from "react";

function Titulo() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative flex flex-col items-center justify-center bg-gray-100 p-10">
      {/* Imagen de fondo */}
      <img
        src="./src/assets/img/epic.jpg"
        alt="Fondo épico"
        className="absolute col-auto justify-end inset-0 w-full h-full object-cover opacity-80"
        
      />

      {/* Imagen del logo superpuesta */}
      <div className="relative z-10">
        <img
          src="./src/assets/img/Logo.png"
          alt="Logo"
          className="w-32 h-32 md:w-48 md:h-48 rounded-full border-4 border-white shadow-lg" 
        /> {/* Cambiar tamaño de la imagen */}
      </div>

      {/* Título y subtítulo */}
      <div className="relative z-10 text-center text-white mt-4">
        <h1 className="text-4xl font-bold md:text-5xl">LoD-Heba Scan</h1>
        <p className="mt-2 text-lg md:text-xl">Bienvenidos</p>
      </div>
    </div>
  );
}

export default Titulo;

