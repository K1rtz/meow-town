import { useRouter } from 'expo-router';
import React from 'react';
import { FlatList, View } from 'react-native';
import ChatItem from './ChatItem';
interface User {
  profileURL: string;
  userId: string;
  username: string; 
}
export default function ChatList({users, currentUser} : {users: User[], currentUser : any}) {
    const router = useRouter();

  return (
    <View className='flex-1'>
        <FlatList
        data={users}
        contentContainerStyle={{flex: 1, paddingVertical: 25}}
        // keyExtractor={(item, index) => index.toString()}
        keyExtractor={(item)=> item.userId.toString()}
        showsVerticalScrollIndicator={false}
        renderItem={({item, index}) => <ChatItem noBorder={index+1 != users.length}
        router = {router}
        currentUser={currentUser}
        item={item}/>}/>

    </View>
  )
}