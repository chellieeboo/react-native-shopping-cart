import { FlatList, View } from "react-native";
import Header from "../components/header";
import ProductCard from "../components/productcard";
import { packages } from "../data/packages";
import { useCart } from "./context/CartContext";

export default function MemorialScreen() {
  const { cart, cartCount, addToCart } = useCart();

  const memorialPackages = packages.filter(
    (pkg) => pkg.mainCategory === "Memorial",
  );

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
        data={memorialPackages}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <ProductCard item={item} onAdd={addToCart} />}
      />
    </View>
  );
}
