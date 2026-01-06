export type Genre = {
  id: number;
  name: string;
};

export type Movie = {
  id: number;
  title: string;
  poster_path: string;
  vote_average: number;
  overview: string;
};

// Жишээ: top rated movie fetch хийх функц
export const fetchTopRatedMovies = async (): Promise<Movie[]> => {
  const res = await fetch("https://api.themoviedb.org/3/movie/top_rated", {
    headers: {
      Authorization: `Bearer ${process.env.NEXT_API_TOKEN}`,
    },
  });

  if (!res.ok) throw new Error("Failed to fetch top rated movies");

  const data = await res.json();
  return data.results;
};
