import { useRouter } from "expo-router";
import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useCart } from "../app/context/CartContext";

export default function CartScreen() {
  const router = useRouter();
  const { cart, removeFromCart, clearCart } = useCart();

  const total = cart.reduce((sum, item) => sum + item.price, 0);

  const handleSubmit = () => {
    if (cart.length === 0) {
      if (typeof window !== "undefined") {
        window.alert("You have no booking requests yet. Pick a package first.");
      }
      return;
    }

    if (typeof window !== "undefined") {
      const confirmed = window.confirm(
        `Submit ${cart.length} booking request(s) with an estimated total of ₱${total}? Our team will contact you to confirm dates and details.`,
      );

      if (confirmed) {
        window.alert(
          "Thank you for choosing Rochordz! We'll reach out shortly to confirm your booking.",
        );
        clearCart();
      }
    }
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={cart}
        keyExtractor={(item, index) => index.toString()}
        ListEmptyComponent={
          <Text style={styles.empty}>You have no booking requests yet.</Text>
        }
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Image source={item.image} style={styles.image} />
            <View style={{ flex: 1, maxWidth: 300 }}>
              <Text style={styles.name}>{item.name}</Text>
              <Text style={styles.price}>₱{item.price}</Text>
              <Text style={styles.instruments}>
                {item.instruments.join(" + ")}
              </Text>
              <Text style={styles.eventTypes}>
                Fits: {item.eventTypes.join(", ")}
              </Text>

              <TouchableOpacity
                style={styles.removeButton}
                onPress={() => removeFromCart(item.id)}
              >
                <Text style={styles.removeButtonText}>Remove request</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      />
      <Text style={styles.total}>Estimated Total: ₱{total}</Text>

      <TouchableOpacity style={styles.checkoutButton} onPress={handleSubmit}>
        <Text style={styles.checkoutButtonText}>Submit Booking Requests</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.continueButton}
        onPress={() => router.push("/")}
      >
        <Text style={styles.continueButtonText}>Browse More Packages</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    maxWidth: 600,
    alignSelf: "center",
    padding: 16,
    backgroundColor: "#FAF3E8",
  },
  card: {
    flexDirection: "row",
    width: "100%",
    marginBottom: 14,
    backgroundColor: "#F5EBDD",
    padding: 14,
    borderRadius: 18,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  image: {
    width: 90,
    height: 90,
    resizeMode: "contain",
    marginRight: 12,
    borderRadius: 10,
  },
  name: {
    fontSize: 17,
    fontWeight: "700",
    color: "#4A2C20",
  },
  price: {
    fontSize: 14,
    color: "#8A6E52",
    marginBottom: 4,
  },
  instruments: {
    fontSize: 13,
    color: "#4A2C20",
    marginBottom: 2,
  },
  eventTypes: {
    fontSize: 12,
    color: "#8A6E52",
    fontStyle: "italic",
    marginBottom: 8,
  },
  removeButton: {
    alignSelf: "flex-start",
  },
  removeButtonText: {
    color: "#B5583F",
    fontSize: 13,
    textDecorationLine: "underline",
  },
  total: {
    fontSize: 22,
    fontWeight: "700",
    textAlign: "center",
    marginTop: 16,
    color: "#4A2C20",
  },
  checkoutButton: {
    backgroundColor: "#D6A85F",
    paddingVertical: 12,
    borderRadius: 25,
    marginTop: 16,
    alignItems: "center",
  },
  checkoutButtonText: {
    color: "#2B1810",
    fontWeight: "700",
    fontSize: 15,
  },
  continueButton: {
    paddingVertical: 10,
    marginTop: 10,
    marginBottom: 20,
    alignItems: "center",
  },
  continueButtonText: {
    color: "#8A6E52",
    fontSize: 14,
    textDecorationLine: "underline",
  },
  empty: {
    textAlign: "center",
    marginTop: 50,
    fontSize: 16,
    color: "#8A6E52",
  },
});
