import { useAuth } from '@/context/authContext';
import { db } from '@/firebaseConfig';
import { Image } from 'expo-image';
import { StatusBar } from 'expo-status-bar';
import { doc, updateDoc } from 'firebase/firestore';
import React, { useState } from 'react';
import { Modal, Pressable, Text, TextInput, View } from 'react-native';
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';

export default function ProfilePage() {

  const {user} = useAuth()
    if (!user) {
    return <Text>Please log in</Text>;
    }
  const [modalVisible, setModalVisible] = useState(false);
  const [newURL, setNewURL] = useState('') 
  const [isValidImage, setIsValidImage] = useState(false);

  const handleCancel = () =>{
        setModalVisible(false)
  }
  const handleSave = async () =>{
    if (!user?.userId || !newURL) return;

    try {
      const response = await fetch(newURL);
      const contentType = response.headers.get('Content-Type');

      if (!response.ok || !contentType?.startsWith('image/')) {
        alert('Invalid image URL');
        return;
      }
    }catch (error) {
      alert('Invalid image URL');
      return;
    }

    try{
      const userRef = doc(db, 'users', user.userId);
      await updateDoc(userRef, {
        profileURL: newURL
      });
    setModalVisible(false);
    setNewURL('');
    }catch (error) {
    console.error('Error updating profile URL:', error);
    }
  }

  return (
    
    <View style={{flex: 1, backgroundColor: '#430608',alignItems: 'center',paddingTop: hp(20),}}>
            <StatusBar style='dark'/>
      
      <Pressable onPress={()=>setModalVisible(true)}>
        <Image 
            source= {user?.profileURL || "https://picsum.photos/seed/696/3000/2000"}
            style={{
                height: hp(17),
                aspectRatio: 1,
                borderRadius: 9999,
                marginBottom: 15,
                borderWidth: 3,
                borderColor: '#120e0e'
                
            }}
            />
        </Pressable>
      {/* <Text style={{fontSize: 18, fontWeight: 'bold', color: '#fff', marginBottom: 4}}>{user.email}</Text> */}
      <Text style={{fontSize: 26, color: '#ccc', marginBottom: 4, fontFamily: 'October Crow' }}>{user.username}</Text>
      {/* <Text style={{fontSize: 16, color: '#ccc', width: '50%'}}>{user.profileURL}</Text> */}
        
    <Modal transparent animationType="fade" visible={modalVisible} >
  <View style={{flex: 1,backgroundColor:'#00000055',justifyContent: 'center',alignItems: 'center',}}>
    <View style={{backgroundColor: '#620e0e',borderRadius: 16,padding: 20,width: '90%',maxWidth: 350,
      shadowColor: '#4a0b0b',shadowOpacity: 0.9,shadowRadius: 10,elevation: 10,}}>
      <Text style={{color: '#f5f5f5',fontSize: 18,fontWeight: '600',marginBottom: 12,}}>
        Enter URL
      </Text>

      <TextInput style={{backgroundColor: '#8b1212', color: 'white', paddingHorizontal: 12, paddingVertical: 10, borderRadius: 10,marginBottom: 20, fontSize: 16, }}
        value = {newURL}
        onChangeText={(value)=>{setNewURL(value)}}
        placeholder="Paste your image URL"
        placeholderTextColor="#d1a3a3"
      />

      <View style={{ flexDirection: 'row', justifyContent: 'flex-end' }}>
        <Pressable onPress={handleCancel} style={{ backgroundColor: '#d44343',paddingVertical: 10,paddingHorizontal: 20,borderRadius: 10,marginRight: 10,}}>
          <Text style={{ color: 'white', fontWeight: '600' }}>Cancel</Text>
        </Pressable>

        <Pressable onPress={handleSave} style={{backgroundColor: '#d44343',paddingVertical: 10,paddingHorizontal: 20,borderRadius: 10,}}>
          <Text style={{ color: 'white', fontWeight: '600' }}>Save</Text>
        </Pressable>
      </View>
    </View>
  </View>
</Modal>

    </View>
  );
}
const inputBoxStyle = {
  backgroundColor: '#3a0505', 
  paddingVertical: 10,
  paddingHorizontal: 15,
  borderRadius: 8,
  marginVertical: 8,
  width: '80%',
  color: '#fff', 
  fontSize: 16,
  fontWeight: '500',
};