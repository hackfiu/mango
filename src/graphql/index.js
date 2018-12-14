import { ApolloClient } from 'apollo-boost';
import { createUploadLink } from 'apollo-upload-client';
import { setContext } from 'apollo-link-context';
import { InMemoryCache } from 'apollo-cache-inmemory';

const uploadLink = createUploadLink({
  uri: 'http://681de01d.ngrok.io/graphql',
});

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem('JWT');
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(uploadLink),
  cache: new InMemoryCache(),
});

export default client;
