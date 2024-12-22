import { Slot, Stack } from "expo-router";
import { StyleSheet, View, Text } from "react-native";
import { StatusBar } from "expo-status-bar";

const AuthLayout = () => {
  return (
    <>
      <Stack>
        <Stack.Screen
          name="login"
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="signup"
          options={{
            headerShown: false,
          }}
        />
      </Stack>
      <StatusBar style="dark" />
    </>
  );
};

export default AuthLayout;
