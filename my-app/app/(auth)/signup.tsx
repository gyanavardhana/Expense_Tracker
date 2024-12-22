import { View, Text } from "react-native";
import { Link } from "expo-router";

const signup = () => {
  return (
    <>
      <View className="flex-1 items-center justify-center p-20">
        <Text className="text-4xl">Signup</Text>
        <Link href="/login" className="text-blue-700">
          Already Have an Account?.
        </Link>
      </View>
    </>
  );
};

export default signup;
