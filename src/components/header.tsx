import { useRouter } from "expo-router";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import { useTheme } from "../app/context/ThemeContext";

type HeaderProps = {
  cartCount: number;
};

export default function Header({ cartCount }: HeaderProps) {
  const router = useRouter();
  const { isDark, toggleTheme, colors } = useTheme();

  return (
    <View
      style={{
        backgroundColor: colors.headerBg,
        paddingTop: 20,
        paddingBottom: 16,
        paddingHorizontal: 16,
        alignItems: "center",
      }}
    >
      <TouchableOpacity
        onPress={toggleTheme}
        style={{
          position: "absolute",
          top: 20,
          right: 16,
          backgroundColor: colors.categoryBtn,
          paddingVertical: 6,
          paddingHorizontal: 12,
          borderRadius: 20,
        }}
      >
        <Text style={{ color: colors.textLight, fontSize: 13 }}>
          {isDark ? "☀️ Light" : "🌙 Dark"}
        </Text>
      </TouchableOpacity>

      <Text
        style={{
          color: colors.textLight,
          fontWeight: "700",
          fontSize: 26,
          letterSpacing: 1,
        }}
      >
        Rochordz
      </Text>
      <Text
        style={{
          color: colors.accent,
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
          backgroundColor: colors.accent,
          marginTop: 10,
          marginBottom: 10,
          opacity: 0.6,
        }}
      />

      <Text style={{ color: colors.textLight, fontSize: 13 }}>
        Bookings: {cartCount}
      </Text>

      <TouchableOpacity
        onPress={() => router.push("/cart")}
        style={{
          backgroundColor: colors.accent,
          paddingVertical: 8,
          paddingHorizontal: 22,
          borderRadius: 25,
          marginTop: 10,
        }}
      >
        <Text
          style={{ color: colors.textDark, fontWeight: "700", fontSize: 13 }}
        >
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
            backgroundColor: colors.categoryBtn,
            paddingVertical: 8,
            paddingHorizontal: 18,
            borderRadius: 20,
          }}
        >
          <Text
            style={{ color: colors.textLight, fontWeight: "600", fontSize: 13 }}
          >
            All
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => router.push("/wedding")}
          style={{
            backgroundColor: colors.categoryBtn,
            paddingVertical: 8,
            paddingHorizontal: 18,
            borderRadius: 20,
          }}
        >
          <Text
            style={{ color: colors.textLight, fontWeight: "600", fontSize: 13 }}
          >
            Wedding
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => router.push("/celebrations")}
          style={{
            backgroundColor: colors.categoryBtn,
            paddingVertical: 8,
            paddingHorizontal: 18,
            borderRadius: 20,
          }}
        >
          <Text
            style={{ color: colors.textLight, fontWeight: "600", fontSize: 13 }}
          >
            Celebrations
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => router.push("/memorial")}
          style={{
            backgroundColor: colors.categoryBtn,
            paddingVertical: 8,
            paddingHorizontal: 18,
            borderRadius: 20,
          }}
        >
          <Text
            style={{ color: colors.textLight, fontWeight: "600", fontSize: 13 }}
          >
            Memorial
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}
