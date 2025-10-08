import { View, StyleSheet, Text, Pressable, ScrollView } from 'react-native';
import Constants from 'expo-constants';
import theme from '../../theme';
import React from 'react';

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
});

const AppBar = () => {
  return (
    <View style={styles.container}>
      <ScrollView horizontal>
        <Pressable onPress={() => {}}>
          <Text style={styles.tab}>Repositories</Text>
        </Pressable>
      </ScrollView>
    </View>
  );
};

export default AppBar;
