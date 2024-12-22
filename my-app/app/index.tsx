import "../global.css";
import { StatusBar } from "expo-status-bar";
import { ScrollView, View, Text } from "react-native";
import { Link } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";

const App = () => {
  return (
    <SafeAreaView className="bg-white h-full">
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <View className="flex-1 items-center justify-center p-20">
          <Text className="text-4xl">Hello</Text>
          <Link href="/signup" className="text-blue-700">
            Continue with Email.
          </Link>
        </View>
      </ScrollView>
      <StatusBar style="dark"/>
    </SafeAreaView>
  );
};

export default App;
