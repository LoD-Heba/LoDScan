import React from "react";
import Titulo from "../components/Titulo";
import Navbar from "../components/Navbar";
import NovelCarousel from "../components/NovelCarousel";
import Recents from "../components/Recents";
import Footer from "../components/Footer";
import { recentsNovel } from "../data/db";
import Recomends from "../components/Recomends";

export default function Home() {
  return (
    <div className="bg-[url('/img/epic.jpg')] bg-cover bg-fixed">
      <div className="md:max-w-full max-w-[90%] mx-auto bg-white shadow-lg bg-opacity-90">
        <Titulo />
        <Navbar />

        <main className="p-3 sm:p-4">
          <hr className="border-t-2 border-gray-400 my-3 sm:my-4" />
          <NovelCarousel />

          <hr className="border-t-2 border-gray-400 my-3 sm:my-4" />

          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center font-bold text-xl sm:text-2xl md:text-3xl pb-3 sm:pb-5 px-2 sm:px-4">
            <h2>Recientes</h2>
            <a
              href="/otra-pagina"
              className="text-blue-500 cursor-pointer hover:underline mt-1 sm:mt-0 text-base sm:text-lg"
            >
              Ver más
            </a>
          </div>

          <div className="grid grid-cols-2 xs:grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-3 sm:gap-4">
            {recentsNovel.slice(0, 10).map((novel) => (
              <Recents key={novel.id} novel={novel} />
            ))}
          </div>

          <Recomends />
        </main>
        <Footer />
      </div>
    </div>
  );
}
