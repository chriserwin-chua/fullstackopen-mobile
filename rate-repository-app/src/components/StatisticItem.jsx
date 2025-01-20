import { StyleSheet, View } from 'react-native';
import Text from './Text';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
  },
  count: {
    alignSelf: 'center',
  },
  text: {
    alignSelf: 'center',
  },
  // ...
});

const StatisicItem = ({ count, text }) => {
  const convertedCount =
    count > 1000 ? parseFloat(count / 1000).toFixed(1) + 'k' : count;
  return (
    <View style={styles.container}>
      <Text fontWeight="bold" style={styles.count}>
        {convertedCount}
      </Text>
      <Text style={styles.text}>{text}</Text>
    </View>
  );
};

export default StatisicItem;
