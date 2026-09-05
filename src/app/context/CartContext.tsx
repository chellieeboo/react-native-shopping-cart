import { createContext, ReactNode, useContext, useState } from "react";
import { packages } from "../../data/packages";

type Package = (typeof packages)[number];

export type BookingInfo = {
  name: string;
  contact: string;
  eventDate: string;
};

export type BookingRequest = Package & { booking: BookingInfo };

type CartContextType = {
  cart: BookingRequest[];
  cartCount: number;
  addToCart: (pkg: Package, booking: BookingInfo) => void;
  removeFromCart: (id: string) => void;
  clearCart: () => void;
};

const CartContext = createContext<CartContextType>({
  cart: [],
  cartCount: 0,
  addToCart: () => {},
  removeFromCart: () => {},
  clearCart: () => {},
});

export function CartProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<BookingRequest[]>([]);

  const addToCart = (pkg: Package, booking: BookingInfo) => {
    setCart((prev) => {
      const alreadyRequested = prev.find((item) => item.id === pkg.id);

      if (alreadyRequested) {
        if (typeof window !== "undefined") {
          window.alert(
            `You've already requested ${pkg.name}. Remove it first if you'd like to change your booking.`,
          );
        }
        return prev;
      }

      if (typeof window !== "undefined") {
        window.alert(
          `Your request for ${pkg.name} has been added. We'll contact you to confirm your booking.`,
        );
      }
      return [...prev, { ...pkg, booking }];
    });
  };

  const removeFromCart = (id: string) => {
    setCart((prev) => prev.filter((item) => item.id !== id));
  };

  const clearCart = () => {
    setCart([]);
  };

  const cartCount = cart.length;

  return (
    <CartContext.Provider
      value={{
        cart,
        cartCount,
        addToCart,
        removeFromCart,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => useContext(CartContext);
