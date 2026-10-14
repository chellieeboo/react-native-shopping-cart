import { useState } from "react";
import { Image, LayoutChangeEvent, StyleSheet, Text, View } from "react-native";
import { useTheme } from "../context/ThemeContext";

type ProductImageProps = {
  image?: any;
  icon?: string;
  size?: number;
  borderRadius?: number;
};

export default function ProductImage({
  image,
  icon,
  size,
  borderRadius = 14,
}: ProductImageProps) {
  const { colors } = useTheme();
  const [measuredWidth, setMeasuredWidth] = useState(size ?? 0);

  const handleLayout = (e: LayoutChangeEvent) => {
    if (!size) {
      setMeasuredWidth(e.nativeEvent.layout.width);
    }
  };

  const resolvedSize = size ?? measuredWidth;
  const emojiSize = resolvedSize ? resolvedSize * 0.42 : 32;

  return (
    <View
      onLayout={handleLayout}
      style={size ? { width: size, height: size } : styles.fill}
    >
      {resolvedSize > 0 &&
        (image ? (
          <Image
            source={image}
            style={[
              styles.image,
              { width: resolvedSize, height: resolvedSize, borderRadius },
            ]}
            resizeMode="cover"
          />
        ) : (
          <View
            style={[
              styles.placeholder,
              {
                width: resolvedSize,
                height: resolvedSize,
                borderRadius,
                backgroundColor: colors.categoryBtn,
              },
            ]}
          >
            <Text style={{ fontSize: emojiSize }}>{icon ?? "🎵"}</Text>
          </View>
        ))}
    </View>
  );
}

const styles = StyleSheet.create({
  fill: {
    width: "100%",
  },
  image: {
    backgroundColor: "#00000010",
  },
  placeholder: {
    alignItems: "center",
    justifyContent: "center",
  },
});
