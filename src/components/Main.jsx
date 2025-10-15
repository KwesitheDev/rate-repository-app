import React from 'react';
import { View, StyleSheet } from 'react-native';
import RepositoryList from './RepositoryList';
import Constants from 'expo-constants';
import AppBar from './AppBar';
import { Route, Routes, Navigate } from 'react-router-native';
import SignIn from './SignIn';
import SingleRepoView from './SingleRepoView';
import CreateReview from './CreateReview';
import SignUp from './SignUp';
import MyReviews from './MyReviews';

//styles
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
      <Routes>
        <Route path="/" element={<RepositoryList />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="*" element={<Navigate to="/" replace />} />
        <Route path="/repository/:id" element={<SingleRepoView />} />
        <Route path="/createReview" element={<CreateReview />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/myreviews" element={<MyReviews />} />
      </Routes>
    </View>
  )
};

export default Main;