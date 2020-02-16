import { gql } from 'apollo-boost';
import { addItemToCart, clearCartItemFromCart, getCartItemCount, getTotal, removeItemFromCart } from './cart.utils';

export const typeDefs = gql`
	extend type Item {
		quantity: Int
	}

	extend type Mutation {
		ToggleCartHidden: Boolean!
		AddItemToCart(item: Item!): [Item]!
		RemoveCartItem(item: Item!): [Item]!
		ClearCartItem(item: Item!): [Item]!
	}
`;

const GET_CART_HIDDEN = gql`
	{
		cartHidden @client
	}
`;

const GET_ITEM_COUNT = gql`
	{
		itemCount @client
	}
`;

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

export const resolvers = {
	Mutation: {
		toggleCartHidden: (_root, _args, { cache }) => {
			const { cartHidden } = cache.readQuery({
				query: GET_CART_HIDDEN
			});

			cache.writeQuery({
				query: GET_CART_HIDDEN,
				data: { cartHidden: !cartHidden }
			});

			return !cartHidden;
		},

		addItemToCart: (_root, { item }, { cache }) => {
			const { cartItems } = cache.readQuery({
				query: GET_CART_ITEMS
			});

			const newCartItems = addItemToCart(cartItems, item);

			cache.writeQuery({
				query: GET_ITEM_COUNT,
				data: { itemCount: getCartItemCount(newCartItems) }
			});

			cache.writeQuery({
				query: GET_TOTAL,
				data: { total: getTotal(newCartItems) }
			});

			cache.writeQuery({
				query: GET_CART_ITEMS,
				data: { cartItems: newCartItems }
			});

			return newCartItems;
		},

		removeCartItem: (_root, { item }, { cache }) => {
			const { cartItems } = cache.readQuery({
				query: GET_CART_ITEMS
			});

			const newCartItems = removeItemFromCart(cartItems, item);

			cache.writeQuery({
				query: GET_ITEM_COUNT,
				data: { itemCount: getCartItemCount(newCartItems) }
			});

			cache.writeQuery({
				query: GET_TOTAL,
				data: { total: getTotal(newCartItems) }
			});

			cache.writeQuery({
				query: GET_CART_ITEMS,
				data: { cartItems: newCartItems }
			});

			return newCartItems;
		},

		clearCartItem: (_root, { item }, { cache }) => {
			const { cartItems } = cache.readQuery({
				query: GET_CART_ITEMS
			});

			const newCartItems = clearCartItemFromCart(cartItems, item);

			cache.writeQuery({
				query: GET_ITEM_COUNT,
				data: { itemCount: getCartItemCount(newCartItems) }
			});

			cache.writeQuery({
				query: GET_TOTAL,
				data: { total: getTotal(newCartItems) }
			});

			cache.writeQuery({
				query: GET_CART_ITEMS,
				data: { cartItems: newCartItems }
			});

			return newCartItems;
		}

	}
};
