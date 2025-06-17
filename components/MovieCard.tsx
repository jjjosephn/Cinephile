import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { Link } from 'expo-router'
import { Image } from 'expo-image'
import { icons } from '@/constants/icons'

const MovieCard = ({ id, poster_path, title, vote_average, release_date}: Movie) => {
  return (
    <Link
      href={`/movie/${id}`}
      asChild
    >
      <TouchableOpacity className='w-[30%] mb-5'>
        <Image
          source={{
            uri: poster_path ? 
              `https://image.tmdb.org/t/p/w500${poster_path}` 
              : 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSzMP_KMX-JYjb9tSoCTdzSNlC9BKI9rSBM7Q&s'
          }}
          style={[styles.image, {resizeMode: 'cover'}]}
        />
        <Text className='text-white text-sm font-bold mt-2 text-center' numberOfLines={1}>{title}</Text>
        <View className='flex-row items-center justify-center gap-x-1'>
          <Image 
            source={icons.star}
            style={styles.star}
          />
          <Text className='text-white text-xs font-bold uppercase'>
            {((vote_average) / 2).toFixed(2)}
          </Text>
        </View>
        <Text className='text-white text-xs font-bold uppercase text-center'>({release_date.split('-')[0]})</Text>
      </TouchableOpacity>
    </Link>
  )
}

export default MovieCard

const styles = StyleSheet.create({
  image: {
    width: '100%',
    height: 208,
    borderRadius: 12
  },
  star: {
    width: 16,
    height: 16,
  }
})