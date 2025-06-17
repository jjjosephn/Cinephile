import { icons } from '@/constants/icons';
import { images } from '@/constants/images';
import { View, Image, ScrollView, ActivityIndicator, FlatList } from 'react-native';
import Searchbar from '@/components/Searchbar'
import useFetch from '@/services/useFetch';
import { fetchMovies } from '@/services/api';
import { Text } from 'react-native';
import MovieCard from '@/components/MovieCard';
import { useEffect, useState } from 'react';

export default function Search() {
  const [searchQuery, setSearchQuery] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const { data: movies, loading: loadingMovies, error: moviesError, fetchData, reset } = useFetch(() => fetchMovies({
    query: searchQuery,
  }), false)

  useEffect(() => {
    if (searchQuery === ''){
      setIsTyping(false)
      reset()
      return
    }

    setIsTyping(true);

    const timer = setTimeout(() => {
      const func = async () => {
        if (searchQuery.trim().length > 1) {
          await fetchData()
        } else {
          reset();
        }
        setIsTyping(false);
      }
      func()
    }, 750)
    return () => clearTimeout(timer);
  }, [searchQuery]);

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
        <Searchbar 
          value={searchQuery}
          onChangeText={(text: string) => setSearchQuery(text)}
        />
        <FlatList
          data={movies }
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
          ListHeaderComponent={
            <View>
              {(isTyping || loadingMovies)  && (
                <ActivityIndicator
                  size='large'
                  color='#0000FF'
                  className='mt-10 self-center'
                />
              )}

              {moviesError && (
                <Text className='text-red-500 text-center mt-10'>
                  Error: {moviesError}
                </Text>
              )}

              {!loadingMovies && !moviesError && searchQuery.trim().length > 0 && Array.isArray(movies) && movies.length > 1 && (
                <Text className='text-white text-lg mt-5 mb-3'>
                  Results for <Text className='text-accent'>{searchQuery}</Text>
                </Text>
              )}
            </View>
          }
          ListEmptyComponent={
            <View>
              {searchQuery == '' ? (
                <Text className='text-white text-center mt-10'>
                  Start typing to search for movies...
                </Text>
              ) : !loadingMovies && !moviesError && !isTyping && Array.isArray(movies) && movies.length < 1 &&(
                <Text className='text-white text-center mt-10'>
                  No results found for <Text className='text-accent'>{searchQuery}</Text>
                </Text>
              )}
            </View>
          }
        />
      </ScrollView>
    </View>
  );
}
