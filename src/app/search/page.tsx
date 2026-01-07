

// import { Movie } from "@/app/components/SearchResult";

// interface PageProps {
//   params: { id: string };
// }

// export default async function Page({ params }: PageProps) {
//   const id = params.id;

//   const res = await fetch(`https://api.themoviedb.org/3/movie/${id}`, {
//     headers: {
//       Authorization: `Bearer ${process.env.TMDB_API_TOKEN}`,
//     },
//     cache: "no-store",
//   });
//   const movie: Movie = await res.json();

//   return (
//     <div className="p-6">
//       <h1 className="text-3xl font-bold">{movie.title}</h1>
//       <p>{movie.overview}</p>
//       <p>Rating: {movie.vote_average}</p>
//       <p>Release date: {movie.release_date}</p>
//       {movie.backdrop_path && (
//         <img
//           src={`https://image.tmdb.org/t/p/w500${movie.backdrop_path}`}
//           alt={movie.title}
//         />
//       )}
//     </div>
//   );
// }
