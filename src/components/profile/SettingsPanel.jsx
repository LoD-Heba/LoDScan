const SettingsPanel = ({ preferences, onPreferenceChange }) => {
    return (
      <div>
        <h3 className="text-xl font-bold mb-4">Preferencias de lectura</h3>
        <div className={`p-6 rounded-lg ${preferences.darkMode ? "bg-gray-800" : "bg-white"} shadow`}>
          {/* ... configuraciones de preferencias ... */}
        </div>
      </div>
    );
  };
  
  export default SettingsPanel;