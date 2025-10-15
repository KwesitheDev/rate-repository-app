import { View, StyleSheet, Text, Pressable, ScrollView } from 'react-native';
import Constants from 'expo-constants';
import theme from '../../theme';
import React from 'react';
import { Link } from 'react-router-native';
import { GET_ME } from '../graphql/queries';
import AuthStorage from '../utils/authStorage';
import { useQuery, useApolloClient } from '@apollo/client';
import { useNavigate } from 'react-router-native';
//authStorage
const authStorage = new AuthStorage();


//styles
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
  const {data} = useQuery(GET_ME); 
  const apolloClient = useApolloClient();
  const navigate  = useNavigate();

  const handleSignOut = async () => {
    await authStorage.removeAccessToken();
    await apolloClient.resetStore();
    navigate('/signin');
  }

  const user = data?.me;
  return (
    <View style={styles.container}>
      <ScrollView horizontal style={styles.scroll} showsHorizontalScrollIndicator={false}>
        <Link to="/" underlayColor="transparent">
          <Text style={styles.tab}>Repositories</Text>
        </Link>

        {user ? (
          <Pressable onPress={handleSignOut}>
            <Text style={styles.tab}>Sign out</Text>
          </Pressable>
        ) : (
          <Link to="/signin" underlayColor="transparent">
            <Text style={styles.tab}>Sign in</Text>
          </Link>
        )}
        {user && (
          <Link to="/createReview" underlayColor="transparent">
            <Text style={styles.tab}>Create a review</Text>
          </Link>
        )}
      </ScrollView>
    </View>
  );
};

export default AppBar;
