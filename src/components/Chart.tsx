import { Dish } from "../types";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";
import { colors } from "../theme/theme";

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
    },
    {
      name: "No Category",
      value: dishes.filter((d) => !d.category).length
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
