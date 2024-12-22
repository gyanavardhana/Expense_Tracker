import { View, Text } from "react-native";
import { Link } from "expo-router";
const profile = () => {
  return (
    <View className="flex-1 items-center justify-center p-20">
      <Text className="text-4xl">Profile</Text>
      <Link href="/" className="text-blue-700">
        Logout.
      </Link>
    </View>
  );
};

export default profile;
