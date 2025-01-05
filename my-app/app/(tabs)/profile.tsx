import { useState, useCallback } from "react";
import { View, Text, Image, ScrollView, TouchableOpacity, Alert } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Link } from "expo-router";
import * as ImagePicker from "expo-image-picker";
import InputField from "@/components/InputField";

interface ProfileData {
  name: string;
  email: string;
  phone: string;
  monthlyIncome: string;
}

const Profile = () => {
  const [isEditable, setIsEditable] = useState(false);
  const [loading, setLoading] = useState(false);
  const [profileImage, setProfileImage] = useState(require("../../assets/images/expeso/21MH1A4932.jpg"));
  const [profileData, setProfileData] = useState<ProfileData>({
    name: "Gyanavardhan",
    email: "gyana@email.com",
    phone: "8886053548",
    monthlyIncome: "50000"
  });
  const [originalData, setOriginalData] = useState<ProfileData>(profileData);

  const handleEditToggle = () => {
    if (isEditable) {
      // If we're saving changes
      handleSaveChanges();
    } else {
      // If we're entering edit mode
      setOriginalData(profileData);
      setIsEditable(true);
    }
  };

  const handleSaveChanges = () => {
    setLoading(true);
    // Validate data before saving
    if (!validateData()) {
      setLoading(false);
      return;
    }

    // Simulate API call
    setTimeout(() => {
      setIsEditable(false);
      setLoading(false);
      Alert.alert("Success", "Profile updated successfully!");
    }, 1000);
  };

  const validateData = (): boolean => {
    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(profileData.email)) {
      Alert.alert("Invalid Email", "Please enter a valid email address");
      return false;
    }

    // Phone validation
    const phoneRegex = /^\d{10}$/;
    if (!phoneRegex.test(profileData.phone)) {
      Alert.alert("Invalid Phone", "Please enter a valid 10-digit phone number");
      return false;
    }

    // Monthly income validation
    if (isNaN(Number(profileData.monthlyIncome)) || Number(profileData.monthlyIncome) < 0) {
      Alert.alert("Invalid Income", "Please enter a valid monthly income");
      return false;
    }

    return true;
  };

  const handleCancel = () => {
    setProfileData(originalData);
    setIsEditable(false);
  };

  const handleImagePicker = useCallback(async () => {
    try {
      const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();

      if (!permissionResult.granted) {
        Alert.alert(
          "Permission Required", 
          "Permission to access gallery is required!",
          [{ text: "OK", onPress: () => console.log("Permission denied") }]
        );
        return;
      }

      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 1,
      });

      if (!result.canceled) {
        setProfileImage({ uri: result.assets[0].uri });
      }
    } catch (error) {
      Alert.alert("Error", "Failed to pick image");
      console.error(error);
    }
  }, []);

  const handleLogout = () => {
    Alert.alert(
      "Confirm Logout",
      "Are you sure you want to logout?",
      [
        { text: "Cancel", style: "cancel" },
        { 
          text: "Logout",
          style: "destructive",
          onPress: () => {
            // Add logout logic here
            console.log("Logging out...");
          }
        }
      ]
    );
  };

  const handleInputChange = (field: keyof ProfileData, value: string) => {
    setProfileData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  return (
    <SafeAreaView className="flex-1 bg-primary">
      <ScrollView
        className="px-5 bg-primary"
        contentContainerStyle={{ paddingBottom: 120 }}
        showsVerticalScrollIndicator={false}
      >
        <Text className="text-2xl font-extrabold my-5">My Profile</Text>
        
        {/* Profile Image Section */}
        <View className="flex items-center justify-center my-5 relative">
          <Image
            source={profileImage}
            style={{ width: 110, height: 110 }}
            resizeMode="cover"
            className="rounded-full h-[110px] w-[110px] border-[3px] border-primary bg-white shadow-sm shadow-neutral-300"
          />
          <TouchableOpacity
            onPress={handleImagePicker}
            className="absolute bottom-0 right-0 bg-terinary rounded-full p-2"
          >
            <Text className="text-white text-sm">Upload</Text>
          </TouchableOpacity>
        </View>

        {/* Profile Form Section */}
        <View className="flex flex-col items-start justify-center bg-primary rounded-lg shadow-sm shadow-neutral-300 px-5 py-3">
          <View className="flex flex-col items-start justify-start w-full">
            <InputField
              label="Name"
              placeholder="Enter your name"
              value={profileData.name}
              onChangeText={(value) => handleInputChange('name', value)}
              containerStyle="w-full"
              inputStyle="p-3.5"
              editable={isEditable}
            />

            <InputField
              label="Email"
              placeholder="Enter your email"
              value={profileData.email}
              onChangeText={(value) => handleInputChange('email', value)}
              containerStyle="w-full"
              inputStyle="p-3.5"
              editable={isEditable}
              keyboardType="email-address"
              autoCapitalize="none"
            />

            <InputField
              label="Phone"
              placeholder="Enter your phone number"
              value={profileData.phone}
              onChangeText={(value) => handleInputChange('phone', value)}
              containerStyle="w-full"
              inputStyle="p-3.5"
              editable={isEditable}
              keyboardType="phone-pad"
            />

            <InputField
              label="Monthly Income"
              placeholder="Enter your monthly income"
              value={profileData.monthlyIncome}
              onChangeText={(value) => handleInputChange('monthlyIncome', value)}
              containerStyle="w-full"
              inputStyle="p-3.5"
              editable={isEditable}
              keyboardType="numeric"
            />
          </View>

          {/* Action Buttons */}
          <View className="w-full flex-row gap-2">
            <TouchableOpacity
              className={`flex-1 py-4 bg-terinary rounded-xl mt-6 ${loading ? 'opacity-50' : ''}`}
              activeOpacity={0.7}
              onPress={handleEditToggle}
              disabled={loading}
            >
              <Text className="text-primary text-center text-lg font-semibold">
                {isEditable ? "Save Changes" : "Edit Profile"}
              </Text>
            </TouchableOpacity>

            {isEditable && (
              <TouchableOpacity
                className="flex-1 py-4 bg-red-500 rounded-xl mt-6"
                activeOpacity={0.7}
                onPress={handleCancel}
              >
                <Text className="text-white text-center text-lg font-semibold">
                  Cancel
                </Text>
              </TouchableOpacity>
            )}
          </View>

          <TouchableOpacity
            className="w-full py-4 bg-terinary rounded-xl mt-6"
            activeOpacity={0.7}
            onPress={handleLogout}
          >
            <Text className="text-primary text-center text-lg font-semibold">
              Logout
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Profile;