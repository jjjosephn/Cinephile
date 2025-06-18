import { icons } from '@/constants/icons';
import { images } from '@/constants/images';
import { View, Image, Text, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { useEffect } from 'react';
import { checkSession } from '@/services/appwrite';

export default function Index() {
  const router = useRouter();

  const handleSignIn = () => router.replace('/auth/signin');
  const handleSignUp = () => router.replace('/auth/signup');

  useEffect(() => {
    const verifySession = async () => {
      const user = await checkSession();
      if (user) {
        router.replace('/(tabs)');
      }
    }
    verifySession();
  }, [])


  return (
    <View className='flex-1 bg-primary'>
      <Image
        source={images.bg}
        className='absolute w-full h-full z-0'
        resizeMode="cover"
      />
      
      <View className='absolute inset-0 bg-black/40 z-10' />
      
      <View className='flex-1 justify-center items-center px-8 z-20'>
        
        <View className='items-center mb-16'>
          <Image
            source={icons.logo}
            className='mb-4'
            width={120}
            height={100}
            resizeMode="contain"
          />
          <Text className='text-white text-3xl font-bold tracking-wide'>
            CINEPHILE
          </Text>
          <Text className='text-white/80 text-base mt-2 text-center'>
            Discover your next favorite movie
          </Text>
        </View>

        <View className='w-full space-y-4'>
          <TouchableOpacity
            onPress={handleSignUp}
            className='bg-white rounded-full py-4 px-8 shadow-lg'
            activeOpacity={0.8}
          >
            <Text className='text-primary text-center text-lg font-semibold'>
              Get Started
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={handleSignIn}
            className='border-2 border-white rounded-full mt-5 py-4 px-8'
            activeOpacity={0.8}
          >
            <Text className='text-white text-center text-lg font-semibold'>
              Sign In
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}