// "use client"
// import Image from "next/navigation";
// import Link from "next/link";
// import {useRouter} from "next/navigation";

// export type Movie={
//   id: number;
//     title: string;
//     poster_path: string;
//     vote_average: number;
//     backdrop_path:string;
//     overview: string;
// }

// type Props= {
//     word : string;
//     results : Movie[];
//     onClose: ()=> void;
// }
// export const ResultsMovie = ({ word , results, onClose}: Props)=>{
//     if(!word) return null;
//     const router = useRouter();
//     return(
//         <div>
//             <div>
//                 {results.slice(0,5).map((movie)=>(
//                     <div key={movie.id} onClick={()=>{(router.push(`/movie/${movie.id}`); onClose();}} className="flex justify-center ">
//                     <div className="flex items-center gap-3">
//                         {movie.poster_path && (
//                         <div>
//                             <Image 
//                             src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
//                                         alt={movie.title}
//                                         width={80}
//                                         height={320}
//                                         className="w-full"
//                                       />
//                         </div>
//                     }
//                     </div>
//                     </div>
//                 ))}
//             </div>
//         </div>
//     )
// }


"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

export type Movie = {
  id: number;
  title: string;
  poster_path: string;
  vote_average: number;
  backdrop_path: string;
  overview: string;
};

type Props = {
  word: string;
  results: Movie[];
  onClose: () => void;
};

export const ResultsMovie = ({ word, results, onClose }: Props) => {
  const router = useRouter();

  if (!word || results.length === 0) return null;

  return (
    <div className="absolute z-50 bg-white rounded-xl shadow-lg mt-2 w-full p-3 space-y-2">
      {results.slice(0, 5).map((movie) => (
        <div
          key={movie.id}
          onClick={() => {
            router.push(`/movie/${movie.id}`)
            onClose();
          }}
          className="flex gap-3 items-center cursor-pointer hover:bg-gray-100 p-2 rounded-lg"
        >
          {movie.poster_path && (
            <Image
              src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
              alt={movie.title}
              width={60}
              height={90}
              className="rounded"
            />
          )}

          <div className="flex flex-col">
            <span className="font-medium">{movie.title}</span>
            {movie.vote_average !== undefined && (
              <span className="text-sm text-gray-500">
                ⭐ {movie.vote_average.toFixed(1)}
              </span>
            )}
          </div>
        </div>
      ))}

      {/* 🔽 SEE ALL RESULTS */}
      <Link
        href={`/results/${encodeURIComponent(word)}`}
        onClick={onClose}
        className="block text-center bg-amber-200 hover:bg-amber-300 py-2 rounded-lg font-medium"
      >
        See all results for "{word}"
      </Link>
    </div>
  );
};
