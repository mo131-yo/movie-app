// export const fetcher = async (endpoint: string) => {
//   const response = await fetch(endpoint, {
//     headers: {
//       "Content-Type": "application/json",
//       Authorization: `Bearer ${process.env.TMDB_API_TOKEN}`,
//       // Authorization: `Bearer ${process.env.NEXT_PUBLIC_TMDB_API_TOKEN}`,

//     },
//     // cache: "force-cache",
//     cache: "no-store",

//   });
// if (!response.ok) {
//     throw new Error("Failed to fetch");
//   }

//   return response.json();
// };

// export const fetcher = async (url: string) => {
//   const res = await fetch(url, {
//     headers: {
//       Authorization: `Bearer ${process.env.NEXT_PUBLIC_TMDB_API_KEY}`,
//       "Content-Type": "application/json",
//     },
//   });

//   if (!res.ok) {
//     throw new Error("TMDB fetch error");
//   }

//   return res.json();
// };



export const fetcher = async (url: string) => {
  const res = await fetch(url, {
    headers: {
      Authorization: `Bearer ${process.env.NEXT_PUBLIC_TMDB_API_KEY}`,
      "Content-Type": "application/json",
    },
  });

  if (!res.ok) {
    throw new Error(`TMDB error: ${res.status}`);
  }

  return res.json();
};
