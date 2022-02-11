import { Dish } from "../types";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  Legend
} from "recharts";

export default function Chart(props: { dishes: Dish[] }) {
  const { dishes } = props;

  const colors = [
    "#0088FE", // blue
    "#00C49F", // green
    "#FFBB28", // orange
    "#FF8042", // red
    "#FF00FF", // purple
    "#00FFFF", // cyan
    "#00FF00", // lime
    "#FF00FF", // magenta
  ];
  const renderCustomizedLabel = (data: any) => {
    const { name, value, x, y, cx } = data;
    if (value === 0) return null;
    return name;
    return <text>{name}</text>;
  };

  const categoryData = [
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
    },
    {
      name: "No Category",
      value: dishes.filter((d) => !d.category).length
    }
  ];
  const dietaryData = [
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

  return (
    <ResponsiveContainer width="100%" height="100%">
      <PieChart width={400} height={600}>
        <Pie
          data={categoryData}
          dataKey="value"
          cx="50%"
          cy="50%"
          outerRadius={60}
        >
          {dietaryData.map((entry, index) => (
            <Cell fill={colors[index % colors.length]} />
          ))}
        </Pie>
        <Pie
          data={dietaryData}
          dataKey="value"
          cx="50%"
          cy="50%"
          innerRadius={70}
          outerRadius={90}
        >
          {categoryData.map((entry, index) => (
            <Cell fill={colors[index % colors.length]} />
          ))}
        </Pie>
        <Tooltip />
      </PieChart>
    </ResponsiveContainer>
  );
}
