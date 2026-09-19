import { createContext, ReactNode, useContext, useState } from "react";
import { Product } from "../data/product";

export type CartItem = Product & {
  quantity: number;
};

type CartContextType = {
  cart: CartItem[];
  cartCount: number;
  /** Returns the quantity actually added (may be less than requested if stock-limited). */
  addToCart: (product: Product, quantity?: number) => number;
  updateQuantity: (id: string, delta: number) => void;
  removeFromCart: (id: string) => void;
  clearCart: () => void;
  /** How many more units of this product can still be added to the cart. */
  getRemainingStock: (product: Product) => number;
};

const CartContext = createContext<CartContextType>({
  cart: [],
  cartCount: 0,
  addToCart: () => 0,
  updateQuantity: () => {},
  removeFromCart: () => {},
  clearCart: () => {},
  getRemainingStock: (product) => product.stock,
});

export function CartProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([]);

  const getRemainingStock = (product: Product) => {
    const existing = cart.find((item) => item.id === product.id);
    const alreadyInCart = existing ? existing.quantity : 0;
    return Math.max(product.stock - alreadyInCart, 0);
  };

  const addToCart = (product: Product, qty: number = 1) => {
    let actuallyAdded = 0;

    setCart((prevCart) => {
      const existingIndex = prevCart.findIndex(
        (item) => item.id === product.id,
      );
      const currentQty =
        existingIndex > -1 ? prevCart[existingIndex].quantity : 0;
      const maxAddable = Math.max(product.stock - currentQty, 0);
      actuallyAdded = Math.min(qty, maxAddable);

      if (actuallyAdded <= 0) {
        return prevCart;
      }

      if (existingIndex > -1) {
        const updated = [...prevCart];
        updated[existingIndex] = {
          ...updated[existingIndex],
          quantity: updated[existingIndex].quantity + actuallyAdded,
        };
        return updated;
      }

      return [...prevCart, { ...product, quantity: actuallyAdded }];
    });

    return actuallyAdded;
  };

  const updateQuantity = (id: string, delta: number) => {
    setCart((prevCart) =>
      prevCart
        .map((item) => {
          if (item.id === id) {
            const newQty = Math.min(item.quantity + delta, item.stock);
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

  // Total number of items across all products (sum of all quantities)
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
        getRemainingStock,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => useContext(CartContext);
