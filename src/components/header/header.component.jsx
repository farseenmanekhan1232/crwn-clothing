import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import {withRouter} from 'react-router-dom';

import { auth } from '../../firebase/firebase.utils';
import CartIcon from '../cart-icon/cart-icon.component';
import CartDropdown from '../cart-dropdown/cart-dropdown.component';
import { selectCartHidden } from '../../redux/cart/cart.selectors';
import { selectCurrentUser } from '../../redux/user/user.selectors';

import { ReactComponent as Logo } from '../../assets/crown.svg';

import {HeaderContainer , LogoContainer , OptionLink, OptionsContainer} from './header.style';

const Header = ({ currentUser, hidden , location }) => (
  <HeaderContainer >
    <LogoContainer  to='/'>
      <Logo  />
    </LogoContainer>
    <OptionsContainer >
      <OptionLink  to='/shop'>
        SHOP
      </OptionLink>
      <OptionLink  to='/shop'>
        CONTACT
      </OptionLink>
      {currentUser ? (
        <OptionLink as='div' onClick={() => auth.signOut()}>
          SIGN OUT
        </OptionLink>
      ) : (
        <OptionLink to='/signin'>
          SIGN IN
        </OptionLink>
      )}
      {
        location.pathname !=='/checkout'?(<CartIcon />):(null)
      }
      
    </OptionsContainer>
    {
      location.pathname!=='/checkout'?(hidden ? null : <CartDropdown />):(null)
    }
  </HeaderContainer>
);

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser,
  hidden: selectCartHidden
});

export default connect(mapStateToProps)(withRouter(Header));
