import "../global.css";
import { StatusBar } from "expo-status-bar";
import { ScrollView, View, Text, TouchableOpacity, Image } from "react-native";
import { Link } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { useState } from "react";
import LottieView from "lottie-react-native";

const Darklogo = require("../assets/images/expeso/Dark-logo.png");

// Lottie JSON Files
const animations = [
  require("../assets/lotties/tye.json"),
  require("../assets/lotties/myb.json"),
  require("../assets/lotties/smm.json"),
  require("../assets/lotties/ff.json"),
];

// Welcome Messages
const WELCOME_MESSAGES = [
  "Track your Expenses",
  "Manage your Budget",
  "Save More Money",
  "Financial Freedom",
];

const App = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % WELCOME_MESSAGES.length);
  };

  return (
    <SafeAreaView className="bg-primary flex-1">
      <ScrollView contentContainerStyle={{ flexGrow: 1 }} className="px-4">
        <View className="items-center mt-20">
          <Image source={Darklogo} className="w-32 h-32" resizeMode="contain" />
          <Text className="text-4xl text-terinary font-bold mt-4">Expenso</Text>
        </View>
        <View className="items-center mt-10">
          <LottieView
            source={animations[currentIndex]}
            autoPlay
            loop
            style={{ width: 300, height: 300 }}
          />
          <Text className="text-lg text-terinary mt-4 text-center">
            {WELCOME_MESSAGES[currentIndex]}
          </Text>
        </View>
        <View className="flex-1 justify-end items-center pb-10 px-6">
          <TouchableOpacity
            onPress={handleNext}
            className="w-full py-4 bg-secondary rounded-lg shadow-md mb-4"
            activeOpacity={0.7}
          >
            <Text className="text-primary text-lg text-center font-semibold">
              Next
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            className="w-full py-4 bg-terinary rounded-lg shadow-md mb-4"
            activeOpacity={0.7}
          >
            <Link
              href="/signup"
              className="text-primary text-lg text-center font-semibold"
            >
              Continue with Email
            </Link>
          </TouchableOpacity>

          <TouchableOpacity
            className="w-full py-4 bg-terinary rounded-lg shadow-md"
            activeOpacity={0.7}
          >
            <Link
              href="/login"
              className="text-primary text-lg text-center font-semibold"
            >
              Already have an account?
            </Link>
          </TouchableOpacity>
        </View>
      </ScrollView>
      <StatusBar style="dark" />
    </SafeAreaView>
  );
};

export default App;
