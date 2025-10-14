import React from 'react';
import Text from './Text';
import { Pressable, TextInput, View, StyleSheet } from 'react-native';
import { useFormik, Formik } from 'formik';
import theme from '../../theme';
import * as yup from 'yup';
import useSignIn from '../hooks/useSignIn';
import { useNavigate } from 'react-router-native';


const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: theme.colors.white,
  },
  input: {
    marginBottom: 12,
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
  },
  button: {
    backgroundColor: theme.colors.primary,
    padding: 12,
    borderRadius: 4,
    alignItems: 'center',
  },
  buttonText: {
    color: theme.colors.white,
    fontWeight: 'bold',
  },
});

const SignIn = () => {
  const [signIn] = useSignIn();
  const navigate = useNavigate();

  const validationSchema = yup.object().shape({
    username: yup
    .string()
    .min(3, 'Username must be at least 3 characters')
    .required('Username is required'),
    password: yup
    .string()
    .min(6, 'Password must be at least 6 characters')
    .required('Password is required'),
  });
  const onSubmit = async (values) => {
    const { username, password } = values;
    try {
      const { authenticate } = await signIn({ username, password });
      if (authenticate?.accessToken) {
        navigate('/'); // redirect to repositories list
      }
      console.log('Sign-in result:', data);
    } catch (e) {
      console.log('Sign-in error:', e);
    }
  };



  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
    },
    onSubmit,
    validationSchema
  });

  return (
    <View style={styles.container}>
      
      <TextInput
        style={styles.input}
        placeholder="Username"
        value={formik.values.username}
        onChangeText={formik.handleChange('username')}
      />
      {formik.touched.username && formik.errors.username && <Text style={{ color: 'red' }}>{formik.errors.username}</Text>}
      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry
        value={formik.values.password}
        onChangeText={formik.handleChange('password')}
      />
      {formik.touched.password && formik.errors.password && <Text style={{ color: 'red' }}>{formik.errors.password}</Text>}
      <Pressable onPress={formik.handleSubmit} style={styles.button}>
    <Text style={styles.buttonText}  >Sign in</Text>
</Pressable>
    </View>

  )
};

export const SignInContainer = ({ onSubmit }) => {
  return (
    <Formik initialValues={{ username: '', password: '' }} onSubmit={onSubmit}>
      {({ handleChange, handleSubmit, values }) => (
        <View>
          <TextInput
            placeholder="Username"
            value={values.username}
            onChangeText={handleChange('username')}
          />
          <TextInput
            placeholder="Password"
            secureTextEntry
            value={values.password}
            onChangeText={handleChange('password')}
          />
          <Pressable onPress={handleSubmit}>
            <Text>Sign in</Text>
          </Pressable>
        </View>
      )}
    </Formik>
  );
};


export default SignIn;
