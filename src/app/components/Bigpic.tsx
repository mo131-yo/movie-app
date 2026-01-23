"use client";

import Image from "next/image";
import { useState } from "react";
import { IoClose } from "react-icons/io5";
import TrailerSection from "./TrailerSection";

type Movie = {
  id: number;
  title: string;
  backdrop_path: string | null;
  vote_average: number;
  overview: string;
};

type BigpicProps = {
  movie: Movie;
};

export const Bigpic = ({ movie }: BigpicProps) => {
  const [trailerUrl, setTrailerUrl] = useState<string | null>(null);

  const handleTrailerClick = async () => {
    const res = await fetch(
      `https://api.themoviedb.org/3/movie/${movie.id}/videos`,
      {
        headers: {
          Authorization: `Bearer ${process.env.NEXT_PUBLIC_TMDB_API_KEY}`,
          "Content-Type": "application/json",
        },
      }
    );

    const data = await res.json();
    const trailer = data.results.find(
      (v: any) => v.type === "Trailer" && v.site === "YouTube"
    );

    if (trailer) {
      setTrailerUrl(`https://www.youtube.com/embed/${trailer.key}`);
    }
  };

  return (
    <div className="w-full">
      <div className="relative w-full h-130 sm:h-162.5 md:h-180">
        {/* Trailer */}
        {trailerUrl && (
          <div className="absolute inset-0 bg-black z-50 flex items-center justify-center">
            <button onClick={() => setTrailerUrl(null)} className="absolute top-4 right-4 text-white text-3xl">
              <IoClose />
            </button>

            <iframe
              src={trailerUrl}
              allowFullScreen
              className="w-[90%] max-w-4xl h-65 sm:h-105 rounded-lg"
            />
          </div>
        )}
        {/* Background image */}
        <Image
          src={
            movie.backdrop_path
              ? `https://image.tmdb.org/t/p/original${movie.backdrop_path}`
              : "/no-image.png"
          }
          alt={movie.title}
          fill
          priority
          className="object-cover"
        />
        <div className="absolute inset-0 bg-linear-to-t from-black/90 via-black/40 to-transparent" />

        {/* 🖥 DESKTOP DETAIL (POSTER ДОТОР) */}
        <div className="hidden sm:block absolute bottom-10 left-10 max-w-xl text-white">
          <p className="text-xs uppercase opacity-80 mb-1">Now Playing</p>

          <h1 className="text-3xl md:text-4xl font-extrabold mb-3">{movie.title}</h1>
          <span className="text-yellow-400 font-bold mb-3 block">⭐ {movie.vote_average?.toFixed(1)}</span>
          <p className="text-sm opacity-90 line-clamp-3 mb-4">{movie.overview}</p>

          <div className="flex gap-3">
            <button onClick={handleTrailerClick} className="bg-white text-black px-5 py-2 rounded font-semibold hover:bg-gray-700 hover:text-white">
               Watch Trailer
            </button>
            {/* <AddToListButton movie={movie} /> */}
          </div>
        </div>
      </div>

      {/* 📱 MOBILE DETAIL (POSTER ДООР) */}
      <div className="block sm:hidden px-4 py-6 bg-white text-black dark:bg-gray-700">
        <p className="text-xs uppercase opacity-70 mb-1">Now Playing</p>

        <h1 className="text-2xl font-bold mb-2 dark:text-white">{movie.title}</h1>

        <span className="text-yellow-500 font-bold mb-3 block">
          ⭐ {movie.vote_average?.toFixed(1)}
        </span>

        <p className="text-sm text-gray-700 mb-4 leading-relaxe dark:text-white">
          {movie.overview}
        </p>

        <div className="flex gap-3">
          <button onClick={handleTrailerClick} className="bg-black text-white px-5 py-2 rounded font-semibold dark:hover:bg-white dark:hover:text-black">
             Watch Trailer
          </button>
        </div>
      </div>
    </div>
  );
};