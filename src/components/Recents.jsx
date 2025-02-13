import React, { useState } from "react";

const recentsNovel = [
  {
    id: 1,
    title: "Stealing Spree",
    time: "Hace 2 horas",
    image: "src/assets/img/img6.jpg",
  },
  {
    id: 2,
    title: "Stealing Spree",
    time: "Hace 2 horas",
    image: "src/assets/img/img5.png",
  },
  {
    id: 3,
    title: "Stealing Spree",
    time: "Hace 2 horas",
    image: "src/assets/img/img4.jpg",
  },
  {
    id: 4,
    title: "Stealing Spree",
    time: "Hace 2 horas",
    image: "src/assets/img/img3.jpg",
  },
  {
    id: 1,
    title: "Stealing Spree",
    time: "Hace 2 horas",
    image: "src/assets/img/img6.jpg",
  },
  {
    id: 2,
    title: "Stealing Spree",
    time: "Hace 2 horas",
    image: "src/assets/img/img5.png",
  },
  {
    id: 3,
    title: "Stealing Spree",
    time: "Hace 2 horas",
    image: "src/assets/img/img4.jpg",
  },
  {
    id: 4,
    title: "Stealing Spree",
    time: "Hace 2 horas",
    image: "src/assets/img/img3.jpg",
  },
  {
    id: 1,
    title: "Stealing Spree",
    time: "Hace 2 horas",
    image: "src/assets/img/img6.jpg",
  },
  {
    id: 2,
    title: "Stealing Spree",
    time: "Hace 2 horas",
    image: "src/assets/img/img5.png",
  },
  {
    id: 3,
    title: "Stealing Spree",
    time: "Hace 2 horas",
    image: "src/assets/img/img4.jpg",
  },
  {
    id: 4,
    title: "Stealing Spree",
    time: "Hace 2 horas",
    image: "src/assets/img/img3.jpg",
  },
  {
    id: 1,
    title: "Stealing Spree",
    time: "Hace 2 horas",
    image: "src/assets/img/img6.jpg",
  },
  {
    id: 2,
    title: "Stealing Spree",
    time: "Hace 2 horas",
    image: "src/assets/img/img5.png",
  },
  {
    id: 3,
    title: "Stealing Spree",
    time: "Hace 2 horas",
    image: "src/assets/img/img4.jpg",
  },
  {
    id: 4,
    title: "Stealing Spree",
    time: "Hace 2 horas",
    image: "src/assets/img/img3.jpg",
  },
];

function Recents() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <div className="flex justify-between items-center font-bold text-3xl pb-6">
        <h2>Recientes</h2>
        <a
          href="/otra-pagina"
          className="text-blue-500 cursor-pointer hover:underline"
        >
          Ver más
        </a>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-2 gap-y-9">
        {recentsNovel.map((novel) => (
          <div
            key={novel.id}
            className="
            bg-gray-800 text-white 
            rounded-lg overflow-hidden 
            shadow-lg 
            hover:shadow-2xl
            mx-4 min-h-[400px] 
            flex flex-col 
            justify-between
            "
          >
            <img
              src={novel.image}
              alt={novel.title}
              className="w-full h-60 object-cover"
            />
            <div className="p-4 flex flex-col flex-grow">
              <h3 className="text-xl font-bold">{novel.title}</h3>
              <p className="text-sm text-gray-300 mt-2">{novel.time}</p>
              <div className="mt-auto">
                <button className="bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 rounded-lg w-full">
                  Leer más
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

export default Recents;
