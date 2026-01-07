import Image from "next/image";
export type Movie={
  id: number;
    title: string;
    poster_path: string;
    vote_average: number;
    backdrop_path:string;
    overview: string;
}

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

 const MovieId = async ({ params }: { params: { id: string } }) => {
  const movie = await fetchMovieById(params.id);

  const imagePath = "https://api.themoviedb.org/t/p/original"
  return (
    <div className="px-20 py-10">
      <h1 className="text-3xl font-bold mb-5">{movie.title}</h1>

 <Image
  src={
    movie.poster_path
      ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
      : "/no-image.png"
  }
  alt={`Poster of ${movie.title ?? "movie"}`}
  width={300}
  height={450}
/>

      <p className="mt-5 text-gray-700">{movie.overview}</p>
      <p className="mt-2 font-semibold">⭐ {movie.vote_average}</p>
    </div>
  );
};

export default MovieId;
