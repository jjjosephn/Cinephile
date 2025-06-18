import { Client, Databases, Query, ID } from 'react-native-appwrite';

const DATABASE_ID = process.env.EXPO_PUBLIC_APPWRITE_DATABASE_ID!;
const COLLECTION_ID = process.env.EXPO_PUBLIC_APPWRITE_COLLECTION_ID!;
const ENDPOINT = process.env.EXPO_PUBLIC_APPWRITE_ENDPOINT!;
const PROJECT_ID = process.env.EXPO_PUBLIC_APPWRITE_PROJECT_ID!;

const client = new Client()
   .setEndpoint(ENDPOINT)
   .setProject(PROJECT_ID);

const database = new Databases(client)

export const updateSearchCount = async (query: string, movie: Movie) => {
   try{
      const result = await database.listDocuments(DATABASE_ID, COLLECTION_ID, [
         Query.equal('searchTerm', query),
      ])

      if (result.documents.length > 0) {
         const existingMovie = result.documents[0]
         console.log('Updating search count for:', existingMovie)

         await database.updateDocument(DATABASE_ID, COLLECTION_ID, existingMovie.$id, {
            count: existingMovie.count + 1,
         })
      } else {
         await database.createDocument(DATABASE_ID, COLLECTION_ID, ID.unique(), {
            searchTerm: query,
            count: 1,
            poster_url: `https://image.tmdb.org/t/p/w500${movie.poster_path}`,
            movie_id: movie.id,
            title: movie.title,
         })
      }
   } catch (error) {
      console.error(error)
   }
}

export const getPopularSearches = async (): Promise<TrendingMovie[] | undefined> => {
   try {
      const result = await database.listDocuments(DATABASE_ID, COLLECTION_ID, [
         Query.orderDesc('count'),
         Query.limit(3)
      ])
      return result.documents as unknown as TrendingMovie[];
   } catch (error) {
      console.error(error);
      return undefined;
   }
}