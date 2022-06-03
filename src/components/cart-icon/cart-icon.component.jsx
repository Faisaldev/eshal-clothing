import { useDispatch, useSelector } from 'react-redux';
import { setCartIsOpen } from '../../store/cart/cart.action';
import {
  selectCartCount,
  selectIsCartOpen,
} from '../../store/cart/cart.selector';
import { CartIconContainer, ItemCount, ShoppingIcon } from './cart-icon.styles';

const CartIcon = () => {
  const isCartOpen = useSelector(selectIsCartOpen);
  const cartCount = useSelector(selectCartCount);
  const dispatch = useDispatch();

  const toggleDropdown = () => {
    const dispatchValue = setCartIsOpen(!isCartOpen);
    console.log(dispatchValue);
    dispatch(dispatchValue);
  };

  return (
    <CartIconContainer onClick={toggleDropdown}>
      <ShoppingIcon className='shopping-icon' />
      <ItemCount>{cartCount}</ItemCount>
    </CartIconContainer>
  );
};

export default CartIcon;
