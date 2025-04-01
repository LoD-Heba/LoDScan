import { useState, useEffect, useCallback } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { recentsNovel } from "../data/db";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import CommentsSection from "../components/NovelComment";

const ChapterReader = () => {
  const { novelId, chapterId } = useParams();
  const navigate = useNavigate();
  const [fontSize, setFontSize] = useState(16);
  const [fontFamily, setFontFamily] = useState("sans-serif");
  const [darkMode, setDarkMode] = useState(false);
  const [chapterContent, setChapterContent] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  // Obtener datos de la novela y capítulo
  const novel = recentsNovel.find((novel) => novel.id === parseInt(novelId));
  const chapter = novel?.chapters.find((ch) => ch.id === parseInt(chapterId));
  const currentChapterIndex =
    novel?.chapters.findIndex((ch) => ch.id === parseInt(chapterId)) || 0;

  // Simular carga de contenido (reemplazar con tu API real)
  useEffect(() => {
    setIsLoading(true);
    const fakeContent = `
      <h2>${chapter?.title || "Capítulo"}</h2>
      <p>Este es el contenido del capítulo ${chapterId} de la novela "${
      novel?.title
    }".</p>
      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam auctor, nisl eget ultricies tincidunt...</p>
      ${Array(20).fill("<p>Párrafo de texto de ejemplo. ").join("")}
    `;

    setTimeout(() => {
      setChapterContent(fakeContent);
      setIsLoading(false);
      // Marcar como leído
      saveProgress();
    }, 500);
  }, [novelId, chapterId]);

  // Guardar progreso
  const saveProgress = useCallback(() => {
    const progress = {
      novelId,
      chapterId,
      timestamp: new Date().toISOString(),
    };
    localStorage.setItem(`progress_${novelId}`, JSON.stringify(progress));
  }, [novelId, chapterId]);

  // Navegación entre capítulos
  const goToChapter = useCallback(
    (direction) => {
      const newIndex = currentChapterIndex + direction;
      if (newIndex >= 0 && newIndex < novel.chapters.length) {
        navigate(`/capitulo/${novelId}/${novel.chapters[newIndex].id}`);
        window.scrollTo(0, 0);
      }
    },
    [currentChapterIndex, novel, novelId, navigate]
  );

  // Descargar capítulo
  // const downloadChapter = () => {
  //   const blob = new Blob([chapterContent], {
  //     type: "text/plain;charset=utf-8",
  //   });
  //   saveAs(blob, `${novel.title} - ${chapter.title}.txt`);
  // };

  // Configuración de lectura
  const readingSettings = [
    {
      icon: "A",
      label: "Tamaño",
      options: [
        { value: 14, label: "Pequeño" },
        { value: 16, label: "Mediano" },
        { value: 18, label: "Grande" },
      ],
      action: setFontSize,
    },
    {
      icon: "F",
      label: "Fuente",
      options: [
        { value: "sans-serif", label: "Sin serifa" },
        { value: "serif", label: "Serifa" },
        { value: "monospace", label: "Monoespaciada" },
      ],
      action: setFontFamily,
    },
    {
      icon: "☀️",
      label: "Tema",
      options: [
        { value: false, label: "Claro" },
        { value: true, label: "Oscuro" },
      ],
      action: setDarkMode,
    },
  ];

  //Pagina no encontrada

  if (!novel || !chapter) {
    return (
      <div className="bg-[url('/img/epic.jpg')]">
        <div className="max-w-[90%] mx-auto bg-transparent shadow-lg">
          <Navbar />
          <div className="flex-grow flex items-center justify-center">
            <div className="text-center">
              <h2 className="text-2xl font-bold mb-4">
                Capítulo no encontrado
              </h2>
              <img
                src="/img/sorry.gif"
                alt="No hay resultados"
                className="w-200 h-200 object-contain mt-4"
              />
              <Link
                to={`/novela/${novelId}`}
                className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2 rounded-lg font-medium transition inline-block"
              >
                Volver a la novela
              </Link>
            </div>
          </div>
          <Footer />
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[url('/img/epic.jpg')]">
      <div className="max-w-[90%] mx-auto bg-transparent shadow-lg">
        <div
          className={`min-h-screen flex flex-col ${
            darkMode ? "bg-gray-900 text-gray-100" : "bg-gray-50 text-gray-900"
          }`}
        >
          <Navbar />

          {/* Barra de herramientas del lector */}
          <div
            className={`sticky top-0 z-10 py-2 px-4 shadow-md ${
              darkMode ? "bg-gray-800" : "bg-white"
            }`}
          >
            <div className="container mx-auto flex flex-wrap items-center justify-between gap-4">
              <Link
                to={`/novela/${novelId}`}
                className="flex items-center gap-2 hover:text-indigo-600 transition"
              >
                <span className="hidden sm:inline">← Volver a</span>{" "}
                {novel.title}
              </Link>

              <div className="flex items-center gap-4">
                {/* Botón de descarga */}
                <button
                  // onClick={downloadChapter}
                  className="flex items-center gap-1 px-3 py-1 rounded hover:bg-gray-200 dark:hover:bg-gray-700"
                  title="Descargar capítulo (Ctrl+D)"
                >
                  <span>⬇️</span>
                  <span className="hidden md:inline">Descargar</span>
                </button>

                {/* Configuración de lectura */}
                {readingSettings.map((setting, index) => (
                  <div key={index} className="relative group">
                    <button className="flex items-center gap-1 px-3 py-1 rounded hover:bg-gray-200 dark:hover:bg-gray-700">
                      <span>{setting.icon}</span>
                      <span className="hidden md:inline">{setting.label}</span>
                    </button>
                    <div
                      className={`absolute right-0 mt-1 w-40 p-2 rounded shadow-lg ${
                        darkMode ? "bg-gray-700" : "bg-white"
                      } hidden group-hover:block z-20`}
                    >
                      {setting.options.map((option, i) => (
                        <button
                          key={i}
                          onClick={() => setting.action(option.value)}
                          className={`block w-full text-left px-3 py-1 rounded ${
                            darkMode ? "hover:bg-gray-600" : "hover:bg-gray-100"
                          }`}
                        >
                          {option.label}
                        </button>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Contenido principal */}
          <main className="flex-grow container mx-auto px-4 py-8">
            {/* Navegación entre capítulos */}
            <div className="flex justify-between mb-8">
              <button
                onClick={() => goToChapter(-1)}
                disabled={currentChapterIndex === 0}
                className={`px-4 py-2 rounded-lg ${
                  currentChapterIndex === 0
                    ? "bg-gray-300 dark:bg-gray-700 cursor-not-allowed"
                    : "bg-indigo-600 hover:bg-indigo-700 text-white"
                }`}
              >
                ← Anterior
              </button>

              <div className="text-center">
                <h2 className="text-xl font-bold">{chapter.title}</h2>
                <p className="text-sm">
                  {novel.title} - Capítulo {currentChapterIndex + 1} de{" "}
                  {novel.chapters.length}
                </p>
              </div>

              <button
                onClick={() => goToChapter(1)}
                disabled={currentChapterIndex === novel.chapters.length - 1}
                className={`px-4 py-2 rounded-lg ${
                  currentChapterIndex === novel.chapters.length - 1
                    ? "bg-gray-300 dark:bg-gray-700 cursor-not-allowed"
                    : "bg-indigo-600 hover:bg-indigo-700 text-white"
                }`}
              >
                Siguiente →
              </button>
            </div>

            {/* Contenido del capítulo */}
            <div
              className={`max-w-3xl mx-auto p-6 rounded-lg ${
                darkMode ? "bg-gray-800" : "bg-white"
              } shadow-lg`}
              style={{ fontSize: `${fontSize}px`, fontFamily }}
            >
              {isLoading ? (
                <div className="text-center py-12">
                  <div className="inline-block animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-indigo-600"></div>
                  <p className="mt-4">Cargando capítulo...</p>
                </div>
              ) : (
                <div
                  className="chapter-content"
                  dangerouslySetInnerHTML={{ __html: chapterContent }}
                />
              )}
            </div>

            {/* Progreso y navegación inferior */}
            <div className="mt-8 max-w-3xl mx-auto">
              <div className="flex items-center justify-between mb-2">
                <span>Progreso de lectura</span>
                <span>
                  {Math.round(
                    ((currentChapterIndex + 1) / novel.chapters.length) * 100
                  )}
                  %
                </span>
              </div>
              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5 mb-8">
                <div
                  className="bg-indigo-600 h-2.5 rounded-full"
                  style={{
                    width: `${
                      ((currentChapterIndex + 1) / novel.chapters.length) * 100
                    }%`,
                  }}
                ></div>
              </div>

              <div className="flex justify-between">
                <button
                  onClick={() => goToChapter(-1)}
                  disabled={currentChapterIndex === 0}
                  className={`px-4 py-2 rounded-lg ${
                    currentChapterIndex === 0
                      ? "bg-gray-300 dark:bg-gray-700 cursor-not-allowed"
                      : "bg-indigo-600 hover:bg-indigo-700 text-white"
                  }`}
                >
                  ← Capítulo anterior
                </button>
                <button
                  onClick={() => goToChapter(1)}
                  disabled={currentChapterIndex === novel.chapters.length - 1}
                  className={`px-4 py-2 rounded-lg ${
                    currentChapterIndex === novel.chapters.length - 1
                      ? "bg-gray-300 dark:bg-gray-700 cursor-not-allowed"
                      : "bg-indigo-600 hover:bg-indigo-700 text-white"
                  }`}
                >
                  Siguiente capítulo →
                </button>
              </div>
            </div>
          </main>
          <CommentsSection />
          <Footer />
        </div>
      </div>
    </div>
  );
};

export default ChapterReader;
