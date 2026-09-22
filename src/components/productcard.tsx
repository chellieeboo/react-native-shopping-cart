import { useRouter } from "expo-router";
import { useRef } from "react";
import {
  Animated,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useTheme } from "../context/ThemeContext";
import { Product } from "../data/product";
import ProductImage from "./ProductImage";

type ProductCardProps = {
  item: Product;
  onAdd: (product: Product, quantity: number) => number;
  remainingStock: number;
  /** "grid" (default) for the 2-column Featured section, "compact" for the
   * horizontally-scrolling New Arrivals row. */
  variant?: "grid" | "compact";
};

export default function ProductCard({
  item,
  onAdd,
  remainingStock,
  variant = "grid",
}: ProductCardProps) {
  const router = useRouter();
  const { colors } = useTheme();
  const scale = useRef(new Animated.Value(1)).current;
  const outOfStock = remainingStock <= 0;
  const compact = variant === "compact";

  const goToDetails = () => router.push(`/product/${item.id}`);

  const handleAdd = () => {
    const added = onAdd(item, 1);
    if (added > 0) {
      Animated.sequence([
        Animated.timing(scale, {
          toValue: 0.8,
          duration: 90,
          useNativeDriver: true,
        }),
        Animated.spring(scale, {
          toValue: 1,
          friction: 4,
          useNativeDriver: true,
        }),
      ]).start();
    }
  };

  return (
    <Pressable
      onPress={goToDetails}
      style={({ pressed }) => [
        styles.card,
        compact && styles.cardCompact,
        {
          backgroundColor: colors.cardBgLight,
          borderColor: colors.border,
          opacity: pressed ? 0.92 : 1,
        },
      ]}
    >
      <View
        style={[styles.imageContainer, { backgroundColor: colors.surfaceAlt }]}
      >
        <ProductImage image={item.image} icon={item.icon} />
      </View>

      <View style={styles.body}>
        <Text
          style={[styles.category, { color: colors.textSecondary }]}
          numberOfLines={1}
        >
          {item.category}
        </Text>

        <Text
          style={[styles.name, { color: colors.textDark, minHeight: 34 }]}
          numberOfLines={2}
        >
          {item.name}
        </Text>

        <View style={styles.bottomRow}>
          <Text
            style={[styles.price, { color: colors.textDark }]}
            numberOfLines={1}
          >
            ₱{item.price.toLocaleString()}
          </Text>

          <Animated.View style={{ transform: [{ scale }] }}>
            <TouchableOpacity
              accessibilityLabel={`Add ${item.name} to cart`}
              style={[
                styles.addBtn,
                {
                  backgroundColor: outOfStock ? colors.border : colors.accent,
                },
              ]}
              onPress={handleAdd}
              disabled={outOfStock}
              hitSlop={8}
            >
              <Text style={[styles.addBtnText, { color: colors.textDark }]}>
                {outOfStock ? "✕" : "+"}
              </Text>
            </TouchableOpacity>
          </Animated.View>
        </View>

        <Text
          style={[
            styles.stock,
            { color: outOfStock ? colors.danger : colors.textSecondary },
          ]}
        >
          {outOfStock ? "Out of stock" : `${remainingStock} in stock`}
        </Text>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    flexBasis: "47%",
    flexGrow: 1,
    maxWidth: "48%",
    margin: "1.5%",
    borderRadius: 18,
    borderWidth: 1,
    overflow: "hidden",
    boxShadow: "0px 3px 8px rgba(27,36,48,0.06)",
  },
  cardCompact: {
    flexBasis: 154,
    flexGrow: 0,
    flexShrink: 0,
    maxWidth: 154,
    width: 154,
    margin: 0,
    marginRight: 12,
  },
  imageContainer: {
    width: "100%",
    aspectRatio: 1,
  },
  body: {
    padding: 12,
  },
  category: {
    fontSize: 11,
    fontWeight: "600",
    marginBottom: 3,
  },
  name: {
    fontSize: 14,
    fontWeight: "700",
    lineHeight: 18,
  },
  bottomRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 9,
    gap: 6,
  },
  price: {
    fontSize: 15,
    fontWeight: "800",
    flexShrink: 1,
  },
  addBtn: {
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0,
  },
  addBtnText: {
    fontSize: 18,
    fontWeight: "800",
    marginTop: -1,
  },
  stock: {
    fontSize: 10,
    fontWeight: "600",
    marginTop: 6,
  },
});
