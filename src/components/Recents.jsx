import React from "react";

export default function Recents({ novel }) {
  return (
    <>
      <div
        className="
            bg-blue-950 text-white 
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
          alt="imagen"
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
    </>
  );
}
