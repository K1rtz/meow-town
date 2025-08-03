import React from 'react';
import { Text, View } from 'react-native';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';


export default function MessageItem({message, currentUser} : {message: any, currentUser: any}) {
  // console.log(message)
  // console.log('MESSAGE USER:', message.userId);
  // console.log('CURRENT USER:', currentUser);

  return (
    
    message.userId == currentUser.userId ? 
    (
  <View className='flex-row justify-end mb-3 mr-3'>
    <View style={{ width: wp(80) }}>
      <View
        className='self-end p-3 rounded-2xl'
        style={{
          backgroundColor: '#8b1212', // tamno crvena
          borderTopRightRadius: 0,
          shadowColor: '#000',
          shadowOpacity: 0.3,
          shadowOffset: { width: 0, height: 2 },
          shadowRadius: 4,
          elevation: 3,
        }}
      >
        <Text style={{ color: '#fff', fontSize: 15, lineHeight: 20 }}>
          {message.text}
        </Text>
      </View>
    </View>
  </View>
    ):
    (
  <View className='flex-row justify-start mb-3 m-3'>
    <View style={{ width: wp(80) }}>
      <View
        className='self-start p-3 rounded-2xl'
        style={{
          backgroundColor: '#8b1212', // tamno crvena
          borderTopLeftRadius: 0,
          shadowColor: '#000',
          shadowOpacity: 0.3,
          shadowOffset: { width: 0, height: 2 },
          shadowRadius: 4,
          elevation: 3,
        }}
      >
        <Text style={{ color: '#fff', fontSize: 15, lineHeight: 20 }}>
          {message.text}
        </Text>
      </View>
    </View>
  </View>
    )
  )
}