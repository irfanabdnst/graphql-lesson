import { gql } from 'apollo-boost';
import { flowRight } from 'lodash';
import React from 'react';
import { graphql } from 'react-apollo';
import CheckoutItem from './checkout-item.component';

const ADD_ITEM = gql`
	mutation AddItemToCart($item: Item!) {
		addItemToCart(item: $item) @client
	}
`;

const REMOVE_ITEM = gql`
	mutation RemoveCartItem($item: Item!) {
		removeCartItem(item: $item) @client
	}
`;

const CLEAR_ITEM = gql`
	mutation ClearCartItem($item: Item!) {
		clearCartItem(item: $item) @client
	}
`;

const CheckoutItemContainer = (props) => {
	const { addItemToCart, removeCartItem, clearCartItem } = props;

	return (
		<CheckoutItem
			{...props}
			addItem={ item => addItemToCart({ variables: { item } }) }
			removeItem={ item => removeCartItem({ variables: { item } }) }
			clearItem={ item => clearCartItem({ variables: { item } }) }
		/>
	);
};

export default flowRight(
	graphql(ADD_ITEM, { name: 'addItemToCart' }),
	graphql(REMOVE_ITEM, { name: 'removeCartItem' }),
	graphql(CLEAR_ITEM, { name: 'clearCartItem' })
)(CheckoutItemContainer);
