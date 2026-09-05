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

  return (
    <View style={styles.card}>
      <Pressable onPress={() => setModalVisible(true)}>
        <Image source={item.image} style={styles.image} />
      </Pressable>

      <Text style={styles.name}>{item.name}</Text>
      <Text style={styles.price}>₱{item.price}</Text>
      <Text style={styles.instruments}>{item.instruments.join(" + ")}</Text>
      <Text style={styles.eventTypes}>Fits: {item.eventTypes.join(", ")}</Text>

      <TouchableOpacity style={styles.addButton} onPress={() => onAdd(item)}>
        <Text style={styles.addButtonText}>Book This Package</Text>
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
            <Text style={styles.description}>{item.description}</Text>
            <Text style={styles.instruments}>
              Instruments: {item.instruments.join(" + ")}
            </Text>
            <Text style={styles.eventTypes}>
              Best for: {item.eventTypes.join(", ")}
            </Text>

            <TouchableOpacity
              style={[styles.addButton, { marginTop: 12 }]}
              onPress={() => {
                onAdd(item);
                setModalVisible(false);
              }}
            >
              <Text style={styles.addButtonText}>Book This Package</Text>
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
  description: {
    fontSize: 13,
    color: "#E8DED2",
    textAlign: "center",
    marginBottom: 8,
  },
  instruments: {
    fontSize: 13,
    color: "#E8DED2",
    marginBottom: 4,
  },
  eventTypes: {
    fontSize: 12,
    color: "#D6A85F",
    fontStyle: "italic",
    marginBottom: 10,
    textAlign: "center",
  },
  addButton: {
    backgroundColor: "#D6A85F",
    paddingVertical: 10,
    paddingHorizontal: 28,
    borderRadius: 25,
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
