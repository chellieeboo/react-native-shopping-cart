import { useState } from "react";
import {
  Image,
  Modal,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useTheme } from "../app/context/ThemeContext";

type Product = {
  id: string;
  name: string;
  price: number;
  category: string;
  inStock: boolean;
  description: string;
  image: any;
};

export default function ProductCard({
  item,
  onAdd,
}: {
  item: Product;
  onAdd: (product: Product, quantity: number) => void;
}) {
  const { isDark, colors } = useTheme();
  const [modalVisible, setModalVisible] = useState(false);
  const [quantity, setQuantity] = useState(1);

  const incrementQty = () => setQuantity((prev) => prev + 1);
  const decrementQty = () => setQuantity((prev) => (prev > 1 ? prev - 1 : 1));

  const handleAdd = () => {
    onAdd(item, quantity);
    setQuantity(1);
  };

  const cardBgColor = isDark ? "#2D2622" : colors.cardBg;
  const categoryTextColor = isDark ? "#F4C430" : "#8B5E3C";

  return (
    <View style={[styles.card, { backgroundColor: cardBgColor }]}>
      <Pressable onPress={() => setModalVisible(true)}>
        <Image source={item.image} style={styles.image} />
      </Pressable>

      <Text style={[styles.categoryTag, { color: categoryTextColor }]}>
        {item.category}
      </Text>

      <Text style={[styles.name, { color: colors.textLight }]}>
        {item.name}
      </Text>

      <Text style={[styles.price, { color: colors.accent }]}>
        ₱{item.price ? item.price.toLocaleString() : item.price}
      </Text>

      <View style={styles.quantityContainer}>
        <TouchableOpacity style={styles.qtyBtn} onPress={decrementQty}>
          <Text style={styles.qtyBtnText}>-</Text>
        </TouchableOpacity>

        <Text style={[styles.qtyText, { color: colors.textLight }]}>
          {quantity}
        </Text>

        <TouchableOpacity style={styles.qtyBtn} onPress={incrementQty}>
          <Text style={styles.qtyBtnText}>+</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity
        style={[styles.addButton, { backgroundColor: colors.accent }]}
        onPress={handleAdd}
      >
        <Text style={[styles.addButtonText, { color: colors.textDark }]}>
          🛒 Add {quantity} to Cart
        </Text>
      </TouchableOpacity>

      <Modal
        visible={modalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={[styles.modalContent, { backgroundColor: cardBgColor }]}>
            <Image source={item.image} style={styles.modalImage} />

            <Text style={[styles.categoryTag, { color: categoryTextColor }]}>
              {item.category}
            </Text>

            <Text style={[styles.name, { color: colors.textLight }]}>
              {item.name}
            </Text>

            <Text style={[styles.price, { color: colors.accent }]}>
              ₱{item.price ? item.price.toLocaleString() : item.price}
            </Text>

            <Text style={[styles.description, { color: colors.textMuted }]}>
              {item.description}
            </Text>

            <Text style={[styles.stockStatus, { color: "#4CAF50" }]}>
              ✓ In Stock & Ready to Ship
            </Text>

            <View style={[styles.quantityContainer, { marginVertical: 12 }]}>
              <TouchableOpacity style={styles.qtyBtn} onPress={decrementQty}>
                <Text style={styles.qtyBtnText}>-</Text>
              </TouchableOpacity>

              <Text style={[styles.qtyText, { color: colors.textLight }]}>
                {quantity}
              </Text>

              <TouchableOpacity style={styles.qtyBtn} onPress={incrementQty}>
                <Text style={styles.qtyBtnText}>+</Text>
              </TouchableOpacity>
            </View>

            <TouchableOpacity
              style={[
                styles.addButton,
                { backgroundColor: colors.accent, width: "100%" },
              ]}
              onPress={() => {
                handleAdd();
                setModalVisible(false);
              }}
            >
              <Text
                style={[
                  styles.addButtonText,
                  { color: colors.textDark, textAlign: "center" },
                ]}
              >
                Add {quantity} to Cart
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => setModalVisible(false)}
              style={styles.closeButton}
            >
              <Text
                style={[styles.closeButtonText, { color: colors.textMuted }]}
              >
                Close Quick View
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    padding: 18,
    margin: 12,
    borderRadius: 20,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 8,
    elevation: 6,
  },
  image: {
    width: 180,
    height: 180,
    resizeMode: "cover",
    borderRadius: 14,
    marginBottom: 10,
  },
  categoryTag: {
    fontSize: 12,
    fontWeight: "800",
    textTransform: "uppercase",
    letterSpacing: 1,
    marginBottom: 4,
  },
  name: {
    fontSize: 17,
    fontWeight: "700",
    marginBottom: 4,
    textAlign: "center",
  },
  price: {
    fontSize: 16,
    fontWeight: "700",
    marginBottom: 8,
  },
  quantityContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
    backgroundColor: "rgba(255,255,255,0.08)",
    borderRadius: 15,
    paddingHorizontal: 10,
    paddingVertical: 4,
  },
  qtyBtn: {
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  qtyBtnText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#D4AF37",
  },
  qtyText: {
    fontSize: 15,
    fontWeight: "700",
    marginHorizontal: 12,
  },
  description: {
    fontSize: 13,
    textAlign: "center",
    marginBottom: 10,
    lineHeight: 18,
  },
  stockStatus: {
    fontSize: 12,
    fontWeight: "600",
    marginBottom: 4,
  },
  addButton: {
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 25,
  },
  addButtonText: {
    fontWeight: "700",
    fontSize: 14,
  },
  closeButton: {
    marginTop: 12,
    paddingVertical: 8,
  },
  closeButtonText: {
    fontSize: 13,
    textDecorationLine: "underline",
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.75)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    padding: 24,
    borderRadius: 20,
    alignItems: "center",
    width: "85%",
    maxWidth: 400,
  },
  modalImage: {
    width: 200,
    height: 200,
    resizeMode: "cover",
    borderRadius: 14,
    marginBottom: 12,
  },
});
