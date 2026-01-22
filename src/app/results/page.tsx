import React from "react";
import { MovieCard } from "@/app/components/MovieCard";
import MovieGenrePage from "../components/MovieGenrePage";
import { DynamicPagination } from "@/app/components/DynamicPagination"

type Movie = {
  id: number;
  title: string;
  poster_path: string | null;
  vote_average: number;
};

type SearchPageProps = {
  searchParams: Promise<{
    query?: string;
    page?: string;
  }>;
};

const fetchResults = async (query: string, page = 1) => {
  const res = await fetch(
    `https://api.themoviedb.org/3/search/movie?query=${encodeURIComponent(query)}&language=en-US&page=${page}`,
    {
      headers: {
        Authorization: `Bearer ${process.env.NEXT_API_TOKEN}`,
        "Content-Type": "application/json",
      },
      cache: "no-store",
    }
  );

  if (!res.ok) throw new Error("API request failed");
  return res.json();
};

const SearchPage = async ({ searchParams }: SearchPageProps) => {
  const sParams = await searchParams;
  const query = sParams.query;
  const page = Number(sParams.page ?? 1);

  if (!query) {
    return <p className="text-center mt-10">Khaikh kinonii neree bichne uu</p>;
  }

  try {
    const data = await fetchResults(query, page);
    const movies: Movie[] = data.results || [];
    const totalPages = data.total_pages > 500 ? 500 : data.total_pages;

    if (movies.length === 0) {
      return (
        <div className="px-6 lg:px-20 py-8">
           <p className="text-center mt-10">"{query}" tiim kino baikhgui</p>
        </div>
      );
    }

    return (
      <div className="px-6 lg:px-20 py-8">
        <h2 className="text-2xl font-semibold mb-6">
          Search results for “{query}”
        </h2>
        <div className="flex flex-col lg:flex-row gap-10">
          <div className="flex-1">
            <div className="grid grid-cols-4 gap-8">
              {movies.map((movie) => (
                <MovieCard key={movie.id} movie={movie} />
              ))}
            </div>
            <div className="mt-10 flex justify-center">
              <DynamicPagination totalPages={totalPages} />
            </div>
          </div>
          <div className="w-full lg:w-100 ">
             <MovieGenrePage />
          </div>
        </div>  
      </div>
    );
  } catch (error) {
    return <p className="text-center mt-10 text-red-500">Failed.</p>;
  }
};

export default SearchPage;