import HomeHeader from '@/components/HomeHeader'
import { Stack } from 'expo-router'
import React from 'react'

export default function _layout() {
  return (
    <Stack>
      <Stack.Screen
        name="home"
        options = {{
          header: ()=> <HomeHeader />
      }}/>
            
      <Stack.Screen
        name="profilePage"
        options={{
          title: 'Profile',
          headerStyle: {
            backgroundColor: '#720e0e',
          },
          headerTintColor: '#000', // boja teksta i strelice
          headerTitleStyle: {
            fontSize: 22,
            fontWeight: 500,
            fontFamily: 'October Crow'
          },
        }}/>

        <Stack.Screen
        name="chatRoom"
        options={{
          headerStyle: {
            backgroundColor: '#920e0e',

          },
          headerShadowVisible: false
        }}/>

    </Stack>
  )
}