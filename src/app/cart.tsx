import { useRouter } from "expo-router";
import { useState } from "react";
import {
  ActivityIndicator,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useCart } from "../app/context/CartContext";
import { useTheme } from "../app/context/ThemeContext";
import CustomModal from "../components/CustomModal";

const PAYMENT_METHODS = [
  { id: "gcash", name: "GCash 💙", desc: "e-Wallet" },
  { id: "maya", name: "Maya 💚", desc: "e-Wallet" },
  { id: "cod", name: "COD 🚚", desc: "Cash on Delivery" },
  { id: "card", name: "Card 💳", desc: "Visa / Mastercard" },
];

export default function CartScreen() {
  const router = useRouter();
  const { cart, updateQuantity, removeFromCart, clearCart } = useCart();
  const { isDark, colors } = useTheme();

  const [selectedPayment, setSelectedPayment] = useState("gcash");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [modalConfig, setModalConfig] = useState<{
    visible: boolean;
    title: string;
    message: string;
    type: "alert" | "confirm";
    onConfirm: () => void;
  }>({
    visible: false,
    title: "",
    message: "",
    type: "alert",
    onConfirm: () => {},
  });

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const cardBgColor = isDark ? "#2D2622" : colors.cardBgLight;
  const categoryTextColor = isDark ? "#F4C430" : "#8B5E3C";

  const handleCheckout = () => {
    if (cart.length === 0) {
      setModalConfig({
        visible: true,
        title: "Cart Empty 🛒",
        message: "Your shopping cart is empty. Add some gear first!",
        type: "alert",
        onConfirm: () =>
          setModalConfig((prev) => ({ ...prev, visible: false })),
      });
      return;
    }

    const selectedMethodObj = PAYMENT_METHODS.find(
      (p) => p.id === selectedPayment,
    );

    setModalConfig({
      visible: true,
      title: "Confirm Order 📦",
      message: `Place order using ${selectedMethodObj?.name} for a total of ₱${total.toLocaleString()}?`,
      type: "confirm",
      onConfirm: () => {
        setModalConfig((prev) => ({ ...prev, visible: false }));
        setIsSubmitting(true);

        setTimeout(() => {
          setIsSubmitting(false);
          clearCart();
          setModalConfig({
            visible: true,
            title: "Order Placed! 🎉",
            message: `Thank you for ordering via ${selectedMethodObj?.name}! Your gear is now being prepared.`,
            type: "alert",
            onConfirm: () => {
              setModalConfig((prev) => ({ ...prev, visible: false }));
              router.push("/");
            },
          });
        }, 1200);
      },
    });
  };

  return (
    <ScrollView
      style={[styles.container, { backgroundColor: colors.background }]}
    >
      <Text style={[styles.headerTitle, { color: colors.textDark }]}>
        Your Shopping Cart 🛒
      </Text>

      {cart.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Text style={[styles.empty, { color: colors.textSecondary }]}>
            Your shopping cart is empty.
          </Text>
        </View>
      ) : (
        <>
          {cart.map((item) => (
            <View
              key={item.id}
              style={[styles.card, { backgroundColor: cardBgColor }]}
            >
              <Image source={item.image} style={styles.image} />

              <View style={{ flex: 1, justifyContent: "space-between" }}>
                <View>
                  <Text
                    style={[styles.categoryTag, { color: categoryTextColor }]}
                  >
                    {item.category || "Audio Gear"}
                  </Text>
                  <Text style={[styles.name, { color: colors.textDark }]}>
                    {item.name}
                  </Text>
                  <Text style={[styles.price, { color: colors.textDark }]}>
                    ₱{(item.price * item.quantity).toLocaleString()}
                  </Text>
                </View>

                <View style={styles.cartQtyRow}>
                  <View style={styles.cartQtyControls}>
                    <TouchableOpacity
                      style={styles.qtyBtn}
                      onPress={() => updateQuantity(item.id, -1)}
                    >
                      <Text style={styles.qtyBtnText}>-</Text>
                    </TouchableOpacity>

                    <Text style={[styles.qtyText, { color: colors.textDark }]}>
                      {item.quantity}
                    </Text>

                    <TouchableOpacity
                      style={styles.qtyBtn}
                      onPress={() => updateQuantity(item.id, 1)}
                    >
                      <Text style={styles.qtyBtnText}>+</Text>
                    </TouchableOpacity>
                  </View>

                  <TouchableOpacity
                    style={styles.removeButton}
                    onPress={() => removeFromCart(item.id)}
                    activeOpacity={0.7}
                  >
                    <Text style={styles.removeButtonText}>🗑️ Remove</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          ))}

          {/* Line Payment Method Selector */}
          <View style={styles.sectionBox}>
            <Text style={[styles.sectionTitle, { color: colors.textDark }]}>
              Select Payment Method 💳
            </Text>

            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={{ gap: 10, paddingVertical: 4 }}
            >
              {PAYMENT_METHODS.map((method) => {
                const isSelected = selectedPayment === method.id;
                return (
                  <TouchableOpacity
                    key={method.id}
                    style={[
                      styles.paymentCardHorizontal,
                      {
                        borderColor: isSelected ? colors.accent : "#555",
                        backgroundColor: isSelected
                          ? "rgba(212, 175, 55, 0.25)"
                          : cardBgColor,
                      },
                    ]}
                    onPress={() => setSelectedPayment(method.id)}
                  >
                    <Text
                      style={[styles.paymentName, { color: colors.textDark }]}
                    >
                      {method.name}
                    </Text>
                    <Text
                      style={{
                        fontSize: 11,
                        color: colors.textSecondary,
                        marginTop: 2,
                      }}
                    >
                      {method.desc}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </ScrollView>
          </View>

          {/* Summary */}
          <View style={styles.summaryBox}>
            <View style={styles.summaryRow}>
              <Text
                style={[styles.summaryLabel, { color: colors.textSecondary }]}
              >
                Total Items:
              </Text>
              <Text style={[styles.summaryValue, { color: colors.textDark }]}>
                {cart.reduce((sum, item) => sum + item.quantity, 0)} pcs
              </Text>
            </View>

            <View style={styles.summaryRow}>
              <Text
                style={[styles.summaryLabel, { color: colors.textSecondary }]}
              >
                Standard Shipping:
              </Text>
              <Text style={[styles.summaryValue, { color: "#4CAF50" }]}>
                FREE
              </Text>
            </View>

            <View
              style={[
                styles.divider,
                { backgroundColor: colors.textSecondary },
              ]}
            />

            <Text style={[styles.total, { color: colors.textDark }]}>
              Total: ₱{total.toLocaleString()}
            </Text>
          </View>
        </>
      )}

      <TouchableOpacity
        style={[
          styles.checkoutButton,
          { backgroundColor: colors.accent },
          isSubmitting && styles.checkoutButtonDisabled,
        ]}
        onPress={handleCheckout}
        disabled={isSubmitting || cart.length === 0}
      >
        {isSubmitting ? (
          <ActivityIndicator color={colors.textDark} />
        ) : (
          <Text style={[styles.checkoutButtonText, { color: colors.textDark }]}>
            Proceed to Checkout
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
          ← Continue Shopping
        </Text>
      </TouchableOpacity>

      <CustomModal
        visible={modalConfig.visible}
        title={modalConfig.title}
        message={modalConfig.message}
        type={modalConfig.type}
        onConfirm={modalConfig.onConfirm}
        onCancel={() => setModalConfig((prev) => ({ ...prev, visible: false }))}
      />
    </ScrollView>
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
  headerTitle: {
    fontSize: 22,
    fontWeight: "700",
    marginBottom: 16,
    textAlign: "center",
  },
  card: {
    flexDirection: "row",
    width: "100%",
    marginBottom: 14,
    padding: 14,
    borderRadius: 18,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 6,
    elevation: 3,
  },
  image: {
    width: 90,
    height: 90,
    resizeMode: "cover",
    marginRight: 14,
    borderRadius: 12,
  },
  categoryTag: {
    fontSize: 11,
    fontWeight: "800",
    textTransform: "uppercase",
    letterSpacing: 0.8,
  },
  name: {
    fontSize: 16,
    fontWeight: "700",
    marginVertical: 2,
  },
  price: {
    fontSize: 15,
    fontWeight: "600",
  },
  cartQtyRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 10,
  },
  cartQtyControls: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(255,255,255,0.08)",
    borderRadius: 12,
    paddingHorizontal: 6,
  },
  qtyBtn: {
    paddingHorizontal: 10,
    paddingVertical: 6,
  },
  qtyBtnText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#D4AF37",
  },
  qtyText: {
    fontSize: 14,
    fontWeight: "700",
    marginHorizontal: 8,
  },
  removeButton: {
    backgroundColor: "rgba(181, 88, 63, 0.15)",
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 10,
    minHeight: 38,
    justifyContent: "center",
    alignItems: "center",
  },
  removeButtonText: {
    color: "#E57373",
    fontSize: 12,
    fontWeight: "700",
  },
  sectionBox: {
    marginTop: 16,
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "700",
    marginBottom: 10,
  },
  paymentCardHorizontal: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderWidth: 2,
    borderRadius: 14,
    minWidth: 125,
    alignItems: "center",
    justifyContent: "center",
  },
  paymentName: {
    fontSize: 13,
    fontWeight: "700",
  },
  summaryBox: {
    marginTop: 12,
    paddingVertical: 8,
  },
  summaryRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 6,
  },
  summaryLabel: {
    fontSize: 14,
  },
  summaryValue: {
    fontSize: 14,
    fontWeight: "600",
  },
  divider: {
    height: 1,
    opacity: 0.2,
    marginVertical: 8,
  },
  total: {
    fontSize: 20,
    fontWeight: "700",
    textAlign: "right",
  },
  checkoutButton: {
    paddingVertical: 14,
    borderRadius: 25,
    marginTop: 16,
    alignItems: "center",
    justifyContent: "center",
    minHeight: 48,
  },
  checkoutButtonDisabled: {
    opacity: 0.5,
  },
  checkoutButtonText: {
    fontWeight: "700",
    fontSize: 15,
  },
  continueButton: {
    paddingVertical: 12,
    marginTop: 8,
    marginBottom: 30,
    alignItems: "center",
  },
  continueButtonText: {
    fontSize: 14,
    fontWeight: "600",
  },
  emptyContainer: {
    paddingVertical: 40,
    alignItems: "center",
  },
  empty: {
    textAlign: "center",
    fontSize: 15,
  },
});
