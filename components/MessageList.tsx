import React from 'react'
import { ScrollView, View } from 'react-native'
import MessageItem from './MessageItem'

interface Props {
  messages: any[],
  currentUser: any,
  scrollViewRef: React.RefObject<ScrollView | null>
} 
export default function MessageList( {messages, currentUser, scrollViewRef} : Props) {
  return (
      <ScrollView ref={scrollViewRef} showsVerticalScrollIndicator={false}  keyboardShouldPersistTaps="handled">
       <View>
          {messages.map((message : any, index : number)=>{
            return (
              <MessageItem message={message} key={index} currentUser={currentUser}/>
            )
            
          })}
       </View>
      </ScrollView>
  )
}