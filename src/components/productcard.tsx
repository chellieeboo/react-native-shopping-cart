import { Button, Image, StyleSheet, Text, View } from "react-native";

export default function ProductCard({
  item,
  onAdd,
}: {
  item: any;
  onAdd: any;
}) {
  return (
    <View style={styles.card}>
      <Image source={item.image} style={styles.image} />
      <Text style={styles.name}>{item.name}</Text>
      <Text style={styles.price}>₱{item.price}</Text>
      <Button title="Add to Cart" onPress={() => onAdd(item)} />
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#93C572", // Beige/Green card background mo
    padding: 15,
    margin: 10,
    borderRadius: 15,
    alignItems: "center",
    elevation: 3,
  },
  image: {
    width: 180, // 👈 Dati maliit, ginawa nating 180x180
    height: 180,
    resizeMode: "cover", // 👈 Para sakop ang buong square at klaro ang picture
    borderRadius: 10,
    marginBottom: 10,
  },
  name: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 4,
  },
  price: {
    fontSize: 16,
    color: "#1e3a8a", // Dark blue/green price
    fontWeight: "600",
    marginBottom: 10,
  },
});
