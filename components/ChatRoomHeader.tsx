import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';

import { Entypo } from '@expo/vector-icons';
import { Image } from 'expo-image';
import { Stack } from 'expo-router';

export default function ChatRoomHeader({user, router} : {user : any, router: any}) {
    // console.log(user)
  return (
    <Stack.Screen
        options={{
            title: '',
            headerShadowVisible: false,
            headerLeft: () : any =>(
                    <View className="flex-row items-center gap-2">
                    <TouchableOpacity onPress={() => router.back()}>
                        <Entypo name="chevron-left" size={hp(4)} color="#000"/> 
                    </TouchableOpacity>
                    <View className='flex-row items-center gap-3'>
                        <Image 
                            source={`${user?.profileURL}`}
                            style={{height: hp(4.7), aspectRatio: 1, borderRadius: 100, borderWidth:2, borderColor:'#000'}}
                            />
                        <Text style={{fontSize: hp(2.5), fontFamily: 'October Crow'}} className='color-[#000] font-medium'>{user?.username}</Text>
                    </View>
                </View>
            )

        }}
        />
  )
}