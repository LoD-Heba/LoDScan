import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

const UserProfile = () => {
  const [user, setUser] = useState({
    id: 1,
    name: "Usuario Ejemplo",
    email: "usuario@ejemplo.com",
    avatar: "/img/default-avatar.webp",
    joinedDate: "2023-01-15",
  });

  // Estados para las preferencias
  const [preferences, setPreferences] = useState({
    darkMode: false,
    notifications: true,
    fontSize: 16,
  });

  // Datos simulados del usuario
  const [favorites, setFavorites] = useState([]);
  const [readingHistory, setReadingHistory] = useState([]);
  const [currentlyReading, setCurrentlyReading] = useState([]);
  const [activeTab, setActiveTab] = useState("favorites");
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  // Cargar datos iniciales (simulado)
  useEffect(() => {
    // Aquí iría tu llamada a la API para cargar los datos reales
    const loadUserData = async () => {
      // Simulando carga de datos
      setTimeout(() => {
        setFavorites([
          {
            id: 1,
            title: "El poder del Fénix",
            author: "Aneko Yusagi",
            lastRead: "2023-05-10",
          },
          {
            id: 2,
            title: "Cronicas del Dragón",
            author: "Autor Desconocido",
            lastRead: "2023-04-22",
          },
        ]);

        setReadingHistory([
          {
            id: 1,
            title: "El poder del Fénix",
            chapter: "Capítulo 15",
            date: "2023-05-10",
          },
          {
            id: 3,
            title: "La leyenda de Luna",
            chapter: "Capítulo 8",
            date: "2023-04-28",
          },
        ]);

        setCurrentlyReading([
          {
            id: 1,
            title: "El poder del Fénix",
            currentChapter: 16,
            totalChapters: 120,
            progress: 13,
          },
          {
            id: 4,
            title: "El héroe del escudo",
            currentChapter: 42,
            totalChapters: 150,
            progress: 28,
          },
        ]);
      }, 500);
    };

    loadUserData();
  }, []);
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  // Manejar cambio de preferencias
  const handlePreferenceChange = (key, value) => {
    setPreferences((prev) => ({
      ...prev,
      [key]: value,
    }));
    // Aquí iría la llamada a tu API para guardar las preferencias
  };

  // Eliminar de favoritos
  const removeFavorite = (id) => {
    setFavorites(favorites.filter((item) => item.id !== id));
    // Aquí iría la llamada a tu API para actualizar
  };

  ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  return (
    <div
      className={`min-h-screen flex flex-col ${
        preferences.darkMode
          ? "bg-gray-900 text-gray-100"
          : "bg-gray-50 text-gray-900"
      }`}
    >
      <Navbar />

      <main className="flex-grow container mx-auto px-4 py-8">
        {/* Encabezado del perfil */}
        <section className="flex flex-col md:flex-row gap-8 items-start mb-8">
          {/* Avatar e información básica */}
          <div className="w-full md:w-1/4 lg:w-1/5 flex flex-col items-center">
            <img
              src={user.avatar}
              alt={`Avatar de ${user.name}`}
              className="w-32 h-32 rounded-full object-cover border-4 border-indigo-500 mb-4"
            />
            <h2 className="text-2xl font-bold text-center">{user.name}</h2>
            <p className="text-gray-500 dark:text-gray-400">{user.email}</p>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
              Miembro desde: {new Date(user.joinedDate).toLocaleDateString()}
            </p>

            <button className="mt-4 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg transition">
              Editar perfil
            </button>
          </div>

          {/* Contenido principal */}
          <div className="w-full md:w-3/4 lg:w-4/5">
            {/* Pestañas */}
            <div className="border-b border-gray-200 dark:border-gray-700 mb-6">
              <nav className="flex space-x-4">
                <button
                  onClick={() => setActiveTab("favorites")}
                  className={`py-4 px-6 font-medium ${
                    activeTab === "favorites"
                      ? "border-b-2 border-indigo-500 text-indigo-600 dark:text-indigo-400"
                      : "text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
                  }`}
                >
                  Favoritos
                </button>
                <button
                  onClick={() => setActiveTab("reading")}
                  className={`py-4 px-6 font-medium ${
                    activeTab === "reading"
                      ? "border-b-2 border-indigo-500 text-indigo-600 dark:text-indigo-400"
                      : "text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
                  }`}
                >
                  Leyendo
                </button>
                <button
                  onClick={() => setActiveTab("history")}
                  className={`py-4 px-6 font-medium ${
                    activeTab === "history"
                      ? "border-b-2 border-indigo-500 text-indigo-600 dark:text-indigo-400"
                      : "text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
                  }`}
                >
                  Historial
                </button>
                <button
                  onClick={() => setActiveTab("settings")}
                  className={`py-4 px-6 font-medium ${
                    activeTab === "settings"
                      ? "border-b-2 border-indigo-500 text-indigo-600 dark:text-indigo-400"
                      : "text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
                  }`}
                >
                  Configuración
                </button>
              </nav>
            </div>

            {/* Contenido de las pestañas */}
            <div className="py-4">
              {/* Favoritos */}
              {activeTab === "favorites" && (
                <div>
                  <h3 className="text-xl font-bold mb-4">
                    Tus novelas favoritas
                  </h3>
                  {favorites.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {favorites.map((novel) => (
                        <div
                          key={novel.id}
                          className={`p-4 rounded-lg ${
                            preferences.darkMode ? "bg-gray-800" : "bg-white"
                          } shadow`}
                        >
                          <div className="flex justify-between">
                            <div>
                              <h4 className="font-bold">{novel.title}</h4>
                              <p className="text-sm text-gray-500 dark:text-gray-400">
                                {novel.author}
                              </p>
                            </div>
                            <button
                              onClick={() => removeFavorite(novel.id)}
                              className="text-red-500 hover:text-red-700"
                              title="Eliminar de favoritos"
                            >
                              ✕
                            </button>
                          </div>
                          <div className="mt-2 pt-2 border-t border-gray-200 dark:border-gray-700 text-sm">
                            Última lectura: {novel.lastRead}
                          </div>
                          <Link
                            to={`/novela/${novel.id}`}
                            className="mt-3 inline-block text-sm text-indigo-600 dark:text-indigo-400 hover:underline"
                          >
                            Continuar lectura →
                          </Link>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-8">
                      <p className="text-gray-500 dark:text-gray-400">
                        Aún no tienes novelas favoritas
                      </p>
                      <Link
                        to="/discover"
                        className="mt-2 inline-block text-indigo-600 dark:text-indigo-400 hover:underline"
                      >
                        Descubre nuevas novelas
                      </Link>
                    </div>
                  )}
                </div>
              )}

              {/* Leyendo actualmente */}
              {activeTab === "reading" && (
                <div>
                  <h3 className="text-xl font-bold mb-4">Continuar leyendo</h3>
                  {currentlyReading.length > 0 ? (
                    <div className="space-y-4">
                      {currentlyReading.map((novel) => (
                        <div
                          key={novel.id}
                          className={`p-4 rounded-lg ${
                            preferences.darkMode ? "bg-gray-800" : "bg-white"
                          } shadow`}
                        >
                          <h4 className="font-bold">{novel.title}</h4>
                          <div className="mt-2">
                            <div className="flex justify-between text-sm mb-1">
                              <span>
                                Capítulo {novel.currentChapter} de{" "}
                                {novel.totalChapters}
                              </span>
                              <span>{novel.progress}%</span>
                            </div>
                            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                              <div
                                className="bg-indigo-600 h-2 rounded-full"
                                style={{ width: `${novel.progress}%` }}
                              ></div>
                            </div>
                          </div>
                          <Link
                            to={`/novela/${novel.id}`}
                            className="mt-3 inline-block text-sm text-indigo-600 dark:text-indigo-400 hover:underline"
                          >
                            Continuar lectura →
                          </Link>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-8">
                      <p className="text-gray-500 dark:text-gray-400">
                        No estás leyendo ninguna novela actualmente
                      </p>
                      <Link
                        to="/discover"
                        className="mt-2 inline-block text-indigo-600 dark:text-indigo-400 hover:underline"
                      >
                        Descubre nuevas novelas
                      </Link>
                    </div>
                  )}
                </div>
              )}

              {/* Historial de lectura */}
              {activeTab === "history" && (
                <div>
                  <h3 className="text-xl font-bold mb-4">
                    Historial de lectura
                  </h3>
                  {readingHistory.length > 0 ? (
                    <div className="overflow-x-auto">
                      <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                        <thead
                          className={`${
                            preferences.darkMode ? "bg-gray-800" : "bg-gray-50"
                          }`}
                        >
                          <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium uppercase">
                              Novela
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium uppercase">
                              Capítulo
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium uppercase">
                              Fecha
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium uppercase">
                              Acciones
                            </th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                          {readingHistory.map((item, index) => (
                            <tr
                              key={index}
                              className={
                                index % 2 === 0
                                  ? preferences.darkMode
                                    ? "bg-gray-800"
                                    : "bg-white"
                                  : preferences.darkMode
                                  ? "bg-gray-700"
                                  : "bg-gray-50"
                              }
                            >
                              <td className="px-6 py-4 whitespace-nowrap">
                                <Link
                                  to={`/novela/${item.id}`}
                                  className="text-indigo-600 dark:text-indigo-400 hover:underline"
                                >
                                  {item.title}
                                </Link>
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap">
                                {item.chapter}
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap">
                                {item.date}
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap">
                                <button className="text-indigo-600 dark:text-indigo-400 hover:text-indigo-900 dark:hover:text-indigo-300">
                                  Volver a leer
                                </button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  ) : (
                    <div className="text-center py-8">
                      <p className="text-gray-500 dark:text-gray-400">
                        Aún no tienes historial de lectura
                      </p>
                    </div>
                  )}
                </div>
              )}

              {/* Configuración */}
              {activeTab === "settings" && (
                <div>
                  <h3 className="text-xl font-bold mb-4">
                    Preferencias de lectura
                  </h3>
                  <div
                    className={`p-6 rounded-lg ${
                      preferences.darkMode ? "bg-gray-800" : "bg-white"
                    } shadow`}
                  >
                    <div className="space-y-6">
                      <div>
                        <h4 className="font-medium mb-2">
                          Tema de la aplicación
                        </h4>
                        <div className="flex items-center space-x-4">
                          <button
                            onClick={() =>
                              handlePreferenceChange("darkMode", false)
                            }
                            className={`px-4 py-2 rounded-lg ${
                              !preferences.darkMode
                                ? "bg-indigo-600 text-white"
                                : "bg-gray-200 dark:bg-gray-700"
                            }`}
                          >
                            Claro
                          </button>
                          <button
                            onClick={() =>
                              handlePreferenceChange("darkMode", true)
                            }
                            className={`px-4 py-2 rounded-lg ${
                              preferences.darkMode
                                ? "bg-indigo-600 text-white"
                                : "bg-gray-200 dark:bg-gray-700"
                            }`}
                          >
                            Oscuro
                          </button>
                        </div>
                      </div>

                      <div>
                        <h4 className="font-medium mb-2">Notificaciones</h4>
                        <label className="inline-flex items-center cursor-pointer">
                          <input
                            type="checkbox"
                            checked={preferences.notifications}
                            onChange={(e) =>
                              handlePreferenceChange(
                                "notifications",
                                e.target.checked
                              )
                            }
                            className="sr-only peer"
                          />
                          <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-indigo-600"></div>
                          <span className="ms-3 text-sm font-medium">
                            {preferences.notifications
                              ? "Activadas"
                              : "Desactivadas"}
                          </span>
                        </label>
                      </div>

                      <div>
                        <h4 className="font-medium mb-2">
                          Tamaño de fuente predeterminado
                        </h4>
                        <div className="flex items-center space-x-4">
                          {[14, 16, 18].map((size) => (
                            <button
                              key={size}
                              onClick={() =>
                                handlePreferenceChange("fontSize", size)
                              }
                              className={`px-4 py-2 rounded-lg ${
                                preferences.fontSize === size
                                  ? "bg-indigo-600 text-white"
                                  : "bg-gray-200 dark:bg-gray-700"
                              }`}
                            >
                              {size}px
                            </button>
                          ))}
                        </div>
                      </div>

                      <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
                        <button className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg">
                          Cerrar sesión
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default UserProfile;
