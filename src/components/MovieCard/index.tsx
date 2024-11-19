import {Movie} from 'movie-theater-sdk';
import {
  ImageBackground,
  Pressable,
  StyleProp,
  StyleSheet,
  Text,
  View,
  ViewStyle,
} from 'react-native';
import {IMAGE_BASE_URL} from '../../utils/constants';

type MovieCardProps = {
  item: Movie;
  containerStyle?: StyleProp<ViewStyle>;
  onPress?: () => void;
};

export default function MovieCard(props: MovieCardProps) {
  const {item, containerStyle = {}} = props;

  return (
    <Pressable
      onPress={props.onPress}
      style={[styles.item, StyleSheet.flatten(containerStyle)]}>
      <ImageBackground
        source={{
          uri: `${IMAGE_BASE_URL}/w500/${item.backdrop_path}`,
        }}
        style={styles.imgBackground}
        resizeMethod="auto"
        resizeMode="cover">
        <View style={styles.imgWrapper} />
      </ImageBackground>
      <Text style={styles.title}>{item.title}</Text>
      <Text style={styles.channelTitle} numberOfLines={2}>
        {item.overview}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  item: {
    backgroundColor: '#fff',
    padding: 8,
    borderRadius: 8,
    overflow: 'hidden',
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'white',
  },
  channelTitle: {
    color: 'white',
  },
  imgBackground: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
  },
  imgWrapper: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
});
