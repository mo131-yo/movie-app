import React from 'react'
import Image from "next/image";

export type Movie={
  id: number;
    title: string;
    poster_path: string;
    vote_average: number;
    backdrop_path:string;
    overview: string;
}

export const fetchfromTopRatedMovieDB = async (category: string)=>{
      const response = await fetch(`https://api.themoviedb.org/3/movie/${category}`,
    {
      method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.NEXT_API_TOKEN}`
    },
});
const data = await response.json();
return data.results;
};

 const Toprated = async()=>{
   const topratingMovies: Movie[]= await fetchfromTopRatedMovieDB("top_rated");  
  return (
    <div>
        <Image key={topratingMovies[0].id} src={`https://image.tmdb.org/t/p/w300${topratingMovies[0].poster_path}`} alt={topratingMovies[0].title} width={150} height={225} className="rounded"/>
    </div>
  )
}
export default Toprated;
