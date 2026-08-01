import { View, Text, StyleSheet } from "react-native";
export default function Header() {
  return (
    <View style={styles.header}>
      <Text style={styles.title}>My E-Commerce Store</Text>
    </View>
  );
}
const styles = StyleSheet.create({
  header: {
    backgroundColor: "#0A84FF",
    padding: 20,
    alignItems: "center",
  },
  title: {
    color: "white",
    fontSize: 24,
    fontWeight: "bold",
  },
});
