import { useRouter } from "expo-router";
import { useState } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { useTheme } from "../context/ThemeContext";

type HeaderProps = {
  cartCount: number;
  searchQuery: string;
  onSearchChange: (text: string) => void;
};

export default function Header({
  cartCount,
  searchQuery,
  onSearchChange,
}: HeaderProps) {
  const router = useRouter();
  const { isDark, toggleTheme, colors } = useTheme();
  const [searchOpen, setSearchOpen] = useState(false);

  return (
    <View style={styles.container}>
      <View style={styles.topRow}>
        <View style={styles.brandRow}>
          <View
            style={[styles.logoBadge, { backgroundColor: colors.headerBg }]}
          >
            <Text style={[styles.logoNote, { color: colors.accent }]}>♪</Text>
          </View>
          <Text style={[styles.brand, { color: colors.textDark }]}>
            roChordz
          </Text>
        </View>

        <View style={styles.actionsRow}>
          <TouchableOpacity
            accessibilityLabel="Search"
            style={[
              styles.iconBtn,
              {
                backgroundColor: searchOpen
                  ? colors.headerBg
                  : colors.cardBgLight,
                borderColor: colors.border,
              },
            ]}
            onPress={() => setSearchOpen((prev) => !prev)}
          >
            <Text style={styles.iconGlyph}>🔍</Text>
          </TouchableOpacity>

          <TouchableOpacity
            accessibilityLabel="Toggle theme"
            style={[
              styles.iconBtn,
              {
                backgroundColor: colors.cardBgLight,
                borderColor: colors.border,
              },
            ]}
            onPress={toggleTheme}
          >
            <Text style={styles.iconGlyph}>{isDark ? "☀️" : "🌙"}</Text>
          </TouchableOpacity>

          <TouchableOpacity
            accessibilityLabel="View cart"
            style={[
              styles.iconBtn,
              {
                backgroundColor: colors.cardBgLight,
                borderColor: colors.border,
              },
            ]}
            onPress={() => router.push("/cart")}
          >
            <Text style={styles.iconGlyph}>🛒</Text>
            {cartCount > 0 && (
              <View style={[styles.badge, { backgroundColor: colors.accent }]}>
                <Text style={[styles.badgeText, { color: colors.textDark }]}>
                  {cartCount > 99 ? "99+" : cartCount}
                </Text>
              </View>
            )}
          </TouchableOpacity>
        </View>
      </View>

      {searchOpen && (
        <TextInput
          value={searchQuery}
          onChangeText={onSearchChange}
          placeholder="Search instruments..."
          placeholderTextColor={colors.textSecondary}
          style={[
            styles.searchInput,
            {
              backgroundColor: colors.cardBgLight,
              borderColor: colors.border,
              color: colors.textDark,
            },
          ]}
          autoFocus
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 16,
    paddingBottom: 6,
    paddingHorizontal: 20,
  },
  topRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  brandRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 9,
  },
  logoBadge: {
    width: 32,
    height: 32,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  logoNote: {
    fontSize: 17,
    fontWeight: "900",
  },
  brand: {
    fontSize: 19,
    fontWeight: "800",
    letterSpacing: -0.3,
  },
  actionsRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  iconBtn: {
    width: 36,
    height: 36,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
  },
  iconGlyph: {
    fontSize: 15,
  },
  badge: {
    position: "absolute",
    top: -4,
    right: -4,
    minWidth: 17,
    height: 17,
    borderRadius: 9,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 3,
  },
  badgeText: {
    fontSize: 9.5,
    fontWeight: "800",
  },
  searchInput: {
    marginTop: 12,
    borderRadius: 12,
    borderWidth: 1,
    paddingHorizontal: 14,
    paddingVertical: 10,
    fontSize: 14,
  },
});
