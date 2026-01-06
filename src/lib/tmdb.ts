export const DB_BASE_URL = "https://api.themoviedb.org/3";

export type MovieVideo = {
  id: string;
  key: string;   // YouTube key
  name: string;
  site: string;  // "YouTube" гэх мэт
  type: string;  // "Trailer", "Teaser" гэх мэт
};

// Тухайн movie-ийн trailer, teaser, video-г авах функц
export const fetchMovieVideos = async (movieId: number): Promise<MovieVideo[]> => {
  try {
    const res = await fetch(`${DB_BASE_URL}/movie/${movieId}/videos?language=en-US`, {
      headers: {
        Authorization: `Bearer ${process.env.NEXT_API_TOKEN}`,
      },
    });

    if (!res.ok) throw new Error("Failed to fetch movie videos");

    const data = await res.json();

    // JSON жишээ: { "id": 12345, "results": [ {...} ] }
    return data.results || []; // results байхгүй бол хоосон array
  } catch (err) {
    console.error("fetchMovieVideos error:", err);
    return []; // алдаа гарвал хоосон array
  }
};
