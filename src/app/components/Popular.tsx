import React from "react";
import { MovieCard } from "./MovieCard";
import { number } from "framer-motion";

export type Movie = {
  id: number;
  title: string;
  poster_path: string;
  vote_average: number;
  backdrop_path: string;
  overview: string;
};

export const fetchfromMovieDb = async (category: string, page: number = 1) => {
  try {
    const response = await fetch(
      `https://api.themoviedb.org/3/movie/${category}?language=en-US&page=${page}`,
      {
        headers: {
          Authorization: `Bearer ${process.env.NEXT_API_TOKEN}`,
        },
      }
    );

    const data = await response.json();
    return data.results || []; 
  } catch (error) {
    console.error("Fetch error:", error);
    return [];
  }
};

const Popular = async () => {
  const movies: Movie[] = await fetchfromMovieDb("popular", 1);

  return (
    <div className="w-full">
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 pt-10 pr-10 pl-10 gap-8">
       {movies && movies.length > 0 ? (
      movies.slice(0, 10).map((movie) => (
       <MovieCard key={movie.id} movie={movie} />
      ))
      ) : ( 
          <p>Tiim kino olsongui</p>
        )}
      </div>
    </div>
  );
};
export default Popular;