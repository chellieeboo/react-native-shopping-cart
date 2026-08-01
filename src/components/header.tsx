import { router } from "expo-router";
import { Button, StyleSheet, Text, View } from "react-native";

type HeaderProps = {
  cartCount: number;
};

export default function Header({ cartCount }: HeaderProps) {
  return (
    <View style={styles.header}>
      <Text style={styles.title}>My E-Commerce Store</Text>
      <View style={styles.cartContainer}>
        <Text style={styles.cart}>🛒 Cart: {cartCount}</Text>
        <Button title="View Cart" onPress={() => router.push("/cart")} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    backgroundColor: "#0A84FF",
    padding: 15,
    alignItems: "center",
    borderBottomLeftRadius: 15, // 👈 Soft curves sa ilalim
    borderBottomRightRadius: 15,
  },
  title: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 5,
  },
  cartContainer: {
    flexDirection: "row", // 👈 Pinagtabi ang Cart count at Button
    alignItems: "center",
    gap: 15,
  },
  cart: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
});
