// import React from 'react'
// import { MovieCard } from './MovieCard';

// export type Movie={
//   id: number;
//     title: string;
//     poster_path: string;
//     vote_average: number;
//     backdrop_path:string;
//     overview: string;
// }

// export const Category = async (category: string)=>{
//       const response = await fetch(`https://api.themoviedb.org/3/movie/genre/movie/list?language=en`,
//     {
//       method: "GET",
//     headers: {
//       "Content-Type": "application/json",
//       Authorization: `Bearer ${process.env.NEXT_API_TOKEN}`
//     },
// });
// const data = await response.json();
// return data.results;
// };

//  const Upcoming = async()=>{
//    const categoryMovies: Movie[] = await Category("Category");
   
//   return (
//     <div>
//       <div className="grid grid-cols-5 pr-20 pl-20 h-244.5 w-full">
//         {categoryMovies.slice(0,10).map((movie)=>(
//           <MovieCard movie={movie} key={movie.id} />
//         ))}
//       </div>
//     </div>
//   )
// }
