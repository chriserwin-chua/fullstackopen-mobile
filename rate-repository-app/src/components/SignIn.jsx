import { Text, TextInput, Pressable, View, StyleSheet } from 'react-native';
import { useFormik } from 'formik';
import theme from '../theme';
import * as yup from 'yup';
const initialValues = {
  username: '',
  password: '',
};

const validationSchema = yup.object().shape({
  username: yup.string().required('Username is required'),
  password: yup.string().required('Password is required'),
});

const styles = StyleSheet.create({
  container: {
    padding: 20,
    gap: 15,
  },
  inputContainer: {
    height: 50,
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 15,
  },
  normalInputContainer: {
    borderColor: theme.colors.backgroundGray,
  },
  errorInputContainer: {
    borderColor: theme.colors.error,
  },
  button: {
    backgroundColor: theme.colors.primary,
    alignItems: 'center',
    paddingVertical: 10,
  },
  buttonText: {
    color: theme.colors.white,
  },
  errorText: {
    color: theme.colors.error,
  },
  // ...
});

const SignInForm = ({ onSubmit }) => {
  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit,
  });

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Username"
        value={formik.values.username}
        onChangeText={formik.handleChange('username')}
        style={[
          styles.inputContainer,
          !!formik.errors.username
            ? styles.errorInputContainer
            : styles.normalInputContainer,
        ]}
        error={!!formik.errors.username}
      />
      {formik.touched.username && formik.errors.username && (
        <Text style={styles.errorText}>{formik.errors.username}</Text>
      )}
      <TextInput
        placeholder="Password"
        value={formik.values.password}
        onChangeText={formik.handleChange('password')}
        secureTextEntry
        style={[
          styles.inputContainer,
          !!formik.errors.password
            ? styles.errorInputContainer
            : styles.normalInputContainer,
        ]}
      />
      {formik.touched.password && formik.errors.password && (
        <Text style={styles.errorText}>{formik.errors.password}</Text>
      )}
      <Pressable onPress={formik.handleSubmit} style={styles.button}>
        <Text style={styles.buttonText}>Sign in</Text>
      </Pressable>
    </View>
  );
};

const SignIn = () => {
  const onSubmit = (values) => {
    console.log(values);
  };

  return <SignInForm onSubmit={onSubmit} />;
};

export default SignIn;
