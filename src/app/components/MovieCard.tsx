"use client";

import { motion } from "motion/react";
import Image from "next/image";
import { Movie } from "./Popular";

export const MovieCard = ({ movie }: { movie: Movie }) => {
  return (
    <div className="w-55 overflow-hidden rounded-xl">
      {/* <motion.div
        whileHover={{ scale: 1.05 }}
        className="bg-gray-200 rounded-xl"
        transition={{ duration: 0.25 }}> */}
            <motion.path
  animate={{ pathLength: 1 }}
  transition={{ duration: 2, type: "tween" }}
/>
        <Image
          src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
          alt={movie.title}
          width={220}
          height={330}
          className="rounded-t-xl object-cover"/>

        <div className="p-3">
          <div className="text-sm font-semibold line-clamp-1">
            {movie.title}
          </div>
          <div className="flex items-center gap-1 text-sm mt-1">
            <Image
              src="/star.png"
              alt="star"
              width={12}
              height={12}
            />
            <span>{movie.vote_average.toFixed(1)}</span>
          </div>
        </div>
      </motion.div>   
  
    </div>
  );
};

