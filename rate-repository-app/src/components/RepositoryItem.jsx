import { Image, StyleSheet, View } from 'react-native';
import theme from '../theme';
import Text from './Text';
import StatisicItem from './StatisticItem';

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.colors.white,
    padding: 10,
  },
  horizontalContainer: {
    flexDirection: 'row',
    gap: 15,
  },
  statsContainer: {
    flexDirection: 'row',
    gap: 50,
    paddingHorizontal: 20,
    marginTop: 20,
  },
  topContainerDetails: {
    gap: 5,
    width: '100%',
  },
  languageText: {
    backgroundColor: theme.colors.primary,
    padding: 5,
    alignSelf: 'flex-start',
    borderRadius: 5,
  },
  tinyLogo: {
    width: 40,
    height: 40,
    borderRadius: 5,
  },
});

const RepositoryItem = (props) => {
  const {
    name,
    description,
    language,
    stars,
    forks,
    reviews,
    rating,
    avatarUrl,
  } = props;

  return (
    <View style={styles.container}>
      <View style={styles.horizontalContainer}>
        <Image
          style={styles.tinyLogo}
          source={{
            uri: avatarUrl,
          }}
        />
        <View style={styles.topContainerDetails}>
          <Text fontWeight="bold">{name}</Text>
          <View style={{ width: '90%' }}>
            <Text>{description}</Text>
          </View>
          <Text color="white" style={styles.languageText}>
            {language}
          </Text>
        </View>
      </View>
      <View style={styles.statsContainer}>
        <StatisicItem count={stars} text="Stars" />
        <StatisicItem count={forks} text="Forks" />
        <StatisicItem count={reviews} text="Reviews" />
        <StatisicItem count={rating} text="Rating" />
      </View>
    </View>
  );
};

export default RepositoryItem;
