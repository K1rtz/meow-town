import ChatList from '@/components/ChatList';
import { useAuth } from '@/context/authContext';
import { db, usersRef } from '@/firebaseConfig';
import { useFocusEffect } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { collection, getDocs, query, Timestamp, where } from 'firebase/firestore';
import React, { useCallback, useEffect, useState } from 'react';
import { ActivityIndicator, TextInput, View } from 'react-native';
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';
type Room = {
  id: string;
  participants: string[];
  lastMessageDate: Timestamp;
};

interface User {
  profileURL: string;
  userId: string;
  username: string; 
}

export default function Home() {
  const {user}  = useAuth();
  const [users, setUsers] = useState<User[]>([])
  const [rooms, setRooms] = useState<Room[]>([]);


 useEffect(() => {
    if (user?.userId) {
      fetchUsersAndRooms();
    }
  }, []);

  const fetchUsersAndRooms = async () => {
    try {
      const userQuery = query(usersRef, where('userId', '!=', user?.userId));
      const usersSnapshot = await getDocs(userQuery);
      const allUsers: User[] = usersSnapshot.docs.map(doc => ({
        id: doc.id,
        ...(doc.data() as Omit<User, 'id'>)
      }));
      const roomsRef = collection(db, 'rooms');
      const roomQuery = query(roomsRef, where('participants', 'array-contains', user?.userId));
      const roomsSnapshot = await getDocs(roomQuery);
      const roomList: Room[] = roomsSnapshot.docs.map(doc => ({
        id: doc.id,
        ...(doc.data() as Omit<Room, 'id'>)
      }));
      setRooms(roomList);



      const sortedUsers = allUsers.sort((a, b) : any => {
        const roomA = roomList.find(
          r => r.participants.includes(a.userId)
        );
        if(!roomA) return 1
        const roomB = roomList.find(
          r => r.participants.includes(b.userId)
        );
        if(!roomB) return -1

        if(roomA && roomB)
          return roomA.lastMessageDate.toDate().getTime() - roomB.lastMessageDate.toDate().getTime() > 0 ? -1 : 1 
      });
      sortedUsers.forEach(e=>{
        console.log(e)
      })
      setUsers(sortedUsers);
    } catch (err) {
      console.error('Error fetching data:', err);
    }
  };

    useFocusEffect(
      useCallback(() => {
        fetchUsersAndRooms()
        return () => {
          console.log('leaving home screen');
        };
      }, [])
    );

  return (
    <View className='flex-1 mt-[-5%] bg-red bg-[#430608]'>
      <StatusBar style='dark'/>
        {
          users.length>0?(
            <View className="flex-1" style={{paddingVertical: 35, justifyContent: 'center',}}>
            <TextInput
              style={{ fontSize: hp(1.9), backgroundColor: '#810606', alignSelf: 'center'}}
              className="mr-2 rounded-[25px] w-[95%] pl-5 h-[6.6%]"
              placeholder="Search users..."
              placeholderTextColor="#000"//888
            />
              <ChatList currentUser={user} users={users}/>
            </View> 
          ):(
            <View className="flex items-center" style={{top: hp(40)}}>
              <ActivityIndicator size="large" color="#fff" />
            </View>
          )
        }
    </View>
  )
}