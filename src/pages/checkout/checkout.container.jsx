import React from 'react';
import { graphql } from 'react-apollo';
import { flowRight } from 'lodash';
import { gql } from 'apollo-boost';
import CheckoutPage from './checkout.component';

const GET_CART_ITEMS = gql`
	{
		cartItems @client
	}
`;

const GET_TOTAL = gql`
	{
		total @client
	}
`;

const CheckoutContainer = ({ data: { cartItems, total } }) => (
	<CheckoutPage cartItems={cartItems} total={total} />
);

export default flowRight(
	graphql(GET_CART_ITEMS, GET_TOTAL)
)(CheckoutContainer);
