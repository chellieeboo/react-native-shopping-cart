import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { CartItem as CartItemType } from "../context/CartContext";
import { useTheme } from "../context/ThemeContext";
import ProductImage from "./ProductImage";
import QuantitySelector from "./QuantitySelector";

type CartItemProps = {
  item: CartItemType;
  onIncrement: () => void;
  onDecrement: () => void;
  onRemove: () => void;
};

export default function CartItem({
  item,
  onIncrement,
  onDecrement,
  onRemove,
}: CartItemProps) {
  const { isDark, colors } = useTheme();
  const cardBgColor = isDark ? colors.cardBg : colors.cardBgLight;

  return (
    <View style={[styles.card, { backgroundColor: cardBgColor }]}>
      <ProductImage
        image={item.image}
        icon={item.icon}
        size={90}
        borderRadius={12}
      />

      <View style={styles.details}>
        <View>
          <Text style={[styles.category, { color: colors.accent }]}>
            {item.category}
          </Text>
          <Text
            style={[styles.name, { color: colors.textDark }]}
            numberOfLines={2}
          >
            {item.name}
          </Text>
          <Text style={[styles.price, { color: colors.textDark }]}>
            ₱{(item.price * item.quantity).toLocaleString()}
          </Text>
        </View>

        <View style={styles.controlsRow}>
          <QuantitySelector
            quantity={item.quantity}
            onIncrement={onIncrement}
            onDecrement={onDecrement}
            min={1}
            max={item.stock}
          />

          <TouchableOpacity
            style={styles.removeButton}
            onPress={onRemove}
            activeOpacity={0.7}
          >
            <Text style={styles.removeButtonText}>🗑️ Remove</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    width: "100%",
    marginBottom: 14,
    padding: 14,
    borderRadius: 18,
    boxShadow: "0px 2px 6px rgba(0,0,0,0.12)",
    gap: 14,
  },
  details: {
    flex: 1,
    justifyContent: "space-between",
  },
  category: {
    fontSize: 11,
    fontWeight: "800",
    textTransform: "uppercase",
    letterSpacing: 0.8,
  },
  name: {
    fontSize: 15,
    fontWeight: "700",
    marginVertical: 2,
  },
  price: {
    fontSize: 15,
    fontWeight: "600",
  },
  controlsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 10,
  },
  removeButton: {
    backgroundColor: "rgba(181, 88, 63, 0.15)",
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 10,
    minHeight: 38,
    justifyContent: "center",
    alignItems: "center",
  },
  removeButtonText: {
    color: "#E57373",
    fontSize: 12,
    fontWeight: "700",
  },
});
