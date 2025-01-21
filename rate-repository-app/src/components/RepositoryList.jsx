import { FlatList, View, StyleSheet } from 'react-native';
import RepositoryItem from './RepositoryItem';
import { useEffect, useState } from 'react';
import useRepositories from '../hooks/useRepositories';

const styles = StyleSheet.create({
  separator: {
    height: 10,
  },
  list: {
    height: '80%',
  },
});

const ItemSeparator = () => <View style={styles.separator} />;

const RepositoryList = () => {
  const { repositories } = useRepositories();

  const repositoryNodes = repositories
    ? repositories.edges.map((edge) => edge.node)
    : [];
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
          />
        );
      }}
    />
  );
};

export default RepositoryList;
