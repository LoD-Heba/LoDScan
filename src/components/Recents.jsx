import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

const Recents = ({ novel }) => {
  // Función para obtener el último capítulo
  const getLatestChapter = () => {
    if (novel.chapters && novel.chapters.length > 0) {
      // Ordena los capítulos por ID (asumiendo que el ID más alto es el más reciente)
      const sortedChapters = [...novel.chapters].sort((a, b) => b.id - a.id);
      return sortedChapters[0];
    }
    return null;
  };

  const latestChapter = getLatestChapter();

  return (
    <div className="bg-blue-950 text-white rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 mx-1 sm:mx-2 min-h-[280px] sm:min-h-[350px] flex flex-col justify-between group">
      {/* Imagen con overlay y badges */}
      <Link 
        to={`/novela/${novel.id}`}
        className="relative overflow-hidden block"
      >
        <img
          src={novel.image}
          alt={`Portada de ${novel.title}`}
          className="w-full h-40 sm:h-48 md:h-56 object-cover transition-transform duration-500 group-hover:scale-105"
        />
        
        {/* Badge de estado */}
        <div className="absolute top-2 left-2 bg-blue-600 text-white text-xs font-bold px-2 py-1 rounded-full">
          {novel.status}
        </div>
      </Link>

      {/* Contenido de la tarjeta */}
      <div className="p-3 sm:p-4 flex flex-col flex-grow">
        <Link 
          to={`/novela/${novel.id}`}
          className="flex justify-between items-start gap-2"
        >
          <h3 className="text-base sm:text-lg md:text-xl font-bold line-clamp-2 flex-grow">
            {novel.title}
          </h3>
          <span className="text-xs bg-yellow-500 text-white px-1.5 py-0.5 rounded flex items-center shrink-0">
            ⭐ {novel.rating}
          </span>
        </Link>
        
        <div className="mt-2 flex justify-between items-center">
          <p className="text-xs sm:text-sm text-gray-300">
            {novel.time}
          </p>
          <p className="text-xs sm:text-sm text-blue-300">
            {novel.chapters.length} capítulos
          </p>
        </div>
        
        <div className="mt-3 sm:mt-4">
          {latestChapter ? (
            <Link
              to={`/capitulo/${novel.id}/${latestChapter.id}`}
              className="bg-blue-600 hover:bg-blue-500 text-white px-3 py-1 sm:px-4 sm:py-2 rounded-lg w-full text-sm sm:text-base transition-colors duration-200 flex items-center justify-center"
            >
              Leer ahora
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 5l7 7-7 7M5 5l7 7-7 7" />
              </svg>
            </Link>
          ) : (
            <button 
              className="bg-gray-500 text-white px-3 py-1 sm:px-4 sm:py-2 rounded-lg w-full text-sm sm:text-base cursor-not-allowed"
              disabled
            >
              Sin capítulos
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

Recents.propTypes = {
  novel: PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    author: PropTypes.string.isRequired,
    time: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    genres: PropTypes.arrayOf(PropTypes.string).isRequired,
    status: PropTypes.string.isRequired,
    rating: PropTypes.number.isRequired,
    chapters: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number.isRequired,
        title: PropTypes.string.isRequired,
        volume: PropTypes.number.isRequired
      })
    ).isRequired,
    synopsis: PropTypes.string.isRequired
  }).isRequired
};

export default Recents;