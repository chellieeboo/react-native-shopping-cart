import { FlatList, View } from "react-native";
import { useCart } from "../app/context/CartContext";
import Header from "../components/header";
import ProductCard from "../components/productcard";
import { packages } from "../data/packages";

export default function HomeScreen() {
  const { cart, cartCount, addToCart } = useCart();

  return (
    <View
      style={{
        flex: 1,
        width: "100%",
        maxWidth: 600,
        alignSelf: "center",
        backgroundColor: "#FAF3E8",
      }}
    >
      <Header cartCount={cartCount} />
      <FlatList
        data={packages}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <ProductCard item={item} onAdd={addToCart} />}
      />
    </View>
  );
}
