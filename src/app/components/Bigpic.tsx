// "use client"
// import Image from "next/image";
// import { Movie } from "../page";
// import { useState } from "react";
// import { IoClose } from "react-icons/io5";

// type MovieCardProps = {
//   movie: Movie;
// };

// export const Bigpic = ({ movie }: { movie: Movie }) => {
//   const { title, vote_average, overview } = movie;
//     const [trailerUrl, setTrailerUrl] = useState<string | null>(null);
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
//     <div className="w-full h-150 rounded-xl relative">
//       <div className="grid ">
//         <Image
//           src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`}
//           alt={movie.title}
//           fill
//           priority
//         />
//         <div className="absolute inset-0 flex flex-col justify-center px-25 text-white max-w-xl ">
//           <div className="w-101 h-66">
//             <h1 className="text-[16px] font-normal">Now Playing:</h1>
//             <h1 className="text-4xl font-bold "> {title} </h1>
//             <div className="flex">
//               <img src="star.png" alt="star" className="w-6 h-6" />
//               <h1 className="text-[18px] font-semibold">
//                 {" "}
//                 {vote_average?.toFixed(1)}/10{" "}
//               </h1>
//             </div>
//             <h1 className="text-[12px] font-normal"> {overview}</h1>
//              </div>
//           </div>
//        </div>

//             <button
//           onClick={handleTrailerClick}
//           className="w-full bg-gray-500 hover:bg-red-600 text-white px-2 py-2 text-sm rounded-b-md transition-colors"
//         >
//           {loadingTrailer ? "Loading..." : "Watch Trailer"}
//         </button>

//         {/* Error */}
//         {error && (
//           <p className="text-sm text-red-500 mt-1 text-center">{error}</p>
//         )}

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
//       </div>
//   )}
     

"use client";

import Image from "next/image";
import { useState } from "react";
import { IoClose } from "react-icons/io5";

type Movie = {
  id: number;
  title: string;
  backdrop_path: string | null;
  vote_average: number;
  overview: string;
};

type BigpicProps = {
  movie: Movie;
};

export const Bigpic: React.FC<BigpicProps> = ({ movie }) => {
  const { title, vote_average, overview, backdrop_path } = movie;

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
    <div className="relative w-full h-125 md:h-150 rounded-xl overflow-hidden">
      {trailerUrl ? (
        // {Trailer} 
        <div className="w-full h-full flex flex-col items-center justify-center bg-black">
          <button
            onClick={closeTrailer}
            className="absolute top-4 right-4 text-white text-3xl p-2 hover:text-red-400"
          >
            <IoClose />
          </button>

          <iframe
            width="90%"
            height="450"
            src={trailerUrl}
            title={movie.title}
            allowFullScreen
            className="rounded shadow-lg max-w-3xl"
          />
        </div>
      ) : (
      //  { Ner &&Tailbar blabla}
        <>
          <Image
            src={backdrop_path
                ? `https://image.tmdb.org/t/p/original${backdrop_path}`
                : "/no-image.png"
            }
            alt={title}
            fill
            className="object-cover"
            priority
          />


          <div className="absolute bottom-6 left-6 max-w-lg text-white">
            <h1 className="text-sm font-normal mb-1">Now Playing:</h1>
            <h1 className="text-4xl font-bold mb-2">{title}</h1>

            <div className="flex items-center gap-2 mb-2">
              <Image src="/star.png" alt="star" width={20} height={20} />
              <span className="text-lg font-semibold">{vote_average?.toFixed(1)}/10</span>
            </div>

            <p className="text-sm max-h-32 overflow-hidden">{overview}</p>
          

{/* {Button} */}
            <button
              onClick={handleTrailerClick}
              className="mt-4 bg-gray-600 hover:bg-black px-4 py-2 rounded transition-colors font-semibold"
            >
              {loadingTrailer ? "Loading..." : "Watch Trailer"}
            </button>

            {error && <p className="text-sm text-red-500 mt-2">{error}</p>}
          </div>
        </>
      )}
    </div>
  );
};
// absolute inset-0 bg-linear-to-t from-black via-transparent to-transparent