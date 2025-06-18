import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import MaskedView from '@react-native-masked-view/masked-view';
import React from 'react'
import { Link } from 'expo-router'
import { Image } from 'expo-image'
import { images } from '@/constants/images'

const TrendingCard = ({ movie_id, poster_url, title, index}: TrendingMovie & {index: number}) => {
  return (
    <Link
      href={`/movie/${movie_id}`}
      asChild
    >
      <TouchableOpacity className='w-[30%] mb-5'>
        <Image
          source={{
            uri: poster_url
          }}
          style={[styles.image, {resizeMode: 'contain'}]}
        />
        <View className='absolute bottom-6 -left-3.5 w-14 h-14'>
          <MaskedView
            style={{ flex: 1 }}
            maskElement={
              <View className='flex-1 justify-center items-center'>
                <Text className='font-bold text-white text-5xl'>
                  {index + 1}
                </Text>
              </View>
            }
          >
            <Image
              source={images.rankingGradient}
              style={{ width: '100%', height: '100%' }}
              contentFit="contain"
            />
          </MaskedView>
        </View>
        <Text className='text-light-200 text-sm font-bold mt-6 text-center' numberOfLines={2}>{title}</Text>
      </TouchableOpacity>
    </Link>
  )
}

export default TrendingCard

const styles = StyleSheet.create({
  image: {
    width: '100%',
    aspectRatio: 2/3,
    borderRadius: 12
  },

})