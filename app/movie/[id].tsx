import { ActivityIndicator, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { Image } from 'expo-image'
import { useLocalSearchParams, useRouter } from 'expo-router'
import useFetch from '@/services/useFetch'
import { fetchMovieDetails } from '@/services/api'
import { useEffect } from 'react'
import { icons } from '@/constants/icons'


const convertMinsToHours = (mins: number) => {
  const hours = Math.floor(mins / 60);
  const minutes = mins % 60;
  return `${hours}h ${minutes}m`;
}

const MovieInfo = ({ label, value }: { label: string, value: string | string[] }) => (
  <View className='flex-col items-start justify-center mt-5'>
    <Text className='text-light-200 font-normal text-sm'>{label}</Text>

    {label === 'Genres' && Array.isArray(value) ? (
      <View className='flex-row flex-wrap gap-2 mt-2'>
        {value.length > 0 ? (
          value.map((genre, index) => (
            <View
              key={index}
              className='bg-dark-100 px-2 py-2 rounded-md gap-x-1 mt-2'
            >
              <Text className='text-white text-xs font-semibold'>{genre}</Text>
            </View>
          ))
        ) : (
          <Text className='text-white text-sm mt-2'>N/A</Text>
        )}
      </View>
    ) : (
      <Text className='text-white font-semibold text-sm mt-2'>
        {value || 'N/A'}
      </Text>
    )}
  </View>
)


const MovieDetails = () => {
  const { id } = useLocalSearchParams()
  const movieId = Number(id)
  const {
    data: movie, 
    error: movieDetailsError, 
    loading: loadingMovieDetails,
    fetchData
  } = useFetch(() => fetchMovieDetails({ movie_id: movieId }), false)
  const router = useRouter()

  useEffect(() => {
    if (!isNaN(movieId)) {
      fetchData()
    }
  }, [movieId])

  if (loadingMovieDetails) {
    return (
      <View className='flex-1 bg-primary items-center justify-center'>
        <ActivityIndicator
          size='large'
          color='#0000FF'
          className='mt-10 self-center'
        />
      </View>
    )
  }

  if (movieDetailsError || !movie) {
    return (
      <View className="bg-primary flex-1 justify-center items-center">
        <Text className="text-white text-lg">Failed to load movie details.</Text>
      </View>
    )
  }
  return (
    <View className='bg-primary flex-1'>
      <ScrollView
        contentContainerStyle={{
          paddingBottom: 80
        }}
      >
        <Image
          source={{
            uri: movie.poster_path ? 
              `https://image.tmdb.org/t/p/w500${movie.poster_path}` 
              : 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSzMP_KMX-JYjb9tSoCTdzSNlC9BKI9rSBM7Q&s'
          }}
          style={[styles.image, {resizeMode: 'stretch'}]}
        />
        <View className='flex-col items-start justify-center mt-5 px-5'>
          <Text className='text-white font-bold text-xl'>{movie.title} ({movie.release_date.split('-')[0]})</Text>
          <Text className='text-light-200 font-bold text-sm'>{movie.tagline}</Text>
          <View className='flex-row items-center space-x-2 mt-2'>
            <View className='flex-row items-center bg-dark-100 px-2 py-1 rounded-md gap-x-1'>
              <Image 
                source={icons.star}
                style={styles.star}
              />
              <Text className='text-white font-bold text-sm'>
                {(movie.vote_average).toFixed(2)} 
                <Text className='text-light-200 font-semibold text-sm'>
                  /10 ({(movie.vote_count / 1000).toFixed(1)}k)
                </Text>
              </Text>
            </View>
            <Text className='mx-3 text-light-200 font-semibold text-sm'>•</Text>
            <View className='flex-row items-center bg-dark-100 px-2 py-1 rounded-md gap-x-1'>
              <Text className='text-white text-sm'>{convertMinsToHours(movie.runtime)}</Text>
            </View>
          </View>
          <MovieInfo
            label='Overview'
            value={movie.overview}
          />
          <MovieInfo
            label='Genres'
            value={movie.genres.map((genre: { name: string }) => genre.name)}
          />
          <View className='flex flex-row justify-between w-1/2 space-x-4'>
            <MovieInfo
              label='Budget'
              value={`$${(movie.budget)/1000000} million`}
            />
            <View className='mr-10'/>
            <MovieInfo
              label='Revenue'
              value={`$${((movie.revenue)/1000000).toFixed(2)} million`}
            />
          </View>
          <MovieInfo
            label="Production Companies"
            value={movie.production_companies.map((company: {name: string}) => company.name).join(' • ')}
          />
        </View>
      </ScrollView>
      <TouchableOpacity
        className='absolute bottom-5 left-0 right-0 mx-5 bg-accent rounded-lg py-3.5 flex flex-row items-center justify-center z-50'
        onPress={router.back}
      >
        <Image
          source={icons.arrow}
          style={styles.arrow}
        />
        <Text className='text-white font-bold text-lg'>Go Back</Text>
      </TouchableOpacity>
    </View>
  )
}

export default MovieDetails

const styles = StyleSheet.create({
  image: {
    width: '100%',
    height: 550,
    borderRadius: 12
  },
  star: {
    width: 16,
    height: 16,
  },
  arrow: {
    width: 20,
    height: 20,
    marginRight: 1,
    marginBottom: 0.5,
    marginTop: 0.5,
    transform: [{ rotate: '180deg' }],   
    tintColor: '#fff',
  }
})