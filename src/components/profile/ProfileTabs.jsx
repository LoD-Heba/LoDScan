const ProfileTabs = ({ activeTab, setActiveTab }) => {
    const tabs = [
      { id: "favorites", label: "Favoritos" },
      { id: "reading", label: "Leyendo" },
      { id: "history", label: "Historial" },
      { id: "settings", label: "Configuración" }
    ];
  
    return (
      <div className="border-b border-gray-200 dark:border-gray-700 mb-6">
        <nav className="flex space-x-4">
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`py-4 px-6 font-medium ${
                activeTab === tab.id
                  ? "border-b-2 border-indigo-500 text-indigo-600 dark:text-indigo-400"
                  : "text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </nav>
      </div>
    );
  };
  
  export default ProfileTabs;