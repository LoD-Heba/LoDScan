import React from "react";
import Titulo from "./components/Titulo";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import NovelCarousel from "./components/NovelCarousel";
import Recents from "./components/Recents";
import { recentsNovel } from "./data/db";

export default function App() {
  //
  return (
    <div className="bg-[url('/img/epic.jpg')]">
      <div className="max-w-[90%] mx-auto bg-white shadow-lg ">
        <Titulo />
        <Navbar />

        <main className="p-4">
          <hr className="border-t-2 border-gray-400 my-4" />
          <NovelCarousel />
          <br />
          <hr className="border-t-2 border-gray-400 my-4" />
          <div className="flex justify-between items-center font-bold text-3xl pb-6">
            {/* ESPACIO RECIENTES */}
            <h2>Recientes</h2>
            <a
              href="/otra-pagina"
              className="text-blue-500 cursor-pointer hover:underline " // Cambiar a color azul
            >
              Ver más
            </a>
          </div>

          <div className="grid grid-cols-4 md:grid-cols-2 lg:grid-cols-5 gap-2 gap-y-9">
            
            {recentsNovel.slice(0,10).map((novel) => (
              <Recents key={novel.id} 
              novel={novel} />
            ))}
          </div>
          {/* FIN ESPACIO RECIENTES */}
        </main>
      </div>
      {/* FOOTER */}
      <Footer />
      {/* FIN FOOTER */}
    </div>
  );
}
