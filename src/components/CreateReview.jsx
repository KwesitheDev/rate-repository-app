import React from 'react';
import { View, Pressable, StyleSheet, TextInput } from 'react-native';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { useMutation } from '@apollo/client';
import { useNavigate } from 'react-router-native';


import Text from './Text';
import { CREATE_REVIEW } from '../graphql/mutations';


const validationSchema = Yup.object().shape({
  ownerName: Yup.string()
    .required('Repository owner’s username is required'),
  repositoryName: Yup.string()
    .required('Repository name is required'),
  rating: Yup.number()
    .required('Rating is required')
    .min(0, 'Rating must be between 0 and 100')
    .max(100, 'Rating must be between 0 and 100'),
  text: Yup.string().optional(),
});

//styles
const styles = StyleSheet.create({
  container: {
    padding: 15,
    backgroundColor: 'white',
  },
  input: {
    marginBottom: 10,
  },
  button: {
    backgroundColor: '#0366d6',
    borderRadius: 4,
    padding: 15,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

//review form component (refactor later to separate files)
const ReviewForm = ({ onSubmit }) => {
  return (
    <View style={styles.container}>
      <TextInput
        name="ownerName"
        placeholder="Repository owner’s username"
        style={styles.input}
      />
      <TextInput
        name="repositoryName"
        placeholder="Repository name"
        style={styles.input}
      />
      <TextInput
        name="rating"
        placeholder="Rating between 0 and 100"
        keyboardType="numeric"
        style={styles.input}
      />
      <TextInput
        name="text"
        placeholder="Review"
        multiline
        style={styles.input}
      />
      <Pressable style={styles.button} onPress={onSubmit}>
        <Text style={styles.buttonText}>Create a review</Text>
      </Pressable>
    </View>
  );
};

const CreateReview = () => {
  const [createReview] = useMutation(CREATE_REVIEW);
  const navigate = useNavigate();

  const initialValues = {
    ownerName: '',
    repositoryName: '',
    rating: '',
    text: '',
  };

  const onSubmit = async (values) => {
    const { ownerName, repositoryName, rating, text } = values;
    try {
      const { data } = await createReview({
        variables: {
          review: {
            ownerName,
            repositoryName,
            rating: Number(rating),
            text,
          },
        },
      });
      const repositoryId = data.createReview.repositoryId;
      navigate(`/repository/${repositoryId}`);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={onSubmit}
      validationSchema={validationSchema}
    >
      {({ handleSubmit }) => <ReviewForm onSubmit={handleSubmit} />}
    </Formik>
  );
};

export default CreateReview;
