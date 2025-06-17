import { StyleSheet, Image, View, TextInput } from 'react-native'
import React from 'react'
import { icons } from '@/constants/icons'
import { useRouter } from 'expo-router';

const Searchbar = () => {
   const router = useRouter();
   return (
      <View className='flex-row items-center bg-dark-200 rounded-full px-5 py-4'>
         <Image 
            source={icons.search}
            resizeMode='contain'
            tintColor='#AB8BFF'
            width={15}
            height={15}
         />
         <TextInput 
            onPress={() => router.push('/search')}
            placeholder='Search'
            placeholderTextColor='A8B5DB'
            className='flex-1 ml-2 mb-1 text-white'
         />
      </View>
   )
}

export default Searchbar

const styles = StyleSheet.create({})