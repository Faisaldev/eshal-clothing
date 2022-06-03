import { createAction } from '../../utils/reducer.utils';
import { CART_ACTION_TYPES } from './cart.types';

export const addItemToCart = (cartItems, itemToAdd) => {
  const newCartItems = addCartItem(cartItems, itemToAdd);
  return createAction(CART_ACTION_TYPES.SET_CART_ITEMS, newCartItems);
};

export const removeItemToCart = (cartItems, itemToRemove) => {
  const newCartItems = removeCartItem(cartItems, itemToRemove);
  return createAction(CART_ACTION_TYPES.SET_CART_ITEMS, newCartItems);
};

export const setCartIsOpen = bool => {
  return createAction(CART_ACTION_TYPES.SET_CART_IS_OPEN, bool);
};

export const clearItemFromCart = (cartItems, clearItem) => {
  const newCartItems = clearCartItem(cartItems, clearItem);
  return createAction(CART_ACTION_TYPES.SET_CART_ITEMS, newCartItems);
};

const clearCartItem = (cartItems, item) => {
  return cartItems.filter(cartItem => cartItem.id !== item.id);
};

const addCartItem = (cartItems, productToAdd) => {
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

const removeCartItem = (cartItems, removeItem) => {
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
