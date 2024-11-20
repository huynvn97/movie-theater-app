import React from 'react';
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
import {getImageUrl} from '../../utils/image';

type MovieCardProps = {
  item: Movie;
  containerStyle?: StyleProp<ViewStyle>;
  onPress?: () => void;
};

export default function MovieCard(props: MovieCardProps) {
  const {item, containerStyle = {}} = props;

  // TODO: place holder image

  const [contentHeight, setContentHeight] = React.useState(0);

  return (
    <Pressable
      onPress={props.onPress}
      style={[styles.item, StyleSheet.flatten(containerStyle)]}>
      <ImageBackground
        source={{
          uri: getImageUrl(item.backdrop_path),
        }}
        style={styles.imgBackground}
        resizeMethod="auto"
        resizeMode="cover">
        <View style={styles.imgWrapper} />
      </ImageBackground>
      <Text style={styles.title} numberOfLines={1}>
        {item.title}
      </Text>

      <View
        style={[styles.descriptionWrapper]}
        onLayout={event => {
          setContentHeight(event.nativeEvent.layout.height);
        }}>
        <Text
          style={[styles.channelTitle]}
          numberOfLines={Math.floor(
            contentHeight / styles.channelTitle.lineHeight,
          )}>
          {item.overview}
        </Text>
      </View>
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
    lineHeight: 16,
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
  descriptionWrapper: {
    flex: 1,
  },
});
