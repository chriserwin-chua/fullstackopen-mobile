import { Text, TextInput, Pressable, View, StyleSheet } from 'react-native';
import { useFormik } from 'formik';
import theme from '../theme';
import * as yup from 'yup';
import { useMutation } from '@apollo/client';
import { CREATE_REVIEW } from '../graphql/mutation';
import { useNavigate } from 'react-router-native';
const initialValues = {
  ownerName: '',
  repositoryName: '',
  rating: '',
  text: '',
};

const validationSchema = yup.object().shape({
  ownerName: yup.string().required('Repository owner name is required'),
  repositoryName: yup.string().required('Repository name is required'),
  rating: yup.number().min(0).max(100).required('Rating is required'),
  text: yup.string().optional(),
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

export const ReviewForm = ({ onSubmit }) => {
  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit,
  });

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Repository owner name"
        value={formik.values.ownerName}
        onChangeText={formik.handleChange('ownerName')}
        style={[
          styles.inputContainer,
          formik.touched.ownerName && !!formik.errors.ownerName
            ? styles.errorInputContainer
            : styles.normalInputContainer,
        ]}
        error={!!formik.errors.username}
      />
      {formik.touched.ownerName && formik.errors.ownerName && (
        <Text style={styles.errorText}>{formik.errors.ownerName}</Text>
      )}
      <TextInput
        placeholder="Repository name"
        value={formik.values.repositoryName}
        onChangeText={formik.handleChange('repositoryName')}
        style={[
          styles.inputContainer,
          formik.touched.repositoryName && !!formik.errors.repositoryName
            ? styles.errorInputContainer
            : styles.normalInputContainer,
        ]}
        error={!!formik.errors.repositoryName}
      />
      {formik.touched.repositoryName && formik.errors.repositoryName && (
        <Text style={styles.errorText}>{formik.errors.repositoryName}</Text>
      )}
      <TextInput
        placeholder="Rating between 0 and 100"
        value={formik.values.rating}
        onChangeText={formik.handleChange('rating')}
        style={[
          styles.inputContainer,
          formik.touched.rating && !!formik.errors.rating
            ? styles.errorInputContainer
            : styles.normalInputContainer,
        ]}
        error={!!formik.errors.rating}
      />
      {formik.touched.rating && formik.errors.rating && (
        <Text style={styles.errorText}>{formik.errors.rating}</Text>
      )}
      <TextInput
        placeholder="Review"
        value={formik.values.text}
        onChangeText={formik.handleChange('text')}
        style={[
          styles.inputContainer,
          !!formik.errors.text
            ? styles.errorInputContainer
            : styles.normalInputContainer,
        ]}
        error={!!formik.errors.text}
      />
      {formik.touched.text && formik.errors.text && (
        <Text style={styles.errorText}>{formik.errors.text}</Text>
      )}
      <Pressable onPress={formik.handleSubmit} style={styles.button}>
        <Text style={styles.buttonText}>Create a review</Text>
      </Pressable>
    </View>
  );
};

const ReviewPage = () => {
  const [mutate, result] = useMutation(CREATE_REVIEW);
  const navigate = useNavigate();
  const onSubmit = async (values) => {
    try {
      // call the mutate function here with the right arguments
      const { data } = await mutate({
        variables: {
          review: { ...values, rating: Number(values.rating) },
        },
      });
      console.log(data);
      navigate(`/${data.createReview.repository.id}`);
    } catch (e) {
      console.log(e);
    }
  };

  return <ReviewForm onSubmit={onSubmit} />;
};

export default ReviewPage;
