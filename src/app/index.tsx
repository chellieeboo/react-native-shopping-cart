import { FlatList, View } from "react-native";
import { useCart } from "../app/context/CartContext";
import Header from "../components/header";
import ProductCard from "../components/productcard";
import { products } from "../data/product";

export default function HomeScreen() {
  const { cart, addToCart } = useCart();

  const handleAdd = (product: any) => {
    addToCart(product);
    if (typeof window !== "undefined") {
      window.alert(`${product.name} has been added to your cart.`);
    }
  };

  return (
    // 👈 ITONG STYLE NA 'TO ANG MAG-AAYOS NG WIDE LAYOUT!
    <View
      style={{
        flex: 1,
        maxWidth: 500,
        width: "100%",
        alignSelf: "center",
        backgroundColor: "#f5f5f5",
      }}
    >
      <Header cartCount={cart.length} />
      <FlatList
        data={products}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <ProductCard item={item} onAdd={handleAdd} />}
      />
    </View>
  );
}
