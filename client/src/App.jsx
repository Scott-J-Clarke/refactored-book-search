// import React from 'react';
import { Outlet } from 'react-router-dom';
import { 
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink
} from '@apollo/client';
import { setContext } from '@apollo/client/link/context'

// import { Outlet } from 'react-router-dom';

import './App.css';
// import SavedBooks from './pages/SavedBooks';
// import SearchBooks from './pages/SearchBooks';
import Navbar from './components/Navbar';

const httpLink = createHttpLink({
  uri: '/graphql'
});

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem('id_token');
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : ''
    }
  }
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache()
})

function App() {
  return (
      <ApolloProvider client={client}>
          <>
            <Navbar />
            <Outlet />
          </>
      </ApolloProvider>
  );
}

export default App;
