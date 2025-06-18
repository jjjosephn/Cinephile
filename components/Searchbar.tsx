import { StyleSheet, Image, View, TextInput } from 'react-native'
import React from 'react'
import { icons } from '@/constants/icons'

type SearchbarProps = {
   value: string;
   onChangeText: (text: string) => void;
}
const Searchbar = ({ value, onChangeText }: SearchbarProps) => {
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
            placeholder='Search'
            value={value}
            onChangeText={onChangeText}
            placeholderTextColor='A8B5DB'
            className='flex-1 ml-2 mb-1 text-white'
         />
      </View>
   )
}

export default Searchbar

const styles = StyleSheet.create({})