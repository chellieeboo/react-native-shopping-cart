import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useTheme } from "../context/ThemeContext";

type QuantitySelectorProps = {
  quantity: number;
  onIncrement: () => void;
  onDecrement: () => void;
  min?: number;
  max?: number;
};

export default function QuantitySelector({
  quantity,
  onIncrement,
  onDecrement,
  min = 1,
  max = Infinity,
}: QuantitySelectorProps) {
  const { colors } = useTheme();

  const canDecrement = quantity > min;
  const canIncrement = quantity < max;

  return (
    <View
      style={[styles.container, { backgroundColor: colors.categoryBtn }]}
    >
      <TouchableOpacity
        style={styles.btn}
        onPress={onDecrement}
        disabled={!canDecrement}
      >
        <Text
          style={[
            styles.btnText,
            { color: colors.accent, opacity: canDecrement ? 1 : 0.35 },
          ]}
        >
          −
        </Text>
      </TouchableOpacity>

      <Text style={[styles.qtyText, { color: colors.textLight }]}>
        {quantity}
      </Text>

      <TouchableOpacity
        style={styles.btn}
        onPress={onIncrement}
        disabled={!canIncrement}
      >
        <Text
          style={[
            styles.btnText,
            { color: colors.accent, opacity: canIncrement ? 1 : 0.35 },
          ]}
        >
          +
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 15,
    paddingHorizontal: 6,
  },
  btn: {
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  btnText: {
    fontSize: 18,
    fontWeight: "bold",
  },
  qtyText: {
    fontSize: 15,
    fontWeight: "700",
    marginHorizontal: 10,
    minWidth: 20,
    textAlign: "center",
  },
});
