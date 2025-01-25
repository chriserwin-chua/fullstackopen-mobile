import Constants from 'expo-constants';
import { Text, StyleSheet, View } from 'react-native';
import RepositoryList from './components/RepositoryList';
import theme from './theme';
import AppBar from './components/AppBar';
import { Route, Routes, Navigate } from 'react-router-native';
import SignIn from './components/SignIn';
import RepositoryItem from './components/RepositoryItem';
import RepositoryDetail from './components/RepositoryDetail';

const styles = StyleSheet.create({
  container: {
    marginTop: Constants.statusBarHeight,
    flexGrow: 1,
    flexShrink: 1,
    backgroundColor: theme.colors.mainBackground,
  },
});

const Main = () => {
  return (
    <View style={styles.container}>
      <AppBar />
      <Routes>
        <Route path="/" element={<RepositoryList />} />
        <Route path="/:id" element={<RepositoryDetail />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </View>
  );
};

export default Main;
