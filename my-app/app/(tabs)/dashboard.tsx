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

interface Item {
  id: string,
  name: string,
  category: string,
  date: string,
  amount: number
}

const expenses = [
  { id: "1", name: "Groceries", category: "Food", amount: 1500, date: "2025-01-01" },
  { id: "2", name: "Rent", category: "Housing", amount: 12000, date: "2025-01-01" },
  { id: "3", name: "Electricity Bill", category: "Utilities", amount: 3000, date: "2025-01-02" },
  { id: "4", name: "Groceries", category: "Food", amount: 1500, date: "2025-01-01" },
  { id: "5", name: "Rent", category: "Housing", amount: 12000, date: "2025-01-01" },
  { id: "6", name: "Electricity Bill", category: "Utilities", amount: 3000, date: "2025-01-02" },
];

const screenWidth = Dimensions.get("window").width;
const handleToolTip: any = {}


const colorPalette = {
  background: "#FBE4BD",
  cardBackground: "#2d2d2d",
  text: "#ffffff",
  accent: "#4a90e2",
  // Consistent colors for pie chart
  categoryColors: {
    Food: "#4a90e2",
    Housing: "#e2844a",
    Utilities: "#50c878"
  }
};

const ChartCard = ({ title, children }: {title: string, children: any}) => (
  <View
    style={{
      backgroundColor: colorPalette.cardBackground,
      borderRadius: 15,
      padding: 15,
      marginVertical: 10,
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.3,
      shadowRadius: 10,
    }}
  >
    <Text style={{ color: colorPalette.text, fontSize: 18, fontWeight: "bold", marginBottom: 15 }}>
      {title}
    </Text>
    {children}
  </View>
);

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
    color: colorPalette.categoryColors[item.name as keyof typeof colorPalette.categoryColors],
    legendFontColor: colorPalette.text,
    legendFontSize: 12,
  }));
  

  const progressChartData = {
    labels: ["Spent"],
    data: [totalExpenses / monthlyIncome],
  };

  const commonChartConfig = {
    backgroundGradientFrom: colorPalette.cardBackground,
    backgroundGradientTo: colorPalette.cardBackground,
    color: (opacity = 1) => `rgba(74, 144, 226, ${opacity})`,
    strokeWidth: 2,
    decimalPlaces: 0,
    labelColor: () => colorPalette.text,
  };

  return (
    <ScrollView style={{ backgroundColor: colorPalette.background }}>
      <View style={{ flex: 1, padding: 15, marginVertical: 5 }}>
        <Text style={{ color: "#221C0F", fontSize: 24, fontWeight: "bold", marginBottom: 20, marginTop: 25 }}>
          Expense Dashboard
        </Text>

        <ChartCard title="Expense Trends">
          <LineChart
            data={{
              labels: expenses.slice(0, 5).map((e) => e.date.slice(5)),
              datasets: [{ data: expenses.slice(0, 5).map((e) => e.amount) }],
            }}
            width={screenWidth * 0.85}
            height={220}
            chartConfig={commonChartConfig}
            bezier
          />
        </ChartCard>

        <ChartCard title="Expenses by Category">
          <BarChart
            data={{
              labels: categoryTotals.map((c) => c.name),
              datasets: [{ data: categoryTotals.map((c) => c.total) }],
            }}
            width={screenWidth * 0.85}
            height={220}
            yAxisSuffix=""
            yAxisLabel="₹"
            chartConfig={{
              ...commonChartConfig,
              color: (opacity = 1) => `rgba(226, 132, 74, ${opacity})`,
            }}
          />
        </ChartCard>

        <ChartCard title="Category Distribution">
          <PieChart
            data={pieChartData}
            width={screenWidth * 0.85}
            height={220}
            chartConfig={commonChartConfig}
            accessor="population"
            backgroundColor="transparent"
            paddingLeft="15"
          />
        </ChartCard>

        <ChartCard title="Budget Utilization">
          <ProgressChart
            data={progressChartData}
            width={screenWidth * 0.85}
            height={220}
            chartConfig={{
              ...commonChartConfig,
              color: (opacity = 1) => `rgba(80, 200, 120, ${opacity})`,
            }}
          />
        </ChartCard>

        <ChartCard title="Daily Expense Activity">
          <ContributionGraph
            values={expenses.slice(0, 7).map((e) => ({ date: e.date, count: e.amount }))}
            endDate={new Date("2025-01-07")}
            numDays={7}
            width={screenWidth * 0.85}
            height={220}
            chartConfig={commonChartConfig}
            tooltipDataAttrs={(value) => handleToolTip}
          />
        </ChartCard>
      </View>
    </ScrollView>
  );
};

const newDashboard = () => {
  return <Dashboard monthlyIncome={40000} />;
};

export default newDashboard;