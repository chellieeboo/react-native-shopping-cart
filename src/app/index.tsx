import { useState } from "react";
import { FlatList, SafeAreaView, StyleSheet } from "react-native";
import { useCart } from "../app/context/CartContext";
import { useTheme } from "../app/context/ThemeContext";
import Header from "../components/header";
import ProductCard from "../components/productcard";
import { products } from "../data/product";

export default function HomeScreen() {
  const { cart, addToCart } = useCart();
  const { colors } = useTheme();

  // State para sa napiling category
  const [selectedCategory, setSelectedCategory] = useState("All");

  // I-filter ang mga produkto batay sa Napiling Category
  const filteredProducts =
    selectedCategory === "All"
      ? products
      : products.filter(
          (product) =>
            product.category.toLowerCase() === selectedCategory.toLowerCase(),
        );

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: colors.background }]}
    >
      <FlatList
        data={filteredProducts}
        keyExtractor={(item) => item.id}
        ListHeaderComponent={
          <Header
            cartCount={cart.length}
            selectedCategory={selectedCategory}
            onSelectCategory={(category) => setSelectedCategory(category)}
          />
        }
        renderItem={({ item }) => <ProductCard item={item} onAdd={addToCart} />}
        contentContainerStyle={styles.listContent}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  listContent: {
    paddingBottom: 30,
  },
});
