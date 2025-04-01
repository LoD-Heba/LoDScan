import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { recentsNovel } from "../data/db";

const NovelCard = ({ novel }) => {
  return (
    <div className="bg-blue-950 text-white rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 mx-1 sm:mx-2 min-h-[320px] sm:min-h-[400px] flex flex-col justify-between transform hover:-translate-y-1 hover:scale-[1.02] group">
      {/* Imagen con overlay hover */}
      <div className="relative overflow-hidden">
        <img
          src={novel.image}
          alt={novel.title}
          className="w-full h-40 sm:h-48 md:h-56 object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-blue-950/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-3">
          <span className="text-xs font-semibold bg-blue-600 px-2 py-1 rounded-full">
            {novel.genre}
          </span>
        </div>
      </div>

      {/* Contenido de la tarjeta */}
      <div className="p-3 sm:p-4 flex flex-col flex-grow">
        <div className="flex justify-between items-start mb-1">
          <h3 className="text-base sm:text-lg md:text-xl font-bold line-clamp-2 flex-grow">
            {novel.title}
          </h3>
          <span className="text-xs bg-yellow-500 text-white px-1.5 py-0.5 rounded ml-2 flex items-center">
            ⭐ {novel.rating}
          </span>
        </div>
        
        <p className="text-xs sm:text-sm text-gray-300 mt-1 sm:mt-2 line-clamp-3">
          {novel.description}
        </p>
        
        <div className="mt-3 sm:mt-4">
          <button className="bg-blue-600 hover:bg-blue-500 text-white px-3 py-1 sm:px-4 sm:py-2 rounded-lg w-full text-sm sm:text-base transition-colors duration-200 flex items-center justify-center">
            Leer más
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

const NovelCarousel = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 600,
    slidesToShow: 5,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 4000,
    pauseOnHover: true,
    cssEase: "cubic-bezier(0.645, 0.045, 0.355, 1)",
    responsive: [
      {
        breakpoint: 1440,
        settings: {
          slidesToShow: 4,
        },
      },
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
          arrows: false,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          centerMode: true,
          centerPadding: "15%",
          arrows: false,
        },
      },
    ],
  };

  return (
    <section className="mx-2 sm:mx-4 py-8 sm:py-12 bg-white/80 rounded-xl">
      {/* Encabezado con efecto decorativo */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 sm:mb-8 px-4 sm:px-6 relative">
        <div className="absolute left-0 bottom-0 h-1 w-20 bg-gradient-to-r from-blue-500 to-transparent rounded-full"></div>
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-800 relative pl-2">
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-blue-400">
            Novelas Populares
          </span>
        </h2>
        <a 
          href="#" 
          className="text-blue-600 hover:text-blue-800 cursor-pointer font-semibold text-sm sm:text-base flex items-center mt-2 sm:mt-0 transition-colors duration-200"
        >
          Ver todas
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
          </svg>
        </a>
      </div>

      {/* Carrusel mejorado */}
      <div className="relative">
        <Slider {...settings}>
          {recentsNovel.slice(0, 12).map((novel) => (
            <NovelCard key={novel.id} novel={novel} />
          ))}
        </Slider>
      </div>
    </section>
  );
};

export default NovelCarousel;