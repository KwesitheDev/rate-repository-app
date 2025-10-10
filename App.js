//import { StyleSheet,  View } from 'react-native';
import React from 'react';
import Main from './src/components/Main';
import { NativeRouter } from 'react-router-native';
import { StatusBar } from 'expo-status-bar';
import { ApolloProvider } from '@apollo/client/react';
import createApolloClient from './src/utils/apolloClient';

const client = createApolloClient();
export default function App() {

  
  return (
    <>
      <NativeRouter>
        <ApolloProvider client={client}>
          <Main />
        </ApolloProvider>
        
      </NativeRouter>
      <StatusBar style= "auto"/>
    </>

  );
}

