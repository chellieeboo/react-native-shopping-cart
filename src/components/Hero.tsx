import { useEffect, useRef, useState } from "react";
import {
  AccessibilityInfo,
  FlatList,
  Image,
  NativeScrollEvent,
  NativeSyntheticEvent,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useTheme } from "../context/ThemeContext";
import { ProductCategory } from "../data/product";

type HeroSlide = {
  id: string;
  category: ProductCategory;
  title: string;
  subtitle: string;
  cta: string;
  image: any;
};

const SLIDES: HeroSlide[] = [
  {
    id: "guitars",
    category: "Guitars",
    title: "Find Your\nSound.",
    subtitle: "Start with the strings.",
    cta: "Shop Guitars",
    image: require("../../assets/images/guitar/electric.png"),
  },
  {
    id: "keyboards",
    category: "Keyboards",
    title: "Create Your\nSound.",
    subtitle: "Keys for every style.",
    cta: "Shop Keyboards",
    image: require("../../assets/images/piano/digital.png"),
  },
  {
    id: "drums",
    category: "Drums",
    title: "Feel Your\nSound.",
    subtitle: "Bring the rhythm to life.",
    cta: "Shop Drums",
    image: require("../../assets/images/drum/Full drum set.png"),
  },
];

const AUTO_ADVANCE_MS = 5000;
const CARD_HEIGHT = 220;

export default function Hero({
  onShopCategory,
}: {
  onShopCategory: (category: ProductCategory) => void;
}) {
  const { colors } = useTheme();
  const listRef = useRef<FlatList<HeroSlide>>(null);
  const [cardWidth, setCardWidth] = useState(0);
  const [activeIndex, setActiveIndex] = useState(0);
  const [reducedMotion, setReducedMotion] = useState(false);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // Respect the OS/browser "reduce motion" preference: if it's on, we still
  // let the user swipe manually, we just stop auto-advancing for them.
  useEffect(() => {
    let mounted = true;
    AccessibilityInfo.isReduceMotionEnabled?.()
      .then((enabled) => mounted && setReducedMotion(!!enabled))
      .catch(() => {});
    const sub = AccessibilityInfo.addEventListener?.(
      "reduceMotionChanged",
      (enabled: boolean) => setReducedMotion(!!enabled),
    );
    return () => {
      mounted = false;
      sub?.remove?.();
    };
  }, []);

  const stopAutoplay = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  };

  const startAutoplay = () => {
    stopAutoplay();
    if (reducedMotion || cardWidth === 0) return;
    intervalRef.current = setInterval(() => {
      setActiveIndex((prev) => {
        const next = (prev + 1) % SLIDES.length;
        listRef.current?.scrollToOffset({
          offset: next * cardWidth,
          animated: true,
        });
        return next;
      });
    }, AUTO_ADVANCE_MS);
  };

  useEffect(() => {
    startAutoplay();
    return stopAutoplay;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cardWidth, reducedMotion]);

  // Pause the instant the user touches the carousel, so autoplay never
  // fights a manual swipe in progress.
  const handleScrollBegin = () => stopAutoplay();

  // Resume only once the user has actually let go and the swipe settled.
  const handleMomentumEnd = (e: NativeSyntheticEvent<NativeScrollEvent>) => {
    if (cardWidth === 0) return;
    const index = Math.round(e.nativeEvent.contentOffset.x / cardWidth);
    setActiveIndex(index);
    startAutoplay();
  };

  const goToSlide = (index: number) => {
    stopAutoplay();
    listRef.current?.scrollToOffset({
      offset: index * cardWidth,
      animated: true,
    });
    setActiveIndex(index);
    startAutoplay();
  };

  return (
    <View style={styles.wrap}>
      <View
        style={[styles.card, { backgroundColor: colors.headerBg }]}
        onLayout={(e) => {
          if (cardWidth === 0) setCardWidth(e.nativeEvent.layout.width);
        }}
      >
        <View style={[styles.glow, { backgroundColor: colors.accent }]} />

        {cardWidth > 0 && (
          <FlatList
            ref={listRef}
            data={SLIDES}
            keyExtractor={(slide) => slide.id}
            horizontal
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            bounces={false}
            onScrollBeginDrag={handleScrollBegin}
            onMomentumScrollEnd={handleMomentumEnd}
            getItemLayout={(_, index) => ({
              length: cardWidth,
              offset: cardWidth * index,
              index,
            })}
            renderItem={({ item }) => (
              <View style={[styles.slide, { width: cardWidth }]}>
                <View style={styles.copy}>
                  <Text style={[styles.title, { color: colors.textLight }]}>
                    {item.title}
                  </Text>
                  <Text style={[styles.subtitle, { color: colors.textMuted }]}>
                    {item.subtitle}
                  </Text>

                  <TouchableOpacity
                    style={[styles.cta, { backgroundColor: colors.accent }]}
                    onPress={() => onShopCategory(item.category)}
                    activeOpacity={0.85}
                  >
                    <Text style={[styles.ctaText, { color: colors.textDark }]}>
                      {item.cta}
                    </Text>
                  </TouchableOpacity>
                </View>

                <View style={styles.frame}>
                  <Image
                    source={item.image}
                    style={styles.image}
                    resizeMode="cover"
                  />
                </View>
              </View>
            )}
          />
        )}
      </View>

      <View style={styles.dotsRow}>
        {SLIDES.map((slide, index) => (
          <TouchableOpacity
            key={slide.id}
            onPress={() => goToSlide(index)}
            hitSlop={10}
            style={styles.dotHit}
            accessibilityLabel={`Go to ${slide.category} slide`}
          >
            <View
              style={[
                styles.dot,
                {
                  width: index === activeIndex ? 18 : 6,
                  backgroundColor:
                    index === activeIndex ? colors.accent : colors.border,
                },
              ]}
            />
          </TouchableOpacity>
        ))}
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
    overflow: "hidden",
    height: CARD_HEIGHT,
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
  slide: {
    height: CARD_HEIGHT,
    paddingVertical: 26,
    paddingLeft: 22,
    flexDirection: "row",
  },
  copy: {
    flex: 1.15,
    justifyContent: "center",
    paddingRight: 8,
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
    boxShadow: "0px 8px 14px rgba(0,0,0,0.35)",
  },
  image: {
    width: "100%",
    height: 216,
  },
  dotsRow: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 6,
    marginTop: 12,
  },
  dotHit: {
    padding: 4,
  },
  dot: {
    height: 6,
    borderRadius: 3,
  },
});
