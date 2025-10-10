import { useMutation, useApolloClient } from '@apollo/client';
import { AUTHORIZE } from '../graphql/mutations';
import AuthStorage from '../utils/authStorage';


const authStorage = new AuthStorage();

const useSignIn = () => {
  const [mutate, result] = useMutation(AUTHORIZE);
  const apolloClient = useApolloClient();

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
