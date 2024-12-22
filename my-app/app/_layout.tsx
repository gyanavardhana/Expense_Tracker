
import { Slot, Stack } from "expo-router";
import { StyleSheet, View,Text } from "react-native";

const RootLayout = () => {
  return (
    <>
      <Stack >
        <Stack.Screen name="index" options={{headerShown: false}} />
        <Stack.Screen name="(auth)" options={{headerShown: false}} />
        <Stack.Screen name="(tabs)" options={{headerShown: false}} />
      </Stack>
    </>
  )
};

export default RootLayout;
