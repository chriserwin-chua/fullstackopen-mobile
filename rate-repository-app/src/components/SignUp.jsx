import { Text, TextInput, Pressable, View, StyleSheet } from 'react-native';
import { useFormik } from 'formik';
import theme from '../theme';
import * as yup from 'yup';
import { useMutation } from '@apollo/client';
import useSignin from '../hooks/useSignin';
import { SIGN_UP } from '../graphql/mutation';
const initialValues = {
  username: '',
  password: '',
  confirmPassword: '',
};

const validationSchema = yup.object().shape({
  username: yup.string().min(5).max(30).required('Username is required'),
  password: yup.string().min(5).max(50).required('Password is required'),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref('password'), 'Password must match.'])
    .required('Confirm password is required'),
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

export const SignUpForm = ({ onSubmit }) => {
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
          formik.touched.username && !!formik.errors.username
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
          formik.touched.password &&
          !!formik.touched.password &&
          !!formik.errors.password
            ? styles.errorInputContainer
            : styles.normalInputContainer,
        ]}
      />
      {formik.touched.password && formik.errors.password && (
        <Text style={styles.errorText}>{formik.errors.password}</Text>
      )}
      <TextInput
        placeholder="Confirm password"
        value={formik.values.confirmPassword}
        onChangeText={formik.handleChange('confirmPassword')}
        secureTextEntry
        style={[
          styles.inputContainer,
          formik.touched.confirmPassword &&
          !!formik.touched.confirmPassword &&
          !!formik.errors.confirmPassword
            ? styles.errorInputContainer
            : styles.normalInputContainer,
        ]}
      />
      {formik.touched.confirmPassword && formik.errors.confirmPassword && (
        <Text style={styles.errorText}>{formik.errors.confirmPassword}</Text>
      )}
      <Pressable onPress={formik.handleSubmit} style={styles.button}>
        <Text style={styles.buttonText}>Sign up</Text>
      </Pressable>
    </View>
  );
};

const SignUp = () => {
  const { signIn } = useSignin();
  const [mutate, result] = useMutation(SIGN_UP);
  const onSubmit = async (values) => {
    try {
      // call the mutate function here with the right arguments
      const { data } = await mutate({
        variables: {
          user: { username: values.username, password: values.password },
        },
      });
      if (data) {
        await signIn(values);
      }
    } catch (e) {
      console.log(e);
    }
  };

  return <SignUpForm onSubmit={onSubmit} />;
};

export default SignUp;
