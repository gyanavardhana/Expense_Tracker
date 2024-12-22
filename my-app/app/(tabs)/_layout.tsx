import { Slot, Stack } from "expo-router";
import { StyleSheet, View, Text } from "react-native";
import { Tabs } from "expo-router";

const TabsLayout = () => {
  return (
    <Tabs>
      <Tabs.Screen
        name="dashboard"
        options={{
          headerShown: false, // Hide the header for the dashboard screen
        }}
      />
      <Tabs.Screen
        name="expense"
        options={{
          headerShown: false, // Hide the header for the expense screen
        }}
      />
      <Tabs.Screen
        name="changeexpense"
        options={{
          headerShown: false, // Hide the header for the changeexpense screen
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          headerShown: false, // Hide the header for the profile screen
        }}
      />
    </Tabs>
  );
};

export default TabsLayout;
