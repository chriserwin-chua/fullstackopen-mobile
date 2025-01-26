import { FlatList, View, StyleSheet, Text } from 'react-native';
import RepositoryItem from './RepositoryItem';
import { GET_REPOSITORY } from '../graphql/queries';
import { useParams } from 'react-router-native';
import { useQuery } from '@apollo/client';
import { ReviewItem } from './ReviewItem';
const styles = StyleSheet.create({
  separator: {
    height: 10,
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
