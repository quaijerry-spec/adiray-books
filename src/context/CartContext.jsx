import { createContext, useContext, useState } from "react";

// Create Cart context
const CartContext = createContext();

// Cart provider to wrap the app
export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState([]);

  // Add a book to the cart
  const addToCart = (book) => {
    setCartItems((prev) => {
      // Check if book already exists in cart
      const existing = prev.find((item) => item.id === book.id);
      if (existing) {
        return prev.map((item) =>
          item.id === book.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { ...book, quantity: 1 }];
    });
  };

  // Remove a book from the cart
  const removeFromCart = (bookId) => {
    setCartItems((prev) => prev.filter((item) => item.id !== bookId));
  };

  // Clear the cart
  const clearCart = () => setCartItems([]);

  // Total items in the cart
  const cartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <CartContext.Provider
      value={{ cartItems, addToCart, removeFromCart, clearCart, cartCount }}
    >
      {children}
    </CartContext.Provider>
  );
}

// Hook to use the cart
export function useCart() {
  return useContext(CartContext);
}
