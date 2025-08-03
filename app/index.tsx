import { View, Text, ActivityIndicator } from 'react-native';

export default function StartPage() {
  return (
    <View className="flex-1 items-center justify-center bg-red-200">
        <ActivityIndicator size = 'large' color="gray"></ActivityIndicator>
    </View>
  );
}
