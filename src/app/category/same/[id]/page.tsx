
// import React from 'react';
// import { MovieCard } from "@/app/components/MovieCard";
// import {DynamicPagination} from "@/app/components/DynamicPagination";

// export type Movie = {
//   id: number;
//   title: string;
//   poster_path: string;
//   vote_average: number;
//   backdrop_path: string;
//   overview: string;
// };

// export const fetchSearchMovies = async (id: string) => {
//   const res = await fetch(
//     `https://api.themoviedb.org/3/movie/${id}/similar?language=en-US&page=1`,
//     {
//       method: "GET",
//       headers: {
//         "Content-Type": "application/json",
//         Authorization: `Bearer ${process.env.NEXT_API_TOKEN}`,
//       },
//     });
//   const data = await res.json();
//   return data.results;
// };

// const Results = async ({ params }: { params: { id: string } }) => {
//   const resolvedParams = await params;
//   const movies: Movie[] = await fetchSearchMovies(resolvedParams.id);

//   if (!movies || movies.length === 0) {
//     return <div className="p-20 text-center">Tiim kino baikhgui</div>;
//   }
//   return (
//     <div className='pb-20 pt-20'>
//       <h3 className="font-semibold text-2xl text-black pr-20 pl-20 pb-5 dark:text-white">More Like This</h3>
//       <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 pr-20 pt-10 pl-20 gap-8">
//         {movies.map((movie) => (
//           <MovieCard movie={movie} key={movie.id} />
//         ))}
//       </div>
//       <div className='pt-20'>
//         <DynamicPagination totalPages={10}/>
//       </div>
//     </div>
//   );
// };

// export default Results;

import React from 'react';
import { MovieCard } from "@/app/components/MovieCard";
import { DynamicPagination } from "@/app/components/DynamicPagination";

export type Movie = {
  id: number;
  title: string;
  poster_path: string;
  vote_average: number;
  backdrop_path: string;
  overview: string;
};

export const fetchSimilarMovies = async (id: string, page: number) => {
  const res = await fetch(
    `https://api.themoviedb.org/3/movie/${id}/similar?language=en-US&page=${page}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.NEXT_API_TOKEN}`,
      },
      next: { revalidate: 3600 } 
    }
  );

  if (!res.ok) return { movies: [], totalPages: 0 };
  
  const data = await res.json();
  return {
    movies: (data.results as Movie[]) || [],
    totalPages: data.total_pages > 500 ? 500 : data.total_pages,
  };
};


export const Results = async ({ 
  params, 
  searchParams 
}: { 
  params: Promise<{ id: string }>,
  searchParams: Promise<{ page?: string }> 
}) => {
  const { id } = await params;
  const sParams = await searchParams;
  const currentPage = Number(sParams.page) || 1;

  const { movies, totalPages } = await fetchSimilarMovies(id, currentPage);

  if (movies.length === 0) {
    return <div className="p-20 text-center">Tiim kino baikhgui</div>
  }

  return (
    <div className='pb-20 pt-20'>
      <h3 className="font-semibold text-2xl text-black px-20 pb-5 dark:text-white">
        More Like This
      </h3>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 pt-10 pr-10 pl-10 gap-8">
        {movies.map((movie) => (
          <MovieCard movie={movie} key={movie.id} />
        ))}
      </div>
      <div className='pt-20'>
        <DynamicPagination totalPages={totalPages} />
      </div>
    </div>
  );
};

export default Results;