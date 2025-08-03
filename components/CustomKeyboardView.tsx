import React from 'react';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';


export default function CustomKeyboardView({ children, inChat , scrollRef}: { 
  children: React.ReactNode, 
  inChat: boolean, 
  scrollRef: React.RefObject<any>
}) {
    
  return (
    <KeyboardAwareScrollView
      ref={scrollRef}
      style={{ flex: 1 }}
      contentContainerStyle={{ flexGrow: 1 }}
      enableOnAndroid={true}
      extraScrollHeight={inChat ? 0 : 0}
      keyboardShouldPersistTaps="handled"
      enableAutomaticScroll={true}
      showsVerticalScrollIndicator={true}
      bounces={false}
    >
      {children}
    </KeyboardAwareScrollView>
  );
}