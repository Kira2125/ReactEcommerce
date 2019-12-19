import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import CartIcon from '../cart-icon/cart-icon.component';
import CartDropdown from '../cart-dropdown/cart-dropdown.component';
import { selectCartHidden } from '../../redux/cart/cart.selectors';
import { selectCurrentUser } from '../../redux/user/user.selectors';
import { ReactComponent as Logo } from '../../assets/crown.svg';
import {
    HeaderStyleContainer,
    LogoStyleContainer,
    OptionLinkStyle,
    OptionsStyleContainer
} from "./header.styles";
import {signOutStart} from "../../redux/user/user.actions";



const Header = ({ currentUser, hidden, signOutStart }) => (
  <HeaderStyleContainer>
    <LogoStyleContainer to='/'>
      <Logo className='logo' />
    </LogoStyleContainer>
    <OptionsStyleContainer>
      <OptionLinkStyle to='/shop'>
        SHOP
      </OptionLinkStyle>
      <OptionLinkStyle to='/shop'>
        CONTACT
      </OptionLinkStyle>
      {currentUser ? (
        <OptionLinkStyle as='div' onClick={signOutStart}>
          SIGN OUT
        </OptionLinkStyle>
      ) : (
        <OptionLinkStyle to='/signin'>
          SIGN IN
        </OptionLinkStyle>
      )}
      <CartIcon />
    </OptionsStyleContainer>
    {hidden ? null : <CartDropdown />}
  </HeaderStyleContainer>
);

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser,
  hidden: selectCartHidden
});

const mapDispatchToProps = dispatch => ({
    signOutStart: () => dispatch(signOutStart())
})

export default connect(mapStateToProps, mapDispatchToProps)(Header);
