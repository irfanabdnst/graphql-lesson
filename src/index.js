import { ApolloClient } from 'apollo-boost';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { createHttpLink } from 'apollo-link-http';
import React from 'react';
import { ApolloProvider } from 'react-apollo';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { PersistGate } from 'redux-persist/integration/react';
import {default as App} from './app/App.container';
import INITIAL_DATA from './graphql/initial-data';
import { resolvers, typeDefs } from './graphql/resolvers';
import './index.css';
import { persistor, store } from './redux/store';

const httpLink = createHttpLink({
	uri: 'https://crwn-clothing.com'
});

const cache = new InMemoryCache();

const client = new ApolloClient({
	link: httpLink,
	cache,
	resolvers,
	typeDefs
});

client.writeData({
	data: INITIAL_DATA
});

ReactDOM.render(
	<ApolloProvider client={ client }>
		<Provider store={ store }>
			<BrowserRouter>
				<PersistGate persistor={ persistor }>
					<App/>
				</PersistGate>
			</BrowserRouter>
		</Provider>
	</ApolloProvider>,

	document.getElementById('root')
);
