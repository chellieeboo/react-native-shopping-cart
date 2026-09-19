import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useTheme } from "../context/ThemeContext";

export default function Hero({ onShopNow }: { onShopNow: () => void }) {
  const { colors } = useTheme();

  return (
    <View style={styles.wrap}>
      <View style={[styles.card, { backgroundColor: colors.headerBg }]}>
        {/* soft glow behind the guitar for depth, no gradients needed */}
        <View style={[styles.glow, { backgroundColor: colors.accent }]} />

        <View style={styles.copy}>
          <Text style={[styles.eyebrow, { color: colors.accent }]}>
            roChordz
          </Text>
          <Text style={[styles.title, { color: colors.textLight }]}>
            Find Your{"\n"}Sound.
          </Text>
          <Text style={[styles.subtitle, { color: colors.textMuted }]}>
            Instruments made for every kind of musician.
          </Text>

          <TouchableOpacity
            style={[styles.cta, { backgroundColor: colors.accent }]}
            onPress={onShopNow}
            activeOpacity={0.85}
          >
            <Text style={[styles.ctaText, { color: colors.textDark }]}>
              Shop Now
            </Text>
          </TouchableOpacity>
        </View>

        <View style={styles.frame}>
          <Image
            source={require("../../assets/images/guitar/electric.png")}
            style={styles.image}
            resizeMode="cover"
          />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    paddingHorizontal: 20,
    marginTop: 14,
  },
  card: {
    borderRadius: 28,
    paddingVertical: 26,
    paddingLeft: 22,
    flexDirection: "row",
    overflow: "hidden",
    minHeight: 190,
  },
  glow: {
    position: "absolute",
    width: 160,
    height: 160,
    borderRadius: 80,
    opacity: 0.16,
    top: 10,
    right: 18,
  },
  copy: {
    flex: 1.15,
    justifyContent: "center",
    paddingRight: 8,
  },
  eyebrow: {
    fontSize: 11.5,
    fontWeight: "700",
    letterSpacing: 1.5,
    marginBottom: 6,
  },
  title: {
    fontSize: 30,
    fontWeight: "800",
    lineHeight: 33,
    letterSpacing: -0.5,
  },
  subtitle: {
    fontSize: 12.5,
    lineHeight: 17,
    marginTop: 10,
    marginBottom: 18,
    maxWidth: 190,
  },
  cta: {
    alignSelf: "flex-start",
    paddingVertical: 11,
    paddingHorizontal: 22,
    borderRadius: 22,
  },
  ctaText: {
    fontWeight: "800",
    fontSize: 13,
  },
  frame: {
    width: 108,
    alignSelf: "flex-end",
    marginBottom: -26,
    marginRight: -6,
    borderRadius: 20,
    overflow: "hidden",
    borderWidth: 3,
    borderColor: "rgba(255,255,255,0.12)",
    transform: [{ rotate: "4deg" }],
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.35,
    shadowRadius: 14,
    elevation: 10,
  },
  image: {
    width: "100%",
    height: 216,
  },
});
