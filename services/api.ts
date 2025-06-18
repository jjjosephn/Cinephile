export const TMDB_CONFIG = {
   baseUrl: 'https://api.themoviedb.org/3',
   apiKey: process.env.EXPO_PUBLIC_MOVIE_API_KEY,
   headers: {
      accept: 'application/json',
      Authorization: `Bearer ${process.env.EXPO_PUBLIC_MOVIE_API_KEY}`,
   }
}

export const fetchMovies = async({query} : {query: string}) => {
   const endpoint = query 
      ? `${TMDB_CONFIG.baseUrl}/search/movie?query=${encodeURIComponent(query)}`
      : `${TMDB_CONFIG.baseUrl}/discover/movie?sort_by=popularity.desc`

   const response = await fetch(endpoint, {
      method: 'GET',
      headers: TMDB_CONFIG.headers,
   })
   
   if (!response.ok){
      throw new Error(`Error fetching movies: ${response.statusText}`);
   }
   const data = await response.json();
   
   return data.results
} 

export const fetchMovieDetails = async ({movie_id}: {movie_id: number}) => {
   try {
      const endpoint = `${TMDB_CONFIG.baseUrl}/movie/${movie_id}?language=en-US`

      const response = await fetch(endpoint, {
         method: 'GET',
         headers: TMDB_CONFIG.headers,
      })
      const data = await response.json();

      return data;
   } catch (error) {
      console.error('Error fetching movie details:', error);
      throw error;
   }
}