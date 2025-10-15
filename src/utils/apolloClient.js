import { ApolloClient, InMemoryCache, HttpLink } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import Constants from 'expo-constants';
import AuthStorage from './authStorage';


const { apiUri } = Constants.expoConfig.extra;

const createApolloClient = (authStorage) => {
  const httpLink = new HttpLink({
    uri: apiUri,
  });

  const authLink = setContext(async (_, { headers }) => {
    try {
      const accessToken = await authStorage?.getAccessToken();
      return {
        headers: {
          ...headers,
          authorization: accessToken ? `Bearer ${accessToken}` : '',
        },
      };
    } catch (e) {
      console.error('Error getting auth token:', e);
      return { headers };
    }
  });

  return new ApolloClient({
    link: authLink.concat(httpLink),
    cache: new InMemoryCache(),
  });
};


export default createApolloClient;
