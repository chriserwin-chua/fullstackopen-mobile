import { useApolloClient, useMutation } from '@apollo/client';
import { SIGN_IN } from '../graphql/mutation';
import useAuthStorage from './useAuthStorage';
import { useNavigate } from 'react-router-native';
const useSignin = () => {
  const authStorage = useAuthStorage();
  const navigate = useNavigate();
  const apolloClient = useApolloClient();
  const [mutate, result] = useMutation(SIGN_IN);

  const signIn = async ({ username, password }) => {
    // call the mutate function here with the right arguments
    const { data } = await mutate({
      variables: {
        credentials: { username, password },
      },
    });
    if (data?.authenticate.accessToken) {
      await authStorage.setAccessToken(data?.authenticate.accessToken);
      apolloClient.resetStore();
      navigate('/');
    }
  };

  return { signIn, result };
};

export default useSignin;
