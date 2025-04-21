import { Link } from "react-router-dom";

const FavoritesList = ({ favorites, darkMode, onRemoveFavorite }) => {
  return (
    <div>
      <h3 className="text-xl font-bold mb-4">Tus novelas favoritas</h3>
      {favorites.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {favorites.map((novel) => (
            <div
              key={novel.id}
              className={`p-4 rounded-lg ${darkMode ? "bg-gray-800" : "bg-white"} shadow`}
            >
              {/* ... contenido de cada favorito ... */}
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
  );
};

export default FavoritesList;