import { createContext, useReducer } from 'react';
import { createAction } from '../utils/reducer.utils';

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

export const CART_ACTION_TYPES = {
  SET_CART_ITEMS: 'SET_CART_ITEMS',
  SET_CART_IS_OPEN: 'SET_CART_IS_OPEN',
};

const INTITIAL_STATE = {
  isCartOpen: false,
  cartItems: [],
  cartCount: 0,
  cartTotal: 0,
};

const cartReducer = (state, action) => {
  const { type, payload } = action;
  console.log('CartReducer');
  switch (type) {
    case CART_ACTION_TYPES.SET_CART_ITEMS:
      return {
        ...state,
        ...payload,
      };

    case CART_ACTION_TYPES.SET_CART_IS_OPEN:
      return {
        ...state,
        isCartOpen: payload,
      };

    default:
      throw new Error(`invalid action type ${type}`);
  }
};

export const CartProvider = ({ children }) => {
  const [{ isCartOpen, cartItems, cartCount, cartTotal }, dispatch] =
    useReducer(cartReducer, INTITIAL_STATE);

  const updateCartReducer = newCartItems => {
    const count = newCartItems.reduce(
      (total, item) => total + item.quantity,
      0
    );
    const total = newCartItems.reduce(
      (total, item) => total + item.quantity * item.price,
      0
    );
    console.log('Update Reducer');
    dispatch(
      createAction(CART_ACTION_TYPES.SET_CART_ITEMS, {
        cartItems: newCartItems,
        cartCount: count,
        cartTotal: total,
      })
    );
  };

  const addItemToCart = productToAdd => {
    const newCartItems = addProductToCart(cartItems, productToAdd);
    updateCartReducer(newCartItems);
  };

  const removeItemToCart = removeCartItem => {
    const newCartItems = removeItemFromCart(cartItems, removeCartItem);
    updateCartReducer(newCartItems);
  };
  const clearItemFromCart = clearItem => {
    const newCartItems = removeItem(cartItems, clearItem);
    updateCartReducer(newCartItems);
  };

  const setCartOpen = bool => {
    dispatch(createAction(CART_ACTION_TYPES.SET_CART_IS_OPEN, bool));
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
