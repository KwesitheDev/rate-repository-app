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

const styles = StyleSheet.create({
  container: {
    padding: 15,
    backgroundColor: 'white',
  },
  input: {
    marginBottom: 12,
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
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
  errorText: {
    color: 'red',
    marginBottom: 10,
  },
});

const ReviewForm = ({ values, handleChange, handleSubmit, errors, touched }) => (
  <View style={styles.container}>
    <TextInput
      placeholder="Repository owner’s username"
      style={styles.input}
      value={values.ownerName}
      onChangeText={handleChange('ownerName')}
    />
    {touched.ownerName && errors.ownerName && (
      <Text style={styles.errorText}>{errors.ownerName}</Text>
    )}

    <TextInput
      placeholder="Repository name"
      style={styles.input}
      value={values.repositoryName}
      onChangeText={handleChange('repositoryName')}
    />
    {touched.repositoryName && errors.repositoryName && (
      <Text style={styles.errorText}>{errors.repositoryName}</Text>
    )}

    <TextInput
      placeholder="Rating between 0 and 100"
      keyboardType="numeric"
      style={styles.input}
      value={values.rating}
      onChangeText={handleChange('rating')}
    />
    {touched.rating && errors.rating && (
      <Text style={styles.errorText}>{errors.rating}</Text>
    )}

    <TextInput
      placeholder="Review"
      multiline
      style={styles.input}
      value={values.text}
      onChangeText={handleChange('text')}
    />

    <Pressable style={styles.button} onPress={handleSubmit}>
      <Text style={styles.buttonText}>Create a review</Text>
    </Pressable>
  </View>
);

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
    try {
      const { ownerName, repositoryName, rating, text } = values;
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
      console.log('Review created:', data);

      if (data?.createReview?.repositoryId) {
        navigate(`/repository/${data.createReview.repositoryId}`);
      }
    } catch (e) {
      console.error('Error creating review:', e);
    }
  };

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={onSubmit}
      validationSchema={validationSchema}
    >
      {({ handleSubmit, handleChange, values, errors, touched }) => (
        <ReviewForm
          handleSubmit={handleSubmit}
          handleChange={handleChange}
          values={values}
          errors={errors}
          touched={touched}
        />
      )}
    </Formik>
  );
};

export default CreateReview;
