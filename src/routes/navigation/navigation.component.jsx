import { Fragment, useContext } from 'react';
import { Outlet } from 'react-router-dom';
import { ReactComponent as Logo } from '../../assets/crown.svg';
import CartDropdown from '../../components/cart-dropdown/cart-dropdown.component';
import CartIcon from '../../components/cart-icon/cart-icon.component';
import { CartContext } from '../../contexts/cart.context';
import { UserContext } from '../../contexts/user.context';
import { signOutUser } from '../../services/firebase.service';
import {
  MainNavigation,
  NavLinks,
  NavLinksContainer,
  SpanLinks,
} from './navigation.styles';

const Navigation = () => {
  const { currentUser } = useContext(UserContext);
  const { isCartOpen } = useContext(CartContext);

  return (
    <Fragment>
      <MainNavigation>
        <NavLinks to='/'>
          <Logo />
        </NavLinks>
        <NavLinksContainer>
          <NavLinks to='/shop'>Shop</NavLinks>
          {currentUser ? (
            <SpanLinks onClick={signOutUser}> SIGN OUT</SpanLinks>
          ) : (
            <NavLinks to='/auth'>SIGN IN</NavLinks>
          )}
          <CartIcon />
        </NavLinksContainer>
        {isCartOpen && <CartDropdown />}
      </MainNavigation>
      <Outlet />
    </Fragment>
  );
};

export default Navigation;
