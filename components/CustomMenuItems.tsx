import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import {
  Menu,
  MenuOptions,
  MenuOption,
  MenuTrigger,
} from 'react-native-popup-menu';
import { View } from 'react-native';
import { Text } from '@react-navigation/elements';
import { ReactNode } from 'react';

export const MenuItem = ({text, action, value, icon}:  {  text: string;  action: (value: string | number | null) => void;  value: string | number | null;
      icon: ReactNode;
}) =>{
    return(
        <MenuOption onSelect={()=> action(value)}>
            <View className='px-4 py-1 flex-row justify-between items-center'>
               <Text style={{fontSize: hp(2.2), fontFamily: 'October Crow'}} className='font-semibold text-[#332244]' >{text}</Text>
               <Text>{icon}</Text>
            </View>
        </MenuOption>
        
    )
} 