import { FlatList, View, StyleSheet, Text } from 'react-native';
import { GET_ME, GET_REPOSITORY } from '../graphql/queries';
import { useParams } from 'react-router-native';
import { useQuery } from '@apollo/client';
import { ReviewItem } from './ReviewItem';
const styles = StyleSheet.create({
  separator: {
    height: 10,
  },
});

const ItemSeparator = () => <View style={styles.separator} />;

const ReviewedListPage = () => {
  const {
    data,
    loading: isLoading,
    refetch,
  } = useQuery(GET_ME, {
    fetchPolicy: 'cache-and-network',
    // Other options
    variables: {
      includeReviews: true,
    },
  });
  if (isLoading) {
    return null;
  }
  const reviewNodes = data?.me?.reviews
    ? data.me.reviews.edges.map((edge) => edge.node)
    : [];
  return (
    <FlatList
      data={reviewNodes}
      renderItem={({ item }) => (
        <ReviewItem review={item} isReviewPage refetch={refetch} />
      )}
      keyExtractor={({ id }) => id}
      ItemSeparatorComponent={ItemSeparator}
      // ...
    />
  );
};

export default ReviewedListPage;
