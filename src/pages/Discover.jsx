import { useState, useEffect, useMemo } from "react";
import { Link } from "react-router-dom";
import { recentsNovel } from "../data/db";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const CatalogPage = () => {
  // Estados
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedGenre, setSelectedGenre] = useState("Todos");
  const [sortBy, setSortBy] = useState("recent");
  const novelsPerPage = 20;
  const genres = [
    "Todos",
    "Aventura",
    "Isekai",
    "Romance",
    "Acción",
    "Fantasía",
  ];
  // Resetear página al filtrar
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, selectedGenre, sortBy]);

  // Novelas filtradas (optimizado con useMemo)
  const filteredNovels = useMemo(() => {
    return recentsNovel
      .filter(
        (novel) =>
          novel.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
          (selectedGenre === "Todos" || novel.genres.includes(selectedGenre))
      )
      .sort((a, b) => {
        if (sortBy === "recent") {
          // Ordenar por el ID del último capítulo (simula "más reciente")
          const lastChapterA = a.chapters[a.chapters.length - 1]?.id || 0;
          const lastChapterB = b.chapters[b.chapters.length - 1]?.id || 0;
          return lastChapterB - lastChapterA;
        }
        if (sortBy === "rating") return b.rating - a.rating;
        return 0;
      });
  }, [recentsNovel, searchTerm, selectedGenre, sortBy]);

  // Lógica de paginación
  const indexOfLastNovel = currentPage * novelsPerPage;
  const indexOfFirstNovel = indexOfLastNovel - novelsPerPage;
  const currentNovels = filteredNovels.slice(indexOfFirstNovel, indexOfLastNovel);
  const totalPages = Math.ceil(filteredNovels.length / novelsPerPage);

  return (
    <>
      <div className="bg-[url('/img/epic.jpg')]">
        <div className="max-w-[90%] mx-auto bg-transparent shadow-lg">
          <Navbar />
          {/* Header y título */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-yellow-50 dark:text-white mb-2 pt-4">
              Catálogo de Novelas
            </h1>
            <p className="text-white dark:text-gray-300 flex justify-center text-3xl border-b-2 ">
              Encuentra tu próxima historia favorita
            </p>
          </div>

          {/* Barra de búsqueda y filtros */}
          <div className="mb-6 flex flex-col md:flex-row gap-4">
            <input
              type="text"
              placeholder="Buscar por título..."
              className="px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 flex-grow"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />

            <div className="flex gap-2 overflow-x-auto pb-2 md:overflow-visible ">
              {genres.map((genre) => (
                <button
                  key={genre}
                  onClick={() => setSelectedGenre(genre)}
                  className={`px-4 py-2 rounded-full whitespace-nowrap ${
                    selectedGenre === genre
                      ? "bg-blue-600 text-white"
                      : "bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200"
                  }`}
                >
                  {genre}
                </button>
              ))}
            </div>
          </div>

          {/* Ordenamiento */}
          <div className="mb-6 flex justify-end">
            <select
              className="px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
            >
              <option value="recent">Más recientes</option>
              <option value="rating">Más leídos</option>
            </select>
          </div>

          {/* Grid de novelas */}

          {filteredNovels.length > 0 ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
              {currentNovels.map((novel) => (
                <Link
                  to={`/novela/${novel.id}`}
                  key={novel.id}
                  className="group hover:scale-105 transition-transform duration-200"
                >
                  <div className="bg-white dark:bg-gray-800 rounded-lg overflow-hidden shadow-md hover:shadow-lg">
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

                    <div className="p-3">
                      <h3 className="font-semibold text-gray-900 dark:text-white truncate">
                        {novel.title}
                      </h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        {novel.author}
                      </p>
                      <div className="flex justify-between items-center mt-2">
                        <div className="flex items-center">
                          ⭐ <span className="ml-1 text-sm">{novel.rating}</span>
                        </div>
                        {/* Cambio aquí: Mostrar cantidad de capítulos */}
                        <span className="text-xs bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded">
                          Cap. {novel.chapters.length}
                        </span>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          ) : ( 
            // Si no hay resultados
            <div className="text-center py-12 h-96 flex flex-col items-center justify-center">
              <p className="text-cyan-50 text-lg font-medium mb-4 shadow-md">
                Sentimos mucho no tener tus preferencias.
              </p>
              {/* GIF*/}
              <img
                src="/img/sorry.gif"
                alt="No hay resultados"
                className="w-200 h-200 object-contain mt-4"
              />
              <button
                onClick={() => {
                  setSearchTerm("");
                  setSelectedGenre("Todos");
                  setSortBy("recent");
                }}
                className="mt-6 px-4 py-2 bg-cyan-600 text-white rounded-md hover:bg-cyan-700 transition-colors"
              >
                Reiniciar filtros
              </button>
            </div>
          )}
          <hr className="border-t-4 mt-4 mb-4" />
          {filteredNovels.length > 0 && (
            <div className="flex justify-center mt-8 mb-12">
              <div className="flex items-center gap-2">
                {/* Botón Anterior */}
                <button
                  onClick={() =>
                    setCurrentPage((prev) => Math.max(prev - 1, 1))
                  }
                  disabled={currentPage === 1}
                  className="px-4 py-2 rounded-md bg-gray-200 dark:bg-gray-700 disabled:opacity-50"
                >
                  &lt;
                </button>

                {/* Números de página */}
                {Array.from({ length: totalPages }, (_, i) => {
                  const pageNumber = i + 1;
                  // Mostrar solo páginas cercanas a la actual (para no saturar)
                  if (
                    pageNumber === 1 ||
                    pageNumber === totalPages ||
                    (pageNumber >= currentPage - 2 &&
                      pageNumber <= currentPage + 2)
                  ) {
                    return (
                      <button
                        key={pageNumber}
                        onClick={() => setCurrentPage(pageNumber)}
                        className={`px-4 py-2 rounded-md ${
                          currentPage === pageNumber
                            ? "bg-blue-600 text-white"
                            : "bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600"
                        }`}
                      >
                        {pageNumber}
                      </button>
                    );
                  }
                  return null;
                })}

                {/* Botón Siguiente */}
                <button
                  onClick={() =>
                    setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                  }
                  disabled={currentPage === totalPages}
                  className="px-4 py-2 rounded-md bg-gray-200 dark:bg-gray-700 disabled:opacity-50"
                >
                  &gt;
                </button>
              </div>
            </div>
          )}
          <Footer />
        </div>
      </div>
    </>
  );
};

export default CatalogPage;
