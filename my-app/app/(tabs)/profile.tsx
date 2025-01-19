import { useState } from "react";
import { View, Text, ScrollView, TouchableOpacity, Alert } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import InputField from "@/components/InputField";

interface ProfileData {
  name: string;
  email: string;
  monthlyIncome: string;
}

const Profile = () => {
  const [isEditable, setIsEditable] = useState(false);
  const [loading, setLoading] = useState(false);
  const [profileData, setProfileData] = useState<ProfileData>({
    name: "Gyanavardhan",
    email: "gyana@email.com",
    monthlyIncome: "50000"
  });
  const [originalData, setOriginalData] = useState<ProfileData>(profileData);

  const handleEditToggle = () => {
    if (isEditable) {
      handleSaveChanges();
    } else {
      setOriginalData(profileData);
      setIsEditable(true);
    }
  };

  const handleSaveChanges = () => {
    setLoading(true);
    if (!validateData()) {
      setLoading(false);
      return;
    }

    setTimeout(() => {
      setIsEditable(false);
      setLoading(false);
      Alert.alert("Success", "Profile updated successfully!");
    }, 1000);
  };

  const validateData = (): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(profileData.email)) {
      Alert.alert("Invalid Email", "Please enter a valid email address");
      return false;
    }

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