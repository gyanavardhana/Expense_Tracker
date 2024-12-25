import { useState } from "react";
import { View, Text, Image, ScrollView, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Link } from "expo-router";
import * as ImagePicker from "expo-image-picker";
const Darklogo = require("../../assets/images/expeso/21MH1A4932.jpg");
import InputField from "@/components/InputField";

const Profile = () => {
  const [isEditable, setIsEditable] = useState(false);
  const [profileImage, setProfileImage] = useState(Darklogo);

  const handleEditToggle = () => {
    setIsEditable((prev) => !prev);
  };

  const handleImagePicker = async () => {
    const permissionResult =
      await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (!permissionResult.granted) {
      alert("Permission to access gallery is required!");
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images'],
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      setProfileImage({ uri: result.assets[0].uri });
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-primary">
      <ScrollView
        className="px-5 bg-primary"
        contentContainerStyle={{ paddingBottom: 120 }}
      >
        <Text className="text-2xl font-extrabold my-5">My Profile</Text>
        <View className="flex items-center justify-center my-5 relative">
          <Image
            source={profileImage}
            style={{ width: 110, height: 110 }}
            resizeMode="contain"
            className="rounded-full h-[110px] w-[110px] border-[3px] border-primary bg-white shadow-sm shadow-neutral-300"
          />
          <TouchableOpacity
            onPress={handleImagePicker}
            className="absolute bottom-0 right-0 bg-terinary rounded-full p-2"
          >
            <Text className="text-white text-sm">Upload</Text>
          </TouchableOpacity>
        </View>
        <View className="flex flex-col items-start justify-center bg-primary rounded-lg shadow-sm shadow-neutral-300 px-5 py-3">
          <View className="flex flex-col items-start justify-start w-full">
            <InputField
              label="Name"
              placeholder={"Gyanavardhan" || "Not Found"}
              containerStyle="w-full"
              inputStyle="p-3.5"
              editable={isEditable}
            />

            <InputField
              label="Email"
              placeholder={"gyana@email.com" || "Not Found"}
              containerStyle="w-full"
              inputStyle="p-3.5"
              editable={isEditable}
            />

            <InputField
              label="Phone"
              placeholder={"8886053548" || "Not Found"}
              containerStyle="w-full"
              inputStyle="p-3.5"
              editable={isEditable}
            />
            <InputField
              label="Monthly Income"
              placeholder={"50000" || "Not Found"}
              containerStyle="w-full"
              inputStyle="p-3.5"
              editable={isEditable}
            />
          </View>
          <TouchableOpacity
            className="w-full py-4 bg-terinary rounded-xl mt-6"
            activeOpacity={0.7}
            onPress={handleEditToggle}
          >
            <Text className="text-primary text-center text-lg font-semibold">
              {isEditable ? "Save Changes" : "Edit Profile"}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            className="w-full py-4 bg-terinary rounded-xl mt-6"
            activeOpacity={0.7}
          >
            <Link
              href="/"
              className="text-primary text-center text-lg font-semibold"
            >
              Logout
            </Link>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Profile;
