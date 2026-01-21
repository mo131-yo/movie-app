import Image from "next/image";

type Crew = {
  id: number;
  name: string;
  job: string;
  profile_path: string;
};

type Cast = {
  id: number;
  name: string;
  profile_path: string;
  character: string;
};

type Props = {
  movieId: string;
};

const fetchMovieCharacters = async (id: string) => {
  const res = await fetch(
    `https://api.themoviedb.org/3/movie/${id}/credits`,
    {
      headers: {
        Authorization: `Bearer ${process.env.NEXT_API_TOKEN}`,
      },
    }
  );

  return res.json() as Promise<{
    cast: Cast[];
    crew: Crew[];
  }>;
};

const Avatar = ({ src, name }: { src: string | null; name: string }) => (
  <div className="text-center w-24">
    <p className="text-xs mt-2 text-black">{name}</p>
  </div>
);

const MovieCrew = async ({ movieId }: Props) => {
  const { crew, cast } = await fetchMovieCharacters(movieId);

  const director = crew.find((c) => c.job === "Director");
  const writers = crew.filter(
    (c) => c.job === "Writer" || c.job === "Screenplay"
  );

  return (
    <div className="mt-10 space-y-10">
      {director && (
        <div className="flex items-start gap-6">
          <h3 className="w-28 text-base font-bold text-black">Director</h3>
          <Avatar src={director.profile_path} name={director.name} />
        </div>
      )}

      <hr className="border-gray-700" />

      {/* Writers */}
      {writers.length > 0 && (
        <div className="flex items-start gap-6">
          <h3 className="w-28 font-bold text-black">Writers</h3>
          <div className="flex gap-6 flex-wrap">
            {writers.slice(0, 3).map((writer) => (
                 <Avatar
                key={writer.id}
                src={writer.profile_path}
                name={writer.name}
              />
            ))}
          </div>
        </div>
      )}

      <hr className="border-gray-700" />

      {cast.length > 0 && (
        <div className="flex items-start gap-6">
          <h3 className="w-28 font-bold text-black">Star</h3>
          <div className="flex gap-8 flex-wrap">
            {cast.slice(0, 4).map((writer) => (
                 <Avatar
                key={writer.id}
                src={writer.profile_path}
                name={writer.name}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default MovieCrew;
    