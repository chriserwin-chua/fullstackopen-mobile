import Main from './src/Main';
import { NativeRouter } from 'react-router-native';
import { StatusBar } from 'expo-status-bar';
import createApolloClient from './apolloClient';
import { ApolloProvider } from '@apollo/client';
const apolloClient = createApolloClient();

export default function App() {
  return (
    <>
      <NativeRouter>
        <ApolloProvider client={apolloClient}>
          <Main />
        </ApolloProvider>
      </NativeRouter>
      <StatusBar style="auto" />
    </>
  );
}
