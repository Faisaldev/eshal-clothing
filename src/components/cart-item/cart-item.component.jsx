import {
  CartItemContainer,
  Image,
  ItemDetails,
  Name,
} from './cart-item.styles';

const CartItem = ({ cartItem }) => {
  const { name, quantity, price, imageUrl } = cartItem;

  return (
    <CartItemContainer>
      <Image src={imageUrl} alt={name} />
      <ItemDetails>
        <Name>{name}</Name>
        <Name>
          {quantity} x ${price}
        </Name>
      </ItemDetails>
    </CartItemContainer>
  );
};

export default CartItem;
