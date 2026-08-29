import { useRouter } from "expo-router";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";

type HeaderProps = {
  cartCount: number;
};

export default function Header({ cartCount }: HeaderProps) {
  const router = useRouter();

  return (
    <View
      style={{
        backgroundColor: "#2196F3",
        padding: 12,
        alignItems: "center",
      }}
    >
      <Text style={{ color: "white", fontWeight: "bold", fontSize: 18 }}>
        Rochordz
      </Text>
      <Text style={{ color: "white", marginTop: 4 }}>Cart: {cartCount}</Text>
      <TouchableOpacity
        onPress={() => router.push("/cart")}
        style={{
          backgroundColor: "#1565C0",
          paddingVertical: 6,
          paddingHorizontal: 16,
          borderRadius: 4,
          marginTop: 6,
        }}
      >
        <Text style={{ color: "white", fontWeight: "bold" }}>VIEW CART</Text>
      </TouchableOpacity>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={{ marginTop: 10, width: "100%" }}
        contentContainerStyle={{ paddingHorizontal: 8, gap: 8 }}
      >
        <TouchableOpacity
          onPress={() => router.push("/")}
          style={{
            backgroundColor: "#0D47A1",
            paddingVertical: 6,
            paddingHorizontal: 14,
            borderRadius: 4,
          }}
        >
          <Text style={{ color: "white", fontWeight: "bold" }}>ALL</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => router.push("/guitar")}
          style={{
            backgroundColor: "#0D47A1",
            paddingVertical: 6,
            paddingHorizontal: 14,
            borderRadius: 4,
          }}
        >
          <Text style={{ color: "white", fontWeight: "bold" }}>GUITAR</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => router.push("/piano")}
          style={{
            backgroundColor: "#0D47A1",
            paddingVertical: 6,
            paddingHorizontal: 14,
            borderRadius: 4,
          }}
        >
          <Text style={{ color: "white", fontWeight: "bold" }}>PIANO</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => router.push("/drums")}
          style={{
            backgroundColor: "#0D47A1",
            paddingVertical: 6,
            paddingHorizontal: 14,
            borderRadius: 4,
          }}
        >
          <Text style={{ color: "white", fontWeight: "bold" }}>DRUMS</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => router.push("/accessories")}
          style={{
            backgroundColor: "#0D47A1",
            paddingVertical: 6,
            paddingHorizontal: 14,
            borderRadius: 4,
          }}
        >
          <Text style={{ color: "white", fontWeight: "bold" }}>
            ACCESSORIES
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}
