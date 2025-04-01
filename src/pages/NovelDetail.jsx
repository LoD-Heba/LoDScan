import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { recentsNovel } from "../data/db"; // Asegúrate de que la ruta sea correcta
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const NovelDetail = () => {
  const { id } = useParams(); // Obtiene el ID de la URL
  const [isFavorite, setIsFavorite] = useState(false);

  // Busca la novela en tu base de datos
  const novel = recentsNovel.find(novel => novel.id === parseInt(id));

  if (!novel) {
    return (
      <div className="bg-[url('/img/epic.jpg')] min-h-screen">
        <div className="max-w-[90%] mx-auto bg-white shadow-lg bg-opacity-89">
          <Navbar />
          <div className="container mx-auto px-4 py-8 text-center">
            <h2 className="text-3xl font-bold mb-4">Novela no encontrada</h2>
            <Link 
              to="/discover" 
              className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2 rounded-lg font-medium transition inline-block"
            >
              Volver al inicio
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[url('/img/epic.jpg')]">
      <div className="max-w-[90%] mx-auto bg-white shadow-lg bg-opacity-89 h-full">
        {/* Header */}
        <Navbar />

        {/* Main Content */}
        <main className="container mx-auto px-4 py-8">
          {/* Sección Superior: Portada + Info */}
          <section className="flex flex-col md:flex-row gap-8 mb-12">
            {/* Portada */}
            <div className="w-full md:w-1/3 lg:w-1/4">
              <img
                src={novel.image}
                alt={novel.title}
                className="rounded-lg shadow-xl w-full h-auto"
              />
            </div>

            {/* Información */}
            <div className="w-full md:w-2/3 lg:w-3/4">
              <h2 className="text-3xl font-bold mb-2">{novel.title}</h2>
              <p className="text-lg text-indigo-600 mb-4">Por {novel.author}</p>

              {/* Rating y Estado */}
              <div className="flex items-center gap-4 mb-4">
                <span className="flex items-center bg-yellow-100 px-3 py-1 rounded-full">
                  ⭐ {novel.rating}
                </span>
                <span className="bg-green-100 px-3 py-1 rounded-full">
                  {novel.status}
                </span>
                <span className="text-sm text-gray-500">
                  {novel.time} • {novel.chapters.length} capítulos
                </span>
              </div>

              {/* Géneros */}
              <div className="flex flex-wrap gap-2 mb-6">
                {novel.genres.map((genre, index) => (
                  <span
                    key={index}
                    className="bg-gray-200 px-3 py-1 rounded-full text-sm"
                  >
                    {genre}
                  </span>
                ))}
              </div>

              {/* Sinopsis */}
              <div className="mb-6">
                <h3 className="text-xl font-semibold mb-2">Sinopsis</h3>
                <p className="text-gray-700">{novel.synopsis || "Sin sinopsis disponible."}</p>
              </div>

              {/* Botones de Acción */}
              <div className="flex flex-wrap gap-4">
                {novel.chapters.length > 0 ? (
                  <Link
                    to={`/capitulo/${novel.id}/${novel.chapters[0].id}`}
                    className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2 rounded-lg font-medium transition"
                  >
                    Comenzar a Leer
                  </Link>
                ) : (
                  <button 
                    className="bg-gray-400 text-white px-6 py-2 rounded-lg font-medium cursor-not-allowed"
                    disabled
                  >
                    No hay capítulos
                  </button>
                )}
                <button
                  onClick={() => setIsFavorite(!isFavorite)}
                  className={`${
                    isFavorite
                      ? "bg-red-500 hover:bg-red-600"
                      : "bg-gray-300 hover:bg-gray-400"
                  } text-white px-6 py-2 rounded-lg font-medium transition`}
                >
                  {isFavorite ? "❤️ Favorito" : "♡ Añadir a Favoritos"}
                </button>
              </div>
            </div>
          </section>

          {/* Lista de Capítulos */}
          <section>
            <h3 className="text-2xl font-bold mb-6">Capítulos ({novel.chapters.length})</h3>
            {novel.chapters.length > 0 ? (
              <div className="bg-white rounded-lg shadow-md overflow-hidden">
                {novel.chapters.map((chapter) => (
                  <Link
                    key={chapter.id}
                    to={`/capitulo/${novel.id}/${chapter.id}`}
                    className="block border-b border-gray-200 last:border-0 hover:bg-gray-50 transition"
                  >
                    <div className="px-6 py-4">
                      <p className="font-medium">
                        <span className="text-indigo-600">Vol. {chapter.volume || 1}</span> - {chapter.title}
                      </p>
                    </div>
                  </Link>
                ))}
              </div>
            ) : (
              <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4">
                <p className="text-yellow-700">Esta novela aún no tiene capítulos publicados.</p>
              </div>
            )}
          </section>
        </main>
        <Footer className="bg-black-500"/>
      </div>
      
    </div>
  );
};

export default NovelDetail;