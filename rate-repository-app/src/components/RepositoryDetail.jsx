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
  const {
    data,
    loading: isLoading,
    fetchMore,
  } = useQuery(GET_REPOSITORY, {
    fetchPolicy: 'cache-and-network',
    variables: {
      repositoryId: id,
      first: 8,
    },
  });
  if (isLoading) {
    return null;
  }
  //return <RepositoryInfo repository={data.repository} />;
  const reviewNodes = data.repository.reviews
    ? data.repository.reviews.edges.map((edge) => edge.node)
    : [];
  const handleFetchMore = () => {
    const canFetchMore =
      !isLoading && data?.repository.reviews.pageInfo.hasNextPage;
    if (!canFetchMore) {
      return;
    }
    fetchMore({
      variables: {
        after: data.repository.reviews.pageInfo.endCursor,
        repositoryId: id,
        first: 8,
      },
    });
  };
  const onEndReach = () => {
    console.log('endreach');
    handleFetchMore();
  };
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
      onEndReached={onEndReach}
      onEndReachedThreshold={0.5}
    />
  );
};

export default RepositoryDetail;
