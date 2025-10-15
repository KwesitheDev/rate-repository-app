import React from 'react';
import { View, Pressable, StyleSheet, TextInput } from 'react-native';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { useMutation } from '@apollo/client';
import { useNavigate } from 'react-router-native';
import theme from '../theme';

import Text from './Text';
import { CREATE_USER } from '../graphql/mutations';
import useSignIn from '../hooks/useSignIn';


const validationSchema = Yup.object().shape({
  username: Yup.string()
    .required('Username is required')
    .min(5, 'Username must be at least 5 characters')
    .max(30, 'Username must be at most 30 characters'),
  password: Yup.string()
    .required('Password is required')
    .min(5, 'Password must be at least 5 characters')
    .max(50, 'Password must be at most 50 characters'),
  passwordConfirmation: Yup.string()
    .oneOf([Yup.ref('password'), null], 'Passwords must match')
    .required('Password confirmation is required'),
});

//styles
const styles = StyleSheet.create({
  container: {
    padding: 15,
    backgroundColor: theme.colors.white,
  },
  input: {
    marginBottom: 10,
  },
  button: {
    backgroundColor: theme.colors.primary,
    borderRadius: 4,
    padding: 15,
    alignItems: 'center',
  },
  buttonText: {
    color: theme.colors.white,
    fontWeight: theme.fontWeights.bold,
  },
});


//sign up form component (refactor later to separate files)
const SignUpForm = ({ onSubmit }) => {
  return (
    <View style={styles.container}>
      <TextInput
        name="username"
        placeholder="Username"
        style={styles.input}
      />
      <TextInput
        name="password"
        placeholder="Password"
        secureTextEntry
        style={styles.input}
      />
      <TextInput
        name="passwordConfirmation"
        placeholder="Password confirmation"
        secureTextEntry
        style={styles.input}
      />
      <Pressable style={styles.button} onPress={onSubmit}>
        <Text style={styles.buttonText}>Sign up</Text>
      </Pressable>
    </View>
  );
};

const SignUp = () => {
  const [createUser] = useMutation(CREATE_USER);
  const [signIn] = useSignIn();
  const navigate = useNavigate();

  const initialValues = {
    username: '',
    password: '',
    passwordConfirmation: '',
  };

  const onSubmit = async (values) => {
    const { username, password } = values;
    try {
      await createUser({
        variables: {
          user: { username, password },
        },
      });

      await signIn({ username, password });

      navigate('/');
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
      {({ handleSubmit }) => <SignUpForm onSubmit={handleSubmit} />}
    </Formik>
  );
};

export default SignUp;

