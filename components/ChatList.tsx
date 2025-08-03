import { useRouter } from 'expo-router';
import React from 'react';
import { FlatList, View } from 'react-native';
import ChatItem from './ChatItem';

export default function ChatList({users, currentUser} : {users: number[], currentUser : any}) {
    const router = useRouter();
    // console.log("USERS:", users)

  return (
    <View className='flex-1'>
        <FlatList
        data={users}
        contentContainerStyle={{flex: 1, paddingVertical: 35}}
        keyExtractor={(item, index) => index.toString()}
        showsVerticalScrollIndicator={false}
        renderItem={({item, index}) => <ChatItem noBorder={index+1 != users.length}
        router = {router}
        currentUser={currentUser}
        item={item}/>}/>

    </View>
  )
}