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

export default function ProductCard({
  item,
  onAdd,
}: {
  item: any;
  onAdd: any;
}) {
  const [modalVisible, setModalVisible] = useState(false);

  const isOutOfStock = item.stock === 0;
  const isLowStock = item.stock > 0 && item.stock <= 3;

  return (
    <View style={styles.card}>
      <Pressable onPress={() => setModalVisible(true)}>
        <Image source={item.image} style={styles.image} />
      </Pressable>

      <Text style={styles.name}>{item.name}</Text>
      <Text style={styles.price}>₱{item.price}</Text>

      {isOutOfStock ? (
        <Text style={styles.outOfStock}>Out of Stock</Text>
      ) : isLowStock ? (
        <Text style={styles.lowStock}>Only {item.stock} left!</Text>
      ) : (
        <Text style={styles.inStock}>In Stock</Text>
      )}

      <TouchableOpacity
        onPress={() => onAdd(item)}
        disabled={isOutOfStock}
        style={[styles.addButton, isOutOfStock && styles.addButtonDisabled]}
      >
        <Text style={styles.addButtonText}>
          {isOutOfStock ? "Unavailable" : "Add to Cart"}
        </Text>
      </TouchableOpacity>

      <Modal
        visible={modalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Image source={item.image} style={styles.modalImage} />
            <Text style={styles.name}>{item.name}</Text>
            <Text style={styles.price}>₱{item.price}</Text>
            <Text style={styles.category}>{item.category}</Text>

            {isOutOfStock ? (
              <Text style={styles.outOfStock}>Out of Stock</Text>
            ) : isLowStock ? (
              <Text style={styles.lowStock}>Only {item.stock} left!</Text>
            ) : (
              <Text style={styles.inStock}>{item.stock} in stock</Text>
            )}

            <TouchableOpacity
              onPress={() => {
                onAdd(item);
                setModalVisible(false);
              }}
              disabled={isOutOfStock}
              style={[
                styles.addButton,
                isOutOfStock && styles.addButtonDisabled,
                { marginTop: 12 },
              ]}
            >
              <Text style={styles.addButtonText}>
                {isOutOfStock ? "Unavailable" : "Add to Cart"}
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => setModalVisible(false)}
              style={styles.closeButton}
            >
              <Text style={styles.closeButtonText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#4A2C20",
    padding: 18,
    margin: 12,
    borderRadius: 20,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 6,
  },
  image: {
    width: 180,
    height: 180,
    resizeMode: "cover",
    borderRadius: 14,
    marginBottom: 12,
  },
  name: {
    fontSize: 18,
    fontWeight: "700",
    color: "#F5EBDD",
    marginBottom: 4,
    textAlign: "center",
  },
  price: {
    fontSize: 16,
    color: "#D6A85F",
    fontWeight: "600",
    marginBottom: 6,
  },
  category: {
    fontSize: 13,
    color: "#E8DED2",
    marginBottom: 6,
    fontStyle: "italic",
  },
  inStock: {
    color: "#8FD694",
    fontSize: 13,
    marginBottom: 10,
  },
  lowStock: {
    color: "#FFD166",
    fontWeight: "bold",
    fontSize: 13,
    marginBottom: 10,
  },
  outOfStock: {
    color: "#FF8A80",
    fontWeight: "bold",
    fontSize: 13,
    marginBottom: 10,
  },
  addButton: {
    backgroundColor: "#D6A85F",
    paddingVertical: 10,
    paddingHorizontal: 28,
    borderRadius: 25,
  },
  addButtonDisabled: {
    backgroundColor: "#7A6A5D",
  },
  addButtonText: {
    color: "#2B1810",
    fontWeight: "700",
    fontSize: 14,
  },
  closeButton: {
    marginTop: 8,
    paddingVertical: 6,
  },
  closeButtonText: {
    color: "#E8DED2",
    fontSize: 13,
    textDecorationLine: "underline",
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.6)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    backgroundColor: "#4A2C20",
    padding: 28,
    borderRadius: 20,
    alignItems: "center",
    width: "80%",
  },
  modalImage: {
    width: 200,
    height: 200,
    resizeMode: "cover",
    borderRadius: 14,
    marginBottom: 12,
  },
});
