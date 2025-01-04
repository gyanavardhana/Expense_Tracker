import { useEffect, useState } from "react";
import { Keyboard, View, Text, Image } from "react-native";
import { Tabs } from "expo-router";
import { ImageSourcePropType } from "react-native";

const HomeIcon = require("../../assets/icons/home.png");
const RupeeIcon = require("../../assets/icons/rupee.png");
const EditIcon = require("../../assets/icons/changeexpense.png");
const ProfileIcon = require("../../assets/icons/profile.png");

const TabIcon = ({
  source,
  focused,
}: {
  source: ImageSourcePropType;
  focused: boolean;
}) => (
  <View
    className={`flex flex-row justify-center items-center rounded-full mb-8  ${
      focused ? "white" : ""
    }`}
  >
    <View
      className={`rounded-full w-12 h-12 items-center justify-center ${
        focused ? "bg-white" : "bg-terinary"
      }`}
    >
      <Image
        source={source}
        tintColor={focused ? "#221C0F" : "#FBE4BD"}
        resizeMode="contain"
        className="w-8 h-8"
      />
    </View>
  </View>
);

const TabsLayout = () => {
  const [isKeyboardVisible, setKeyboardVisible] = useState(false);

  useEffect(() => {
    const showSubscription = Keyboard.addListener("keyboardDidShow", () => {
      setKeyboardVisible(true);
    });
    const hideSubscription = Keyboard.addListener("keyboardDidHide", () => {
      setKeyboardVisible(false);
    });

    return () => {
      showSubscription.remove();
      hideSubscription.remove();
    };
  }, []);

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: "white",
        tabBarInactiveTintColor: "white",
        tabBarShowLabel: false,
        tabBarStyle: {
          backgroundColor: "#221C0F",
          borderRadius: 50,
          height: 70,
          marginHorizontal: 20,
          marginBottom: isKeyboardVisible ? 0 : 20, // Adjust margin dynamically
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          overflow: "hidden",
          position: "absolute",
        },
        tabBarHideOnKeyboard: true,
      }}
    >
      <Tabs.Screen
        name="dashboard"
        options={{
          title: "Dashboard",
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <TabIcon source={HomeIcon} focused={focused} />
          ),
        }}
      />
      <Tabs.Screen
        name="expense"
        options={{
          title: "Expense",
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <TabIcon source={RupeeIcon} focused={focused} />
          ),
        }}
      />
      <Tabs.Screen
        name="changeexpense"
        options={{
          title: "EditExpense",
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <TabIcon source={EditIcon} focused={focused} />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <TabIcon source={ProfileIcon} focused={focused} />
          ),
        }}
      />
    </Tabs>
  );
};

export default TabsLayout;
