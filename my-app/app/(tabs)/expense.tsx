import { useState } from "react";
import { View, Text, TextInput, FlatList, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { AntDesign } from "@expo/vector-icons";

const expenses = [
  { id: "1", name: "Groceries", category: "Food", amount: 1500, date: "2025-01-01" },
  { id: "2", name: "Rent", category: "Housing", amount: 12000, date: "2025-01-01" },
  { id: "3", name: "Electricity Bill", category: "Utilities", amount: 3000, date: "2025-01-02" },
  { id: "41", name: "Groceries", category: "Food", amount: 1500, date: "2025-01-01" },
  { id: "5", name: "Rent", category: "Housing", amount: 12000, date: "2025-01-01" },
  { id: "6", name: "Electricity Bill", category: "Utilities", amount: 3000, date: "2025-01-02" },
  { id: "7", name: "Groceries", category: "Food", amount: 1500, date: "2025-01-01" },
  { id: "8", name: "Rent", category: "Housing", amount: 12000, date: "2025-01-01" },
  { id: "9", name: "Electricity Bill", category: "Utilities", amount: 3000, date: "2025-01-02" },
];

const Expense = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredExpenses, setFilteredExpenses] = useState(expenses);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    if (query.trim()) {
      setFilteredExpenses(
        expenses.filter((expense) =>
          expense.name.toLowerCase().includes(query.toLowerCase()) ||
          expense.category.toLowerCase().includes(query.toLowerCase())
        )
      );
    } else {
      setFilteredExpenses(expenses);
    }
  };

  interface Item {
    id: string,
    name: string,
    category: string,
    date: string,
    amount: number
  }
  
  const renderExpenseItem = ({ item }: { item: Item }) => (
    <View className="flex flex-row justify-between items-center bg-secondary shadow-sm rounded-lg p-4 mb-3">
      <View>
        <Text className="text-lg font-semibold text-primary">{item.name}</Text>
        <Text className="text-sm font-bold text-terinary">{item.category}</Text>
        <Text className="text-sm font-bold text-terinary">{item.date}</Text>
      </View>
      <Text className="text-lg font-semibold text-primary ">₹{item.amount}</Text>
    </View>
  );
  

  return (
    <SafeAreaView className="flex-1 bg-primary px-5">
      <Text className="text-2xl font-extrabold my-5">My Expenses</Text>

      {/* Search/Filter Bar */}
      <View className="bg-white shadow-sm rounded-lg p-3 mb-5 flex flex-row items-center">
        <AntDesign name="search1" size={20} color="#999" />
        <TextInput
          value={searchQuery}
          onChangeText={handleSearch}
          placeholder="Search by name or category"
          className="ml-3 flex-1 text-gray-700"
        />
      </View>

      {/* Expense List */}
      <FlatList
        data={filteredExpenses}
        keyExtractor={(item: Item) => item.id}
        renderItem={renderExpenseItem}
        ListEmptyComponent={
          <Text className="text-center text-gray-500 mt-5">No expenses found</Text>
        }
        contentContainerStyle={{ paddingBottom: 120 }}
      />

    </SafeAreaView>
  );
};

export default Expense;
