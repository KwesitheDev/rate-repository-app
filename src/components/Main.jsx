import React from 'react';
import { View, StyleSheet } from 'react-native';
import RepositoryList from './RepositoryList';
import Constants from 'expo-constants';
import AppBar from './AppBar';

const styles = StyleSheet.create({
  container: {
    marginTop: Constants.statusBarHeight,
    flex: 1,

  },
});

const Main = () => {
  return (
    <View style={styles.container}>
        <AppBar />
        <RepositoryList />
      </View>
  );
};

export default Main;