import React from "react";
import { MovieCard } from "@/app/components/MovieCard";

type Movie = {
  id: number;
  title: string;
  poster_path: string | null;
  vote_average: number;
};

type SearchPageProps = {
  searchParams: {
    query?: string;
    page?: string;
  };
};

const fetchResults = async (query: string, page = 1) => {
  const res = await fetch(
    `https://api.themoviedb.org/3/search/movie?query=${query}&language=en-US&page=${page}`,
    {
      headers: {
        Authorization: `Bearer ${process.env.NEXT_API_TOKEN}`,
        "Content-Type": "application/json",
      },
      cache: "no-store",
    }
  );

  if (!res.ok) throw new Error("Failed to fetch search results");

  return res.json();
};

const SearchPage = async ({ searchParams }: SearchPageProps) => {
  const params = await searchParams;
  const query = params.query;
  const page = Number(params.page ?? 1);

  if (!query) {
    return <p className="text-center mt-10">Хайх үгээ оруулна уу.</p>;
  }

  try {
    const data = await fetchResults(query, page);
    const movies: Movie[] = data.results || [];

    if (movies.length === 0) {
      return <p className="text-center mt-10">"{query}" нэртэй кино олдсонгүй.</p>;
    }

    return (
      <div className="px-6 lg:px-20 py-8">
        <h2 className="text-2xl font-semibold mb-6">
          Search results for “{query}”
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
          {movies.map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </div>
      </div>
    );
  } catch (error) {
    return <p className="text-center mt-10 text-red-500">Алдаа гарлаа. Дахин оролдоно уу.</p>;
  }
};
export default SearchPage;
