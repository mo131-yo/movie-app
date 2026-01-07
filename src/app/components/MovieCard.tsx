// "use client";

// import { motion } from "motion/react";
// import Image from "next/image";
// import { Movie } from "./Popular";

// export const MovieCard = ({ movie }: { movie: Movie }) => {
//   return (
//     <div className="w-55 overflow-hidden rounded-xl">
//       <motion.div
//         whileHover={{ scale: 1.05 }}
//         className="bg-gray-200 rounded-xl"
//         transition={{ duration: 0.25 }}>
//         <Image
//           src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
//           alt={movie.title}
//           width={220}
//           height={330}
//           className="rounded-t-xl object-cover"/>

//         <div className="p-3">
//           <div className="text-sm font-semibold line-clamp-1">
//             {movie.title}
//           </div>
//           <div className="flex items-center gap-1 text-sm mt-1">
//             <Image
//               src="/star.png"
//               alt="star"
//               width={12}
//               height={12}
//             />
//             <span>{movie.vote_average.toFixed(1)}</span>
//           </div>
//         </div>
//       </motion.div>   
  
//     </div>
//   );
// };

// "use client";

// import Image from "next/image";
// import { useState } from "react";
// import { IoClose } from "react-icons/io5";

// type Movie = {
//   id: number;
//   title: string;
//   poster_path: string | null;
// };

// type MovieCardProps = {
//   movie: Movie;
// };

// export const MovieCard: React.FC<MovieCardProps> = ({ movie }) => {
//   const [trailerUrl, setTrailerUrl] = useState<string | null>(null);
//   const [loadingTrailer, setLoadingTrailer] = useState(false);
//   const [error, setError] = useState<string | null>(null);

//   const handleTrailerClick = async () => {
//     try {
//       setLoadingTrailer(true);
//       setError(null);

//       const res = await fetch(
//         `https://api.themoviedb.org/3/movie/${movie.id}/videos`,
//         {
//           headers: {
//             Authorization: `Bearer ${process.env.NEXT_PUBLIC_TMDB_API_KEY}`,
//             "Content-Type": "application/json",
//           },
//         }
//       );

//       if (!res.ok) throw new Error("Failed to fetch trailer");

//       const data = await res.json();
//       const trailer = data.results.find(
//         (v: any) => v.type === "Trailer" && v.site === "YouTube"
//       );

//       if (trailer) {
//         setTrailerUrl(`https://www.youtube.com/embed/${trailer.key}`);
//       } else {
//         setError("Trailer not found");
//         setTrailerUrl(null);
//       }
//     } catch (err) {
//       setError("Error loading trailer");
//       setTrailerUrl(null);
//       console.error(err);
//     } finally {
//       setLoadingTrailer(false);
//     }
//   };

//   const closeTrailer = () => setTrailerUrl(null);

//   return (
//     <div className="relative w-60 rounded overflow-hidden shadow-lg bg-gray-100 dark:bg-gray-800 transition-colors">
//       <Image src={movie.poster_path
//             ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
//             : "/no-image.png"
//         }
//         alt={movie.title}
//         width={240}
//         height={360}
//         className="rounded-t-md"
//       />

//       {/* Movie Title */}
//       <div className="p-2 text-center font-semibold text-gray-800 dark:text-gray-200">
//         {movie.title}
//       </div>

//       {/* Trailer Button */}
//       <button
//         onClick={handleTrailerClick}
//         className="w-full bg-gray-500 hover:bg-black text-white px-2 py-2 text-sm rounded-b-md transition-colors"
//       >
//         {loadingTrailer ? "Loading..." : "Watch Trailer"}
//       </button>

//       {/* Trailer Modal Overlay */}
//       {trailerUrl && (
//         <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-80 p-4">
//           {/* Close Button */}
//           <button
//             onClick={closeTrailer}
//             className="absolute top-4 right-4 text-white text-2xl p-2 hover:text-red-400"
//           >
//             <IoClose />
//           </button>

