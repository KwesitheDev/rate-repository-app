import React from 'react';
import Text from './Text';
import { Pressable, TextInput, View, StyleSheet } from 'react-native';
import { useFormik } from 'formik';
import theme from '../../theme';
import * as yup from 'yup';


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

  const validationSchema = yup.object().shape({
    username: yup
    .string()
    .required('Username is required'),
    password: yup
    .string()
    .required('Password is required'),
  });


  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
    },
    onSubmit: (values) => {
      console.log(values);
    },
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
      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry
        value={formik.values.password}
        onChangeText={formik.handleChange('password')}
      />
      <Pressable onPress={formik.handleSubmit} style={styles.button}>
    <Text style={styles.buttonText}  >Sign in</Text>
</Pressable>
    </View>

  )
};

export default SignIn;
