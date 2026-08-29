import { Stack } from "expo-router";
import { CartProvider } from "../app/context/CartContext";
export default function RootLayout() {
  return (
    <CartProvider>
      <Stack
        screenOptions={{
          headerTitle: "Rochordz",
          headerTitleAlign: "center",
        }}
      />
    </CartProvider>
  );
}
