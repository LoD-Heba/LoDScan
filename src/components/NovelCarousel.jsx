import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const novels = [
  {
    id: 1,
    title: "Against the Gods",
    description:
      "Un joven con un misterioso poder lucha contra el destino en un mundo de cultivadores.",
    image: "src/assets/img/img1.jpg",
  },
  {
    id: 2,
    title: "Solo Leveling",
    description:
      "El cazador más débil del mundo obtiene un sistema que lo convierte en el más fuerte.",
    image: "src/assets/img/img2.jpg",
  },
  {
    id: 3,
    title: "The Beginning After the End",
    description:
      "Un rey reencarna en un mundo mágico y comienza una nueva aventura.",
    image: "src/assets/img/img3.jpg",
  },
  {
    id: 4,
    title: "Tales of Demons and Gods",
    description:
      "Un joven reencarna con sus recuerdos intactos y busca cambiar su destino.",
    image: "src/assets/img/img4.jpg",
  },
  {
    id: 5,
    title: "The Legendary Moonlight Sculptor",
    description: "100 capitulos.",
    image: "src/assets/img/img5.png",
  },
  {
    id: 6,
    title: "Rebirth of the Urban Immortal Cultivator",
    description: "capitulos.",
    image: "src/assets/img/img8.jpg",
  },
  {
    id: 7,
    title: "Martial Peak",
    description:
      "Un joven con un talento oculto comienza su viaje para alcanzar la cima de la cultivación.",
    image: "src/assets/img/img7.jpg",
  },
];

const NovelCard = ({ novel }) => {
  return (
    <div
      className="
        bg-gray-800 
        text-white 
        rounded-lg 
        overflow-hidden 
        shadow-lg 
        hover:shadow-2xl 
        transition 
        duration-300 
        mx-4 min-h-[450px] 
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
        <p className="text-sm text-gray-300 mt-2">{novel.description}</p>
        <div className="mt-auto">
          <button className="bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 rounded-lg w-full">
            Leer más
          </button>
        </div>
      </div>
    </div>
  );
};

const NovelCarousel = () => {
  const settings = {
    dots: true, // Muestra indicadores de posición
    infinite: true, // Loop infinito
    speed: 500, // Velocidad de transición
    slidesToShow: 6, // Muestra 5 novelas en pantallas grandes
    slidesToScroll: 1, // Avanza de 1 en 1
    autoplay: true, // Desliza automáticamente
    autoplaySpeed: 3000, // Cada 2 segundos
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  return (
    <>
      <div className="flex justify-between items-center text-3xl font-bold">
        <h2 className=" text-black mb-6">Novelas Populares</h2>
        <a href="#" className="text-blue-500 cursor-pointer hover:underline">
          Ver más
        </a>
      </div>
      <div className="mx-auto px-4 py-10">
        <Slider {...settings}>
          {novels.map((novel) => (
            <NovelCard key={novel.id} novel={novel} />
          ))}
        </Slider>
      </div>
    </>
  );
};

export default NovelCarousel;
