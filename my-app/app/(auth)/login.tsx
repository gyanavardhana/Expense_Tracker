import { View, Text } from "react-native";
import { Link } from "expo-router";

const login = () => {
  return (
    <>
      <View className="flex-1 items-center justify-center p-20">
        <Text className="text-4xl">Login</Text>
        <Link href="/dashboard" className="text-blue-700">
          Login
        </Link>
      </View>
    </>
  );
};

export default login;
