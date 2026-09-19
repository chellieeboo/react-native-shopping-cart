import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useTheme } from "../context/ThemeContext";

type SectionHeaderProps = {
  title: string;
  onSeeAll?: () => void;
};

export default function SectionHeader({ title, onSeeAll }: SectionHeaderProps) {
  const { colors } = useTheme();

  return (
    <View style={styles.row}>
      <Text style={[styles.title, { color: colors.textDark }]}>{title}</Text>
      {onSeeAll && (
        <TouchableOpacity onPress={onSeeAll} hitSlop={8}>
          <Text style={[styles.seeAll, { color: colors.accentDeep }]}>
            See All
          </Text>
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 19,
    fontWeight: "800",
    letterSpacing: -0.2,
  },
  seeAll: {
    fontSize: 12.5,
    fontWeight: "700",
  },
});
