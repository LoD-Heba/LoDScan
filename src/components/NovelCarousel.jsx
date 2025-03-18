import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { recentsNovel } from "../data/db";

const NovelCard = ({ novel }) => {
  return (
    <div
      className="
        bg-blue-950 
        text-white 
        rounded-lg 
        overflow-hidden 
        shadow-2xl 
        hover:shadow-black
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
          <button className="bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 rounded-lg w-full cursor-pointer">
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
          {recentsNovel.slice(0,10).map((novel) => (
            <NovelCard key={novel.id} novel={novel} 
            
            />
          ))}
        </Slider>
      </div>
    </>
  );
};

export default NovelCarousel;
