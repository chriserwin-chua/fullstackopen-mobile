import { View, StyleSheet, Pressable, Text, ScrollView } from 'react-native';
import Constants from 'expo-constants';
import theme from '../theme';
import AppBarTab from './AppBarTab';
const styles = StyleSheet.create({
  container: {
    paddingTop: Constants.statusBarHeight,
    marginTop: 40,
    paddingBottom: 20,
    backgroundColor: theme.colors.backgroundGray,
    color: theme.colors.textSecondary,
    flexDirection: 'row',
    height: 50,
  },
});

const AppBar = () => {
  return (
    <ScrollView horizontal style={styles.container}>
      <AppBarTab text="Repositories" path="/" />
      <AppBarTab text="Sign In" path="/signin" />
    </ScrollView>
  );
};

export default AppBar;
