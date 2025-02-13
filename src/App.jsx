import React from "react";
import Titulo from "./components/Titulo";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import TopNovel from "./components/NovelCarousel";
import NovelCarousel from "./components/NovelCarousel";
import Recents from "./components/Recents";

export default function App() {
  //
  return (
    <div className="max-w-[90%] mx-auto bg-white shadow-lg">
      <Titulo />
      <Navbar />
      <main className="p-4">
        <hr className="border-t-2 border-gray-400 my-4" />
        <NovelCarousel />
        <br />
        <hr className="border-t-2 border-gray-400 my-4" />
        <Recents />
      </main>
      <Footer />
    </div>
  );
}
