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
        backgroundColor: "#4A2C20",
        padding: 12,
        alignItems: "center",
      }}
    >
      <Text style={{ color: "#F5EBDD", fontWeight: "bold", fontSize: 22 }}>
        Rochordz
      </Text>
      <Text style={{ color: "#D6A85F", fontSize: 12, marginTop: 2 }}>
        Your Music House
      </Text>
      <Text style={{ color: "#F5EBDD", marginTop: 6 }}>Cart: {cartCount}</Text>
      <TouchableOpacity
        onPress={() => router.push("/cart")}
        style={{
          backgroundColor: "#D6A85F",
          paddingVertical: 6,
          paddingHorizontal: 16,
          borderRadius: 4,
          marginTop: 6,
        }}
      >
        <Text style={{ color: "#4A2C20", fontWeight: "bold" }}>VIEW CART</Text>
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
            backgroundColor: "#2B1810",
            paddingVertical: 6,
            paddingHorizontal: 14,
            borderRadius: 4,
          }}
        >
          <Text style={{ color: "#F5EBDD", fontWeight: "bold" }}>ALL</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => router.push("/guitar")}
          style={{
            backgroundColor: "#2B1810",
            paddingVertical: 6,
            paddingHorizontal: 14,
            borderRadius: 4,
          }}
        >
          <Text style={{ color: "#F5EBDD", fontWeight: "bold" }}>GUITAR</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => router.push("/piano")}
          style={{
            backgroundColor: "#2B1810",
            paddingVertical: 6,
            paddingHorizontal: 14,
            borderRadius: 4,
          }}
        >
          <Text style={{ color: "#F5EBDD", fontWeight: "bold" }}>PIANO</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => router.push("/drums")}
          style={{
            backgroundColor: "#2B1810",
            paddingVertical: 6,
            paddingHorizontal: 14,
            borderRadius: 4,
          }}
        >
          <Text style={{ color: "#F5EBDD", fontWeight: "bold" }}>DRUMS</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => router.push("/accessories")}
          style={{
            backgroundColor: "#2B1810",
            paddingVertical: 6,
            paddingHorizontal: 14,
            borderRadius: 4,
          }}
        >
          <Text style={{ color: "#F5EBDD", fontWeight: "bold" }}>
            ACCESSORIES
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}
