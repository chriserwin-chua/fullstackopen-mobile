import { FlatList, View, StyleSheet, Text } from 'react-native';
import RepositoryItem from './RepositoryItem';
import { GET_REPOSITORY } from '../graphql/queries';
import { useParams } from 'react-router-native';
import { useQuery } from '@apollo/client';
import theme from '../theme';
import { format } from 'date-fns';
const styles = StyleSheet.create({
  separator: {
    height: 10,
  },
  horizontalContainer: {
    flexDirection: 'row',
    backgroundColor: theme.colors.white,
    padding: 15,
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
});

const ItemSeparator = () => <View style={styles.separator} />;
const RepositoryInfo = ({ repository }) => {
  return (
    <RepositoryItem
      name={repository.fullName}
      description={repository.description}
      language={repository.language}
      forks={repository.forksCount}
      stars={repository.stargazersCount}
      reviews={repository.reviewCount}
      rating={repository.ratingAverage}
      avatarUrl={repository.ownerAvatarUrl}
      url={repository.url}
      showGitHubButton
    />
  );
};

const ReviewItem = ({ review }) => {
  console.log(review);
  // Single review item
  return (
    <View style={styles.horizontalContainer}>
      <View style={styles.rating}>
        <Text style={styles.ratingText}>{review.rating}</Text>
      </View>

      <View>
        <Text style={styles.usernameStyle}>{review.user.username}</Text>
        <Text>{format(review.createdAt, 'MM.dd.yyyy')}</Text>
        <Text style={styles.reviewText}>{review.text}</Text>
      </View>
    </View>
  );
};
const RepositoryDetail = () => {
  const { id } = useParams();
  const { data, loading: isLoading } = useQuery(GET_REPOSITORY, {
    fetchPolicy: 'cache-and-network',
    variables: {
      repositoryId: id,
    },
  });
  if (isLoading) {
    return null;
  }
  console.log(data);
  //return <RepositoryInfo repository={data.repository} />;
  const reviewNodes = data.repository.reviews
    ? data.repository.reviews.edges.map((edge) => edge.node)
    : [];
  return (
    <FlatList
      data={reviewNodes}
      renderItem={({ item }) => <ReviewItem review={item} />}
      keyExtractor={({ id }) => id}
      ItemSeparatorComponent={ItemSeparator}
      ListHeaderComponent={() => (
        <>
          <RepositoryInfo repository={data.repository} />
          <ItemSeparator />
        </>
      )}
      // ...
    />
  );
};

export default RepositoryDetail;
