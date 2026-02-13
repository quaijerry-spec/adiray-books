import { createContext, useContext, useState, useEffect } from "react";

const CartContext = createContext(null);

export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState(() => {
    try {
      const saved = localStorage.getItem("adiray-cart");
      const parsed = saved ? JSON.parse(saved) : [];
      return Array.isArray(parsed) ? parsed : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem("adiray-cart", JSON.stringify(cartItems));
  }, [cartItems]);

  const addToCart = (book) => {
    if (!book || !book.id) return;

    setCartItems((prev) => {
      const existing = prev.find((item) => item.id === book.id);

      if (existing) {
        return prev.map((item) =>
          item.id === book.id
            ? { ...item, quantity: (item.quantity || 0) + 1 }
            : item
        );
      }

      return [...prev, { ...book, quantity: 1 }];
    });
  };

  const increaseQuantity = (id) => {
    setCartItems((prev) =>
      prev.map((item) =>
        item.id === id
          ? { ...item, quantity: (item.quantity || 0) + 1 }
          : item
      )
    );
  };

  const decreaseQuantity = (id) => {
    setCartItems((prev) =>
      prev
        .map((item) =>
          item.id === id
            ? { ...item, quantity: (item.quantity || 0) - 1 }
            : item
        )
        .filter((item) => (item.quantity || 0) > 0)
    );
  };

  const removeFromCart = (id) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  };

  const clearCart = () => setCartItems([]);

  const cartCount = Array.isArray(cartItems)
    ? cartItems.reduce((total, item) => total + (item.quantity || 0), 0)
    : 0;

  return (
    <CartContext.Provider
      value={{
        cartItems: Array.isArray(cartItems) ? cartItems : [],
        addToCart,
        increaseQuantity,
        decreaseQuantity,
        removeFromCart,
        clearCart,
        cartCount,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    return {
      cartItems: [],
      cartCount: 0,
      addToCart: () => {},
      increaseQuantity: () => {},
      decreaseQuantity: () => {},
      removeFromCart: () => {},
      clearCart: () => {},
    };
  }
  return context;
}
