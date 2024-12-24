import React, { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
} from "react-native";
import { Link,router } from "expo-router";
import InputField from "@/components/InputField";
import LottieView from "lottie-react-native";
import { FontAwesome } from "@expo/vector-icons";

const loginillus = require("../../assets/lotties/signup.json");

const Login = () => {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const onLoginPress = () => {
    console.log("Login Data:", form);
    router.push('../(tabs)/dashboard')
  };

  return (
    <SafeAreaView className="flex-1 bg-primary">
      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        <View className="items-center justify-center mt-28 h-[250px] bg-primary">
          <LottieView
            source={loginillus}
            autoPlay
            loop
            style={{ width: 250, height: 250 }}
          />
        </View>

        {/* Title Section */}
        <View className="px-6 mb-6">
          <Text className="text-3xl font-bold text-terinary">Welcome Back</Text>
          <Text className="text-secondary mt-2">
            Please login to your account
          </Text>
        </View>

        <View className="px-6 space-y-4">
          <InputField
            label="Email Address"
            placeholder="Enter your email"
            textContentType="emailAddress"
            keyboardType="email-address"
            autoCapitalize="none"
            value={form.email}
            onChangeText={(value) => setForm({ ...form, email: value })}
          />
          <InputField
            label="Password"
            placeholder="Enter your password"
            secureTextEntry
            textContentType="password"
            value={form.password}
            onChangeText={(value) => setForm({ ...form, password: value })}
          />
          <TouchableOpacity className="items-end">
            <Text className="text-secondary">Forgot Password?</Text>
          </TouchableOpacity>
          <TouchableOpacity
            className="w-full py-4 bg-terinary rounded-xl mt-6"
            activeOpacity={0.7}
            onPress={onLoginPress}
          >
            <Text className="text-primary text-center text-lg font-semibold">
              Login
            </Text>
          </TouchableOpacity>

          <View className="mt-6">
            <Text className="text-center text-secondary mb-4">
              Or continue with
            </Text>
            <View className="flex-row justify-center space-x-6">
              <TouchableOpacity className="w-14 h-14 bg-terinary border-2 border-secondary rounded-full items-center justify-center">
                <FontAwesome name="google" size={24} color="#FBE4BD" />
              </TouchableOpacity>
            </View>
          </View>
          <View className="flex-row justify-center mt-6 mb-8">
            <Text className="text-secondary">Don't have an account? </Text>
            <Link href="/signup" asChild>
              <TouchableOpacity>
                <Text className="text-terinary font-semibold">Sign Up</Text>
              </TouchableOpacity>
            </Link>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Login;
