import { View, StyleSheet, Text, /*Pressable*/, ScrollView } from 'react-native';
import Constants from 'expo-constants';
import theme from '../../theme';
import React from 'react';
import { Link } from 'react-router-native';

const styles = StyleSheet.create({
  container: {
    paddingTop: Constants.statusBarHeight,
    backgroundColor: theme.colors.appBarBackground, 
    flexDirection: 'row',
    paddingBottom: 10,
    paddingHorizontal: 10,
  },
  tab: {
    color: '#ffffff',
    fontSize: theme.subheading,
    fontWeight: theme.fontWeights.bold,
    marginRight: 15,
  },
  scroll: {
    flexDirection: 'row',
  },
});

const AppBar = () => {
  return (
    <View style={styles.container}>
      <ScrollView horizontal style={styles.scroll} showsHorizontalScrollIndicator={false}>
        <Link to="/" underlayColor="transparent">
          <Text style={styles.tab}>Repositories</Text>
        </Link>
        <Link to="/signin" underlayColor="transparent">
          <Text style={styles.tab}>Sign in</Text>
        </Link>
      </ScrollView>
    </View>
  );
};

export default AppBar;
