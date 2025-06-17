import { icons } from '@/constants/icons';
import { images } from '@/constants/images';
import { View, Image, ScrollView, ActivityIndicator, FlatList } from 'react-native';
import useFetch from '@/services/useFetch';
import { fetchMovies } from '@/services/api';
import { Text } from 'react-native';
import MovieCard from '@/components/MovieCard';

export default function Index() {
  const { data: movies, loading: loadingMovies, error: moviesError } = useFetch(() => fetchMovies({
    query: '',
  }))

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
        {loadingMovies ? (
          <ActivityIndicator
            size='large'
            color='#0000FF'
            className='mt-10 self-center'
          />
        ) : moviesError ? (
          <Text>Erorr: {moviesError}</Text>
        ) : (
          <View className='flex-1 mt-5'>
            <Text className='text-white text-lg mt-5 mb-3'>Latest Movies</Text>
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
