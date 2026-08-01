import { Button, FlatList, Image, StyleSheet, Text, View } from "react-native";
import { useCart } from "../app/context/CartContext";

export default function CartScreen() {
  const { cart, removeFromCart } = useCart();
  const total = cart.reduce((sum, item) => sum + item.price, 0);

  return (
    // 👈 Inayos ang Container para nakagitna at mobile size lang sa browser
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
            <View style={{ flex: 1, justifyContent: "center" }}>
              <Text style={styles.name}>{item.name}</Text>
              <Text style={styles.price}>₱{item.price}</Text>
              <View style={{ width: 100 }}>
                <Button
                  title="Remove"
                  onPress={() => removeFromCart(item.id)}
                  color="#ff3b30"
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
    padding: 15,
    maxWidth: 500, // 👈 Ginawang Phone layout width
    width: "100%",
    alignSelf: "center",
    backgroundColor: "#f5f5f5",
  },
  card: {
    flexDirection: "row",
    marginBottom: 15,
    backgroundColor: "#fff",
    padding: 12,
    borderRadius: 12,
    elevation: 2,
    alignItems: "center",
  },
  image: {
    width: 80,
    height: 80,
    resizeMode: "cover",
    borderRadius: 8,
    marginRight: 15,
  },
  name: {
    fontSize: 16,
    fontWeight: "bold",
  },
  price: {
    fontSize: 15,
    color: "#0A84FF",
    marginBottom: 8,
  },
  total: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    marginVertical: 15,
  },
  empty: {
    textAlign: "center",
    marginTop: 50,
    fontSize: 18,
    color: "#8e8e93",
  },
});
