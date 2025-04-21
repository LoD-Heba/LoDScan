import { Link } from "react-router-dom";

const ProfileHeader = ({ user }) => {
  return (
    <section className="flex flex-col md:flex-row gap-8 items-start mb-8">
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
    </section>
  );
};

export default ProfileHeader;