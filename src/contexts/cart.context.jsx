const { createContext, useState, useEffect } = require('react');

const addProductToCart = (cartItems, productToAdd) => {
  const existingItem = cartItems.find(item => item.id === productToAdd.id);

  if (existingItem) {
    return cartItems.map(item =>
      item.id === productToAdd.id
        ? { ...item, quantity: item.quantity + 1 }
        : item
    );
  }

  return [...cartItems, { ...productToAdd, quantity: 1 }];
};

const removeItemFromCart = (cartItems, removeItem) => {
  const existingItem = cartItems.find(item => item.id === removeItem.id);

  if (existingItem && existingItem.quantity === 1) {
    return cartItems.filter(item => item.id !== removeItem.id);
  } else {
    return cartItems.map(item =>
      item.id === removeItem.id
        ? { ...item, quantity: item.quantity - 1 }
        : item
    );
  }
};
const removeItem = (cartItems, item) => {
  return cartItems.filter(cartItem => cartItem.id !== item.id);
};

export const CartContext = createContext({
  isCartOpen: false,
  setCartOpen: () => {},
  cartItems: [],
  addItemToCart: () => {},
  removeItemToCart: () => {},
  clearItemFromCart: () => {},
  cartCount: 0,
  cartTotal: 0,
});

export const CartProvider = ({ children }) => {
  const [isCartOpen, setCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [cartCount, setCartCount] = useState(0);
  const [cartTotal, setCartTotal] = useState(0);

  useEffect(() => {
    const count = cartItems.reduce((total, item) => total + item.quantity, 0);
    setCartCount(count);
  }, [cartItems]);

  useEffect(() => {
    const cartTotal = cartItems.reduce(
      (total, item) => total + item.quantity * item.price,
      0
    );
    setCartTotal(cartTotal);
  }, [cartItems]);

  const addItemToCart = productToAdd => {
    setCartItems(addProductToCart(cartItems, productToAdd));
  };

  const removeItemToCart = removeCartItem => {
    setCartItems(removeItemFromCart(cartItems, removeCartItem));
  };
  const clearItemFromCart = item => {
    setCartItems(removeItem(cartItems, item));
  };
  const value = {
    isCartOpen,
    setCartOpen,
    cartItems,
    addItemToCart,
    removeItemToCart,
    clearItemFromCart,
    cartCount,
    cartTotal,
  };
  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
