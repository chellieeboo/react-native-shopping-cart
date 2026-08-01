import { View, Text, Button, StyleSheet } from "react-native";
export default function ProductCard({ item, onAdd }) {
  return (
    <View style={styles.card}>
      <Text style={styles.name}>{item.name}</Text>
      <Text>₱{item.price}</Text>
      <Button title="Add to Cart" onPress={() => onAdd(item)} />
    </View>
  );
}
const styles = StyleSheet.create({
  card: {
    padding: 15,
    margin: 10,

    borderWidth: 1,
    borderRadius: 10,
  },
  name: {
    fontSize: 18,
    fontWeight: "bold",
  },
});
