    import ChatRoomHeader from '@/components/ChatRoomHeader'
import MessageList from '@/components/MessageList'
import { useAuth } from '@/context/authContext'
import { db } from '@/firebaseConfig'
import { getRoomId } from '@/utils/common'
import { Feather } from '@expo/vector-icons'
import { useLocalSearchParams, useRouter } from 'expo-router'
import { StatusBar } from 'expo-status-bar'
import { addDoc, collection, doc, getDoc, onSnapshot, orderBy, query, setDoc, Timestamp, updateDoc } from 'firebase/firestore'
import React, { useEffect, useRef, useState } from 'react'
import { Alert, Keyboard, ScrollView, TextInput, TouchableOpacity, View } from 'react-native'
import { heightPercentageToDP as hp } from 'react-native-responsive-screen'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
    interface MessageType {
    text: string;
    senderId: string;
    createdAt: Date; // ili Date, u zavisnosti šta koristiš
    }
    export default function ChatRoom() {
        const item = useLocalSearchParams()
        const {user} = useAuth()
        const router = useRouter()
        const [messages, setMessages] = useState<MessageType[]>([])
        const textRef = useRef('')
        const inputRef = useRef<TextInput>(null)
        const insets = useSafeAreaInsets()

        const scrollViewRef = useRef<ScrollView | null>(null)

        useEffect(()=>{
            createRoom();
            let roomId = getRoomId(user?.userId, item?.userId);
            const docRef = doc(db, "rooms", roomId)
            const messagesRef = collection(docRef, "messages")

            const q = query(messagesRef, orderBy('createdAt', 'asc'));
            let unsub = onSnapshot(q, (snapshot)=>{
                let allMessages = snapshot.docs.map(doc=>{
                    return doc.data() as MessageType
                })
                setMessages([...allMessages])
            })

            const KeyboardDidShowListener = Keyboard.addListener(
                'keyboardDidShow', updateScrollView
            )

            return ()=>{
                unsub();
                KeyboardDidShowListener.remove();
            }

            
        },[])
        

        useEffect(()=>{
            updateScrollView()
        }, [messages])

        const updateScrollView = () =>{
            setTimeout(() => {
            if (scrollViewRef.current) {
                scrollViewRef.current.scrollToEnd({ animated: true });
                }
            }, 100);
        }

        const handleSendMessage = async () =>{
            let message = textRef.current.trim()
            if(!message) return;

            try{
                const roomId = getRoomId(user?.userId, item?.userId);
                const docRef  = doc(db, 'rooms', roomId)
                const messageRef = collection(docRef, "messages");

                textRef.current = "";
                if(inputRef) inputRef?.current?.clear();

                const newDoc = await addDoc(messageRef,{
                    userId: user?.userId,
                    text: message,
                    profileURL: user?.profileURL,
                    senderName: user?.username,
                    createdAt: Timestamp.fromDate(new Date())
                })
                
                await updateDoc(docRef,{
                    lastMessageDate: Timestamp.fromDate(new Date())
                })
                updateScrollView()
            }catch(err: any){
                Alert.alert('Message', err.message)
            }
        }

        const createRoom = async () =>{
            if (!user?.userId || !item?.userId) {
                return;
            }
            let roomId = getRoomId(user.userId, item.userId);
            const roomRef = doc(db, "rooms", roomId);
        try {
            const roomSnapshot = await getDoc(roomRef);
            if(!roomSnapshot.exists()){

                await setDoc(doc(db, "rooms", roomId), {
                    roomId,
                    participants: [user.userId, item.userId],
                    lastMessageDate: Timestamp.fromDate(new Date(0)),
                    createdAt: Timestamp.fromDate(new Date())
                });
            }else{
            }
        } catch (error) {
            console.error("Error creating room:", error);
        }
        }

        const [keyboardHeight, setKeyboardHeight] = useState(0);
        useEffect(() => {
        console.log('Effect initialized');
        }, []);
        useEffect(() => {
            const keyboardShowListener = Keyboard.addListener('keyboardDidShow', (e) => {
                setKeyboardHeight(e.endCoordinates.height)
                console.log('KEYBOARD POPUPPP, height:', e.endCoordinates.height);
            });
            const keyboardHideListener = Keyboard.addListener('keyboardDidHide', () => {
                setKeyboardHeight(0)
                console.log('KEYBOARD CLOSED');
            });

            return () => {
                keyboardShowListener.remove();
                keyboardHideListener.remove();

            };
        }, []);

    return (

        
        <View className='flex-1 bg-white'>
            <StatusBar style='dark'/>
            <ChatRoomHeader user={item} router={router} />
            <View className='h-2 bg-[#430608] '/>
            {/* <KeyboardAvoidingView behavior='height' keyboardVerticalOffset={0} style={{flex: 1}}>     */}
            <View className=' flex-1 justify-between bg-[#430608] overflow-visible' style={{paddingBottom: keyboardHeight + insets.bottom}}>
                <View className='flex-1'>
                    <MessageList  scrollViewRef={scrollViewRef} messages={messages} currentUser={user}/>
                </View>
                {/* <View style={{backgroundColor: '#333333', height: 222}}/> */}
                <View style={{marginBottom: hp(2.7)}} className='pt-2 w-[100%] self-center'>
                    <View className='flex-row justify-between mx-3 bg-[#8d1216] border-[#231212] p-2 rounded-full pl-5'>
                        <TextInput
                        // secureTextEntry
                        ref={inputRef} onChangeText={ value => textRef.current = value}
                        style={{fontSize: hp(1.7)}}  className="flex-1 mr-2" placeholder='Type message...' />
                        <TouchableOpacity onPress={handleSendMessage} className='bg-[#FFF] p-2 mr-[1px] flex justify-center rounded-full'>
                            <Feather name="send" className='mt-[2px]' size={hp(2.5)} color='#555' />
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </View>
    )
    }