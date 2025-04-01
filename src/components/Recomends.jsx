import { Link } from "react-router-dom";
import { recentsNovel } from "../data/db";

const Recomends = ({ limit = 5 }) => {
  const topNovels = [...recentsNovel]
    .sort((a, b) => b.rating - a.rating)
    .slice(0, limit);

  return (
    <section className="my-6 sm:my-8 mx-2 sm:mx-4">
      <div className="relative flex justify-start items-start pb-10 pt-2">
      <h2 className="relative text-xl font-bold text-black px-6 py-2 border-2 border-transparent rounded-md animate-borderGlow">
        Recomendados
      </h2>
      </div>

      <div className="grid grid-cols-2 xs:grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-3 sm:gap-6">
        {topNovels.map((novel) => (
          <Link
            to={`/novela/${novel.id}`}
            key={novel.id}
            className="flex-shrink-0 w-full group"
          >
            <div className="group-hover:scale-[1.02] transition-transform duration-200">
              <div className="relative aspect-[2/3]">
                <img
                  src={novel.image}
                  alt={novel.title}
                  className="w-full h-full object-cover rounded-t-lg"
                />
                <span className="absolute top-1 right-1 sm:top-2 sm:right-2 bg-yellow-500 text-white text-xs font-bold px-1.5 py-0.5 sm:px-2 sm:py-1 rounded-full flex items-center">
                  ⭐ {novel.rating}
                </span>
              </div>

              <div className="p-2 sm:p-3 bg-white rounded-b-lg">
                <h3 className="font-semibold text-gray-900 text-sm sm:text-base truncate">
                  {novel.title}
                </h3>
                <p className="text-xs text-gray-500 mt-1 truncate">
                  {novel.author}
                </p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default Recomends;