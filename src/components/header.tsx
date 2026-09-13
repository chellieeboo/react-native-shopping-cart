import { useRouter } from "expo-router";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import { useTheme } from "../app/context/ThemeContext";

type HeaderProps = {
  cartCount: number;
  selectedCategory?: string;
  onSelectCategory?: (category: string) => void;
};

export default function Header({
  cartCount,
  selectedCategory = "All",
  onSelectCategory,
}: HeaderProps) {
  const router = useRouter();
  const { isDark, toggleTheme, colors } = useTheme();

  const categories = [
    "All",
    "Guitars",
    "Keyboards",
    "Synthesizers",
    "Accessories",
  ];

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
      {/* Dark / Light Mode Toggle */}
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

      {/* Brand Title & Subtitle */}
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
        Audio Gear & Studio Equipment
      </Text>

      {/* Accent Line Separator */}
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

      {/* Shopping Cart Indicator */}
      <Text style={{ color: colors.textLight, fontSize: 13 }}>
        Cart: {cartCount} items
      </Text>

      {/* Cart Navigation Button */}
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
          View Shopping Cart 🛒
        </Text>
      </TouchableOpacity>

      {/* Product Categories Bar */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={{ marginTop: 16, width: "100%" }}
        contentContainerStyle={{ paddingHorizontal: 8, gap: 10 }}
      >
        {categories.map((category) => (
          <TouchableOpacity
            key={category}
            onPress={() => onSelectCategory && onSelectCategory(category)}
            style={{
              backgroundColor:
                selectedCategory === category
                  ? colors.accent
                  : colors.categoryBtn,
              paddingVertical: 8,
              paddingHorizontal: 18,
              borderRadius: 20,
            }}
          >
            <Text
              style={{
                color:
                  selectedCategory === category
                    ? colors.textDark
                    : colors.textLight,
                fontWeight: "600",
                fontSize: 13,
              }}
            >
              {category}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
}