//           {/* Embedded Trailer */}
//           <iframe
//             width="800"
//             height="450"
//             src={trailerUrl}
//             title={movie.title}
//             allowFullScreen
//             className="rounded shadow-lg"
//           ></iframe>
//         </div>
//       )}

//       {/* Error Message */}
//       {error && (
//         <p className="text-sm text-red-500 mt-1 text-center">{error}</p>
//         </div>
// }
// )
// };





"use client";

import { motion } from "framer-motion"; // motion for hover effect
import Image from "next/image";
import { useState } from "react";
import { IoClose } from "react-icons/io5";

type Movie = {
  id: number;
  title: string;
  poster_path: string | null;
  vote_average: number;
};

type MovieCardProps = {
  movie: Movie;
};

export const MovieCard: React.FC<MovieCardProps> = ({ movie }) => {
  const [trailerUrl, setTrailerUrl] = useState<string | null>(null);
  const [loadingTrailer, setLoadingTrailer] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleTrailerClick = async () => {
    try {
      setLoadingTrailer(true);
      setError(null);

      const res = await fetch(
        `https://api.themoviedb.org/3/movie/${movie.id}/videos`,
        {
          headers: {
            Authorization: `Bearer ${process.env.NEXT_PUBLIC_TMDB_API_KEY}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (!res.ok) throw new Error("Failed to fetch trailer");

      const data = await res.json();
      const trailer = data.results.find(
        (v: any) => v.type === "Trailer" && v.site === "YouTube"
      );

      if (trailer) {
        setTrailerUrl(`https://www.youtube.com/embed/${trailer.key}`);
      } else {
        setError("Trailer not found");
        setTrailerUrl(null);
      }
    } catch (err) {
      setError("Error loading trailer");
      setTrailerUrl(null);
      console.error(err);
    } finally {
      setLoadingTrailer(false);
    }
  };

  const closeTrailer = () => setTrailerUrl(null);

  return (
    <>
      {/* Motion Card */}
      <motion.div
        whileHover={{ scale: 1.05 }}
        className="relative w-60 rounded-xl overflow-hidden shadow-lg bg-gray-100 dark:bg-gray-800 transition-colors"
        transition={{ duration: 0.25 }}
      >
        {/* Movie Poster */}
        <Image
          src={
            movie.poster_path
              ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
              : "/no-image.png"
          }
          alt={movie.title}
          width={240}
          height={360}
          className="rounded-t-xl object-cover"
        />

        <div className="p-3">
          <div className="text-sm font-semibold line-clamp-1 text-gray-800 dark:text-gray-200">
            {movie.title}
          </div>
          <div className="flex items-center gap-1 text-sm mt-1 text-gray-600 dark:text-gray-300">
            <Image src="/star.png" alt="star" width={12} height={12} />
            <span>{movie.vote_average.toFixed(1)}</span>
          </div>
        </div>

        {/* Trailer Button */}
        <button
          onClick={handleTrailerClick}
          className="w-full bg-gray-500 hover:bg-red-600 text-white px-2 py-2 text-sm rounded-b-md transition-colors"
        >
          {loadingTrailer ? "Loading..." : "Watch Trailer"}
        </button>

        {/* Error */}
        {error && (
          <p className="text-sm text-red-500 mt-1 text-center">{error}</p>
        )}
      </motion.div>

      {/* Trailer Modal Overlay */}
      {trailerUrl && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-80 p-4">
          {/* Close Button */}
          <button
            onClick={closeTrailer}
            className="absolute top-4 right-4 text-white text-2xl p-2 hover:text-red-400"
          >
            <IoClose />
          </button>

          {/* Embedded Trailer */}
          <iframe
            width="800"
            height="450"
            src={trailerUrl}
            title={movie.title}
            allowFullScreen
            className="rounded shadow-lg"
          ></iframe>
        </div>
      )}
    </>
  );
};
