import React from 'react';
import { View, Pressable, StyleSheet, Alert } from 'react-native';
import Text from './Text';
import { useMutation } from '@apollo/client';
import { useNavigate } from 'react-router-native';
import { DELETE_REVIEW } from '../graphql/mutations';

const styles = StyleSheet.create({
  container: { padding: 10, backgroundColor: 'white', marginBottom: 10 },
  buttonContainer: { flexDirection: 'row', marginTop: 10 },
  button: {
    flex: 1,
    padding: 10,
    borderRadius: 4,
    alignItems: 'center',
    marginHorizontal: 5,
  },
  viewButton: { backgroundColor: '#0366d6' },
  deleteButton: { backgroundColor: 'red' },
  buttonText: { color: 'white', fontWeight: 'bold' },
});

const ReviewActions = ({ review, refetchReviews }) => {
  const navigate = useNavigate();
  const [deleteReview] = useMutation(DELETE_REVIEW);

  const handleViewRepository = () => {
    navigate(`/repository/${review.repositoryId}`);
  };

  const handleDeleteReview = () => {
    Alert.alert(
      'Delete review',
      'Are you sure you want to delete this review?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: async () => {
            try {
              await deleteReview({ variables: { id: review.id } });
              refetchReviews(); // refresh the list
            } catch (e) {
              console.error('Error deleting review:', e);
            }
          },
        },
      ]
    );
  };

  return (
    <View style={styles.buttonContainer}>
      <Pressable
        style={[styles.button, styles.viewButton]}
        onPress={handleViewRepository}
      >
        <Text style={styles.buttonText}>View Repository</Text>
      </Pressable>
      <Pressable
        style={[styles.button, styles.deleteButton]}
        onPress={handleDeleteReview}
      >
        <Text style={styles.buttonText}>Delete Review</Text>
      </Pressable>
    </View>
  );
};

export default ReviewActions;
