import { Stack } from "expo-router";
import { CartProvider } from "../app/context/CartContext";
import { ThemeProvider } from "../app/context/ThemeContext";

export default function RootLayout() {
  return (
    <ThemeProvider>
      <CartProvider>
        <Stack
          screenOptions={{
            headerShown: false,
          }}
        />
      </CartProvider>
    </ThemeProvider>
  );
}
