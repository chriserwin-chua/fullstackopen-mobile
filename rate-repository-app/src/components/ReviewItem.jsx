import { View, StyleSheet, TouchableOpacity, Alert } from 'react-native';

import { format } from 'date-fns';
import theme from '../theme';
import Text from './Text';
import * as Linking from 'expo-linking';
import { useMutation } from '@apollo/client';
import { DELETE_REVIEW } from '../graphql/mutation';
const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.colors.white,
    paddingVertical: 15,
  },
  horizontalContainer: {
    flexDirection: 'row',
    paddingHorizontal: 15,
    gap: 15,
  },
  rating: {
    width: 40,
    height: 40,
    borderRadius: 20,
    borderColor: theme.colors.primary,
    borderWidth: 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  ratingText: {
    color: theme.colors.primary,
    fontSize: 16,
    fontWeight: 'bold',
  },
  usernameStyle: {
    fontWeight: 'bold',
  },
  reviewText: {
    marginTop: 5,
    flex: 1,
    width: 300,
  },
  buttonContainer: {
    flexDirection: 'row',
    paddingHorizontal: 15,
    gap: 15,
    justifyContent: 'space-between',
  },
  buttonStyle: {
    backgroundColor: theme.colors.primary,
    padding: 15,
    textAlign: 'center',
    borderRadius: 2,
    marginTop: 10,
    width: 150,
  },
  deleteButton: {
    backgroundColor: theme.colors.error,
  },
});
export const ReviewItem = ({ review, isReviewPage, refetch }) => {
  const [mutate, result] = useMutation(DELETE_REVIEW);
  const deleteReview = async () => {
    try {
      // call the mutate function here with the right arguments
      await mutate({
        variables: {
          deleteReviewId: review.id,
        },
      });
      refetch();
    } catch (e) {
      console.log(e);
    }
  };
  const handleDeleteReview = () =>
    Alert.alert(
      'Delete review',
      'Are you sure you want to delete this review?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        { text: 'OK', onPress: deleteReview },
      ]
    );
  // Single review item
  return (
    <View style={styles.container}>
      <View style={styles.horizontalContainer}>
        <View style={styles.rating}>
          <Text style={styles.ratingText}>{review.rating}</Text>
        </View>

        <View>
          <Text style={styles.usernameStyle}>
            {isReviewPage ? review.repository.fullName : review.user.username}
          </Text>
          <Text>{format(review.createdAt, 'MM.dd.yyyy')}</Text>
          <Text style={styles.reviewText}>{review.text}</Text>
        </View>
      </View>
      {isReviewPage && (
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            onPress={() => Linking.openURL(review.repository.url)}
          >
            <Text color="white" style={styles.buttonStyle}>
              View Repository
            </Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={handleDeleteReview}>
            <Text
              color="white"
              style={[styles.buttonStyle, styles.deleteButton]}
            >
              Delete review
            </Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};
