import { useRouter } from "expo-router";
import { useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useCart } from "../app/context/CartContext";
import { useTheme } from "../app/context/ThemeContext";

export default function CartScreen() {
  const router = useRouter();
  const { cart, removeFromCart, clearCart } = useCart();
  const { colors } = useTheme();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const total = cart.reduce((sum, item) => sum + item.price, 0);

  const handleSubmit = () => {
    if (cart.length === 0) {
      if (typeof window !== "undefined") {
        window.alert("You have no booking requests yet. Pick a package first.");
      }
      return;
    }

    if (typeof window !== "undefined") {
      const confirmed = window.confirm(
        `Submit ${cart.length} booking request(s) with an estimated total of ₱${total}? Our team will contact you to confirm dates and details.`,
      );

      if (confirmed) {
        setIsSubmitting(true);

        setTimeout(() => {
          setIsSubmitting(false);
          window.alert(
            "Thank you for choosing Rochordz! We'll reach out shortly to confirm your booking.",
          );
          clearCart();
        }, 1500);
      }
    }
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <FlatList
        data={cart}
        keyExtractor={(item, index) => index.toString()}
        ListEmptyComponent={
          <Text style={[styles.empty, { color: colors.textSecondary }]}>
            You have no booking requests yet.
          </Text>
        }
        renderItem={({ item }) => (
          <View style={[styles.card, { backgroundColor: colors.cardBgLight }]}>
            <Image source={item.image} style={styles.image} />
            <View style={{ flex: 1, maxWidth: 300 }}>
              <Text style={[styles.name, { color: colors.textDark }]}>
                {item.name}
              </Text>
              <Text style={[styles.price, { color: colors.textSecondary }]}>
                ₱{item.price}
              </Text>
              <Text style={[styles.instruments, { color: colors.textDark }]}>
                {item.instruments.join(" + ")}
              </Text>

              <View
                style={[
                  styles.bookingBox,
                  { backgroundColor: colors.background },
                ]}
              >
                <Text
                  style={[styles.bookingLabel, { color: colors.textSecondary }]}
                >
                  Requested by:
                </Text>
                <Text style={[styles.bookingValue, { color: colors.textDark }]}>
                  {item.booking.name}
                </Text>

                <Text
                  style={[styles.bookingLabel, { color: colors.textSecondary }]}
                >
                  Contact:
                </Text>
                <Text style={[styles.bookingValue, { color: colors.textDark }]}>
                  {item.booking.contact}
                </Text>

                <Text
                  style={[styles.bookingLabel, { color: colors.textSecondary }]}
                >
                  Event date:
                </Text>
                <Text style={[styles.bookingValue, { color: colors.textDark }]}>
                  {item.booking.eventDate}
                </Text>
              </View>

              <TouchableOpacity
                style={styles.removeButton}
                onPress={() => removeFromCart(item.id)}
              >
                <Text style={styles.removeButtonText}>Remove request</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      />
      <Text style={[styles.total, { color: colors.textDark }]}>
        Estimated Total: ₱{total}
      </Text>

      <TouchableOpacity
        style={[
          styles.checkoutButton,
          { backgroundColor: colors.accent },
          isSubmitting && styles.checkoutButtonDisabled,
        ]}
        onPress={handleSubmit}
        disabled={isSubmitting}
      >
        {isSubmitting ? (
          <ActivityIndicator color={colors.textDark} />
        ) : (
          <Text style={[styles.checkoutButtonText, { color: colors.textDark }]}>
            Submit Booking Requests
          </Text>
        )}
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.continueButton}
        onPress={() => router.push("/")}
      >
        <Text
          style={[styles.continueButtonText, { color: colors.textSecondary }]}
        >
          Browse More Packages
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    maxWidth: 600,
    alignSelf: "center",
    padding: 16,
  },
  card: {
    flexDirection: "row",
    width: "100%",
    marginBottom: 14,
    padding: 14,
    borderRadius: 18,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  image: {
    width: 90,
    height: 90,
    resizeMode: "contain",
    marginRight: 12,
    borderRadius: 10,
  },
  name: {
    fontSize: 17,
    fontWeight: "700",
  },
  price: {
    fontSize: 14,
    marginBottom: 4,
  },
  instruments: {
    fontSize: 13,
    marginBottom: 8,
  },
  bookingBox: {
    borderRadius: 10,
    padding: 8,
    marginBottom: 8,
  },
  bookingLabel: {
    fontSize: 11,
  },
  bookingValue: {
    fontSize: 13,
    fontWeight: "600",
    marginBottom: 4,
  },
  removeButton: {
    alignSelf: "flex-start",
  },
  removeButtonText: {
    color: "#B5583F",
    fontSize: 13,
    textDecorationLine: "underline",
  },
  total: {
    fontSize: 22,
    fontWeight: "700",
    textAlign: "center",
    marginTop: 16,
  },
  checkoutButton: {
    paddingVertical: 12,
    borderRadius: 25,
    marginTop: 16,
    alignItems: "center",
    justifyContent: "center",
    minHeight: 44,
  },
  checkoutButtonDisabled: {
    opacity: 0.6,
  },
  checkoutButtonText: {
    fontWeight: "700",
    fontSize: 15,
  },
  continueButton: {
    paddingVertical: 10,
    marginTop: 10,
    marginBottom: 20,
    alignItems: "center",
  },
  continueButtonText: {
    fontSize: 14,
    textDecorationLine: "underline",
  },
  empty: {
    textAlign: "center",
    marginTop: 50,
    fontSize: 16,
  },
});
