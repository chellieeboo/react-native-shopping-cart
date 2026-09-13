import { createContext, ReactNode, useContext, useState } from "react";
import { products } from "../../data/products";

export type BaseProduct = (typeof products)[number];

export type CartItem = BaseProduct & {
  quantity: number;
};

type CartContextType = {
  cart: CartItem[];
  cartCount: number;
  addToCart: (product: BaseProduct, quantity?: number) => void;
  updateQuantity: (id: string, delta: number) => void;
  removeFromCart: (id: string) => void;
  clearCart: () => void;
};

const CartContext = createContext<CartContextType>({
  cart: [],
  cartCount: 0,
  addToCart: () => {},
  updateQuantity: () => {},
  removeFromCart: () => {},
  clearCart: () => {},
});

export function CartProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([]);

  const addToCart = (product: BaseProduct, qty: number = 1) => {
    setCart((prevCart) => {
      const existingIndex = prevCart.findIndex(
        (item) => item.id === product.id,
      );
      if (existingIndex > -1) {
        const updated = [...prevCart];
        updated[existingIndex].quantity += qty;
        return updated;
      } else {
        return [...prevCart, { ...product, quantity: qty }];
      }
    });

    if (typeof window !== "undefined") {
      window.alert(`${qty} x ${product.name} added to your shopping cart! 🛒`);
    }
  };

  const updateQuantity = (id: string, delta: number) => {
    setCart((prevCart) =>
      prevCart
        .map((item) => {
          if (item.id === id) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter((item): item is CartItem => item !== null),
    );
  };

  const removeFromCart = (id: string) => {
    setCart((prev) => prev.filter((item) => item.id !== id));
  };

  const clearCart = () => {
    setCart([]);
  };

  // Kina-calculate ang total number ng items (sum ng lahat ng quantities)
  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <CartContext.Provider
      value={{
        cart,
        cartCount,
        addToCart,
        updateQuantity,
        removeFromCart,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => useContext(CartContext);
