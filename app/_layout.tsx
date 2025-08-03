import * as Font from 'expo-font';
import { Slot, useRouter, useSegments } from 'expo-router';
import { useEffect, useState } from 'react';
import { ActivityIndicator, View } from 'react-native';
import { MenuProvider } from 'react-native-popup-menu';
import 'react-native-reanimated';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { AuthContextProvider, useAuth } from '../context/authContext';
import "../global.css";


const MainLayout = () =>{
  const {isAuthenticated} = useAuth();
  const segments = useSegments();//array of all segments of current route
  const router = useRouter();

  useEffect(()=>{
    if(typeof isAuthenticated == 'undefined') return
    const inApp = segments[0] == '(app)';
    if(isAuthenticated && !inApp){
      //home
      router.replace('/home');
    }else if(isAuthenticated == false){
      router.replace('/signIn')
      //signin
    }

  },[isAuthenticated])

  return <Slot />
}


export default function RootLayout() {
  const [fontsLoaded, setFontsLoaded] = useState(false);

  useEffect(() => {
    async function loadFonts() {
      await Font.loadAsync({
        'October Crow': require('../assets/fonts/OctoberCrow.ttf'),
      });
      setFontsLoaded(true);
    }
    loadFonts();
  }, []);

  if (!fontsLoaded) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'black' }}>
        <ActivityIndicator size="large" color="#fff" />
      </View>
    );
  }



  return (
    <MenuProvider>
      <AuthContextProvider>
        <SafeAreaProvider>
          <MainLayout />
        </SafeAreaProvider>
      </AuthContextProvider>
    </MenuProvider>
  );
}
