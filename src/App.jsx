import React from 'react'
import Navbar from './components/navbar';

export default function App() {
  return (
    <div>
      <Navbar />
      <main className="p-4">
        <h1 className="text-3xl font-bold">Bienvenido a mi sitio</h1>
        <p className="mt-2 text-gray-600">Explora el contenido usando el menú.</p>
      </main>
    </div>
  );
}
