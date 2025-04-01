import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { recentsNovel } from '../data/db';
import Navbar from './Navbar';
import Footer from './Footer';

const SearchComponent = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  const searchRef = useRef(null);

  // Cerrar sugerencias al hacer clic fuera
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Buscar coincidencias en tiempo real
  useEffect(() => {
    if (searchTerm.trim() === '') {
      setSuggestions([]);
      return;
    }

    const timer = setTimeout(() => {
      const results = recentsNovel.filter(novel => {
        const searchLower = searchTerm.toLowerCase();
        return (
          novel.title.toLowerCase().includes(searchLower) ||
          novel.author.toLowerCase().includes(searchLower) ||
          novel.genres.some(genre => genre.toLowerCase().includes(searchLower))
        );
      }).slice(0, 5); // Limitar a 5 sugerencias

      setSuggestions(results);
    }, 300);

    return () => clearTimeout(timer);
  }, [searchTerm]);

  // Realizar búsqueda completa
  const handleSearch = (e) => {
    e.preventDefault();
    setIsSearching(true);
    setShowSuggestions(false);

    // Simular carga (en producción sería una llamada a la API)
    setTimeout(() => {
      const results = recentsNovel.filter(novel => {
        const searchLower = searchTerm.toLowerCase();
        return (
          novel.title.toLowerCase().includes(searchLower) ||
          novel.author.toLowerCase().includes(searchLower) ||
          novel.genres.some(genre => genre.toLowerCase().includes(searchLower))
        );
      });

      setSearchResults(results);
      setIsSearching(false);
    }, 500);
  };

  // Seleccionar una sugerencia
  const selectSuggestion = (novel) => {
    setSearchTerm(novel.title);
    setSearchResults([novel]);
    setShowSuggestions(false);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex flex-col">
      <Navbar />
      
      <main className="flex-grow container mx-auto px-4 py-8">
        {/* Barra de búsqueda */}
        <div className="max-w-3xl mx-auto mb-8" ref={searchRef}>
          <form onSubmit={handleSearch} className="relative">
            <div className="flex">
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => {
                  setSearchTerm(e.target.value);
                  setShowSuggestions(true);
                }}
                onFocus={() => setShowSuggestions(true)}
                placeholder="Buscar novelas por título, autor o género..."
                className="flex-grow px-4 py-3 rounded-l-lg border border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-gray-800 dark:text-white"
              />
              <button
                type="submit"
                className="px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-r-lg transition"
              >
                Buscar
              </button>
            </div>

            {/* Sugerencias */}
            {showSuggestions && suggestions.length > 0 && (
              <div className="absolute z-10 w-full mt-1 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700">
                <ul>
                  {suggestions.map((novel) => (
                    <li 
                      key={novel.id}
                      onClick={() => selectSuggestion(novel)}
                      className="px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer flex items-center"
                    >
                      <img 
                        src={novel.image} 
                        alt={novel.title}
                        className="w-10 h-14 object-cover rounded mr-3"
                      />
                      <div>
                        <p className="font-medium dark:text-white">{novel.title}</p>
                        <p className="text-sm text-gray-500 dark:text-gray-400">{novel.author}</p>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </form>

          {/* Filtros rápidos */}
          <div className="mt-4 flex flex-wrap gap-2">
            <span className="text-sm text-gray-500 dark:text-gray-400">Buscar por:</span>
            <button
              onClick={() => setSearchTerm("Aventura")}
              className="px-3 py-1 text-sm bg-gray-200 dark:bg-gray-700 rounded-full hover:bg-gray-300 dark:hover:bg-gray-600"
            >
              Aventura
            </button>
            <button
              onClick={() => setSearchTerm("Isekai")}
              className="px-3 py-1 text-sm bg-gray-200 dark:bg-gray-700 rounded-full hover:bg-gray-300 dark:hover:bg-gray-600"
            >
              Isekai
            </button>
            <button
              onClick={() => setSearchTerm("Romance")}
              className="px-3 py-1 text-sm bg-gray-200 dark:bg-gray-700 rounded-full hover:bg-gray-300 dark:hover:bg-gray-600"
            >
              Romance
            </button>
          </div>
        </div>

        {/* Resultados */}
        <div>
          {isSearching ? (
            <div className="text-center py-12">
              <div className="inline-block animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-indigo-600"></div>
              <p className="mt-4">Buscando novelas...</p>
            </div>
          ) : searchTerm && searchResults.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-lg font-medium dark:text-white">No se encontraron resultados para "{searchTerm}"</p>
              <p className="text-gray-500 dark:text-gray-400 mt-2">Intenta con diferentes términos de búsqueda</p>
            </div>
          ) : (
            <>
              {searchTerm && (
                <h2 className="text-xl font-bold mb-6 dark:text-white">
                  {searchResults.length} resultados para "{searchTerm}"
                </h2>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {(searchTerm ? searchResults : recentsNovel.slice(0, 6)).map((novel) => (
                  <Link
                    to={`/novela/${novel.id}`}
                    key={novel.id}
                    className="group hover:scale-105 transition-transform duration-200"
                  >
                    <div className="bg-white dark:bg-gray-800 rounded-lg overflow-hidden shadow-md hover:shadow-lg h-full">
                      {/* Portada */}
                      <div className="relative aspect-[2/3]">
                        <img
                          src={novel.image}
                          alt={novel.title}
                          className="w-full h-full object-cover"
                        />
                        <span className="absolute top-2 right-2 bg-blue-600 text-white text-xs px-2 py-1 rounded">
                          {novel.status}
                        </span>
                      </div>

                      {/* Detalles */}
                      <div className="p-4">
                        <h3 className="font-semibold text-gray-900 dark:text-white truncate">
                          {novel.title}
                        </h3>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          {novel.author}
                        </p>
                        <div className="flex flex-wrap gap-1 mt-2">
                          {novel.genres.slice(0, 3).map((genre, index) => (
                            <span
                              key={index}
                              className="text-xs bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded"
                            >
                              {genre}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default SearchComponent;