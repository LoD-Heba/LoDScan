export default function Titulo() {
  return ( 
    <div className="relative flex flex-col items-center justify-center bg-gray-100 p-4 sm:p-6 md:p-10 overflow-hidden"> 
      {/* Imagen de fondo */}
      <img
        src="./img/epic.jpg"
        alt="Fondo épico"
        className="absolute w-full h-full object-cover opacity-80 -z-1"
      />

      {/* Logo */}
      <div className="relative">
        <img
          src="./img/Logo.png" 
          alt="Logo"
          className="w-24 h-24 sm:w-32 sm:h-32 md:w-48 md:h-48 rounded-full border-4 border-white shadow-lg"
        />
      </div>

      {/* Título y subtítulo */}
      <div className="relative z-10 text-center text-white mt-3 sm:mt-4 px-2">
        <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold">El Rincón De La Lectura</h1> 
        <p className="mt-1 sm:mt-2 text-base sm:text-lg md:text-xl">Bienvenidos</p> 
      </div>
    </div>
  );
}