import { useMutation, useApolloClient } from '@apollo/client';
import { AUTHORIZE } from '../graphql/mutations';
import AuthStorage from '../utils/authStorage';
import AuthStorageContext from '../contexts/AuthStorageContext';
import { useContext } from 'react';


const useSignIn = () => {
  const [mutate, result] = useMutation(AUTHORIZE);
  const apolloClient = useApolloClient();
  const authStorage = useContext(AuthStorageContext);

  const signIn = async ({ username, password }) => {
    const { data } = await mutate({
      variables: {
        credentials: { username, password },
      },
    });

    const accessToken = data?.authenticate?.accessToken;
    if (accessToken) {
      await authStorage.setAccessToken(accessToken);
    }

    await apolloClient.resetStore();

    return data;
  };


  return [signIn, result];
};

export default useSignIn;
