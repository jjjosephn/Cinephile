import { StyleSheet } from 'react-native';
import React from 'react';
import { Tabs } from 'expo-router';
import { images } from '@/constants/images';
import { icons } from '@/constants/icons';
import { Image } from 'expo-image';
import { ImageBackground, Text, View } from 'react-native'; 

type TabIconProps = {
   focused: boolean;
   icon: object;
   title: string;
};

const TabIcon = ({focused, icon, title}: TabIconProps) => {
   if (focused) {
      return ( 
         <ImageBackground
            source={images.highlight}
            className='flex flex-row w-full flex-1 min-w-[112px] min-h-16 mt-4 justify-center items-center rounded-full overflow-hidden'
         >
            <Image
               tintColor='#git a151312'
               source={icon}
               style={{ width: 15, height: 15 }}
            />
            <Text 
               className='text-secondary text-base font-semibold ml-2'
            >
               {title}
            </Text>
         </ImageBackground>
      )
   }
   else {
      return (
         <View className='size-full justify-center items-center mt-4 rounded-full'>
            <Image 
               source={icon}
               tintColor='#A8B5DB'
               style={{ width: 15, height: 15 }}
            />
         </View>
      )
   }
}
const _layout = () => {
   return (
      <Tabs
         screenOptions={{
            tabBarShowLabel: false,
            tabBarItemStyle: {
               width: '100%',
               height: '100%',
               justifyContent: 'center',
               alignItems: 'center'
            },
            tabBarStyle: {
               backgroundColor: '#0F0D23',
               borderRadius: 50,
               marginHorizontal: 20,
               marginBottom: 36,
               height: 52,
               position: 'absolute',
               overflow: 'hidden',
               borderWidth: 1,
               borderColor: '#0F0D23'
            }
         }}
      >
         <Tabs.Screen
            name="index"
            options={{
               title: 'home',
               tabBarIcon: ({ focused }) => (
                  <TabIcon 
                     focused={focused}
                     icon={icons.home}
                     title="Home"
                  />
               ),
            }}
         />
         <Tabs.Screen
            name="saved"
               options={{
               title: 'saved',
               tabBarIcon: ({ focused }) => (
                  <TabIcon 
                     focused={focused}
                     icon={icons.save}
                     title="Saved"
                  />
               )
            }}
         />
         <Tabs.Screen
            name="search"
            options={{
               title: 'search',
               tabBarIcon: ({ focused }) => (
                  <TabIcon 
                     focused={focused}
                     icon={icons.search}
                     title="Search"
                  />
               ),
            }}
         />
         <Tabs.Screen
            name="profile"
            options={{
               title: 'profile',
               tabBarIcon: ({ focused }) => (
                  <TabIcon 
                     focused={focused}
                     icon={icons.person}
                     title="Profile"
                  />
               ),
            }}
         />
      </Tabs>
   );
};

export default _layout;

const styles = StyleSheet.create({
   icon: {
      width: 20,
      height: 20,
   },
});
