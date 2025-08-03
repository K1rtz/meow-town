import Loading from '@/components/Loading';
import { useAuth } from '@/context/authContext';
import { db } from '@/firebaseConfig';
import { useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { collection, getDocs, query, where } from 'firebase/firestore';
import React, { useEffect, useRef, useState } from 'react';
import { Alert, ImageBackground, Keyboard, KeyboardAvoidingView, Platform, Pressable, ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';
export default function SignUn() {  

  const [isLoading, setLoading] = useState(false);
  const {register}  = useAuth();

  const router = useRouter()
  const emailRef = useRef("")
  const passwordRef = useRef("")
  const confirmPasswordRef = useRef("")
  const usernameRef = useRef("")

  const handleSignUp = async () =>{
    if(!emailRef.current || !passwordRef.current || !confirmPasswordRef.current || !usernameRef.current){
      Alert.alert('Sign in', 'Please fill in all fields!')
    }
    else if(passwordRef.current  != confirmPasswordRef.current){
      Alert.alert('Sign up', 'Passwords fo not match!')
      return;
    }
    const rawUsername = usernameRef.current;
    if (/\s/.test(rawUsername) || /[A-Z]/.test(rawUsername)) {
      Alert.alert('Sign up', 'Username must be all lowercase and contain no spaces.');
      return;
    }

    const cleanUsername = usernameRef.current.trim().toLowerCase().replace(/\s+/g, '');

    const usersRef = collection(db, "users");
    const q = query(usersRef, where("username", "==", cleanUsername));
    const querySnapshot = await getDocs(q);
    setLoading(true)

    if (!querySnapshot.empty) {
      setLoading(false);
      Alert.alert('Sign up', 'Username already taken!');
      return;
    }

    let response = await register(emailRef.current, passwordRef.current, cleanUsername)
    setLoading(false)

    if(!response.success){
      Alert.alert('SignUp', response.msg)
    }
  }
  const scrollViewRef = useRef<ScrollView | null>(null);

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', () => {
      setTimeout(() => {
        scrollViewRef.current?.scrollToEnd({ animated: true });
    }, 100);  // 100ms delay
    });

    return () => {
      keyboardDidShowListener.remove();
    };
  }, []);

  return (
    <View className="flex-1">
      <ImageBackground style={{flex: 1 }} resizeMode="cover" source={require('../assets/images/wous.jpg')}>
      <StatusBar translucent style="dark"></StatusBar>

     <KeyboardAvoidingView behavior='padding' keyboardVerticalOffset={Platform.OS == 'ios' ? 100 : 0} style={{}}>
    <ScrollView ref={scrollViewRef} contentContainerStyle={{ flexGrow: 1 }} keyboardShouldPersistTaps="handled">

        <View className="flex justify-center items-center  pt-[50%]">

          <View className="bg-black/50 p-6 w-[95%] rounded-3xl">

            <Text style={{fontFamily:'October Crow'}} className="text-6xl text-white text-center mb-6">
              Sign Up
            </Text>

            {/* Username */}
            <View className="flex-row items-center bg-white/10 border border-white/20 rounded-xl mb-5 px-2">
              <TextInput
                onChangeText={value=>emailRef.current = value}
                placeholder="Email"
                placeholderTextColor="#ccc"
                className="flex-1 text-white"
              />
            </View>
            <View className="flex-row items-center bg-white/10 border border-white/20 rounded-xl mb-5 px-2">
              <TextInput
                onChangeText={value=>usernameRef.current = value}
                placeholder="Username"
                placeholderTextColor="#ccc"
                className="flex-1 text-white"
                autoCapitalize="none"

              />
            </View>
            <View className='w-full mb-5'>
              <TextInput
                onChangeText={value=>passwordRef.current = value}
                placeholder="Password"
                placeholderTextColor="#ccc"
                secureTextEntry
                className="bg-white/10 border border-white/20 text-white px-4 rounded-xl mb-1"
                />
            </View>

            <View className='w-full mb-5'>
              <TextInput
                onChangeText={value=>confirmPasswordRef.current = value}
                placeholder="Confirm Password"
                placeholderTextColor="#ccc"
                secureTextEntry
                className="bg-white/10 border border-white/20 text-white px-4 rounded-xl mb-1"
                />

            </View>
            <View style={{height: hp(7)}}>
              {
                isLoading ? (
                  <View className='flex-col justify-center'>
                    <TouchableOpacity className="bg-[#3a0505] flex justify-center items-center rounded-xl w-full py-3">
                      <View>
                        <Loading size={hp(2.2)}/>
                      </View>
                    </TouchableOpacity>

                      <Pressable onPress={()=>{
                      router.push("/signUp")
                      console.log('xdd')
                      }
                    }>
                      <Text className='text-sm text-[#9d9191] pt-2 ' style={{opacity: 1, marginTop: '1%', alignSelf: 'center'}} >Don't have an account?</Text>
                      </Pressable>

                  </View>
                ):(
                  <View className='flex-col justify-center'>
                    <TouchableOpacity onPress={handleSignUp} className="bg-[#3a0505] rounded-xl py-3 ">
                      <Text className="text-center text-[#ffffff] font-semibold "   >Sign In</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={{alignSelf: 'center', marginTop: '1%'}}>
                      <Pressable onPress={()=>router.push("/signIn")}>
                        <Text className='text-sm text-[#9d9191] pt-2'>Already got an account?</Text>
                      </Pressable>
                    </TouchableOpacity>
                  </View>
                )

              }
            </View>
          </View>
        </View>
        </ScrollView>
      </KeyboardAvoidingView>
      </ImageBackground>
    </View>
  )
}