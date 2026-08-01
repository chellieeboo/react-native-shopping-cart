import { FlatList, View } from "react-native";
import Header from "../components/header";
import ProductCard from "../components/productcard";
import { products } from "../data/product";
export default function HomeScreen() {
  const addToCart = (item: { name: string }) => {
    alert(item.name + " added!");
  };
  return (
    <View>
      <Header />
      <FlatList
        data={products}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <ProductCard item={item} onAdd={addToCart} />}
      />
    </View>
  );
}
