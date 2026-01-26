"use client";

import { useState } from "react";
import { FaPlay } from "react-icons/fa";
import { TrailerModal } from "./TrailerModal";

export default function TrailerSection({ movieId, title }: { movieId: number | string, title: string }) {
  const [trailerUrl, setTrailerUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleWatchTrailer = async () => {
    try {
      setLoading(true);
      const res = await fetch(`https://api.themoviedb.org/3/movie/${movieId}/videos`, {
        headers: {
          Authorization: `Bearer ${process.env.NEXT_PUBLIC_TMDB_API_KEY}`,
        },
      });
      const data = await res.json();
      const trailer = data.results?.find((v: any) => v.type === "Trailer" && v.site === "YouTube");

      if (trailer) {
        setTrailerUrl(`https://www.youtube.com/embed/${trailer.key}?autoplay=1`);
      } else {
        alert("Уучлаарай, трэйлер олдсонгүй.");
      }
    } catch (error) {
      console.error("Error fetching trailer:", error);
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <>
      <button onClick={handleWatchTrailer} disabled={loading} className="flex items-center bg-white text-black hover:bg-gray-600 hover:text-white px-6 py-3 rounded-4xl transition-all active:scale-95 ">
        <FaPlay />
      </button>
      <TrailerModal url={trailerUrl}  onClose={() => setTrailerUrl(null)}  title={title} />
    </>
  );
}