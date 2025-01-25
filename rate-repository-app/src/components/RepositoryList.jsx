import { FlatList, View, StyleSheet } from 'react-native';
import RepositoryItem from './RepositoryItem';
import { useEffect, useState } from 'react';
import useRepositories from '../hooks/useRepositories';
import { useNavigate } from 'react-router-native';

const styles = StyleSheet.create({
  separator: {
    height: 10,
  },
});

const ItemSeparator = () => <View style={styles.separator} />;

export const RepositoryListContainer = ({ repositories }) => {
  const repositoryNodes = repositories
    ? repositories.edges.map((edge) => edge.node)
    : [];
  const navigate = useNavigate();
  return (
    <FlatList
      style={styles.list}
      data={repositoryNodes}
      ItemSeparatorComponent={ItemSeparator}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => {
        return (
          <RepositoryItem
            name={item.fullName}
            description={item.description}
            language={item.language}
            forks={item.forksCount}
            stars={item.stargazersCount}
            reviews={item.reviewCount}
            rating={item.ratingAverage}
            avatarUrl={item.ownerAvatarUrl}
            onPress={() => navigate(`/${item.id}`)}
          />
        );
      }}
    />
  );
};
const RepositoryList = () => {
  const { repositories } = useRepositories();

  return <RepositoryListContainer repositories={repositories} />;
};

export default RepositoryList;
