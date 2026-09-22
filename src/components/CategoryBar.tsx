import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useTheme } from "../context/ThemeContext";
import { ProductCategory } from "../data/product";

type CategoryBarProps = {
  selectedCategory: string;
  onSelectCategory: (category: string) => void;
};

// Short display labels + a matching icon per category, per the brand brief.
const CATEGORY_TILES: {
  label: string;
  value: ProductCategory;
  icon: string;
}[] = [
  { label: "Guitars", value: "Guitars", icon: "🎸" },
  { label: "Keyboards", value: "Keyboards", icon: "🎹" },
  { label: "Drums", value: "Drums", icon: "🥁" },
  { label: "Strings", value: "String Instruments", icon: "🎻" },
  { label: "Wind", value: "Wind Instruments", icon: "🎷" },
  { label: "Audio", value: "Microphones", icon: "🎤" },
  { label: "Accessories", value: "Accessories", icon: "🧰" },
];

export default function CategoryBar({
  selectedCategory,
  onSelectCategory,
}: CategoryBarProps) {
  const { colors } = useTheme();

  const tiles = [{ label: "All", value: "All", icon: "✨" }, ...CATEGORY_TILES];

  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.content}
    >
      {tiles.map((tile) => {
        const isSelected = selectedCategory === tile.value;
        return (
          <TouchableOpacity
            key={tile.value}
            onPress={() => onSelectCategory(tile.value)}
            activeOpacity={0.75}
            style={styles.tileWrap}
          >
            <View
              style={[
                styles.iconTile,
                {
                  backgroundColor: isSelected
                    ? colors.headerBg
                    : colors.cardBgLight,
                  borderColor: isSelected ? colors.headerBg : colors.border,
                },
              ]}
            >
              <Text style={styles.icon}>{tile.icon}</Text>
            </View>
            <Text
              style={[
                styles.label,
                {
                  color: isSelected ? colors.textDark : colors.textSecondary,
                  fontWeight: isSelected ? "800" : "600",
                },
              ]}
              numberOfLines={1}
            >
              {tile.label}
            </Text>
          </TouchableOpacity>
        );
      })}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  content: {
    paddingHorizontal: 20,
    gap: 14,
    paddingTop: 4,
  },
  tileWrap: {
    alignItems: "center",
    width: 64,
  },
  iconTile: {
    width: 58,
    height: 58,
    borderRadius: 18,
    borderWidth: 1.5,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 6,
  },
  icon: {
    fontSize: 24,
    lineHeight: 28,
    textAlign: "center",
    includeFontPadding: false,
  },
  label: {
    fontSize: 11,
    textAlign: "center",
  },
});
