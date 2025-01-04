import React from "react";
import { View, Text, ScrollView } from "react-native";
import {
  LineChart,
  BarChart,
  PieChart,
  ProgressChart,
  ContributionGraph,
} from "react-native-chart-kit";
import { Dimensions } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const expenses = [
  { id: "1", name: "Groceries", category: "Food", amount: 1500, date: "2025-01-01" },
  { id: "2", name: "Rent", category: "Housing", amount: 12000, date: "2025-01-01" },
  { id: "3", name: "Electricity Bill", category: "Utilities", amount: 3000, date: "2025-01-02" },
  { id: "4", name: "Groceries", category: "Food", amount: 1500, date: "2025-01-01" },
  { id: "5", name: "Rent", category: "Housing", amount: 12000, date: "2025-01-01" },
  { id: "6", name: "Electricity Bill", category: "Utilities", amount: 3000, date: "2025-01-02" },
];

const screenWidth = Dimensions.get("window").width;

// Define the color palette
const colorPalette = {
  primary: "#FBE4BD",
  secondary: "#967959",
  terinary: "#221C0F",
};

const Dashboard = ({ monthlyIncome }: { monthlyIncome: number }) => {
  const categories = [...new Set(expenses.map((expense) => expense.category))];
  const totalExpenses = expenses.reduce((acc, curr) => acc + curr.amount, 0);
  const categoryTotals = categories.map((category) => ({
    name: category,
    total: expenses
      .filter((e) => e.category === category)
      .reduce((acc, curr) => acc + curr.amount, 0),
  }));

  const pieChartData = categoryTotals.map((item) => ({
    name: item.name,
    population: item.total,
    color: `#${Math.floor(Math.random() * 16777215).toString(16).padStart(6, '0')}`, // Random color
    legendFontColor: "#7F7F7F",
    legendFontSize: 15,
  }));

  const progressChartData = {
    labels: ["Spent"],
    data: [totalExpenses / monthlyIncome],
  };

  return (
    <ScrollView style={{ backgroundColor: colorPalette.primary }}>
      <View className="flex-1  p-5 my-5">
      <Text className="text-2xl  font-extrabold my-5">Dashboard </Text>
      <View className="flex-1 items-center p-5">
        {/* Line Chart */}
        <View className="bg-terinary ">
        <LineChart
          data={{
            labels: expenses.slice(0, 5).map((e) => e.date),
            datasets: [{ data: expenses.slice(0, 5).map((e) => e.amount) }],
          }}
          width={screenWidth * 0.9}
          height={220}
          chartConfig={{
            backgroundGradientFrom: colorPalette.primary,
            backgroundGradientTo: colorPalette.primary,
            color: (opacity = 1) => `rgba(0, 0, 255, ${opacity})`,
            strokeWidth: 2,
          }}
          bezier
          style={{
            borderRadius: 15,
            shadowColor: colorPalette.secondary,
            shadowOffset: { width: 0, height: 4 },
            shadowOpacity: 0.1,
            shadowRadius: 10,
          }}
        />
        </View>
        

        {/* Bar Chart */}
        <BarChart
          data={{
            labels: categoryTotals.map((c) => c.name),
            datasets: [{ data: categoryTotals.map((c) => c.total) }],
          }}
          width={screenWidth * 0.9}
          height={220}
          yAxisLabel="₹"
          yAxisSuffix=""
          chartConfig={{
            backgroundGradientFrom: colorPalette.primary,
            backgroundGradientTo: colorPalette.primary,
            color: (opacity = 1) => `rgba(255, 0, 0, ${opacity})`,
            strokeWidth: 2,
          }}
          style={{
            borderRadius: 15,
            shadowColor: colorPalette.secondary,
            shadowOffset: { width: 0, height: 4 },
            shadowOpacity: 0.1,
            shadowRadius: 10,
          }}
        />

        {/* Pie Chart */}
        <PieChart
          data={pieChartData}
          width={screenWidth * 0.9}
          height={220}
          chartConfig={{
            backgroundColor: colorPalette.primary,
            color: (opacity = 1) => `rgba(0, 0, 255, ${opacity})`,
          }}
          accessor="population"
          backgroundColor="transparent"
          paddingLeft="15"
          style={{
            borderRadius: 15,
            shadowColor: colorPalette.secondary,
            shadowOffset: { width: 0, height: 4 },
            shadowOpacity: 0.1,
            shadowRadius: 10,
          }}
        />

        {/* Progress Chart */}
        <ProgressChart
          data={progressChartData}
          width={screenWidth * 0.9}
          height={220}
          chartConfig={{
            backgroundGradientFrom: colorPalette.primary,
            backgroundGradientTo: colorPalette.primary,
            color: (opacity = 1) => `rgba(0, 255, 0, ${opacity})`,
            strokeWidth: 2,
          }}
          style={{
            borderRadius: 15,
            shadowColor: colorPalette.secondary,
            shadowOffset: { width: 0, height: 4 },
            shadowOpacity: 0.1,
            shadowRadius: 10,
          }}
        />

        {/* Contribution Graph */}
        <ContributionGraph
          values={expenses
            .slice(0, 7)
            .map((e) => ({ date: e.date, count: e.amount }))}
          endDate={new Date("2025-01-07")}
          numDays={7}
          width={screenWidth * 0.9}
          height={220}
          chartConfig={{
            backgroundGradientFrom: colorPalette.primary,
            backgroundGradientTo: colorPalette.primary,
            color: (opacity = 1) => `rgba(0, 128, 128, ${opacity})`,
          }}
          tooltipDataAttrs={(value) => ({
            fill: "rgba(0, 128, 128, 0.8)",
            stroke: "black",
          })}
          style={{
            borderRadius: 15,
            shadowColor: colorPalette.secondary,
            shadowOffset: { width: 0, height: 4 },
            shadowOpacity: 0.1,
            shadowRadius: 10,
          }}
        />

      </View>

        
      </View>
    </ScrollView>
  );
};

const newDashboard = () => {
  return <Dashboard monthlyIncome={50000} />
};

export default newDashboard;
