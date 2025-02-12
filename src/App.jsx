import React from 'react'
import Titulo from './components/Titulo'
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import TopNovel from './components/NovelCarousel';
import NovelCarousel from './components/NovelCarousel';

export default function App() {  //
  return (
    <div className="max-w-[90%] mx-auto bg-white shadow-lg">
      <Titulo />
      <Navbar />
      <main className="p-4">
        <h1 className="text-3xl font-bold">Bienvenido a mi sitio</h1>
        <p className="mt-2 text-gray-600">Explora el contenido usando el menú.</p>
        <NovelCarousel />
      </main>
      <Footer />
    </div>
  );
}
