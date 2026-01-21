import { MovieCard } from "@/app/components/MovieCard";
import MovieGenrePage from "@/app/components/MovieGenrePage";
import { log } from "console";

type Props = {
  params: Promise<{ id: string }>;
};
type Movie = {
  id: number;
  title: string;
  poster_path: string | null;
  vote_average: number;
  genre_ids: number;
};


export default async function GenreDetailPage({ params }: Props) {
  const { id } = await params;

  const res = await fetch(
    `https://api.themoviedb.org/3/discover/movie?with_genres=${id}&language=en-US`,
    {
      headers: {
        Authorization: `Bearer ${process.env.NEXT_API_TOKEN}`,
      },
    }
  );
  
  const data = await res.json();
  console.log(data);
  const movies = data.results;
  const genreName = data.title;
  const totalMovies = data.total_results;

  return (
    <div className="p-4 sm:p-6 lg:p-10">
      <h1 className="text-3xl sm:text-2xl font-bold mb-6">
        Search filter {genreName}
        <div className="border h-full"></div>
      </h1>
      <div className="flex lg:flex-row sm:flex-col">
        <div className="w-full lg:w-72 xl:w-80">
          <p className="text-2xl font-semibold">Genres</p>
          <p className="text-base font-normal">See lists of movies by genre</p>
          <MovieGenrePage params={Promise.resolve({ id })} />
        </div>
      <div>
         <p className="text-sm text-black font-semibold mb-6 flex justify-center">Total movies: {totalMovies.toLocaleString()}</p> 
         <p></p>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8 w-full">
          {movies.map((movie: any) => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </div>
      </div>
      </div>
    </div>
  );
}
