import { useState } from "react"; // 🆕 kailangan para sa modal state
import {
  Button,
  Image,
  Modal, // 🆕
  Pressable, // 🆕
  StyleSheet,
  Text,
  View,
} from "react-native";

export default function ProductCard({
  item,
  onAdd,
}: {
  item: any;
  onAdd: any;
}) {
  const [modalVisible, setModalVisible] = useState(false); // 🆕 controls kung bukas/sarado yung modal

  // 🆕 stock logic — 3 states base sa item.stock
  const isOutOfStock = item.stock === 0;
  const isLowStock = item.stock > 0 && item.stock <= 3;

  return (
    <View style={styles.card}>
      {/* 🆕 Pressable wrapper sa image — pag pinindot, bubukas yung modal */}
      <Pressable onPress={() => setModalVisible(true)}>
        <Image source={item.image} style={styles.image} />
      </Pressable>

      <Text style={styles.name}>{item.name}</Text>
      <Text style={styles.price}>₱{item.price}</Text>

      {/* 🆕 Stock Indicator — nagbabago depende sa stock number */}
      {isOutOfStock ? (
        <Text style={styles.outOfStock}>Out of Stock</Text>
      ) : isLowStock ? (
        <Text style={styles.lowStock}>Only {item.stock} left!</Text>
      ) : (
        <Text style={styles.inStock}>In Stock</Text>
      )}

      <Button
        title="Add to Cart"
        onPress={() => onAdd(item)}
        disabled={isOutOfStock} // 🆕 di na pwede i-click pag out of stock
      />

      {/* 🆕 Product Detail Modal — lumalabas pag pinindot yung image */}
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
            <Text style={styles.category}>Category: {item.category}</Text>

            {isOutOfStock ? (
              <Text style={styles.outOfStock}>Out of Stock</Text>
            ) : isLowStock ? (
              <Text style={styles.lowStock}>Only {item.stock} left!</Text>
            ) : (
              <Text style={styles.inStock}>{item.stock} in stock</Text>
            )}

            <Button
              title="Add to Cart"
              onPress={() => {
                onAdd(item);
                setModalVisible(false); // isasara modal after add
              }}
              disabled={isOutOfStock}
            />
            <Button title="Close" onPress={() => setModalVisible(false)} />
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#4A2C20",
    padding: 15,
    margin: 10,
    borderRadius: 15,
    alignItems: "center",
    elevation: 3,
  },
  image: {
    width: 180,
    height: 180,
    resizeMode: "cover",
    borderRadius: 10,
    marginBottom: 10,
  },
  name: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#F5EBDD",
    marginBottom: 4,
  },
  price: {
    fontSize: 16,
    color: "#E8DED2",
    fontWeight: "600",
    marginBottom: 4,
  },
  category: {
    // 🆕
    fontSize: 14,
    color: "#E8DED2",
    marginBottom: 6,
  },
  inStock: {
    // 🆕
    color: "#7CFC7C",
    fontSize: 13,
    marginBottom: 8,
  },
  lowStock: {
    // 🆕
    color: "#FFD166",
    fontWeight: "bold",
    fontSize: 13,
    marginBottom: 8,
  },
  outOfStock: {
    // 🆕
    color: "#FF6B6B",
    fontWeight: "bold",
    fontSize: 13,
    marginBottom: 8,
  },
  modalOverlay: {
    // 🆕
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.6)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    // 🆕
    backgroundColor: "#4A2C20",
    padding: 25,
    borderRadius: 15,
    alignItems: "center",
    width: "80%",
  },
  modalImage: {
    // 🆕
    width: 200,
    height: 200,
    resizeMode: "cover",
    borderRadius: 10,
    marginBottom: 10,
  },
});
