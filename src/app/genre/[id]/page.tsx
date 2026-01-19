import Image from "next/image";
import Link from "next/link";
import Same from "@/app/components/Same"
import { Button } from "@/components/ui/button";
import { log } from "console";
import Comment from "@/app/components/Comment";
import MovieCrew from "@/app/components/MovieCrew";
import { IdCard } from "lucide-react";
import { Key, ReactElement, JSXElementConstructor, ReactNode, ReactPortal } from "react";

export type Movie={
  id: number;
    title: string;
    poster_path: string;
    vote_average: number;
    backdrop_path:string;
    overview: string;
    release_date: number;
    genres: Genre[];
    vote_count: number;
  popularity: number;
}
type Params ={
  params: Promise<{
    id: string;
  }>;
}

type Props = {
  params: {
    id: string;
  };
};
type Genre = {
  id: number;
  name: string;
};

export const fetchMovieGenre = async (id: string) => {
  const res = await fetch(
    `https://api.themoviedb.org/3/movie/${id}`,
    {
       method: "GET",
      headers: {
         "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.NEXT_API_TOKEN}`,
      },
    }
  );
  return res.json();
};
export default async function MovieGenre({ params }: Props) {
  const { id } = await params;
  const movie: Movie = await fetchMovieGenre(id);

  // Хэрэв кино олдоогүй бол алдаа харуулах
  if (!movie || !movie.genres) {
    return <p>Loading or Movie not found...</p>;
  }

  return (
    <div className="p-6">
      {/* Киноны зураг харуулах хэсэг */}
      <div className="relative w-full h-[400px] mb-6">
        <Image 
          src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`}
          alt={movie.title}
          fill
          className="object-cover rounded-xl"
        />
      </div>

      <h1 className="text-3xl font-bold mb-4">{movie.title}</h1>

      {/* Жанрууд харуулах хэсэг */}
      <div className="flex flex-wrap gap-3">
        {movie.genres.map((genre) => (
          <Link
            key={genre.id}
            href={`/genre/${genre.id}`}
            className="px-4 py-1.5 text-sm border rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition"
          >
            {genre.name}
          </Link>
        ))}
      </div>
    </div>
  );
}