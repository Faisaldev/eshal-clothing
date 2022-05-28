import { useContext } from 'react';
import { CartContext } from '../../contexts/cart.context';
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
  const { clearItemFromCart, addItemToCart, removeItemToCart } =
    useContext(CartContext);
  return (
    <CheckoutContainer>
      <ImageContainer>
        <img src={imageUrl} alt={`${name}`} />
      </ImageContainer>
      <DataContainer>{name}</DataContainer>
      <QuantityDataContainer>
        <Arrow onClick={() => removeItemToCart(item)}>&#10094;</Arrow>
        <ValueDataContainer>{quantity}</ValueDataContainer>
        <Arrow onClick={() => addItemToCart(item)}>&#10095;</Arrow>
      </QuantityDataContainer>
      <DataContainer>{price}</DataContainer>
      <RemoveButton onClick={() => clearItemFromCart(item)}>
        &#10005;
      </RemoveButton>
    </CheckoutContainer>
  );
};

export default CheckoutItem;
