import Image from "next/image";
import Link from "next/link";
import Same from "@/app/components/Same"
import { Button } from "@/components/ui/button";
import { log } from "console";
import MovieCrew from "@/app/components/MovieCrew";
import { IdCard } from "lucide-react";
import { Key, ReactElement, JSXElementConstructor, ReactNode, ReactPortal } from "react";
import {TrailerModal} from "@/app/components/TrailerModal";
import TrailerSection from "@/app/components/TrailerSection";
import { FaStar } from "react-icons/fa";

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
  runtime: number;
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

const formatTime = (minutes: number) => {
  const h = Math.floor(minutes / 60);
  const m = minutes % 60;
  return `${h}h ${m}m`;
};
export const fetchMovieById = async (id: string) => {
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

  export default async function MoviePage({ params }: Props) {
  const { id } = await params
  const movie = await fetchMovieById(id);

  return (
//     <div className="px-20 py-10 flex flex-col md:px-0">
//       <h1 className="text-3xl font-bold mb-5 sm:px-10">{movie.title}</h1>
//     <div className="flex justify-between md:px-10">
//       <div className="flex w-58 mt-2 font-semibold gap-4">
//         <p>{movie.release_date}</p>
//         <p> PG</p>
//         <p>{formatTime(movie.runtime)}</p>
//      </div>
//       <div className="flex flex-col justify-around">  
//         <p className="text-3 font-500 h-4 text-black">Rating</p>
//          <div className="flex">
//             <FaStar style={{color:"yellow", width:"24px", height:"24px" ,position:"relative" , top:"8px", right:"5px" }}/>
//             <div className="flex flex-col">
//               <p className="font-semibold text-lg">{movie.vote_average.toFixed(1)} <span className="text-gray-400">/10</span></p>
//               <p className="font-semibold text-xs">{movie.vote_count}</p>
//             </div>
//          </div>
//      </div>
//     </div>
//   <div className="flex gap-8 justify-center">
//   <div className="md:px-10">
//       <Image
//       src={
//         movie.poster_path
//           ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
//           : "/no-image.png"
//       }
//       alt={`Poster of ${movie.title ?? "movie"}`}
//       width={300}
//       height={450}
//       className="w-25 h-37 object-cover rounded-xl bg-gray-200 transition-transform duration-500 hover:scale-105"
//     />
//   </div>
//   <div className="relative w-93.75 h-52.75 overflow-hidden rounded-lg ">
//   <Image
//     src={
//       movie.poster_path
//         ? `https://image.tmdb.org/t/p/original${movie.backdrop_path}`
//         : "/no-image.png"
//     }
//     alt={`Poster of ${movie.title ?? "movie"}`}
//     width={600}
//     height={450}
//     className="w-full h-full object-cover sm:w-auto"
//   />
//   <div className="absolute inset-0 flex items-end justify-baseline pl-10 pb-10  hover:bg-black/20 transition-colors">
//     <TrailerSection movieId={movie.id} title={movie.title} />
//     <p className="text-white text-lg font-semibold pb-2 pl-3 hover:text-gray-400 ">Play Trailer</p>
//   </div>
// </div>
// </div>
// {/* GENRES */}
// {movie.genres?.length > 0 && (
//   <div className="flex flex-wrap gap-2 mt-3 pl-10">
//     {movie.genres.map((genre: { id: Key | null | undefined; name: string | number | bigint | boolean | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | Promise<string | number | bigint | boolean | ReactPortal | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | null | undefined> | null | undefined; }) => (
//       <Link
//         key={genre.id} href={`/genre/${genre.id}`} className="px-3 py-1 text-sm border rounded-full hover:bg-gray-100 transition dark:text-white dark:hover:text-black">
//         {genre.name}
//       </Link>
//     ))}
//   </div>
// )}
//       <p className="mt-5 text-gray-700">{movie.overview}</p>
//       <MovieCrew movieId={id}/>
//      <div className="flex justify-between pt-10 pb-8">
//        <h3 className="font-semibold text-xl md:text-2xl text-black lg:px-10 md:px-12 pb-5 dark:text-white">More like this</h3>
//         <Link href={`/category/same/${id}`}>
//            <Button className="bg-amber-200 w-20 h-auto dark:bg-white dark:hover:bg-blue-900">See more</Button>
//          </Link>
//       </div>
//    <Same movieId={id} />
//     </div>

<div className="px-4 sm:px-10 lg:px-20 py-6 sm:py-10 flex flex-col max-w-360 mx-auto">
  
  <div className="flex justify-between items-start mb-4">
    <div className="flex flex-col">
      <h1 className="text-2xl sm:text-3xl font-bold dark:text-white">{movie.title}</h1>
      <div className="flex items-center font-medium gap-2 text-xs sm:text-sm text-gray-500 mt-1">
        <p>{movie.release_date}</p>
        <span>•</span>
        <p>PG</p>
        <span>•</span>
        <p>{formatTime(movie.runtime)}</p>
      </div>
    </div>

    <div className="flex items-center gap-1">
      <FaStar className="text-yellow-400 w-5 h-5" />
      <div className="flex flex-col">
        <p className="font-bold text-sm sm:text-base dark:text-white">
          {movie.vote_average.toFixed(1)}<span className="text-gray-400 font-normal">/10</span>
        </p>
        <p className="text-[10px] text-gray-400">37k</p>
      </div>
    </div>
  </div>

  {/* <div className="relative w-full aspect-video lg:w-full lg:h-125 overflow-hidden rounded-lg shadow-lg mb-6">
     <div className="absolute ">
      <Image
        src={movie.poster_path ? `https://image.tmdb.org/t/p/w500${movie.poster_path}` : "/no-image.png"}
        alt={movie.title}
        width={300}
        height={450}
        className="w-25 h-37 sm:w-60 sm:h-auto object-cover rounded-lg shadow-md "
      />
    </div>
    <Image
      src={movie.backdrop_path ? `https://image.tmdb.org/t/p/original${movie.backdrop_path}` : "/no-image.png"}
      alt={movie.title}
      fill
      className="object-cover"
    />
    <div className="absolute inset-0 bg-black/20 flex items-end p-4 sm:p-10">
      <div className="flex items-center gap-2 cursor-pointer group bg-black/40 px-3 py-1 rounded-full">
        <TrailerSection movieId={movie.id} title={movie.title} />
        <p className="text-white text-sm sm:text-lg font-semibold">Play Trailer <span className="font-normal text-xs opacity-80">2:35</span></p>
      </div>
    </div>
  </div> */}


  
    <div className="flex gap-8 justify-center">
   <div className="">
     <Image
      src={
        movie.poster_path
          ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
          : "/no-image.png"
      }
      alt={`Poster of ${movie.title ?? "movie"}`}
      width={300}
      height={450}
      className="w-25 h-37 object-cover rounded-xl bg-gray-200 transition-transform duration-500 hover:scale-105"
    />
  </div>
  <div className="relative w-93.75 h-52.75 overflow-hidden rounded-lg ">
  <Image
    src={
      movie.poster_path
        ? `https://image.tmdb.org/t/p/original${movie.backdrop_path}`
        : "/no-image.png"
    }
    alt={`Poster of ${movie.title ?? "movie"}`}
    width={600}
    height={450}
    className="w-full h-full object-cover sm:w-auto"
  />
  </div>
  







    <div className="flex flex-col gap-3 flex-1">
      {/* Genres */}
      {movie.genres?.length > 0 && (
        <div className="flex flex-wrap gap-1.5">
          {movie.genres.map((genre: { id: Key | null | undefined; name: string | number | bigint | boolean | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | Promise<string | number | bigint | boolean | ReactPortal | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | null | undefined> | null | undefined; }) => (
            <Link
              key={genre.id} 
              href={`/genre/${genre.id}`} 
              className="px-2 py-0.5 text-[10px] sm:text-sm border border-gray-300 dark:border-gray-700 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 transition dark:text-white"
            >
              {genre.name}
            </Link>
          ))}
        </div>
      )}

      <p className="text-xs sm:text-base text-gray-700 dark:text-gray-300 leading-relaxed">
        {movie.overview}
      </p>
    </div>
  </div>

  <div className="mt-8">
    <MovieCrew movieId={id}/>

    <div className="flex justify-between items-center pt-8 pb-4 border-b dark:border-gray-800">
      <h3 className="font-bold text-lg sm:text-2xl dark:text-white">More like this</h3>
      <Link href={`/category/same/${id}`} className="flex items-center gap-1 text-sm font-medium hover:underline">
        See more <span className="text-lg">→</span>
      </Link>
    </div>

    <div className="mt-6">
      <Same movieId={id} />
    </div>
  </div>
</div>
  );
};

