import { Button, FlatList, Image, StyleSheet, Text, View } from "react-native";
import { useCart } from "../app/context/CartContext";

export default function CartScreen() {
  const { cart, removeFromCart, increaseQuantity, decreaseQuantity } =
    useCart();

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <View style={styles.container}>
      <FlatList
        data={cart}
        keyExtractor={(item, index) => index.toString()}
        ListEmptyComponent={
          <Text style={styles.empty}>Your cart is empty.</Text>
        }
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Image source={item.image} style={styles.image} />
            <View style={{ flex: 1, maxWidth: 300 }}>
              <Text style={styles.name}>{item.name}</Text>
              <Text style={styles.price}>₱{item.price} each</Text>

              <View style={styles.qtyRow}>
                <Button title="−" onPress={() => decreaseQuantity(item.id)} />
                <Text style={styles.qtyText}>{item.quantity}</Text>
                <Button title="+" onPress={() => increaseQuantity(item.id)} />
              </View>

              <Text style={styles.subtotal}>
                Subtotal: ₱{item.price * item.quantity}
              </Text>

              <View style={styles.removeButton}>
                <Button
                  title="Remove"
                  onPress={() => removeFromCart(item.id)}
                />
              </View>
            </View>
          </View>
        )}
      />
      <Text style={styles.total}>Total: ₱{total}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    maxWidth: 600,
    alignSelf: "center",
    padding: 15,
    backgroundColor: "#f5f5f5",
  },
  card: {
    flexDirection: "row",
    width: "100%",
    marginBottom: 15,
    backgroundColor: "#D7CCC8",
    padding: 12,
    borderRadius: 10,
    elevation: 3,
  },
  image: {
    width: 90,
    height: 90,
    resizeMode: "contain",
    marginRight: 10,
  },
  name: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#D6A85F",
  },
  price: {
    fontSize: 16,
    color: "#2B2118",
    marginBottom: 8,
  },
  qtyRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  qtyText: {
    fontSize: 16,
    fontWeight: "bold",
    marginHorizontal: 12,
  },
  subtotal: {
    fontSize: 15,
    fontWeight: "600",
    color: "#2B2118",
    marginBottom: 8,
  },
  removeButton: {
    alignSelf: "flex-start",
    width: 120,
  },
  total: {
    fontSize: 22,
    fontWeight: "bold",
    textAlign: "center",
    marginTop: 20,
  },
  empty: {
    textAlign: "center",
    marginTop: 50,
    fontSize: 18,
  },
});
