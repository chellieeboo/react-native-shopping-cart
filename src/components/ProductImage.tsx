import { useState } from "react";
import { Image, LayoutChangeEvent, StyleSheet, Text, View } from "react-native";
import { useTheme } from "../context/ThemeContext";

type ProductImageProps = {
  image?: any;
  icon?: string;
  /** Fixed pixel size (used on the details screen / cart row). Omit to
   * responsively fill the parent's width as a square tile (used on grid
   * product cards so they never overflow narrow screens). */
  size?: number;
  borderRadius?: number;
};

/**
 * Renders a product's photo when available, otherwise falls back to a
 * themed tile with an emoji icon so every product card / details screen
 * looks consistent, regardless of whether a photographed asset exists yet.
 *
 * When `size` is omitted we measure the parent's actual width via
 * onLayout and render a square tile at that pixel size, rather than using
 * CSS `aspectRatio`. Local require()'d images carry their real pixel
 * dimensions, and mixing that with `aspectRatio` alone caused the image to
 * be forced to its native (much taller) pixel height on web — measuring
 * gives a reliable square regardless of the source photo's own size.
 */
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
