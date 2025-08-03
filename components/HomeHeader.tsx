import { useAuth } from '@/context/authContext';
import { useFonts } from 'expo-font';
import { Image } from 'expo-image';
import React from 'react';
import { Platform, StyleSheet, Text, View } from 'react-native';
import {
  Menu,
  MenuOptions,
  MenuTrigger
} from 'react-native-popup-menu';
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { blurhash } from '../utils/common.js';
// import { MenuItem } from './CustomMenuItems.js';
import { MenuItem } from '@/components/CustomMenuItems';
import { AntDesign, Feather } from '@expo/vector-icons';
import { router } from 'expo-router';

const styles = StyleSheet.create({
  image: {
    width: 300,
    height: 200,
    borderRadius: 10,
  },
});

const ios = Platform.OS=='ios';
export default function HomeHeader() {

  const [fontsLoaded] = useFonts({'October Crow': require('../assets/fonts/OctoberCrow.ttf')});
  
  const {top} = useSafeAreaInsets();
  const {user, logout} = useAuth()
  
  if (!fontsLoaded) return null; 
  const openProfilePage = () =>{
    router.push( {pathname:'/profilePage'})
  }
  
  const handleLogout = async () =>{
    await logout();
  }

  return (
    <View style={{paddingTop: ios ? top : top + 10}} className='flex-row items-center justify-between px-5 bg-[#720e0e] pb-4 rounded-b-[10px] shadow' >
      <Text style={{fontSize: hp(3.8), fontFamily: 'October Crow', fontWeight: '500', }} className='font-medium'> MEOW TOWN </Text>
      <View>
        <Menu>
        <MenuTrigger>
        <Image
        style={{height: hp(5), aspectRatio:1, borderRadius: 100, borderWidth: 2, borderColor: '#420e0e'}}
        source= {user?.profileURL || "https://picsum.photos/seed/696/3000/2000"}
        placeholder={{ blurhash }}
        contentFit="cover"
        transition={500}
        
        />
        </MenuTrigger>
        <MenuOptions
            customStyles={{
                optionsContainer:{
                    borderRadius: 5,
                    borderCurve: 'continuous',
                    marginTop: 35,
                    marginLeft: -30,
                    backgroundColor: '#810606',
                    borderWidth: 1,
                    shadowOpacity: 0.2,
                    shadowOffset: {width: 0, height: 2},
                    width: 200,
                    paddingVertical: 6,
                },
                
            }}
        >

            <MenuItem 
                text ="profile"
                action={openProfilePage}
                value = {null}
                icon = {<Feather name='user' size={hp(2.8)} color='#222222'/>}
                />
            <Divider></Divider>
            <MenuItem 
                text="Sign Out"
                action={handleLogout}
                value = {null}
                icon = {<AntDesign name='logout' size={hp(2.8)} color='#222222'/>}
            />
        </MenuOptions>
        </Menu>

      </View>
    </View>
  )
}

const Divider = () =>{
    return(
        <View className='h-[1px] w-full bg-[#000000]'></View>
    )
}