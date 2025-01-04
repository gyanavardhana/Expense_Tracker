import { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Alert } from "react-native";
import {Picker} from '@react-native-picker/picker';
import { SafeAreaView } from "react-native-safe-area-context";

const categories = [
  "Food",
  "Housing",
  "Utilities",
  "Transportation",
  "Entertainment",
  "Healthcare",
  "Education",
  "Other",
];



const ChangeExpense = () => {
  const [name, setName] = useState("");
  const [category, setCategory] = useState(categories[0]);
  const [date, setDate] = useState("");
  const [amount, setAmount] = useState("");

  const handleSaveExpense = () => {
    if (!name || !date || !amount) {
      Alert.alert("Error", "Please fill all fields before saving.");
      return;
    }

    Alert.alert("Success", "Expense saved successfully.");
    setName("");
    setCategory(categories[0]);
    setDate("");
    setAmount("");
  };

  return (
    <SafeAreaView className="flex-1 bg-primary px-5">
      <Text className="text-2xl font-extrabold my-5">Change Expense</Text>

      <View className="bg-white shadow-sm rounded-lg p-3 mb-5">
        <Text className="text-lg font-semibold mb-2">Expense Name</Text>
        <TextInput
          value={name}
          onChangeText={setName}
          placeholder="Enter expense name"
          className="bg-gray-100 p-4 rounded-lg text-gray-700"
        />
      </View>

      <View className="bg-white shadow-sm rounded-lg p-3 mb-5">
        <Text className="text-lg font-semibold mb-2">Category</Text>
        <View className="bg-gray-100 rounded-lg">
          <Picker
            selectedValue={category}
            onValueChange={(itemValue) => setCategory(itemValue)}
          >
            {categories.map((cat) => (
              <Picker.Item label={cat} value={cat} key={cat} />
            ))}
          </Picker>
        </View>
      </View>

      <View className="bg-white shadow-sm rounded-lg p-3 mb-5">
        <Text className="text-lg font-semibold mb-2">Date</Text>
        <TextInput
          value={date}
          onChangeText={setDate}
          placeholder="YYYY-MM-DD"
          keyboardType="numeric"
          className="bg-gray-100 p-4 rounded-lg text-gray-700"
        />
      </View>

      <View className="bg-white shadow-sm rounded-lg p-3 mb-5">
        <Text className="text-lg font-semibold mb-2">Amount</Text>
        <TextInput
          value={amount}
          onChangeText={setAmount}
          placeholder="Enter amount"
          keyboardType="numeric"
          className="bg-gray-100 p-4 rounded-lg text-gray-700"
        />
      </View>

      <TouchableOpacity
        activeOpacity={0.7}
        onPress={handleSaveExpense}
        className="w-full py-4 bg-terinary rounded-xl mt-6"
      >
        <Text className="text-primary text-center text-lg font-semibold">Save Expense</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default ChangeExpense;
