import { Dish } from "../types";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";
import { colors } from "../theme/theme";

const data01 = [
  { name: "Group A", value: 400 },
  { name: "Group B", value: 300 },
  { name: "Group C", value: 300 },
  { name: "Group D", value: 200 },
  { name: "Group E", value: 278 },
  { name: "Group F", value: 189 }
];

const data02 = [
  { name: "Group A", value: 2400 },
  { name: "Group B", value: 4567 },
  { name: "Group C", value: 1398 },
  { name: "Group D", value: 9800 },
  { name: "Group E", value: 3908 },
  { name: "Group F", value: 4800 }
];

export default function Chart(props: { dishes: Dish[]; dataType: string }) {
  const { dishes, dataType } = props;
  const categoryData = () => [
    {
      name: "Mains",
      value: dishes.filter((d) => d.category === "main").length
    },
    {
      name: "Sides",
      value: dishes.filter((d) => d.category === "side").length
    },
    {
      name: "Desserts",
      value: dishes.filter((d) => d.category === "dessert").length
    },
    {
      name: "Beverages",
      value: dishes.filter((d) => d.category === "beverage").length
    }
  ];
  const dietaryData = () => [
    {
      name: "Vegetarian",
      value: dishes.filter((d) => d.isVegetarian && !d.isVegan).length
    },
    {
      name: "Vegan",
      value: dishes.filter((d) => d.isVegan).length
    },
    {
      name: "Gluten Free",
      value: dishes.filter((d) => d.isGlutenFree).length
    },
    {
      name: "Dairy Free",
      value: dishes.filter((d) => d.isDairyFree && !d.isVegan).length
    },
    {
      name: "Kosher",
      value: dishes.filter((d) => d.isKosher).length
    },
    {
      name: "Halal",
      value: dishes.filter((d) => d.isHalal).length
    },
    {
      name: "No Restrictions",
      value: dishes.filter((d) => {
        return (
          !d.isVegetarian &&
          !d.isVegan &&
          !d.isGlutenFree &&
          !d.isDairyFree &&
          !d.isKosher &&
          !d.isHalal
        );
      }).length
    }
  ];

  const data = dataType === "category" ? categoryData() : dietaryData();

  return (
    <ResponsiveContainer width="100%" height="100%">
      <PieChart width={400} height={400}>
        <Pie
          dataKey="value"
          isAnimationActive={true}
          data={data}
          outerRadius={80}
          fill="#8884d8"
        >
          {data.map((entry, index) => (
            <Cell fill={colors[index % colors.length]} />
          ))}
        </Pie>
        <Tooltip />
      </PieChart>
    </ResponsiveContainer>
  );
}
