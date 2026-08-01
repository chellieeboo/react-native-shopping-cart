import { createContext, ReactNode, useContext, useState } from "react";
import { Product } from "../../data/product";
type CartContextType = {
  cart: Product[];
  addToCart: (product: Product) => void;
  removeFromCart: (id: string) => void;
};
const CartContext = createContext<CartContextType>({
  cart: [],

  addToCart: () => {},
  removeFromCart: () => {},
});
export function CartProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<Product[]>([]);
  const addToCart = (product: Product) => {
    setCart((prev) => [...prev, product]);
  };
  const removeFromCart = (id: string) => {
    setCart((prev) => prev.filter((item) => item.id !== id));
  };
  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}
export const useCart = () => useContext(CartContext);
