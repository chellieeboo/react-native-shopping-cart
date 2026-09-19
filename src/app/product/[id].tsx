import { useLocalSearchParams, useRouter } from "expo-router";
import { useState } from "react";
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useCart } from "../../context/CartContext";
import { useTheme } from "../../context/ThemeContext";
import ProductImage from "../../components/ProductImage";
import QuantitySelector from "../../components/QuantitySelector";
import { products } from "../../data/product";

export default function ProductDetailsScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const { colors } = useTheme();
  const { addToCart, getRemainingStock } = useCart();

  const product = products.find((p) => p.id === id);
  const [quantity, setQuantity] = useState(1);
  const [justAdded, setJustAdded] = useState(false);

  if (!product) {
    return (
      <SafeAreaView
        style={[styles.container, { backgroundColor: colors.background }]}
      >
        <View style={styles.notFound}>
          <Text style={[styles.notFoundText, { color: colors.textDark }]}>
            We couldn't find that product.
          </Text>
          <TouchableOpacity
            style={[styles.backButton, { backgroundColor: colors.accent }]}
            onPress={() => router.back()}
          >
            <Text style={[styles.backButtonText, { color: colors.textDark }]}>
              ← Back
            </Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  const remainingStock = getRemainingStock(product);
  const outOfStock = remainingStock <= 0;
  const maxSelectable = Math.max(remainingStock, 1);

  const handleAdd = () => {
    const added = addToCart(product, quantity);
    if (added > 0) {
      setJustAdded(true);
      setQuantity(1);
      setTimeout(() => setJustAdded(false), 1200);
    }
  };

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: colors.background }]}
    >
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <TouchableOpacity
          style={[styles.backButton, { backgroundColor: colors.categoryBtn }]}
          onPress={() => router.back()}
        >
          <Text style={[styles.backButtonText, { color: colors.textLight }]}>
            ← Back
          </Text>
        </TouchableOpacity>

        <View style={styles.imageWrapper}>
          <ProductImage
            image={product.image}
            icon={product.icon}
            size={260}
            borderRadius={20}
          />
        </View>

        <Text style={[styles.category, { color: colors.accent }]}>
          {product.category}
        </Text>

        <Text style={[styles.name, { color: colors.textDark }]}>
          {product.name}
        </Text>

        <Text style={[styles.price, { color: colors.textDark }]}>
          ₱{product.price.toLocaleString()}
        </Text>

        <Text
          style={[
            styles.stock,
            { color: outOfStock ? colors.danger : colors.success },
          ]}
        >
          {outOfStock
            ? "Out of stock"
            : `✓ ${remainingStock} unit${remainingStock === 1 ? "" : "s"} available`}
        </Text>

        <Text style={[styles.description, { color: colors.textSecondary }]}>
          {product.description}
        </Text>

        {!outOfStock && (
          <View style={styles.qtySection}>
            <Text style={[styles.qtyLabel, { color: colors.textDark }]}>
              Quantity
            </Text>
            <QuantitySelector
              quantity={quantity}
              onIncrement={() =>
                setQuantity((q) => Math.min(q + 1, maxSelectable))
              }
              onDecrement={() => setQuantity((q) => Math.max(q - 1, 1))}
              min={1}
              max={maxSelectable}
            />
          </View>
        )}

        <TouchableOpacity
          style={[
            styles.addButton,
            {
              backgroundColor: outOfStock ? colors.textSecondary : colors.accent,
            },
          ]}
          onPress={handleAdd}
          disabled={outOfStock}
        >
          <Text style={[styles.addButtonText, { color: colors.textDark }]}>
            {outOfStock
              ? "Out of Stock"
              : justAdded
                ? "Added to Cart ✓"
                : `Add ${quantity} to Cart`}
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    padding: 16,
    paddingBottom: 40,
    alignItems: "center",
  },
  backButton: {
    alignSelf: "flex-start",
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
    marginBottom: 16,
  },
  backButtonText: {
    fontWeight: "700",
    fontSize: 13,
  },
  imageWrapper: {
    marginBottom: 16,
  },
  category: {
    fontSize: 12,
    fontWeight: "800",
    textTransform: "uppercase",
    letterSpacing: 1,
    marginBottom: 6,
  },
  name: {
    fontSize: 22,
    fontWeight: "800",
    textAlign: "center",
    marginBottom: 8,
    paddingHorizontal: 12,
  },
  price: {
    fontSize: 22,
    fontWeight: "700",
    marginBottom: 8,
  },
  stock: {
    fontSize: 13,
    fontWeight: "700",
    marginBottom: 16,
  },
  description: {
    fontSize: 14,
    lineHeight: 21,
    textAlign: "center",
    marginBottom: 22,
    paddingHorizontal: 8,
  },
  qtySection: {
    alignItems: "center",
    marginBottom: 22,
  },
  qtyLabel: {
    fontSize: 13,
    fontWeight: "700",
    marginBottom: 8,
  },
  addButton: {
    paddingVertical: 14,
    paddingHorizontal: 40,
    borderRadius: 25,
    width: "100%",
    maxWidth: 320,
    alignItems: "center",
  },
  addButtonText: {
    fontWeight: "800",
    fontSize: 15,
  },
  notFound: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
    gap: 16,
  },
  notFoundText: {
    fontSize: 15,
    fontWeight: "600",
  },
});
