import { ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import Constants from 'expo-constants';
import AuthStorage from './authStorage';

const authStorage = new AuthStorage();

const createApolloClient = () => {

  const apiUri =
    Constants.expoConfig?.extra?.apiUri ||
    Constants.manifest?.extra?.apiUri 

  const httpLink = createHttpLink({
    uri: apiUri,
  });

  const authLink = setContext(async (_, { headers }) => {
    const token = await authStorage.getAccessToken();
    return {
      headers: {
        ...headers,
        authorization: token ? `Bearer ${token}` : '',
      },
    };
  });

  return new ApolloClient({
    link: authLink.concat(httpLink),
    cache: new InMemoryCache(),
  });
};

export default createApolloClient;
