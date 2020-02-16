import { gql } from 'apollo-boost';
import React from 'react';
import { Mutation } from 'react-apollo';
import CartDropdown from './cart-dropdown.component';

const TOGGLE_CART_HIDDEN = gql`
	mutation ToggleCartHidden {
		toggleCartHidden @client
	}
`;

const CartDropdownContainer = () => (
	<Mutation mutation={ TOGGLE_CART_HIDDEN }>
		{
			toggleCartHidden => <CartDropdown toggleCartHidden={ toggleCartHidden }/>
		}
	</Mutation>
);

export default CartDropdownContainer;
