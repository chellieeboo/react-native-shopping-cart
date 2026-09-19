import { useMemo, useRef, useState } from "react";
import {
  FlatList,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import CategoryBar from "../components/CategoryBar";
import Header from "../components/header";
import Hero from "../components/Hero";
import ProductCard from "../components/productcard";
import SectionHeader from "../components/Sectionheader";
import { useCart } from "../context/CartContext";
import { useTheme } from "../context/ThemeContext";
import { products } from "../data/product";

// Hand-picked curated sets for the default (unfiltered) home layout.
const FEATURED_IDS = ["1", "4", "7", "10", "9", "16"];
const NEW_ARRIVAL_IDS = products
  .map((p) => p.id)
  .filter((id) => !FEATURED_IDS.includes(id));

export default function HomeScreen() {
  const { cartCount, addToCart, getRemainingStock } = useCart();
  const { colors } = useTheme();
  const listRef = useRef<FlatList>(null);

  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [browseAll, setBrowseAll] = useState(false);

  const isFiltering =
    searchQuery.trim().length > 0 || selectedCategory !== "All" || browseAll;

  const filteredProducts = useMemo(
    () =>
      products.filter((product) => {
        const matchesCategory =
          selectedCategory === "All" ||
          product.category.toLowerCase() === selectedCategory.toLowerCase();
        const matchesSearch = product.name
          .toLowerCase()
          .includes(searchQuery.trim().toLowerCase());
        return matchesCategory && matchesSearch;
      }),
    [selectedCategory, searchQuery],
  );

  const featuredProducts = useMemo(
    () => FEATURED_IDS.map((id) => products.find((p) => p.id === id)!),
    [],
  );

  const newArrivals = useMemo(
    () => NEW_ARRIVAL_IDS.map((id) => products.find((p) => p.id === id)!),
    [],
  );

  const gridData = isFiltering ? filteredProducts : featuredProducts;

  const gridTitle = searchQuery.trim()
    ? "Search Results"
    : selectedCategory !== "All"
      ? selectedCategory
      : browseAll
        ? "All Instruments"
        : "Featured Instruments";

  const handleShopNow = () => {
    setSelectedCategory("All");
    setSearchQuery("");
    setBrowseAll(true);
    listRef.current?.scrollToOffset({ offset: 0, animated: true });
  };

  const handleSelectCategory = (category: string) => {
    setSelectedCategory(category);
    setBrowseAll(false);
  };

  const handleSeeAllFeatured = () => {
    setBrowseAll(true);
  };

  const handleSeeAllCategories = () => {
    setSelectedCategory("All");
    setBrowseAll(true);
  };

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: colors.background }]}
    >
      <FlatList
        ref={listRef}
        data={gridData}
        keyExtractor={(item) => item.id}
        numColumns={2}
        columnWrapperStyle={styles.row}
        ListHeaderComponent={
          <>
            <Header
              cartCount={cartCount}
              searchQuery={searchQuery}
              onSearchChange={setSearchQuery}
            />
            <Hero onShopNow={handleShopNow} />

            <View style={styles.sectionSpacer} />
            <SectionHeader
              title="Shop by Category"
              onSeeAll={handleSeeAllCategories}
            />
            <CategoryBar
              selectedCategory={selectedCategory}
              onSelectCategory={handleSelectCategory}
            />

            <View style={styles.sectionSpacer} />
            <SectionHeader
              title={gridTitle}
              onSeeAll={!isFiltering ? handleSeeAllFeatured : undefined}
            />
          </>
        }
        ListEmptyComponent={
          <View style={styles.emptyState}>
            <Text style={[styles.emptyText, { color: colors.textSecondary }]}>
              No instruments match your search.
            </Text>
          </View>
        }
        renderItem={({ item }) => (
          <ProductCard
            item={item}
            onAdd={addToCart}
            remainingStock={getRemainingStock(item)}
          />
        )}
        ListFooterComponent={
          !isFiltering ? (
            <>
              <View style={styles.sectionSpacer} />
              <SectionHeader title="New Arrivals" />
              <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.newArrivalsRow}
              >
                {newArrivals.map((item) => (
                  <ProductCard
                    key={item.id}
                    item={item}
                    onAdd={addToCart}
                    remainingStock={getRemainingStock(item)}
                    variant="compact"
                  />
                ))}
              </ScrollView>
              <View style={{ height: 24 }} />
            </>
          ) : (
            <View style={{ height: 24 }} />
          )
        }
        contentContainerStyle={styles.listContent}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  listContent: {
    paddingBottom: 12,
  },
  row: {
    paddingHorizontal: 14,
  },
  sectionSpacer: {
    height: 26,
  },
  newArrivalsRow: {
    paddingHorizontal: 20,
    paddingTop: 12,
  },
  emptyState: {
    paddingVertical: 60,
    alignItems: "center",
    paddingHorizontal: 20,
  },
  emptyText: {
    fontSize: 14,
  },
});
