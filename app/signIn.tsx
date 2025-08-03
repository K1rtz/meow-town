import React, { useRef, useState } from 'react';
import { Alert, ImageBackground, KeyboardAvoidingView, Platform, Pressable, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';

import Loading from '@/components/Loading';
import { useAuth } from '@/context/authContext';
import { useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
export default function SignIn() {  

  const [isLoading, setLoading] = useState(false);
  
  const router = useRouter()
  const emailRef = useRef("")
  const passwordRef = useRef("")
  const {login} = useAuth()

  const handleLogin = async () =>{
    if(!emailRef.current || !passwordRef.current){
      Alert.alert('Sign in', 'Please fill in both fields!')
      return;
    }

    setLoading(true)
    const response = await login(emailRef.current, passwordRef.current)
    setLoading(false)
    if(!response.success){
      Alert.alert('Sign in', response.msg)
    }
  }



  return (
      
    // <KeyboardAvoidingView behavior='padding' keyboardVerticalOffset={Platform.OS == 'ios' ? 100 : 0} style={{}}>

    <View style={{flex: 1}}>
      <ImageBackground style={{flex: 1, backgroundColor:"#000000", opacity: 1}} resizeMode="cover" source={require('../assets/images/wous.jpg')}>
      <StatusBar translucent style="dark"></StatusBar>

        <View className="flex justify-center  items-center mt-[50%]">
          <View className="bg-black/50 p-6 w-[95%] rounded-3xl"> 

            <Text style={{fontFamily:'October Crow'}} className="text-6xl text-white  text-center mb-6">
              Sign In
            </Text>

            <View className="flex-row items-center bg-white/10 border border-white/20 rounded-xl mb-5 px-2">
              <TextInput
                onChangeText={value=>emailRef.current = value}
                placeholder="Email"
                placeholderTextColor="#ccc"
                autoCapitalize='none'
                keyboardType="default"
                // secureTextEntry

                className="flex-1 text-white"
              />
              
            </View>

            {/* Password */}
            <View className='w-full mb-5'>
              <TextInput
                onChangeText={value=>passwordRef.current = value}
                placeholder="Password"
                placeholderTextColor="#ccc"
                secureTextEntry
                className="bg-white/10 border border-white/20 text-white px-4 rounded-xl mb-1"
                />

              <TouchableOpacity className="self-end" style={{alignSelf: 'flex-end'}}>
                {/* <Pressable> */}
                  <Text className='text-sm text-[#9d9191] '>Forgot password?</Text>
                {/* </Pressable> */}
              </TouchableOpacity>



            </View>
            {/* Sign In Button */}
            <View style={{height: hp(7)}}>
              {
                isLoading ? (
                  <View className='flex-col justify-center'>
                    <TouchableOpacity className="bg-[#3a0505] flex justify-center items-center rounded-xl w-full py-3">
                      {/* <View className='text-center'> */}
                      <View>
                        <Loading size={hp(2.2)}/>
                      </View>
                      {/* </View> */}
                    </TouchableOpacity>
                      <Pressable onPress={()=>router.push("/signUp")}>
                      <Text className='text-sm text-[#9d9191] pt-2 ' style={{opacity: 1, marginTop: '1%', alignSelf: 'center'}} >Don't have an account?</Text>
                      </Pressable>

                  </View>
                ):(
                  <View className='flex-col justify-center'>
                    <TouchableOpacity onPress={handleLogin} className="bg-[#3a0505] rounded-xl py-3 ">
                      <Text className="text-center text-[#ffffff] font-semibold "   >Sign In</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={{alignSelf: 'center', marginTop: '1%'}}>
                      <Pressable onPress={()=>router.push("/signUp")}>
                        <Text className='text-sm text-[#9d9191] pt-2'>Don't have an account?</Text>
                      </Pressable>
                    </TouchableOpacity>
                  </View>
                )

              }
            </View>
          </View>
        </View>
      </ImageBackground>
        </View>

    // </KeyboardAvoidingView>

    
  )
}