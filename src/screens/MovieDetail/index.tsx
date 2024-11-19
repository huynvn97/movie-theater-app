import {RouteProp, useNavigation, useRoute} from '@react-navigation/native';
import {
  Movie,
  MovieReview,
  useMovieKeywords,
  useMovieReviews,
} from 'movie-theater-sdk';
import React, {useEffect} from 'react';
import {
  Dimensions,
  FlatList,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {getImageUrl} from '../../utils/image';
import Chip from '../../components/Chip';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

export default function MovieDetailScreen() {
  const navigation = useNavigation();
  const route = useRoute<RouteProp<{params: {movie: Movie}}>>();
  const {movie} = route.params;
  const {data: reviews, loading: reviewLoading} = useMovieReviews({
    id: movie.id,
  });
  const {data: keywords} = useMovieKeywords({id: movie.id});
  const {bottom} = useSafeAreaInsets();

  useEffect(() => {
    navigation.setOptions({title: movie.title});
  }, [movie.title]);

  return (
    <ScrollView
      style={[styles.container]}
      contentContainerStyle={{paddingBottom: bottom}}>
      {/* Movie Poster */}
      <Image
        source={{uri: getImageUrl(movie.poster_path)}}
        style={styles.poster}
      />
      {/* Movie Title */}
      <Text style={styles.title}>{movie.title}</Text>
      {/* Movie Description */}
      <Text style={styles.description}>{movie.overview}</Text>

      {/* Movie Keywords */}
      <Text style={styles.sectionTitle}>Keywords</Text>
      <Text>No info...</Text>

      {/* Movie Reviews */}
      <Text style={styles.sectionTitle}>Reviews</Text>
      <FlatList
        horizontal
        data={reviews}
        keyExtractor={item => item.id}
        renderItem={({item}: {item: MovieReview}) => {
          return (
            <View style={styles.review}>
              <Text style={styles.reviewer}>{item.author}</Text>
              <Text style={styles.rating}>
                Rating: {item.author_details.rating}
              </Text>
              <Text style={styles.comment} numberOfLines={3}>
                {item.content}
              </Text>
            </View>
          );
        }}
      />

      {/* Movie Keywords */}
      <Text style={styles.sectionTitle}>Keywords</Text>
      <View style={[styles.keywords]}>
        {keywords?.map?.(keyword => (
          <Chip
            containerStyle={[styles.chipContainer]}
            key={keyword.id}
            label={keyword.name}
          />
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f8f9fa',
  },
  poster: {
    width: '100%',
    height: 300,
    marginBottom: 16,
    borderRadius: 8,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
  },
  description: {
    fontSize: 16,
    color: '#555',
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#222',
    marginVertical: 8,
  },
  actor: {
    fontSize: 16,
    color: '#333',
    marginBottom: 4,
  },
  review: {
    backgroundColor: '#fff',
    padding: 12,
    borderRadius: 8,
    marginBottom: 8,
    width: Dimensions.get('window').width / 1.5,
    marginRight: 10,
  },
  reviewer: {
    fontSize: 16,
    fontWeight: '600',
    color: '#444',
  },
  comment: {
    fontSize: 14,
    color: '#555',
    fontStyle: 'italic',
    marginVertical: 4,
  },
  rating: {
    fontSize: 14,
    color: '#888',
  },
  keywords: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  chipContainer: {
    marginBottom: 10,
  },
});
