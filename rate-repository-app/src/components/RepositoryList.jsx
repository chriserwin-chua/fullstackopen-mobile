import { FlatList, View, StyleSheet, TextInput } from 'react-native';
import RepositoryItem from './RepositoryItem';
import React, { useEffect, useRef, useState } from 'react';
import useRepositories from '../hooks/useRepositories';
import { Picker } from '@react-native-picker/picker';
import { useDebounce } from 'use-debounce';
import { useNavigate } from 'react-router-native';

const styles = StyleSheet.create({
  separator: {
    height: 10,
  },
  container: {
    padding: 10,
  },
  inputContainer: {
    height: 50,
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 15,
  },
});

const ItemSeparator = () => <View style={styles.separator} />;

const RepositorySortSelection = ({ sortBy, setSortBy }) => {
  return (
    <Picker
      selectedValue={sortBy}
      onValueChange={(itemValue, itemIndex) => setSortBy(itemValue)}
    >
      <Picker.Item label="Select an Sort type" value="" enabled={false} />
      <Picker.Item label="Latest repositories" value="CREATED_AT_DESC" />
      <Picker.Item label="Highest rated repositories" value="RATING_DESC" />
      <Picker.Item label="Lowest rated repositories" value="RATING_ASC" />
    </Picker>
  );
};

export class RepositoryListContainer extends React.Component {
  renderHeader = () => {
    const { sortBy, setSortBy, keyword, setKeyword } = this.props;
    return (
      <View>
        <TextInput
          placeholder="filter by keyword"
          value={keyword}
          onChangeText={(value) => setKeyword(value)}
          style={styles.inputContainer}
        />
        <RepositorySortSelection sortBy={sortBy} setSortBy={setSortBy} />
      </View>
    );
  };

  render = () => {
    const { repositories, navigate } = this.props;
    const repositoryNodes = repositories
      ? repositories.edges.map((edge) => edge.node)
      : [];
    return (
      <FlatList
        data={repositoryNodes}
        ItemSeparatorComponent={ItemSeparator}
        keyExtractor={(item) => item.id}
        ListHeaderComponent={this.renderHeader}
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
}
const RepositoryList = () => {
  const [sortBy, setSortBy] = useState();
  const [keyword, setKeyword] = useState();
  const [keywordValue] = useDebounce(keyword, 500);
  const { repositories } = useRepositories(sortBy, keywordValue);

  const navigate = useNavigate();
  return (
    <RepositoryListContainer
      repositories={repositories}
      sortBy={sortBy}
      setSortBy={setSortBy}
      keyword={keyword}
      setKeyword={setKeyword}
      navigate={navigate}
    />
  );
};

export default RepositoryList;
