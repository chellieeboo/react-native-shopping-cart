import { FlatList, View } from "react-native";
import Header from "../components/header";
import ProductCard from "../components/productcard";
import { products } from "../data/product";
import { useCart } from "./context/CartContext";

export default function LaptopScreen() {
  const { cart, addToCart } = useCart();

  return (
    <View
      style={{
        flex: 1,
        width: "100%",
        maxWidth: 600,
        alignSelf: "center",
        backgroundColor: "#f5f5f5",
      }}
    >
      <Header cartCount={cart.length} />

      <FlatList
        data={products}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <ProductCard item={item} onAdd={addToCart} />}
      />
    </View>
  );
}