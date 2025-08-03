import ChatList from '@/components/ChatList';
import { useAuth } from '@/context/authContext';
import { usersRef } from '@/firebaseConfig';
import { StatusBar } from 'expo-status-bar';
import { getDocs, query, where } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, View } from 'react-native';
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';

export default function Home() {
  const {logout, user}  = useAuth();
  const [users, setUsers] = useState([])
  useEffect(()=>{
    if(user?.uid)
      getUsers();
  },[])
  const getUsers = async () =>{
    //fetch
    const q = query(usersRef, where('userId', '!=', user?.uid));
    const querySnapshot =  await getDocs(q);
    let data : any= [];
    querySnapshot.forEach(doc=>{
      data.push({...doc.data()})
    })
    // console.log('got users:', data);
    setUsers(data)
  }

  return (
    <View className='flex-1 mt-[-5%] bg-red bg-[#430608]'>
      <StatusBar style='dark'/>
      {/* <View> */}
        {
          users.length>0?(
            <ChatList currentUser={user} users={users}/>
          ):(
            <View className="flex items-center" style={{top: hp(30)}}>
              <ActivityIndicator size="large" color="#fff" />
            </View>
          )
        }
      {/* </View> */}
    </View>
  )
}