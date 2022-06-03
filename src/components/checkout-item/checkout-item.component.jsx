import { useDispatch, useSelector } from 'react-redux';
import {
  addItemToCart,
  clearItemFromCart,
  removeItemToCart,
} from '../../store/cart/cart.action';
import { selectCartItems } from '../../store/cart/cart.selector';
import {
  Arrow,
  CheckoutContainer,
  DataContainer,
  ImageContainer,
  QuantityDataContainer,
  RemoveButton,
  ValueDataContainer,
} from './checkout-item.styles';

const CheckoutItem = ({ item }) => {
  const { name, imageUrl, quantity, price } = item;
  const cartItems = useSelector(selectCartItems);
  const dispatch = useDispatch();

  return (
    <CheckoutContainer>
      <ImageContainer>
        <img src={imageUrl} alt={`${name}`} />
      </ImageContainer>
      <DataContainer>{name}</DataContainer>
      <QuantityDataContainer>
        <Arrow onClick={() => dispatch(removeItemToCart(cartItems, item))}>
          &#10094;
        </Arrow>
        <ValueDataContainer>{quantity}</ValueDataContainer>
        <Arrow onClick={() => dispatch(addItemToCart(cartItems, item))}>
          &#10095;
        </Arrow>
      </QuantityDataContainer>
      <DataContainer>{price}</DataContainer>
      <RemoveButton
        onClick={() => dispatch(clearItemFromCart(cartItems, item))}
      >
        &#10005;
      </RemoveButton>
    </CheckoutContainer>
  );
};

export default CheckoutItem;
