import { ApolloClient, InMemoryCache, HttpLink } from '@apollo/client';
import Constants from 'expo-constants';

const { apiUri } = Constants.expoConfig.extra; 

const createApolloClient = () => {
  return new ApolloClient({
    link: new HttpLink({ uri: apiUri }), 
    cache: new InMemoryCache(),
  });
};

export default createApolloClient;


