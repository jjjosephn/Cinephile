import { icons } from '@/constants/icons';
import { images } from '@/constants/images';
import { View, Image, ScrollView, ActivityIndicator, FlatList } from 'react-native';
import useFetch from '@/services/useFetch';
import { fetchMovies } from '@/services/api';
import { Text } from 'react-native';
import MovieCard from '@/components/MovieCard';
import { getPopularSearches } from '@/services/appwrite';
import TrendingCard from '@/components/TrendingCard'

export default function Index() {
  const { data: movies, 
    loading: loadingMovies, 
    error: moviesError
  } = useFetch(() => fetchMovies({
    query: '',
  }))

  const { 
    data: popularSearches, 
    loading: loadingPopularSearches, 
    error: popularSearchesError 
  } = useFetch(getPopularSearches)

  return (
    <View className='flex-1 bg-primary'>
      <Image
        source={images.bg}
        className='absolute w-full z-0'
      />
      <ScrollView 
        className='flex-1 px-5'
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          minHeight: '100%',
          paddingBottom: 10
        }}
      >
        <Image
          source={icons.logo}
          className='mt-20 mx-auto mb-5'
          width={12}
          height={10}
        />
        {(loadingMovies || loadingPopularSearches) ? (
          <ActivityIndicator
            size='large'
            color='#0000FF'
            className='mt-10 self-center'
          />
        ) : (moviesError || popularSearchesError) ? (
          <Text>Erorr: {moviesError}</Text>
        ) : (
          <View className='flex-1 mt-5'>
            {(popularSearches ?? []).length > 0 && (
              <View>
                <Text className='text-white text-lg font-bold mb-3'>Popular Movies</Text>
                <FlatList
                  data={popularSearches}
                  renderItem={({ item, index }) => (
                    <TrendingCard 
                      {...item}
                      index={index}
                    />
                  )}
                  keyExtractor={(item) => item.movie_id.toString()}
                  numColumns={3}
                  columnWrapperStyle={{
                    justifyContent: 'flex-start',
                    gap: 20,
                    paddingRight: 5,
                    marginBottom: 10
                  }}
                  className='mt-2 '
                  scrollEnabled={false}
                />
              </View>
            )}
            <Text className='text-white text-lg font-bold mt-5 mb-3'>Latest Movies</Text>
            <FlatList
              data={movies}
              renderItem={({ item }) => (
                <MovieCard 
                  {...item}
                />
              )}
              keyExtractor={(item) => item.id.toString()}
              numColumns={3}
              columnWrapperStyle={{
                justifyContent: 'flex-start',
                gap: 20,
                paddingRight: 5,
                marginBottom: 10
              }}
              className='mt-2 pb-32'
              scrollEnabled={false}
            />
          </View>
        )
        }
      </ScrollView>
    </View>
  );
}
