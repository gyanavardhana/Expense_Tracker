import React, { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
} from "react-native";
import { Link, router } from "expo-router";
import InputField from "@/components/InputField";
import LottieView from "lottie-react-native";
import { FontAwesome } from "@expo/vector-icons";
const signupillus = require("../../assets/lotties/signin.json");

const Signup = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const onSignUpPress = () => {
    console.log("Form Data:", form);
    router.push("./login");
  };

  return (
      <ScrollView className="flex-1 bg-primary" showsVerticalScrollIndicator={false}>
        <View className="items-center justify-center mt-20 h-[250px] bg-primary">
          <LottieView
            source={signupillus}
            autoPlay
            loop
            style={{ width: 250, height: 250 }}
          />
        </View>

        <View className="px-6 mb-6">
          <Text className="text-3xl font-extrabold text-terinary">
            Create Account
          </Text>
        </View>

        <View className="px-6 space-y-4">
          <InputField
            label="Full Name"
            placeholder="Enter your full name"
            value={form.name}
            onChangeText={(value) => setForm({ ...form, name: value })}
          />
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
            placeholder="Create a password"
            secureTextEntry
            textContentType="newPassword"
            value={form.password}
            onChangeText={(value) => setForm({ ...form, password: value })}
          />
          <TouchableOpacity
            className="w-full py-4 bg-terinary rounded-xl mt-6"
            activeOpacity={0.7}
            onPress={onSignUpPress}
          >
            <Text className="text-primary text-center text-lg font-semibold">
              Sign Up
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
            <Text className="text-secondary">Already have an account? </Text>
            <Link href="/login" asChild>
              <TouchableOpacity>
                <Text className="text-terinary font-semibold">Login</Text>
              </TouchableOpacity>
            </Link>
          </View>
        </View>
      </ScrollView>
  );
};

export default Signup;
