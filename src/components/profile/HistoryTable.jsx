import { Link } from "react-router-dom";

const HistoryTable = ({ readingHistory, darkMode }) => {
  return (
    <div>
      <h3 className="text-xl font-bold mb-4">Historial de lectura</h3>
      {readingHistory.length > 0 ? (
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
            {/* ... tabla de historial ... */}
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
  );
};

export default HistoryTable;