import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import useFetch from '@/services/useFetch'
import { getUserInfo } from '@/services/appwrite'
import { useEffect } from 'react'

const Profile = () => {
  const {data: user, loading: loadingInfo, error: errorGettingInfo, fetchData} = useFetch(getUserInfo)

  console.log('User Info:', user)
  useEffect(() => {
    if (!user) {
      fetchData()
    }
  }, [user])

  return (
    <View>
      <Text>Profile</Text>
    </View>
  )
}

export default Profile

const styles = StyleSheet.create({})