import { FlatList, View } from "react-native";
import Header from "../components/header";
import ProductCard from "../components/productcard";
import { products } from "../data/product";
import { useCart } from "./context/CartContext";

export default function GuitarScreen() {
  const { cart, cartCount, addToCart } = useCart();

  const guitarProducts = products.filter(
    (product) => product.category === "Guitar",
  );

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
      <Header cartCount={cartCount} />
      <FlatList
        data={guitarProducts}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <ProductCard item={item} onAdd={addToCart} />}
      />
    </View>
  );
}
