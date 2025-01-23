import { StyleSheet, Pressable, Text } from 'react-native';
import { Link } from 'react-router-native';

import theme from '../theme';

const styles = StyleSheet.create({
  text: {
    color: theme.colors.white,
    fontSize: 20,
    paddingHorizontal: 10,
  },
  // ...
});

const AppBarTab = ({ text, path, isLink, onPress }) => {
  if (isLink) {
    return (
      <Pressable>
        <Link to={path}>
          <Text style={styles.text}>{text}</Text>
        </Link>
      </Pressable>
    );
  } else {
    return (
      <Pressable onPress={onPress}>
        <Text style={styles.text}>{text}</Text>
      </Pressable>
    );
  }
};

export default AppBarTab;
