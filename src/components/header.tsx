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
        paddingTop: 20,
        paddingBottom: 16,
        paddingHorizontal: 16,
        alignItems: "center",
      }}
    >
      <Text
        style={{
          color: "#F5EBDD",
          fontWeight: "700",
          fontSize: 26,
          letterSpacing: 1,
        }}
      >
        Rochordz
      </Text>
      <Text
        style={{
          color: "#D6A85F",
          fontSize: 12,
          marginTop: 2,
          fontStyle: "italic",
          letterSpacing: 0.5,
        }}
      >
        Live Music for Your Event
      </Text>

      <View
        style={{
          width: 40,
          height: 1,
          backgroundColor: "#D6A85F",
          marginTop: 10,
          marginBottom: 10,
          opacity: 0.6,
        }}
      />

      <Text style={{ color: "#F5EBDD", fontSize: 13 }}>
        Bookings: {cartCount}
      </Text>

      <TouchableOpacity
        onPress={() => router.push("/cart")}
        style={{
          backgroundColor: "#D6A85F",
          paddingVertical: 8,
          paddingHorizontal: 22,
          borderRadius: 25,
          marginTop: 10,
        }}
      >
        <Text style={{ color: "#4A2C20", fontWeight: "700", fontSize: 13 }}>
          View Bookings
        </Text>
      </TouchableOpacity>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={{ marginTop: 16, width: "100%" }}
        contentContainerStyle={{ paddingHorizontal: 8, gap: 10 }}
      >
        <TouchableOpacity
          onPress={() => router.push("/")}
          style={{
            backgroundColor: "#2B1810",
            paddingVertical: 8,
            paddingHorizontal: 18,
            borderRadius: 20,
          }}
        >
          <Text style={{ color: "#F5EBDD", fontWeight: "600", fontSize: 13 }}>
            All
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => router.push("/wedding")}
          style={{
            backgroundColor: "#2B1810",
            paddingVertical: 8,
            paddingHorizontal: 18,
            borderRadius: 20,
          }}
        >
          <Text style={{ color: "#F5EBDD", fontWeight: "600", fontSize: 13 }}>
            Wedding
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => router.push("/celebrations")}
          style={{
            backgroundColor: "#2B1810",
            paddingVertical: 8,
            paddingHorizontal: 18,
            borderRadius: 20,
          }}
        >
          <Text style={{ color: "#F5EBDD", fontWeight: "600", fontSize: 13 }}>
            Celebrations
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => router.push("/memorial")}
          style={{
            backgroundColor: "#2B1810",
            paddingVertical: 8,
            paddingHorizontal: 18,
            borderRadius: 20,
          }}
        >
          <Text style={{ color: "#F5EBDD", fontWeight: "600", fontSize: 13 }}>
            Memorial
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}
