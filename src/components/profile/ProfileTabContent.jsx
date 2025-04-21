import FavoritesList from "./FavoritesList";
import ReadingList from "./ReadingList";
import HistoryTable from "./HistoryTable";
import SettingsPanel from "./SettingsPanel";

const ProfileTabContent = ({
  activeTab,
  preferences,
  favorites,
  currentlyReading,
  readingHistory,
  onPreferenceChange,
  onRemoveFavorite
}) => {
  return (
    <div className="py-4">
      {activeTab === "favorites" && (
        <FavoritesList 
          favorites={favorites} 
          darkMode={preferences.darkMode} 
          onRemoveFavorite={onRemoveFavorite} 
        />
      )}

      {activeTab === "reading" && (
        <ReadingList 
          currentlyReading={currentlyReading} 
          darkMode={preferences.darkMode} 
        />
      )}

      {activeTab === "history" && (
        <HistoryTable 
          readingHistory={readingHistory} 
          darkMode={preferences.darkMode} 
        />
      )}

      {activeTab === "settings" && (
        <SettingsPanel 
          preferences={preferences} 
          onPreferenceChange={onPreferenceChange} 
        />
      )}
    </div>
  );
};

export default ProfileTabContent;