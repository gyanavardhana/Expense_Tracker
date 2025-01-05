import React from "react";
import { View, Text, FlatList, Dimensions } from "react-native";
import {
  LineChart,
  BarChart,
  PieChart,
  ProgressChart,
  ContributionGraph,
} from "react-native-chart-kit";

interface Item {
  id: string;
  name: string;
  category: string;
  date: string;
  amount: number;
}

interface ChartItem {
  id: string;
  type: string;
  component: React.ReactElement;
}

// ... Keep your existing expenses and colorPalette objects the same ...
const expenses = [
  { id: "1", name: "Education Expense", category: "Transportation", amount: 13359, date: "2024-12-09" },
  { id: "2", name: "Healthcare Expense", category: "Entertainment", amount: 10457, date: "2024-01-26" },
  { id: "3", name: "Transportation Expense", category: "Food", amount: 9614, date: "2024-07-25" },
  { id: "4", name: "Housing Expense", category: "Entertainment", amount: 19359, date: "2024-09-15" },
  { id: "5", name: "Entertainment Expense", category: "Education", amount: 9827, date: "2024-01-27" },
  { id: "6", name: "Food Expense", category: "Education", amount: 12627, date: "2024-01-22" },
  { id: "7", name: "Healthcare Expense", category: "Housing", amount: 14346, date: "2024-12-08" },
  { id: "8", name: "Education Expense", category: "Utilities", amount: 15110, date: "2024-06-12" },
  { id: "9", name: "Entertainment Expense", category: "Healthcare", amount: 18023, date: "2024-12-16" },
  { id: "10", name: "Other Expense", category: "Education", amount: 19389, date: "2024-10-10" },
];

const screenWidth = Dimensions.get("window").width;

const colorPalette = {
  background: "#FBE4BD",
  cardBackground: "#2d2d2d",
  text: "#ffffff",
  accent: "#4a90e2",
  categoryColors: {
    Transportation: "#4a90e2",
    Entertainment: "#e2844a",
    Food: "#50c878",
    Education: "#e25874",
    Housing: "#9b59b6",
    Utilities: "#f1c40f",
    Healthcare: "#1abc9c",
    Other: "#95a5a6",
  },
};
const handleToolTip: any = {};
const ChartCard = ({ title, children }: { title: string; children: any }) => (
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
      width: screenWidth - 30, // Account for padding
    }}
  >
    <Text style={{ color: colorPalette.text, fontSize: 18, marginBottom: 15 }} className="font-extrabold">
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
  const formatDate = (date: string) => {
    const d = new Date(date);
    return d.toISOString().split('T')[0];
  };
  const contributionData = expenses.map(expense => ({
    date: formatDate(expense.date),
    count: Math.floor(expense.amount / 1000) // Scale down the values to make them more visible
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

  const chartData: ChartItem[] = [
    {
      id: "trends",
      type: "line",
      component: (
        <ChartCard title="Expense Trends">
          <LineChart
            data={{
              labels: expenses.slice(0, 5).map((e) => e.date.slice(5)),
              datasets: [{ data: expenses.slice(0, 5).map((e) => e.amount) }],
            }}
            width={screenWidth - 60}
            height={220}
            chartConfig={commonChartConfig}
            bezier
          />
        </ChartCard>
      ),
    },
    {
      id: "category",
      type: "bar",
      component: (
        <ChartCard title="Expenses by Category">
          <BarChart
            data={{
              labels: categoryTotals.map((c) => c.name.slice(0, 3)),
              datasets: [{ data: categoryTotals.map((c) => c.total) }],
            }}
            width={screenWidth - 60}
            height={220}
            yAxisSuffix=""
            yAxisLabel="₹"
            chartConfig={{
              ...commonChartConfig,
              color: (opacity = 1) => `rgba(226, 132, 74, ${opacity})`,
            }}
            verticalLabelRotation={45}
          />
        </ChartCard>
      ),
    },
    {
      id: "distribution",
      type: "pie",
      component: (
        <ChartCard title="Category Distribution">
          <PieChart
            data={pieChartData}
            width={screenWidth - 60}
            height={220}
            chartConfig={commonChartConfig}
            accessor="population"
            backgroundColor="transparent"
            paddingLeft="15"
            absolute
          />
        </ChartCard>
      ),
    },
    {
      id: "budget",
      type: "progress",
      component: (
        <ChartCard title="Budget Utilization">
          <ProgressChart
            data={progressChartData}
            width={screenWidth - 60}
            height={220}
            chartConfig={{
              ...commonChartConfig,
              color: (opacity = 1) => `rgba(80, 200, 120, ${opacity})`,
            }}
          />
        </ChartCard>
      ),
    },
    {
      id: "activity",
      type: "contribution",
      component: (
        <ChartCard title="Daily Expense Activity">
          <ContributionGraph
            values={contributionData}
            endDate={new Date("2024-12-31")}
            numDays={100}
            width={screenWidth - 60}
            height={220}
            chartConfig={{
              ...commonChartConfig,
              backgroundGradientFrom: colorPalette.cardBackground,
              backgroundGradientTo: colorPalette.cardBackground,
              color: (opacity = 1) => `rgba(74, 144, 226, ${opacity})`,
              strokeWidth: 2,
              decimalPlaces: 0,
              labelColor: () => colorPalette.text,
            }}
            tooltipDataAttrs={(value) => handleToolTip}
            squareSize={15}
            gutterSize={5}
          />
        </ChartCard>
      )
          }
  ];

  const renderItem = ({ item }: { item: ChartItem }) => item.component;

  return (
    <View className=" flex-1 bg-primary">
       <View style={{ flex: 1, backgroundColor: colorPalette.background }} className="mb-20">
      <Text style={{ color: "#221C0F", padding: 15 }} className="font-extrabold text-2xl mt-10">
        Dashboard
      </Text>
      <FlatList
        data={chartData}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ padding: 15 }}
        showsVerticalScrollIndicator={false}
      />
    </View>
    </View>
   
  );
};

const newDashboard = () => {
  return <Dashboard monthlyIncome={1000000} />;
};

export default newDashboard;