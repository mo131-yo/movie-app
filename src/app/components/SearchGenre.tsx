
"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";

type Genre = {
  id: number;
  name: string;
};

export default function GenrePage() {
  const [genres, setGenres] = useState<Genre[]>([]);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const getGenres = async () => {
    try {
      setLoading(true);
      const res = await fetch("https://api.themoviedb.org/3/genre/movie/list?language=en", {
        headers: {
          Authorization: `Bearer ${process.env.NEXT_PUBLIC_TMDB_API_KEY}`,
          "Content-Type": "application/json",
        },
      });
      const data = await res.json();
      setGenres(data.genres || []);
    } catch (error) {
      console.error("Genres fetch error:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getGenres();
  }, []);

  return (
    <div className="relative px-6 lg:px-20 py-8">
      <button 
        onClick={() => setOpen(!open)}
        className="bg-black text-white px-4 py-2 rounded-lg mb-4"
      >
        {open ? "Close Genres" : "Show Genres"}
      </button>
      {open && (
        <div className="absolute top-24 left-6 lg:left-20 mt-2 w-[420px] bg-white border rounded-xl shadow-lg p-4 z-50 dark:bg-gray-900">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <div className="flex flex-wrap gap-3">
              {genres.map((genre) => (
                <Link
                  key={genre.id}
                  href={`/genre/${genre.id}`}
                  className="px-4 py-1.5 text-sm border rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition"
                >
                  {genre.name}
                </Link>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}