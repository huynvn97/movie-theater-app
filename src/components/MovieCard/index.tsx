import {Movie} from 'movie-theater-sdk';
import {StyleProp, StyleSheet, Text, View, ViewStyle} from 'react-native';

type MovieCardProps = {
  item: Movie;
  containerStyle?: StyleProp<ViewStyle>;
};

export default function MovieCard(props: MovieCardProps) {
  const {item, containerStyle = {}} = props;

  return (
    <View style={[styles.item, StyleSheet.flatten(containerStyle)]}>
      <Text style={styles.title}>{item.title}</Text>
      <Text style={styles.channelTitle} numberOfLines={2}>
        {item.overview}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  item: {
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  channelTitle: {},
});
