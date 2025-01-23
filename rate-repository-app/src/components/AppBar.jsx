import { View, StyleSheet, Pressable, Text, ScrollView } from 'react-native';
import theme from '../theme';
import AppBarTab from './AppBarTab';
import useAuthStorage from '../hooks/useAuthStorage';
import { useApolloClient, useQuery } from '@apollo/client';
import { GET_ME } from '../graphql/queries';
const styles = StyleSheet.create({
  container: {
    //paddingTop: Constants.statusBarHeight,
    //marginTop: 40,
    backgroundColor: theme.colors.backgroundGray,
    color: theme.colors.textSecondary,
    flexDirection: 'row',
    height: 50,
    alignItems: 'center',
  },
});

const AppBar = () => {
  const authStorage = useAuthStorage();
  const apolloClient = useApolloClient();
  // const [token, setToken] = useState();
  // const getToken = async () => {
  //   const token = await authStorage.getAccessToken();
  //   setToken(token);
  //   //console.log('gettoken', token);
  // };

  // useEffect(() => {
  //   getToken();
  // }, []);

  const { data } = useQuery(GET_ME, {
    fetchPolicy: 'cache-and-network',
    // Other options
  });

  const handleLogout = async () => {
    await authStorage.removeAccessToken();
    apolloClient.resetStore();
  };

  return (
    <View style={styles.container}>
      <ScrollView horizontal>
        <AppBarTab text="Repositories" path="/" isLink />
        {data.me ? (
          <AppBarTab
            text="Sign out"
            path="/"
            isLink={false}
            onPress={handleLogout}
          />
        ) : (
          <AppBarTab text="Sign In" path="/signin" isLink />
        )}
      </ScrollView>
    </View>
  );
};

export default AppBar;
