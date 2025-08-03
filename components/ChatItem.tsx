import { db } from '@/firebaseConfig';
import { formatFirestoreTimestamp, getRoomId } from '@/utils/common';
import { Image } from 'expo-image';
import { collection, doc, onSnapshot, orderBy, query } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';
interface MessageType {
  text: string;
  userId: string;
  createdAt: Date;
}
export default function ChatItem({item, router, noBorder, currentUser} : { item: any, router: any, noBorder: Boolean, currentUser: any}) {

        const [lastMessage, setLastMessage] = useState<MessageType | undefined | null>(undefined);
        useEffect(()=>{
            let roomId = getRoomId(currentUser?.userId, item?.userId);
            const docRef = doc(db, "rooms", roomId)
            const messagesRef = collection(docRef, "messages")    
            const q = query(messagesRef, orderBy('createdAt', 'desc'));
            let unsub = onSnapshot(q, (snapshot)=>{
                let allMessages = snapshot.docs.map(doc=>{
                    return doc.data() as MessageType
                })
                setLastMessage(allMessages[0]? allMessages[0] : null)
            })
            return unsub
        },[])
        const showLastMessage = () =>{
            if(typeof lastMessage == 'undefined') return 'Loading...'
            if(lastMessage){
                if(currentUser?.userId == lastMessage?.userId) return 'You: '+ lastMessage?.text;
                return lastMessage.text
            }else{
                return 'Start conversation...'
            }
        }
        const showTime = ()=>{
            if(lastMessage){
                return formatFirestoreTimestamp(lastMessage?.createdAt)
            }
            return ''
        }

    const openChatRoom = ()=>{
        router.push({pathname:'/chatRoom', params: item});
    }
  return (
    <TouchableOpacity 
    onPress={openChatRoom}
    className={`flex-row justify-between items-center mx-4 gap-3 mb-4 pb-2 border-b ${noBorder ? undefined : 'border-b-red-950'}`}>
        <Image source={{uri: item?.profileURL || 'https://pfpideas.net/images/question-mark-profile-picture-ideas.jpg'}} 
        style={{height: hp(6), aspectRatio: 1, borderRadius: 9999, borderWidth: 2, borderColor: '#112233'}} 
        className="rounded-full" />
        <View className='flex-1 gap-1'>
            <View className='flex-row justify-between'>
                <Text style = {{fontSize: hp(1.8)}} className='font-semibold text-red-700'>{item?.username}</Text>
                <Text style = {{fontSize: hp(1.8)}} className='font-semibold text-red-700'>{showTime()}</Text>
            </View>
            <Text style={{fontSize: hp(1.6)}} className='font-medium text-neutral-400'>{showLastMessage()}</Text>
        </View>
    </TouchableOpacity>
  )
}